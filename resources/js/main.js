import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
// Create a single supabase client for interacting with your database
const supabaseUrl = config.SUPA_URL;
const supabaseKey = config.SUPA_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import { getAPI, onLoadAPI } from "./getData.js";
import { addBookToLibrary, renderUI } from './userAuth.js';
//Automatically loads books when the explore page first loads
window.addEventListener('load', onLoadAPI);

const generateBooksBtn = document.getElementById("generateBooksBtn");
const bookDisplayList = document.getElementById("book-list")
let canClick = true;


//When clicking the button canClick will change to false to prevent spamming the button. Then it will call the API. After, a certain period of time, canClick will change back to true;
generateBooksBtn.addEventListener("click", () => {
    if(canClick)
    {
        getAPI();
    }
    canClick = false;
    if(!canClick){
        
        generateBooksBtn.classList.add("BtnDisabled")
        generateBooksBtn.disabled = true;
    }
    setTimeout(() => {
        canClick = true;
       generateBooksBtn.classList.remove("BtnDisabled")
        generateBooksBtn.disabled = false;
      }, 12000);
})

//Adds the click book object to the local storage
const addToLibrary = (bookObj) => {   
    let key = bookObj.title;
    let value = bookObj;
    value = JSON.stringify(value)
    localStorage.setItem(key, value) 
}
  
//For Each Book Create a Card and append it to the dom
export const createBookCard = (cover, title, author , description, bookObj) => {

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
    addBookBtn.classList.add("bookCardBtn")
    bookCardRight.appendChild(addBookBtn)

    //Listen for clicks on the add to library function
    addBookBtn.addEventListener("click", function(){
        addBookToLibrary(title, author, description, cover, bookObj)
        console.log(bookObj)
        //addToLibrary(bookObj)
        addBookBtn.classList.add("BtnDisabled")
    })
}

//Clear the Display of Generated Books
export const clearBookList = () => {
    bookDisplayList.innerHTML = " "
}

renderUI(supabase.auth.user);
