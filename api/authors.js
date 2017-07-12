var express = require('express');
var router = express.Router();

// render()


router.post('/', function(req,res,next){
  queries.newBook(req.body).then((book)=>{
    if(book){res.json(book)}
    else{next(new Error('invalid book format'))}
  })
})

module.exports = router;
