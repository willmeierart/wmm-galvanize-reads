const book_authors = require('../data/book_authors')

exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE book_authors RESTART IDENTITY CASCADE;')
    .then(function () {
      return knex('book_authors').insert(book_authors)
    });
};
