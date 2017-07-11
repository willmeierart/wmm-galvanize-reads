const knex = require('./knex')

module.exports = {
  getAll: function(table){
    return knex(table)
  }
}
