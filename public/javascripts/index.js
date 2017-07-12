$(() => {
  const baseURL = getHostURL()
  const authorNames = []
  const authorIDs = []
  $('.add-author-btn').click((e) => {
    // e.preventDefault()
    const author = $('.author-select option:selected').first().text()
    const authorID = parseInt($('.author-select option:selected').first().attr('data-id'))
    if (!authorNames.includes(author)) {
      authorNames.push(author)
    }
    if (!authorIDs.includes(authorID)) {
      authorIDs.push(authorID)
    }
    // console.log($('.author-select option:selected')[0]);
    // console.log(authorIDs);
    $('.author-list').first().text(`${authorNames.join('\n')}`)
  })

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

  $('.remove-btn').click((e)=>{
    e.preventDefault()
    console.log(e.target)
  })

  function getHostURL() {
    if (window.location.host.indexOf('localhost') != -1) {
      return 'http://localhost:3000/'
    } else {
      return 'https://wmm-galvanize-reads.herokuapp.com/'
    }
  }
})
