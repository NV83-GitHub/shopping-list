import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
// const dbURL = process.env.DATABASE_URL
const appSettings = {
    databaseURL : "ICI AJOUTE TON LINK FIREBASE"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const btn = document.getElementById("btn")
const text = document.getElementById("user-input")
const listHtml = document.getElementById("list-section")
// const listArray = [] For local testing use

btn.addEventListener("click", function() {
    let inputValue = text.value

    push(shoppingListInDB, inputValue)
    
    listHtml.innerHTML += `<li>${inputValue}</li>`
    text.value = ""
})

// btn.addEventListener("click", () => pushToDB(value))

// function pushToDB(data) {
//     let input = text.value
//     push(shoppingListInDB, data)
//     listHtml.appendChild(li)


//     input = ""
// }












//THIS CODE IS FOR LOCAL USE NOT THE FIREBASE DB (old testing code)
//btn.addEventListener("click", () => addStuff(text.value))

// function addStuff(stuff) {
//     listArray.push(stuff)
    
//     listHtml.innerHTML = ""

//     listArray.forEach((item) => {
//         let li = document.createElement("li")
//         li.innerText = item
//         listHtml.appendChild(li)
//     })
//     text.value = ""
// }
