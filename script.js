let btn = document.getElementById("btn")
let text = document.getElementById("user-input")
let listHtml = document.getElementById("list-section")
let listArray = []

btn.addEventListener("click", () => addStuff(text.value))

function addStuff(stuff) {
    listArray.push(stuff)
    
    console.log("list has been updated yeah")
    console.log(listArray)
    listHtml.innerHTML = ""

    listArray.forEach((item) => {
        let span = document.createElement("span")
        span.innerText = item
        listHtml.appendChild(span)
    })
    text.value = ""
}