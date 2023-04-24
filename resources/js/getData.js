const createFullDate = () => {

//Gets a year between 2009 and the current year

const getRandomYear = () =>{
    const currentYear = new Date().getFullYear();
    const randomYear = Math.floor(Math.random() * (currentYear - 2009 + 1) + 2009 )
    return randomYear
}

};
