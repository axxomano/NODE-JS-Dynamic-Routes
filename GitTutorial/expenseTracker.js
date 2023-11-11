// let storedUserObj = localStorage.getItem('userObj')

// if(storedUserObj){
//     console.log(JSON.parse(storedUserObj))
// }

window.addEventListener("DOMContentLoaded",()=>{
    //let storedUserObj = localStorage.getItem('userObj')

    axios.get("http://localhost:3000/expense/get-expenses").then(
        (resp)=>{
            console.log('all users',resp)
            for(let i=0;i<resp.data.length;i++){
                showItemOnScreen(resp.data[i].expamount,resp.data[i].expdesc,resp.data[i].exptype,resp.data[i].id)
            }
        }).catch((err)=>{
            console.log(err)
        })
})

var i = 0, mode = 'add'

document.getElementsByClassName('btn')[0].addEventListener('click',function(){ // submit
    let expenseAmount = document.getElementById('expenseAmount').value
    let expDescription = document.getElementById('expDescription').value
    let expenseType = document.getElementById('expenseType').value

    let userObj = {
        'expamount':expenseAmount,
        'expdesc':expDescription,
        'exptype':expenseType
    }


   // userObj = JSON.stringify(userObj)

   //if(!localStorage.getItem('userObj'))

   if(mode == 'edit'){
    console.log('edit mode')
    let id = document.getElementById('id').value;
    //userObj = JSON.stringify(userObj)
    axios.put("http://localhost:3000/expense/edit-expense/"+id,userObj).then((response)=>{
        document.getElementById(id).classList.remove("bg-warning") //id is variable
        document.getElementById(id).querySelector("span:nth-child(1)").textContent = "Expense Amount: "+expenseAmount
        document.getElementById(id).querySelector("span:nth-child(2)").textContent = "Expense Amount: "+expDescription
        document.getElementById(id).querySelector("span:nth-child(3)").textContent = "Expense Amount: "+expenseType
        console.log(response)
    }).catch((err)=>{
        console.log(err)
    })
    mode = 'add'
    return
}

   let userObjItem = 'userObj'+i
   console.log(userObjItem)
        //localStorage.setItem(userObjItem, userObj);
        axios.post("http://localhost:3000/expense/add-expense",userObj).then((response)=>{
            console.log(response)
            showItemOnScreen(userObj)
        }).catch((err)=>{
            console.log(err)
        })
})

//                showItemOnScreen(resp.data[i].expamount,resp.data[i].expdesc,resp.data[i].exptype,resp.data[i].id)

function showItemOnScreen(theAmount,theDescription,theType,theID){
    //console.log('userObj',userObj)
    let li = document.createElement('li')
    let spanZero = document.createElement('span')
    let span = document.createElement('span')
    let spanTwo = document.createElement('span')
    span.style.marginLeft = '4.5em'
    spanTwo.style.marginLeft = '4.5em'
    spanTwo.style.marginRight = '4.5em'
    span.innerText = 'Expense Decription:' + theDescription
    spanTwo.innerText = 'Expense Type:' + theType 

    li.id = theID
    spanZero.innerText = 'Expense Amount:' + theAmount
    li.appendChild(spanZero)
    li.appendChild(span)
    li.appendChild(spanTwo)

    let del = document.createElement('button')
    let edit = document.createElement('button')
    edit.innerText = 'Edit Expense'
    del.innerText = 'Delete Expense'
    edit.className = 'edit btn btn-outline-primary'
    del.className = 'del btn btn-outline-danger'
    li.appendChild(del)
    li.appendChild(edit)
    document.getElementById('expenses').append(li)
    del.addEventListener('click',function(){
        //console.log('deleted')
        // localStorage.removeItem(userObjItem)
        axios.delete("http://localhost:3000/users/delete-expense/"+theID).then((response)=>{
            console.log(response)
            this.parentElement.remove();
        }).catch((err)=>{
            console.log(err)
        })
    })
    edit.addEventListener('click',function(){
        //console.log('deleted')
        // let theItem = JSON.parse(localStorage.getItem(userObjItem))
        // let theAmount = theItem.expenseAmount
        // let theDescription = theItem.expDescription
        // let theType = theItem.expenseType

        document.getElementById('expenseAmount').value = theAmount
        document.getElementById('expDescription').value = theDescription
        document.getElementById('expenseType').value = theType
        document.getElementById('id').value = theID

        mode = 'edit'
        // localStorage.removeItem(userObjItem)
        this.parentElement.classList.add("bg-warning")
    })
i++
}
//.addEventListener('click')