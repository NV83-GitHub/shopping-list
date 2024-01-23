import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
// const dbURL = process.env.DATABASE_URL Momentanément désactivé car incompatible avec liveserver

// Firebase variables
const appSettings = {
    databaseURL : "ICI AJOUTE URL VERS TA DATABASE"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

// DOM Manipulation Variable
const btn = document.getElementById("btn")
const text = document.getElementById("user-input")
const listHtml = document.getElementById("list-section")

// Check la Database for existing entries then display them
populateFromDB()

// Add user input to DB and ask DB for updated Data then display them
btn.addEventListener("click", () => {
    let inputValue = text.value
    //Send new user input to DB
    push(shoppingListInDB, inputValue)
    //Get updated data from DB and display them
    populateFromDB()
    //Clean the user input field
    clearInputValueField()
})


function clearInputValueField() {
    text.value = ""
}
// Wrap onValue function for cleaner code
function populateFromDB() {
    onValue(shoppingListInDB, function(snapshot) {
        if (snapshot.val()){
            let shoppingItemsArray = Object.entries(snapshot.val())
            listHtml.innerHTML = null
            shoppingItemsArray.forEach((shopItem) => updateItemListHTML(shopItem))
        } else {
            listHtml.innerHTML = null
        }

    })
}
function updateItemListHTML(item) {
    let itemID = item[0]
    let itemValue = item[1]

    listHtml.innerHTML += `<li>
        ${itemValue}
        <button id="${itemID}" >X</button>
    </li>`

    // J'ai du ajouter un timeout car le browser allait trop vite pour que le co
    setTimeout(() => {
        document.getElementById(itemID).addEventListener("click", () => remove(ref(database, `shoppingList/${itemID}`)))   
    }, 500);
}

