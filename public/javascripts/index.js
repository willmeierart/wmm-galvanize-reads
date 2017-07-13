var authorIDs = []
$(() => {
  const baseURL = getHostURL()
  const currentURL = window.location.href
  const authorIDs = []
  const authorNames = []
  const bookIDs = []
  const bookNames = []



  const isValidURL=(url)=>{
    const valid = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)
    return url.match(valid)
  }
  const isValidBook=(book)=>{
    const title =()=>{return typeof book.title == 'string'}
    const genre =()=>{return typeof book.genre == 'string'}
    const description =()=>{return typeof book.description == 'string'}
    const url =()=>{return isValidURL(book.cover_url) }
    return title && genre && description && url
  }
  const isValidName=(name)=>{
   return typeof name == 'string' && name.split(' ').length == 2
  }
  const isValidAuthor=(author)=>{
    const name =()=>{return isValidName(author.name)}
    const url =()=>{return isValidURL(author.portrait_url)}
    const biography =()=>{return typeof author.biography == 'string'}
    return name && url && biography
  }


  $('.book-cover').click(function(){
    const id = $(this).attr('data-id')
    window.location.href = `${baseURL}books/${id}`
  })

  $('.add-author-btn').click((e) => {
    const author = $('.author-select option:selected').first().text()
    const authorID = parseInt($('.author-select option:selected').first().attr('data-id'))
    if (!authorNames.includes(author)) {
      authorNames.push(author)
    }
    if (!authorIDs.includes(authorID)) {
      authorIDs.push(authorID)
    }
    $('.author-list').first().text(`${authorNames.join('\n')}`)
  })

  $('.add-book-btn').click((e) => {
    const book = $('.book-select option:selected').first().text()
    const bookID = parseInt($('.book-select option:selected').first().attr('data-id'))
    if (!bookNames.includes(book)) {
      bookNames.push(book)
    }
    if (!bookIDs.includes(bookID)) {
      bookIDs.push(bookID)
    }
    $('.book-list').first().text(`${bookNames.join('\n')}`)
  })

  $('.newbook-form').submit((e) => {
    e.preventDefault()
    console.log($('#input-title').first().val());
    const bookObj = {
      title: $('#input-title').first().val(),
      genre: $('#input-genre').first().val(),
      cover_url: $('#input-cover').first().val(),
      description: $('#input-description').first().val(),
      authors: authorIDs
    }
    if (isValidBook(bookObj)){
      $.post(`${baseURL}books`, bookObj).then((res) => {
        console.log(res)
        return res.id
      })
    }
  })




  $('.newauthor-form').submit((e)=>{
    e.preventDefault()
    const name = $('#input-author-name').first().val().split(' ')
    const authorObj = {
      first_name: name[0],
      last_name: name[1],
      portrait_url: $('#input-portrait').first().val(),
      biography: $('#input-biography').first().val(),
      books: bookIDs
    }
    if (isValidAuthor(authorObj)){
      $.post(`${baseURL}authors`, authorObj).then((res) => {
        console.log(res)
        return res.id
      })
    }
  })

  $('.editbook-form').submit((e)=>{
    e.preventDefault()
    console.log($('#input-title').first().val());
    const bookObj = {
      id: $('#input-title').first().attr('data-id'),
      title: $('#input-title').first().val(),
      genre: $('#input-genre').first().val(),
      cover_url: $('#input-cover').first().val(),
      description: $('#input-description').first().val(),
      authors: authorIDs
    }
    console.log(bookObj.title)
    if (isValidBook(bookObj)){
      $.ajax({
        url:`${baseURL}books/${bookObj.id}`,
        type: 'PUT',
        data: bookObj
      }).then((res) => {
        console.log(res)
        return res.id
      })
    }
  })

  $('.remove-btn').click(function(){
    const bookpath = $(this).attr('data-id')
    window.location.href=`${baseURL}books/${bookpath}/delete`
  })
  $('.edit-btn').click(function(){
    const bookpath = $(this).attr('data-id')
    window.location.href=`${baseURL}books/${bookpath}/edit`
  })
  // $('.')

  $('.delete-book-btn').click(function(){
    const id = getIdFromURL(currentURL)
    console.log(id);
    return $.ajax({
      url:`${baseURL}books/${id}`,
      type: 'DELETE',
      success: function(){
        console.log('success');
        window.location.href = `${baseURL}books`
      }
    })
  })

  function getHostURL() {
    if (window.location.host.indexOf('localhost') != -1) {
      return 'http://localhost:3000/'
    } else {
      return 'https://wmm-galvanize-reads.herokuapp.com/'
    }
  }
  function getIdFromURL(current){
    let newURLarr = current.split('/').reverse()
    let id = 0
    console.log(newURLarr);
    for(let i of newURLarr){
      if (typeof parseInt(i) == 'number' && !isNaN(i) && i!=null){
        id = i
        return id
      }
      console.log(id);
    }
  }
})
