import createFullDate from "./getDate.js"
import { createBookCard } from "./main.js";
import { clearBookList } from "./main.js";
const key = config.SECRET_API_KEY;
//Creates a class to store Books info
class Book{
     constructor(title, author, description, cover)
     {
          this.title = title;
          this.author = author;
          this.description = description;
          this.cover = cover;
     }

     getBookInfo(){
          return `The Book is: ${this.title}, written by: ${this.author}. It is about: ${this.description}. This is the cover: ${this.cover}`
     }




}




export async function getAPI() {
   try {
     clearBookList()
        const url = 'https://api.nytimes.com/svc/books/v3/lists/'+createFullDate()+'/hardcover-fiction.json?api-key='+key;;
        const response = await fetch(url);
        //console.log(response)
        
        const responseObj = await response.json()
        const booksArr = await responseObj.results.books

        //Gets 8 random books from the array
        for(let i = 0; i < 8; i++)
        {
          let bookIndex = Math.floor(Math.random() * booksArr.length)
          
          let bookDescription = booksArr[bookIndex].description;
          let bookTitle = booksArr[bookIndex].title;
          let bookauthor = booksArr[bookIndex].author;
          let bookCover = booksArr[bookIndex].book_image;
          let newBook = new Book(bookTitle,bookauthor,bookDescription,bookCover)
          
        
          //Displays the cover of the book in the DOM and passess the class into the book card
          createBookCard(newBook.cover, newBook.title, newBook.author, newBook.description, newBook)
          
          //Removes the book from the array if it has been generated. Prevents duplicate books from being displayed
          booksArr.splice(bookIndex, 1)
          }


   } catch(err) {
        console.error(err)
   }
}
