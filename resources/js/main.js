import { getAPI } from "./getData.js";

const generateBooksBtn = document.getElementById("generateBooksBtn");
const bookDisplayList = document.getElementById("book-list")

generateBooksBtn.addEventListener("click", getAPI)

//For Each Book Create a Card and append it to the dom
export const createBookCard = (bookSrc) => {
    const bookCover = document.createElement("img");
    bookCover.src = bookSrc;
    bookCover.classList.add("bookCoverImg")
    bookDisplayList.appendChild(bookCover)
}

//Clear the Display of Generated Books
export const clearBookList = () => {
    bookDisplayList.innerHTML = " "
}