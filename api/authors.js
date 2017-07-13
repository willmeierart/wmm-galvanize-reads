var express = require('express');
var router = express.Router();
const queries = require('../db/queries')

const consolidate = (books)=>{
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
  // res.render('books', {"books": allBooksWithAuthors})
  return allBooksWithAuthors
}

// render()

router.get('/', function(req,res,next){
  queries.getAllBooks().then(book=>res.json(consolidate(book)))
})
router.get('/:id', function(req,res,next){
  queries.getOneAuthor(req.params.id).then(author=>res.json(author)) 

})

//
// router.post('/', function(req,res,next){
//   queries.newBook(req.body).then((book)=>{
//     if(book){res.json(book)}
//     else{next(new Error('invalid book format'))}
//   })
// })

module.exports = router;
