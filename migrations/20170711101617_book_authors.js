exports.up = function(knex, Promise) {
  return knex.schema.createTable('book_authors', (table)=>{
    table.increments('id').primary()
    table.integer('book_id').references('books.id').unsigned().onDelete('cascade')
    table.integer('author_id').references('authors.id').unsigned().onDelete('cascade')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('book_authors')
};
