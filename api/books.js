const express = require('express');
const router = express.Router();
const queries = require('../db/queries')

router.get('/', function(req,res,next){
  queries.getAll('books').then((books)=>{
    console.log('ok');
    res.render('books', {"books": books})
  })
})
router.get('/:id', function(req, res, next) {
  // res.render('books', { title: 'gReads | BOOKS' });
});

module.exports = router;
