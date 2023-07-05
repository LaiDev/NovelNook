import { getBooksFromLibrary, removeFromLibrary } from "./userAuth.js"


const bookDisplayList = document.getElementById("library-list")



const createBookInLibrary = (cover, title, author , description, bookObj) => {
   
    const bookCard = document.createElement("div")
    bookCard.classList.add("bookCard")
    bookDisplayList.appendChild(bookCard)

    const bookCover = document.createElement("img");
    bookCover.src = cover;
    bookCover.classList.add("bookCoverImg")
    bookCard.appendChild(bookCover)

    const bookCardRight = document.createElement("div")
    bookCardRight.classList.add("bookCardRight");
    bookCard.appendChild(bookCardRight)

   
    const bookTitle = document.createElement("h2")
    bookTitle.innerHTML = title;
    bookTitle.classList.add("bookTitle")
    bookCardRight.appendChild(bookTitle);

    const bookAuthor = document.createElement("h3")
    bookAuthor.innerHTML = author;
    bookAuthor.classList.add("bookAuthor")
    bookCardRight.appendChild(bookAuthor); 

    const bookDescription = document.createElement("p")
    bookDescription.innerHTML = description;
    bookDescription.classList.add("bookDescription")
    bookCardRight.appendChild(bookDescription); 

    const addBookBtn = document.createElement("button");
    addBookBtn.innerHTML = "Remove From Library"
    addBookBtn.classList.add("bookCardBtn")
    bookCardRight.appendChild(addBookBtn)
 

 
    addBookBtn.addEventListener("click", function(){
        removeFromLibrary(JSON.stringify(bookObj))
        // Remove the book card from the DOM after removing from storage
        bookDisplayList.removeChild(bookCard)
    })

    
}



const loadStorage = async () => {

    let myBooks = await getBooksFromLibrary();
    //console.log(myBooks)
    for(let i = 0; i < myBooks.length; i++)
    {
        let newBook = JSON.stringify(myBooks[i])
        let book = JSON.parse(newBook)
       // console.log(book)
        createBookInLibrary(book.cover,book.title,book.author,book.description, book.bookObj)
    }

    
//For each book in the local storage, createBookInLibrary is called in order to create the book in the DOM
/* Object.keys(localStorage).forEach((key) => {
    let bookItem = JSON.parse(localStorage.getItem(key))
    let title = bookItem.title
    let author = bookItem.author
    let description = bookItem.description
    let cover = bookItem.cover
   
    createBookInLibrary(cover,title,author,description,bookItem)
}) */
}



loadStorage()