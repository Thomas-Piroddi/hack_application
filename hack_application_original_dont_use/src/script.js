const callEventsApi = async (month, day) => {
    const call = await fetch(`https://byabbe.se/on-this-day/${month}/${day}/events.json`)
    .then((res) => res) // returns our result
    .catch((err) => err) // returns the error
    
    const result = await call.json() // this is gonna fetch API returns 'readableStream', you must run .json() to convert it to JSON. weird thing just to change it back to json
    const eventList = result.events;
    const randomEvent = eventList[Math.floor(Math.random() * eventList.length)];



    displayFacts(day, month, randomEvent.year, randomEvent.description, "event")
    
}
    
const callDeathApi = async (month, day) => {
    const call = await fetch(`https://byabbe.se/on-this-day/${month}/${day}/deaths.json`)
    .then((res) => res) // return our result
    .catch((err) => err) // returns the error
    const result = await call.json() // this is gonna fetch API returns 'readableStream', you must run .json() to convert it to JSON. same as up^^

    const deathList = result.deaths;
    const randomDeath = deathList[Math.floor(Math.random() * deathList.length)];


    displayFacts(day, month, randomDeath.year, randomDeath.description, "death")
}
    
const callBirthApi = async (month,day) => {
    const call = await fetch(`https://byabbe.se/on-this-day/${month}/${day}/births.json`)
    .then((res) => res) // return result
    .catch((err) => err) // return error

    const result = await call.json() // Fetch API returns 'readableStream', you must run .json() to convert it to JSON.
    const eventList = result.births;

    const randomBirth = eventList[Math.floor(Math.random() * eventList.length)];

    displayFacts(day, month, randomBirth.year, randomBirth.description, "birth")

}

const callAllApi = (month, day) => { // display one of each type

    let event = callEventsApi(month, day)
    let birth = callBirthApi(month, day)
    let death = callDeathApi(month, day)

}

const displayFacts = (day, month, year, fact, type) => { // function that takes in the year and the fact and displays them
    let liHeading = document.createElement("li") // create heading
    let li = document.createElement("li") 

    // not sure which is best practice so leaving them both in here for now :

    // let dateText = document.createTextNode(``) 
    let factText = document.createTextNode(`${day}/${month}/${year} - ${fact}`)
    // li.appendChild(dateText)
    

    liHeading.textContent = `${type}:` // display heading as type given
    liHeading.classList = "fact-heading"
    li.prepend(factText)
    // li.textContent = `${day}/${month}/${year} - ${fact}`
    li.classList = "fact-text"

    let ul = document.getElementById("fact-ul")
    ul.appendChild(liHeading)
    ul.appendChild(li) // append the fact and date to the ul
    if (type == "birth"){
        li.style.backgroundColor = "#94ff94"
    } else if (type == "death"){
        li.style.backgroundColor = "#666666"
        li.style.color = "white"
    } else if (type == "event"){
        li.style.backgroundColor = "#a3dcff"
    }
    
}

const randomFact = () => {
    // get random number between one and 3 for events, births and deaths
    // get random date - (random 1-12 for months), (random 1-30) 
    // consider different month lengths 
    // 30 days - sep, april, june, nov / 4, 6, 9, 11
    // 31 days - jan, march, may, july, august, oct, dec
    // keep it max 28 for feb

    let randomMonth = Math.floor(Math.random() * 12) + 1
    let randomDay = 0
    if (randomMonth == 2){
        randomDay = Math.floor(Math.random() * 29) + 1 
    } else if (randomMonth == 4 || randomMonth == 6 || randomMonth == 9 || randomMonth == 11){
        randomDay = Math.floor(Math.random() * 30) + 1
    } else {
        randomDay = Math.floor(Math.random() * 31) + 1
    }

    let functionArray = [callEventsApi, callBirthApi, callDeathApi]
    let randomNumber = Math.floor(Math.random() * 4)
    
    return (functionArray[randomNumber])(randomMonth, randomDay)
    
}