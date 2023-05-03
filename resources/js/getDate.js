export default function createFullDate() {

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
    let newMonth =  getRandomMonth(newYear)

//Gets a random number between either 1 - 31 or 1 - 28 or 1 - 31. 

const getRandomDay = randomMonth => {
    if(randomMonth === 1, 3, 5, 7, 8, 10, 12)
{
    let randomDay = Math.floor(Math.random() * (31 - 1 + 1) + 1) ; 
    return randomDay;
} else if(randomMonth === 4, 6, 9, 11)
{
    let randomDay = Math.floor(Math.random() * (30 - 1 + 1) + 1) ;  
    return randomDay;
} else if(randomMonth === 2)
{
    let randomDay = Math.floor(Math.random() * (28 - 1 + 1) + 1) ; 
    return randomDay;
}
}

let newDay = getRandomDay(getRandomMonth);

//Checks to see if the month and day are less than 10. If so, add a  0 before it in order to keep the proper date format

if(newMonth < 10)
{
    newMonth = "0" + newMonth;
    
    if(newDay < 10)
    {
        newDay = "0" + newDay;
    }
}

let fullDate = `${newYear}-${newMonth}-${newDay}`.toString();

return fullDate
};

//Gets the current Date
export const getCurrentDate = () =>{

    let currentYear =    new Date().getFullYear()
    let currentMonth = new Date().getMonth() + 1
    let currentDay = new Date().getDay();

    if(currentMonth < 10){
    currentMonth = "0" + currentMonth;
    } 

    if(currentDay < 10){
        currentDay = "0" + currentDay;
    } 
   
    
    let currentDate = `${currentYear}-${currentMonth}-${currentDay}`
    return currentDate

}


