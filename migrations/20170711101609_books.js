exports.up = function(knex, Promise) {
  return knex.schema.createTable('books', (table)=>{
    table.increments('id').primary()
    table.text('title').notNull()
    table.text('genre').notNull()
    table.text('description')
    table.text('cover_url')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('books')
};
