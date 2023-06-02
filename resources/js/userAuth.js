import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
// Create a single supabase client for interacting with your database
const supabaseUrl = config.SUPA_URL;
const supabaseKey = config.SUPA_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

const createAccount = (event) => {
    event.preventDefault()
    console.log("Hi")
     const email = document.getElementById("create-account-email").value;
     const password = document.getElementById("create-account-password").value;

const { data, error } = supabase.auth.signUp({
    email: email,
    password: password,
  }).then((data) => {
    console.log("Sign up successful:", email);
  }).catch((error) => {
    console.error("Sign up error:", error);
  });

  console.log("Email is " + email); 
  
}

let createAccountForm = document.getElementById("create-account-form");
if(createAccountForm != null)
{
  createAccountForm.addEventListener("submit", createAccount);
}

let currentUser = document.getElementById("currentUser");


function getStringBeforeCharacter(str, character) {
  const index = str.indexOf(character);
  if (index !== -1) {
    return str.substring(0, index);
  }
  return str;
}

export function renderUI(user) {
  const appContainer = document.getElementById('user-library-greeting');
  const signInNavLink = document.getElementById("sign-in-nav");
  const signOutNavLink = document.getElementById("sign-out-nav")
  
  if (user) {
    // User is logged in
    signInNavLink.style.display = "none"
    signOutNavLink.style.display = "flex"

    if(appContainer != null)
    {
      appContainer.style.display = "flex";
      const fullUserEmail = user.email;
      const character = "@";
      const userName = getStringBeforeCharacter(fullUserEmail, character)
      appContainer.innerHTML = `<h1>${userName}'s Library</h1>`
    }
    // Add additional UI elements or logic as needed
  } else {
    // User is logged out

    signInNavLink.style.display = "flex"
    signOutNavLink.style.display = "none"

    if(appContainer != null)
    {
      appContainer.innerHTML = `<h1>Sign in to access your library</h1>`
    }
    // Add additional UI elements or logic as needed
  }
}

// Listen for changes in authentication state
supabase.auth.onAuthStateChange((event, session) => {
  renderUI(session?.user);
});



const signInUser = async () => {
    const email = document.getElementById("sign-in-email").value;
       const password = document.getElementById("sign-in-password").value;
  
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
  
      if (error) {
        console.error("Sign in error:", error);
      } else {
       // currentUser.innerHTML = "Works";
       console.log("Successful, " + JSON.stringify(data.user))
       window.location.href = "./explore.html"
        // Initial render of UI
      renderUI(supabase.auth.user());

      }
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };
  
  let signInForm = document.getElementById("sign-in-form");
  if(signInForm != null)
  {

    signInForm.addEventListener("submit", async(event) => {
      event.preventDefault();
      await signInUser();
     
    })
  }
  
  const signOutUser = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Sign out error:", error);
      } else {
        console.log("Sign out successful");  
      }
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  let signOutBtn = document.getElementById("sign-out-nav")
  if(signOutBtn != null)
  {
  signOutBtn.addEventListener("click", () => {
    signOutUser();
    let libraryContent = document.getElementById("library-list")
    if(libraryContent != null)
    {
      libraryContent.innerHTML = " ";
      //window.location.href = './signin.html'
    }
  })
}

  let addBtn = document.getElementById("addBook");
  // Assuming this code is inside an asynchronous function
export const addBookToLibrary = async (title, author, description, cover, bookObj) => {
  const user = await supabase.auth.getSession();
  console.log(user.data.session.user)
  const bookData = {
    user_id: user.data.session.user.id , // Associate book with the user
    title: title,
    author: author,
    description: description,
    cover: cover,
    bookObj: bookObj
    // Other book details...
  };

  const { data, error } = await supabase.from('userLibrary').insert(bookData);
  if (error) {
    console.error('Error inserting book:', error);
  } else {
    console.log('Book inserted successfully:', data);
  }
};

export const getBooksFromLibrary = async () => {
  const user = await supabase.auth.getSession();
  console.log(user.data.session.user.id)
  let { data: userLibrary, error } = await supabase
  .from('userLibrary')
  .select("*")
  .eq('user_id', user.data.session.user.id);

if (error) {
  console.error('Error retrieving books from library:', error);
} else {
  console.log('Books retrieved successfully:', userLibrary);
  return userLibrary;
  // Process the retrieved books data here...
}
}
