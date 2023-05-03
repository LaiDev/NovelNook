import createFullDate, { getCurrentDate } from "./getDate.js";

import { createBookCard } from "./main.js";
import { clearBookList } from "./main.js";
const key = config.SECRET_API_KEY;
//Creates a class to store Books info
class Book {
  constructor(title, author, description, cover) {
    this.title = title;
    this.author = author;
    this.description = description;
    this.cover = cover;
  }

  getBookInfo() {
    return `The Book is: ${this.title}, written by: ${this.author}. It is about: ${this.description}. This is the cover: ${this.cover}`;
  }
}

//Handles API calls when the page initally loads
export async function onLoadAPI() {
  try {
    clearBookList();
    const cacheKey = getCurrentDate();
    const cache = await caches.open(cacheKey);
    const cachedResponse = await cache.match(cacheKey);
   //Checks if there is a response in the Cache, and if it is, then check if it matches the API url for the current date
   //cachedResponse.url.indexOf(getCurrentDate()) != -1) Checks to see if the stored api call uses the current date
    if(cachedResponse && cachedResponse.url.indexOf(getCurrentDate()) != -1){
      const cachedResponseObj = await cachedResponse.json();
      const cachedBooksArr = cachedResponseObj.results.books;
      //Sorts the array in alphabetical order
      cachedBooksArr.sort((a, b) =>
        a.title > b.title ? 1 : -1
      );
      //Gets books from the array and its information
      for (let bookIndex = 0; bookIndex < 8; bookIndex++) {
         let bookDescription = cachedBooksArr[bookIndex].description;
         let bookTitle = cachedBooksArr[bookIndex].title;
         let bookauthor = cachedBooksArr[bookIndex].author;
         let bookCover = cachedBooksArr[bookIndex].book_image;
         let newBook = new Book(bookTitle, bookauthor, bookDescription, bookCover);
   
         //Creates a card for each book using the stored info
         createBookCard(
           newBook.cover,
           newBook.title,
           newBook.author,
           newBook.description,
           newBook
         );

          //Removes the book from the array if it has been generated. Prevents duplicate books from being displayed
          cachedBooksArr.splice(bookIndex, 1);
      }
    
    } //If there is nothing stored in the cache or if the data doesn't match the current date, then make a new request and store it in the cache
     else {
      const url =
        "https://api.nytimes.com/svc/books/v3/lists/" +
        getCurrentDate() +
        "/hardcover-fiction.json?&api-key=" +
        key;
      const response = await fetch(url);
      const responseObj = await response.clone().json();
      const booksArr = responseObj.results.books;
     
      //Sorts the array in alphabetical order
      booksArr.sort((a, b) =>
        a.title > b.title ? 1 : -1
      );
      //Gets books from the array and its information
      for (let bookIndex = 0; bookIndex < 8; bookIndex++) {  
        let bookDescription = booksArr[bookIndex].description;
        let bookTitle = booksArr[bookIndex].title;
        let bookauthor = booksArr[bookIndex].author;
        let bookCover = booksArr[bookIndex].book_image;
        let newBook = new Book(bookTitle, bookauthor, bookDescription, bookCover);
  
        //Creates a card for each book using the stored info
        createBookCard(
          newBook.cover,
          newBook.title,
          newBook.author,
          newBook.description,
          newBook
        );
  
        //Removes the book from the array if it has been generated. Prevents duplicate books from being displayed
        booksArr.splice(bookIndex, 1);
      }
     
      // Store data in cache
      await cache.put(cacheKey, response.clone());
    }
  } catch (err) {
    console.error(err);
  }
}


export async function getAPI() {
  try {
    clearBookList();
    //Uses the createFullDate Function to call the API using different dates. This returns a variety of results
    const url =
      "https://api.nytimes.com/svc/books/v3/lists/" +
      createFullDate() +
      "/hardcover-fiction.json?api-key=" +
      key;
    const response = await fetch(url);
    //console.log(response)

    const responseObj = await response.json();
    const booksArr = await responseObj.results.books;

    //Gets 8 random books from the array
    for (let i = 0; i < 8; i++) {
      let bookIndex = Math.floor(Math.random() * booksArr.length);

      let bookDescription = booksArr[bookIndex].description;
      let bookTitle = booksArr[bookIndex].title;
      let bookauthor = booksArr[bookIndex].author;
      let bookCover = booksArr[bookIndex].book_image;
      let newBook = new Book(bookTitle, bookauthor, bookDescription, bookCover);

      //Displays the cover of the book in the DOM and passess the class into the book card
      createBookCard(
        newBook.cover,
        newBook.title,
        newBook.author,
        newBook.description,
        newBook
      );

      //Removes the book from the array if it has been generated. Prevents duplicate books from being displayed
      booksArr.splice(bookIndex, 1);
    }
  } catch (err) {
    console.error(err);
  }
}
