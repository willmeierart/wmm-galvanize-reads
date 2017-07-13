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
    if(!authorAcc[book.first_name]){
      authorAcc[book.first_name] = true
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
    // res.json(authors)
    res.render('newbook', {'authors': authors})
  })

})
router.get('/:id', function(req, res, next) {
  queries.getOneBook(req.params.id).then((book)=>{
    // consolidate(book)
    res.render('books', {"books": consolidate(book)})
  })
})
router.post('/', function(req, res, next){
  // console.log(req.body);
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


// router.post('/', function (req,res,next){
//   queries.addJoiner(req.body).then(book=>book)
// })




module.exports = router;
