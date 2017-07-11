exports.up = function(knex, Promise) {
  return knex.schema.createTable('authors', (table)=>{
    table.increments('id').primary()
    table.text('first_name').notNull()
    table.text('last_name').notNull()
    table.text('biography')
    table.text('portrait_url')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('authors')
};
