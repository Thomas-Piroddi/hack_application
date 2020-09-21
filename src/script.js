// let p = document.getElementById("fact")


const callEventsApi = async (month, day) => {
    const call = await fetch(`https://byabbe.se/on-this-day/${month}/${day}/events.json`)
    .then((res) => res) // returns our result
    .catch((err) => err) // returns the error
    
    const result = await call.json() // this is gonna fetch API returns 'readableStream', you must run .json() to convert it to JSON. weird thing just to change it back to json
    const eventList = result.events;
    const randomEvent = eventList[Math.floor(Math.random() * eventList.length)];
    // console.log(randomEvent.year)
    // console.log(randomEvent.description)
    // let heading = document.getElementById("fact-heading")
    // heading.textContent

    displayFacts(randomEvent.year, randomEvent.description, "event")
    
}
    
const callDeathApi = async (month, day) => {
    const call = await fetch(`https://byabbe.se/on-this-day/${month}/${day}/deaths.json`)
    .then((res) => res) // return our result
    .catch((err) => err) // returns the error
    const result = await call.json() // this is gonna fetch API returns 'readableStream', you must run .json() to convert it to JSON. same as up^^

    const deathList = result.deaths;
    const randomDeath = deathList[Math.floor(Math.random() * deathList.length)];
    // console.log(randomDeath.year, randomDeath.description)
    // return {
    // year: randomDeath.year,
    // description: randomDeath.description
    // }

    displayFacts(randomDeath.year, randomDeath.description, "death")
}
    
const callBirthApi = async (month,day) => {
    const call = await fetch(`https://byabbe.se/on-this-day/${month}/${day}/births.json`)
    .then((res) => res) // return result
    .catch((err) => err) // return error

    const result = await call.json() // Fetch API returns 'readableStream', you must run .json() to convert it to JSON.
    const eventList = result.births;

    const randomBirth = eventList[Math.floor(Math.random() * eventList.length)];
    // console.log(randomBirth.year)
    // console.log(randomBirth.description)
    displayFacts(randomBirth.year, randomBirth.description, "birth")

}

const callAllApi = (month, day) => { // display one of each type

    let event = callEventsApi(month, day)
    let birth = callBirthApi(month, day)
    let death = callDeathApi(month, day)

}

const displayFacts = (date, fact, type) => { // function that takes in the year and the fact and displays them
    let liHeading = document.createElement("li") // create heading
    let li = document.createElement("li") 

    // not sure which is best practice so leaving them both in here for now :

    // let dateText = document.createTextNode(date) 
    // let factText = document.createTextNode(fact)
    // li.appendChild(dateText)
    // li.appendChild(factText)

    liHeading.textContent = `${type}:` // display heading as type given
    li.textContent = `${date} - ${fact}`

    let ul = document.getElementById("fact-ul")
    ul.appendChild(liHeading)
    ul.appendChild(li) // append the fact and date to the ul
}