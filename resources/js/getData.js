import createFullDate from "./getDate.js"



export async function getAPI() {
   try {
        const url = `https://api.nytimes.com/svc/books/v3/lists/${createFullDate()}/hardcover-fiction.json?api-key=0rqNBm0BPfy1GAapCh5ICHcOebDlV76o`

        const response = await fetch(url);
        //console.log(response)
        
        const responseObj = await response.json()
        const booksArr = await responseObj.results.books

        //Gets 5 random books from the array
        for(let i = 0; i < 5; i++)
        {
          let bookIndex = Math.floor(Math.random() * booksArr.length)
          let book = booksArr[bookIndex];
          console.log(book)
          let bookDescription = booksArr[bookIndex].description;
          let bookTitle = booksArr[bookIndex].title;
          let bookauthor = booksArr[bookIndex].author;
          console.log(`The book is ${bookTitle} written by ${bookauthor}. It is about ${bookDescription}`)


        }

   } catch(err) {
        console.error(err)
   }
}
