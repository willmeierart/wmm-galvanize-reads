const knex = require('./knex')

module.exports = {
  getAllBooks: function(){
    return knex.select('*').from('books')
      .join('book_authors', 'book_authors.book_id', 'books.id')
      .join('authors', 'authors.id', 'book_authors.author_id')
      .select('books.id as book_id', 'books.title', 'books.description', 'books.genre', 'books.cover_url', 'authors.id as author_id', 'authors.first_name', 'authors.last_name', 'authors.portrait_url', 'authors.biography')
  }
}
