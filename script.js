const btn = document.getElementById("btn")
const text = document.getElementById("user-input")
const listHtml = document.getElementById("list-section")
const listArray = []

btn.addEventListener("click", () => addStuff(text.value))

function addStuff(stuff) {
    listArray.push(stuff)
    
    listHtml.innerHTML = ""

    listArray.forEach((item) => {
        let span = document.createElement("span")
        span.innerText = item
        listHtml.appendChild(span)
    })
    text.value = ""
}