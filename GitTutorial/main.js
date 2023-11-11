var mode = 'add'
window.addEventListener("DOMContentLoaded",()=>{
    //let storedUserObj = localStorage.getItem('userObj')

    axios.get("http://localhost:3000/users/get-users").then(
        (resp)=>{
            console.log('all users',resp)
            for(let i=0;i<resp.data.length;i++){
                showUseronScreen(resp.data[i].name,resp.data[i].email,resp.data[i].phone,resp.data[i].id)
            }
        }).catch((err)=>{
            console.log(err)
        })
})

//if(storedUserObj){
//    console.log(JSON.parse(storedUserObj))
//}
var i = 0,putID = ""

document.getElementsByClassName('btn')[0].addEventListener('click',function(){//submit button
    let name = document.getElementById('name').value
    let email = document.getElementById('email').value
    let phone = document.getElementById('phone').value
    let id = document.getElementById('phone').value

    let userObj = {
        'name':name,
        'email':email,
        'phone': phone
    }

    if(mode == 'edit'){
        console.log('edit mode')
        //userObj = JSON.stringify(userObj)
        axios.put("http://localhost:3000/users/edit-user/"+id,userObj).then((response)=>{
            console.log(response)
        }).catch((err)=>{
            console.log(err)
        })
        mode = 'add'
        return
    }

    //userObj = JSON.stringify(userObj)

    console.log('userObj',userObj)
    axios.post("http://localhost:3000/users/add-user"+userObj).then((response)=>{
        console.log(response)
        showUseronScreen(userObj.name,userObj.email,userObj.phone)
    }).catch((err)=>{
        console.log(err)
    })

    
   //if(!localStorage.getItem('userObj'))
   //console.log(userObjItem)
        //localStorage.setItem(userObjItem, userObj);
  
    i++
})

//.addEventListener('click')

function showUseronScreen(name,email,phone,userObjItem){
    let li = document.createElement('li')
    li.id = userObjItem
    li.innerText = 'Name:' + name + 'Email:' + email+ 'Phone:' + phone + ''
    let del = document.createElement('button')
    let edit = document.createElement('button')
    edit.innerText = 'Edit'
    del.innerText = 'Delete'
    edit.className = 'edit'
    del.className = 'del'
    li.appendChild(del)
    li.appendChild(edit)
    document.getElementById('users').append(li)
    del.addEventListener('click',function(){
        //console.log('deleted')
        //localStorage.removeItem(userObjItem)
        //sxios delete
        axios.delete("http://localhost:3000/users/delete-user/"+userObjItem).then((response)=>{
            console.log(response)
            this.parentElement.remove();
        }).catch((err)=>{
            console.log(err)
        })
    })
    edit.addEventListener('click',function(){
        //console.log('deleted')
        //let theItem = JSON.parse(localStorage.getItem(userObjItem))
        //axios get

        let theUser = name
        let theEmail = email
        let thePhone = phone
        putID = this.id

        document.getElementById('name').value = theUser
        document.getElementById('email').value = theEmail
        document.getElementById('phone').value = thePhone
        document.getElementById('id').value = putID

        mode = 'edit'
        this.parentElement.remove()
    })
}