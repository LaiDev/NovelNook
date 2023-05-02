

const bookDisplayList = document.getElementById("library-list")

const removeFromLibrary = (bookObj) => {    
   localStorage.removeItem(bookObj.title)
}

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
    addBookBtn.classList.add("addBookBtn")
    bookCardRight.appendChild(addBookBtn)

     // Check if bookObj exists in local storage
     if (!localStorage.getItem(bookObj.title)) {
        // If not found, remove the book card from the DOM 
        bookDisplayList.removeChild(bookCard)
    }


    addBookBtn.addEventListener("click", function(){
        removeFromLibrary(bookObj)
        // Remove the book card from the DOM after removing from local storage
        bookDisplayList.removeChild(bookCard)
    })

    
}

//For each book in the local storage, createBookInLibrary is called in order to create the book in the DOM
Object.keys(localStorage).forEach((key) => {
    console.log(localStorage.getItem(key))
    let bookItem = JSON.parse(localStorage.getItem(key))
    let title = bookItem.title
    let author = bookItem.author
    let description = bookItem.description
    let cover = bookItem.cover
   

    createBookInLibrary(cover,title,author,description,bookItem)

})
