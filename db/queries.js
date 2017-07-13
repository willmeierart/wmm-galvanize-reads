const knex = require('./knex')

const bookJoina=(book)=>{
  return book.join('book_authors', 'book_authors.book_id', 'books.id')
  .join('authors', 'authors.id', 'book_authors.author_id')
  .select('books.id as id', 'books.title', 'books.description', 'books.genre', 'books.cover_url', 'authors.id as author_id', 'authors.first_name', 'authors.last_name', 'authors.portrait_url', 'authors.biography')
}

module.exports = {
  getAllBooks: function(){
    // return knex.select('*').from('books')
      // .join('book_authors', 'book_authors.book_id', 'books.id')
      // .join('authors', 'authors.id', 'book_authors.author_id')
      // .select('books.id as id', 'books.title', 'books.description', 'books.genre', 'books.cover_url', 'authors.id as author_id', 'authors.first_name', 'authors.last_name', 'authors.portrait_url', 'authors.biography')
  return bookJoina(knex.select('*').from('books'))
  },
  getOneBook: function(id){
    return bookJoina(knex.select('*').from('books')).where('book_id', id)
  },
  newBook: function(book){
    // console.log(book);
    const cleanBook = {
      title: book.title,
      genre: book.genre,
      cover_url: book.cover_url,
      description: book.description
    }
    return knex('books').insert(cleanBook, '*').then((res)=>{
      // console.log(res);
      const book_id = res[0].id
      return Promise.all(
        book['authors[]'].map((author)=>{

          const joina = {
            author_id: author,
            book_id: book_id
          }
          console.log(joina);
          return knex('book_authors').insert(joina, '*')
        })
      ).then(()=>res[0])

    })

  },
  getAllAuthors: function(){
    return knex.select('*').from('authors')
  },
  deleteBook: function(id){
    return knex('books').where('id', id).del()
  }
  // addJoiner: function(){
  //   return knex.select('*').from('book_authors')
  // }


}
