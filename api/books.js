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
router.get('/new', function (req,res){
  queries.getAllAuthors().then((authors)=>{
    // res.json(authors)
    res.render('newbook', {'authors': authors})
  })

})
router.get('/:id', function(req, res, next) {
  queries.getOneBook(req.params.id).then((books)=>{
    consolidate(books,res)
  })
})
router.post('/', function(req, res, next){
  console.log(req.body);
  queries.newBook(req.body).then(book=>res.json(book))
})
// router.post('/', function (req,res,next){
//   queries.addJoiner(req.body).then(book=>book)
// })




module.exports = router;
