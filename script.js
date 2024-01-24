import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
// const dbURL = process.env.DATABASE_URL Momentanément désactivé car incompatible avec liveserver

// Firebase variables
const appSettings = {
    databaseURL : "ICI TON ADRESSE DATABASE"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

// DOM Manipulation Variable
const addBtn = document.getElementById("add-btn")
const inputFieldElement = document.getElementById("user-input")
const listElement = document.getElementById("list-section")

// Initial check de la Database for existing entries then display them
populateFromDB()

// Add user input to DB and ask DB for updated Data then display them
addBtn.addEventListener("click", () => processInput())
inputFieldElement.addEventListener("keypress", e => {
    if (e.key === "Enter") {
        processInput()
    }
})

// Takes the userInput, push it to Firebase, Populate the html and cleanup
function processInput() {
    let inputValue = inputFieldElement.value
    //Send new user input to DB
    push(shoppingListInDB, inputValue)
    //Get updated data from DB and display them
    populateFromDB()
    //Clean the user input field
    clearInputValueField()
    inputFieldElement.focus()
}

function clearInputValueField() {
 inputFieldElement.value = ""
}

// Wrap onValue function for cleaner code
function populateFromDB() {
    onValue(shoppingListInDB, function(snapshot) {
        if (snapshot.val()){
            let shoppingItemsArray = Object.entries(snapshot.val())
            listElement.innerHTML = null
            shoppingItemsArray.forEach((shopItem) => updateItemListElement(shopItem))
        } else {
            listElement.innerHTML = null
        }
    })
}

// Fonction qui crée le HTML et le bouton pour enelever des items de la liste
function updateItemListElement(item) {
    let itemID = item[0]
    let itemValue = item[1]

    listElement.innerHTML += `<li>
        ${itemValue}
        <button class="del-btn" id="${itemID}" >x</button>
    </li>`

    // Remove items from list in database
    // Timeout pour laisser le temps au browser de créer l'element avant d'attacher le eventlistener
    setTimeout(() => {
        document.getElementById(itemID).addEventListener("click", () => remove(ref(database, `shoppingList/${itemID}`)))   
    }, 500);
}

