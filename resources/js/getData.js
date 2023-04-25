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
          let randomNum = Math.floor(Math.random() * booksArr.length)
          console.log(booksArr[randomNum])
          let bookDescription = booksArr[randomNum].description;
          let bookTitle = booksArr[randomNum].title;
          let bookauthor = booksArr[randomNum].author;
          console.log(`The book is ${bookTitle} written by ${bookauthor}. It is about ${bookDescription}`)

        }

   } catch(err) {
        console.error(err)
   }
}
