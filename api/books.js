const express = require('express');
const router = express.Router();
const queries = require('../db/queries')

const consolidate = (books, res)=>{
  const allBooksWithAuthors = []
  const fullBooksInfo = {}
  const authorAcc = {}
   books.forEach((book)=>{
    if(!fullBooksInfo[book.title]){
      const bookWithAuthors = {
        id: book.id,
        title: book.title,
        genre: book.genre,
        description: book.description,
        cover: book.cover_url,
        authors: []
      }
      allBooksWithAuthors.push(bookWithAuthors)
      fullBooksInfo[book.title] = bookWithAuthors
    }
    // fullBooksInfo[book.id].authors.push(
    //     {
    //       id: book.author_id,
    //       first_name: book.first_name,
    //       last_name: book.last_name,
    //       biography: book.biography,
    //       portrait: book.portrait_url
    //     }
    //   )
    if(!authorAcc[book.author_id]){
      authorAcc[book.author_id] = true
      fullBooksInfo[book.title].authors.push(
        {
          id: book.author_id,
          first_name: book.first_name,
          last_name: book.last_name,
          biography: book.biography,
          portrait: book.portrait_url
        }
      )
    }

  })
  // res.json(allBooksWithAuthors)
  res.render('books', {"books": allBooksWithAuthors})
}



router.get('/', function(req,res,next){
  queries.getAllBooks().then((books)=>{
    consolidate(books,res)
  })
})
router.get('/:id', function(req, res, next) {
  // res.render('books', { title: 'gReads | BOOKS' });
});

module.exports = router;
