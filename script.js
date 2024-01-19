import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
// const dbURL = process.env.DATABASE_URL
const appSettings = {
    databaseURL : "ICI AJOUTE URL VERS TA DATABASE"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const btn = document.getElementById("btn")
const text = document.getElementById("user-input")
const listHtml = document.getElementById("list-section")

btn.addEventListener("click", function() {
    let inputValue = text.value

    push(shoppingListInDB, inputValue)
    
    appendItemToListHtml(inputValue)

    clearInputValue()
})

function clearInputValue() {
    text.value = ""
}

function appendItemToListHtml(item) {
    listHtml.innerHTML += `<li>${item}</li>`
}