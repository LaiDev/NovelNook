const navLinks = document.querySelectorAll("nav a");

//Loops through all the nav links, and if its href is equal to the current page path, give the link a active class
for (let i = 0; i < navLinks.length; i++) {
  const href = navLinks[i].getAttribute("href");

  if (href.endsWith(location.pathname)) {
    navLinks[i].classList.add("active");
  }
  //If the url ends with /, then search for the link that includes index.html, and give that one the active class 
  else if(location.pathname === "/")
    {
       let link = navLinks[i].getAttribute("href")
       if(link.match("index.html")){
        navLinks[i].classList.add("active")
       }
    
  }
}

let navHamburger = document.getElementById("nav-hamburger")
let navLinksMobile = document.querySelector(".nav-links")
navHamburger.addEventListener("click", () => {

  navLinksMobile.classList.toggle("nav-links-active")
})

