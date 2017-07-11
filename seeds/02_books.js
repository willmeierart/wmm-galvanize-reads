const books = require('../data/books')

exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE books RESTART IDENTITY CASCADE;')
    .then(function () {
      return knex('books').insert(books)
    });
};
