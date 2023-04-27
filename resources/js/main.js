import { getAPI } from "./getData.js";

const generateBooksBtn = document.getElementById("generateBooksBtn");
const bookDisplayList = document.getElementById("book-list")

generateBooksBtn.addEventListener("click", getAPI)

//For Each Book Create a Card and append it to the dom
export const createBookCard = (cover, title, author , description) => {

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
    addBookBtn.innerHTML = "Add to Library"
    addBookBtn.classList.add("addBookBtn")
    bookCardRight.appendChild(addBookBtn)
}

//Clear the Display of Generated Books
export const clearBookList = () => {
    bookDisplayList.innerHTML = " "
}