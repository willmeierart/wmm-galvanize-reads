const dotenv = require('dotenv').config()

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgress://localhost/greads'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true'
  }

};
