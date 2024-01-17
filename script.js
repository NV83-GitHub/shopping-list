let btn = document.getElementById("btn")
let text = document.getElementById("user-input")
let listArray = []

btn.addEventListener("click", () => addStuff(text.value))

function addStuff(stuff) {
    listArray.push(stuff)
    
    console.log("list has been updated yeah")
    console.log(listArray)
}