document.addEventListener("DOMContentLoaded", function() {
  fetchBooks()
});

console.log("hi line 5")

// variables
const list = document.querySelector("#list")
const showPanel = document.querySelector("#show-panel")

// console.log(showPanel)

//event listener
list.addEventListener("click", clickHandler)

// Fetch
function fetchBooks(){
  fetch("http://localhost:3000/books")
  .then(resp => resp.json())
  .then(booksOnTheDom)
  // .then(console.log)
}

function fetchOneBook(bookId){
  // console.log("hi from fetchOneBook")
  fetch(`http://localhost:3000/books/${bookId}`)
  .then(resp => resp.json())
  .then(showOneBook)
}

// slap on the DOM
function booksOnTheDom(books){
  books.forEach(book => {
    // console.log(book)
    list.innerHTML += `<li class="bookTitle" id="${book.id}"> ${book.title}</li>`
    // <li data-bookid=${book.id} >
  })
}

// users: Array(3)
// 0: {id: 10, username: "macejkovic"}
// 1: {id: 4, username: "batz"}
// 2: {id: 6, username: "steuber"}

function showOneBook(book){
  const users = book.users
  showPanel.innerHTML = `<img src="${book.img_url}"> <p>${book.description}</p>`
  users.forEach(user => {
    console.log(user)
    showPanel.innerHTML += `${user.username}<br>`
  })
  showPanel.innerHTML += `<button class="like-books" id="${book.id}">"Like This Book"</button>`
  //like button must be inside function
  const likeButton = document.querySelector(".like-books")
  // console.log(likeButton)
  const myUser = {
    'id':1,
    'username':'pouros'
  }
  let newUserArray = [...book.users, myUser]
  console.log(newUserArray)
  likeButton.addEventListener("click", () => addLiker(event, newUserArray))
}

// click on one book
function clickHandler(event){
  if (event.target.className === "bookTitle"){
    const bookId = event.target.id
    // console.log(bookId)
    fetchOneBook(bookId)
  }
}

// add liker of book
function addLiker(event, newUserArray){
  console.log(event.target.id)
  bookId = event.target.id
  fetch(`http://localhost:3000/books/${bookId}`, {
    method: "PATCH",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      users: newUserArray
    })
  })
    .then(resp => resp.json())
    .then(showOneBook)
}
