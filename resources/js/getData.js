const createFullDate = () => {

//Gets a year between 2009 and the current year

const getRandomYear = () =>{
    const currentYear = new Date().getFullYear();
    const randomYear = Math.floor(Math.random() * (currentYear - 2009 + 1) + 2009 )
    return randomYear
}

const newYear = getRandomYear();

/*Gets a random number between 1 - 12, which corresponds to the months.
If the randomYear is 2023, then it will get a number between 1 and the current month.
Ex. 1 (January) - 4 (April)*/

const getRandomMonth = randomYear =>
{
    //Checks if the randomYear is the same as the current year
    if(randomYear === new Date().getFullYear())
    {
    //If so, make sure the month doesn't go beyond the current month of the year and the day(YET TO ADD)
    const currentMonth = new Date().getMonth() + 1;
    const randomMonth = Math.floor(Math.random() * (currentMonth - 1) + 1 )
    return randomMonth 

    } else
    {
        const randomMonth = Math.floor(Math.random() * (12 - 1 + 1) + 1) ; 
        return randomMonth 
    }
}

};
