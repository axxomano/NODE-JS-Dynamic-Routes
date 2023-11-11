//console.log('I Love GIT!');

document.getElementById('main-header').style.border = "4px solid black"

document.querySelector("#main > h2:nth-child(1)").style.color = 'green'

document.querySelector("#main > h2:nth-child(1)").style.fontWeight = 'bold'

document.querySelector("#items > li:nth-child(3)").style.backgroundColor = "green"

let elems = document.getElementsByClassName('list-group-item')

for(let i=0;i<elems.length;i++){
    elems[i].style.fontWeight = "bold"
}

let liEle = document.createElement('li')
liEle.setAttribute('class','list-group-item')
liEle.innerText = "Item 5"

document.querySelector("#items").appendChild(liEle)

let elemsbyTag = document.getElementsByTagName('li')

for(let i=0;i<elemsbyTag.length;i++){
    elemsbyTag[i].style.fontWeight = "bold"
}

document.querySelector("#items > li:nth-child(2)").style.color= "green"

var odd = document.querySelectorAll('li:nth-child(odd)')

for(let i=0;i<odd.length;i++){
    odd[i].style.backgroundColor = "green"
}

let itemList = document.querySelector("#items")
itemList.parentElement.style.backgroundColor = "#f2f2f2"
itemList.parentElement.style.backgroundColor = "#f2f2f2"

console.log(itemList.firstChild)//give the first text node// useless
console.log(itemList.firstElementChild)//give the first element
console.log(itemList.lastChild)//give the last text node
console.log(itemList.lastElementChild)//give the last element

console.log(itemList.nextSibling)//give the next sibling text node
console.log(itemList.nextElementSibling)//give the next sibling to the element
console.log(itemList.previousSibling)//give the prev sibling text node
console.log(itemList.previousElementSibling)//give the prev sibling to the element

//Create Element

//Create a div 

let newDiv = document.createElement('div')
newDiv.className = "Hello"
newDiv.id = "hello1"
newDiv.setAttribute("title", "Hello Div")

//create a text node
let newDivText = document.createTextNode('Hello World!')

//Add text to Div
newDiv.appendChild(newDivText)

console.log(newDiv)

var container = document.querySelector('header .container')
var h1 = document.querySelector('header h1')

container.insertBefore(newDiv,h1)




