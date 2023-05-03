const activePage = window.location.href;
console.log(activePage)
//Loops through all the nav links
const navLinks = document.querySelectorAll("nav a").forEach(link => {
    if(link.href.includes(`${activePage}`)){
        console.log(link)
        //If the current link matches the current page, add the active class
        link.classList.add("active")
    }
})