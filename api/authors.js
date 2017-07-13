var express = require('express');
var router = express.Router();
const queries = require('../db/queries')

const consolidate = (authors)=>{
  const allAuthorsWithBooks = []
  const fullAuthorsInfo = {}
   authors.forEach((author)=>{
    const bookAcc = {}
    if(!fullAuthorsInfo[author.last_name]){
      const authorWithBooks = {
        id: author.id,
        first_name: author.first_name,
        last_name: author.last_name,
        biography: author.biography,
        portrait_url: author.portrait_url,
        books: []
      }
      allAuthorsWithBooks.push(authorWithBooks)
      fullAuthorsInfo[author.last_name] = authorWithBooks
    }
    if(!bookAcc[author.title]){
      bookAcc[author.title] = true
      fullAuthorsInfo[author.last_name].books.push(
        {
          id: author.book_id,
          title: author.title,
          genre: author.genre,
          cover_url: author.cover_url,
          description: author.description
        }
      )
    }
  })
  return allAuthorsWithBooks
}

// render()

router.get('/', function(req,res,next){
  queries.getAllAuthors().then((authors)=>{
    console.log(consolidate(authors))
    // res.json(consolidate(authors))
    res.render("authors",{'authors':consolidate(authors)})
  })
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
