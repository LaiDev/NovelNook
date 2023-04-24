import createFullDate from "./getDate.js"



export async function getAPI() {
   try {
        const url = `https://api.nytimes.com/svc/books/v3/lists/${createFullDate()}/hardcover-fiction.json?api-key=0rqNBm0BPfy1GAapCh5ICHcOebDlV76o`

        const response = await fetch(url);

        console.log(response)
   } catch(err) {
        console.error(err)
   }
}
