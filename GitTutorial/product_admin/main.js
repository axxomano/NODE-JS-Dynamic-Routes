window.addEventListener("DOMContentLoaded",()=>{
    //let storedUserObj = localStorage.getItem('userObj')

    axios.get("https://crudcrud.com/api/b77a0b180947469e8c2efcd3ca02e6a9/productDetails/").then(
        (resp)=>{
            console.log(resp)
            for(let i=0;i<resp.data.length;i++){
                showProductonScreen(resp.data[i].name,resp.data[i].price,resp.data[i]._id)
            }
        }).catch((err)=>{
            console.log(err)
        })
})

//if(storedUserObj){
//    console.log(JSON.parse(storedUserObj))
//}
//var putID = ""

document.getElementsByClassName('btn')[0].addEventListener('click',function(){
    let name = document.getElementById('name').value
    let price = document.getElementById('sell').value


    let userObj = {
        'name':name,
        'price':price,
    }

    //userObj = JSON.stringify(userObj)

    axios.post("https://crudcrud.com/api/b77a0b180947469e8c2efcd3ca02e6a9/productDetails/",userObj).then((response)=>{
        console.log(response)
        showProductonScreen(userObj.name,userObj.price)
    }).catch((err)=>{
        console.log(err)
    })
})

//.addEventListener('click')
let totalPrice = 0

function showProductonScreen(name,price,objID){
    totalPrice+=Number(price)
    let li = document.createElement('li')
    li.id = objID
    li.innerText = 'Name:' + name + 'Price:' + price+''
    let del = document.createElement('button')
    del.innerText = 'Delete Product'
    del.className = 'del'
    li.appendChild(del)
    document.getElementById('products').append(li)
    del.addEventListener('click',function(){
        //console.log('deleted')
        //localStorage.removeItem(objID)
        //sxios delete
        axios.delete("https://crudcrud.com/api/b77a0b180947469e8c2efcd3ca02e6a9/productDetails/"+objID).then((response)=>{
            console.log(response)
        }).catch((err)=>{
            console.log(err)
        })
        totalPrice -= Number(price)
        document.getElementById('total').innerText = totalPrice
        this.parentElement.remove();
    })
    document.getElementById('total').innerText = totalPrice
}