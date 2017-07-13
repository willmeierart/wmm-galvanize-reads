const knex = require('./knex')

const bookJoina=(book)=>{
  return book.join('book_authors', 'book_authors.book_id', 'books.id')
  .join('authors', 'authors.id', 'book_authors.author_id')
  .select('books.id as id', 'books.title', 'books.description', 'books.genre', 'books.cover_url', 'authors.id as author_id', 'authors.first_name', 'authors.last_name', 'authors.portrait_url', 'authors.biography')
}

const joinAuthors=(author)=>{
  return author.join('book_authors', 'book_authors.author_id', 'authors.id')
  .join('books', 'books.id', 'book_authors.book_id')
  .select('authors.id as id', 'books.title', 'books.description', 'books.genre', 'books.cover_url', 'books.id as book_id', 'authors.first_name', 'authors.last_name', 'authors.portrait_url', 'authors.biography')
}

module.exports = {
  getAllBooks: function(){
  return bookJoina(knex.select('*').from('books'))
  },

  getOneBook: function(id){
    return bookJoina(knex.select('*').from('books')).where('book_id', id)
  },

  newBook: function(book){
    const cleanBook = {
      title: book.title,
      genre: book.genre,
      cover_url: book.cover_url,
      description: book.description
    }
    return knex('books').insert(cleanBook, '*').then((res)=>{
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
    return joinAuthors(knex.select('*').from('authors'))
  },

  getOneAuthor: function(id){
    return knex.select('*').from('authors').where('id', id)
  },

  deleteBook: function(id){
    return knex('books').where('id', id).del()
  },

  editBook: function(id, book){
    const cleanBook = {
      title: book.title,
      genre: book.genre,
      cover_url: book.cover_url,
      description: book.description
    }
    return knex('books').where('id', id).update(cleanBook, '*').then((res)=>{
      const book_id = res[0].id
      console.log(book);
      return Promise.all(
        book['authors[]'].map((author)=>{
          const joina = {
            author_id: author,
            book_id: book_id
          }
          console.log(joina);
          return knex('book_authors').insert(joina, '*')
        })
      ).then(()=>res)
    })
  }



}
