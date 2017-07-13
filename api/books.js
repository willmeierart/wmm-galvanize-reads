const express = require('express');
const router = express.Router();
const queries = require('../db/queries')

const consolidate = (books)=>{
  const allBooksWithAuthors = []
  const fullBooksInfo = {}
   books.forEach((book)=>{
    const authorAcc = {}
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
    if(!authorAcc[book.last_name]){
      authorAcc[book.last_name] = true
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
  // res.render('books', {"books": allBooksWithAuthors})
  return allBooksWithAuthors
}

router.get('/', function(req,res,next){
  queries.getAllBooks().then((books)=>{
    console.log(books);
    // consolidate(books)
    res.render('books', {"books": consolidate(books)})
  })
})
router.get('/new', function (req,res){
  queries.getAllAuthors().then((authors)=>{
    res.render('newbook', {'authors': authors})
  })
})
router.get('/:id', function(req, res, next) {
  queries.getOneBook(req.params.id).then((book)=>{

    res.render('books', {"books": consolidate(book)})
  })
})
router.post('/', function(req, res, next){
  queries.newBook(req.body).then(book=>res.json(book))
})
router.get('/:id/delete', function(req,res,next){
  queries.getOneBook(req.params.id).then((book)=>{
    // res.json(consolidate(book))
    res.render('deletebook', {"books": consolidate(book)})
  })
})
router.delete('/:id', function(req,res,next){
  queries.deleteBook(req.params.id).then((book)=>{
    res.json({deleted:true})
  })
})
router.get('/:id/edit', function(req,res,next){
  queries.getOneBook(req.params.id).then((book)=>{
    // res.json(consolidate(book))
    res.render('editbook', {"books": consolidate(book)})
  })
})
router.put('/:id', function(req,res,next){
  queries.editBook(req.params.id, req.body).then(book=>res.render('books', {"books": consolidate(book)}))
})



module.exports = router;
