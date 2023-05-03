const activePage = window.location.pathname;
//Loops through all the nav links
const navLinks = document.querySelectorAll("nav a").forEach(link => {
    if(link.href.includes(`${activePage}`)){
        //If the current link matches the current page, add the active class
        link.classList.add("active")
    } else
    {
        link.classList.remove("active")
    }
})