let str="http://167.99.138.67:1111/"

let a=localStorage.getItem("secretKey")
let b=localStorage.getItem("currentUser")

let currentUser=document.getElementById("registeredAs")
b!==undefined && b!==null ? currentUser.innerHTML=`Currently you are registered as: "${b}"`
    : alert("You are not registered! Please register!")

a===undefined && false ? alert("You are not registered! Please register!") :null

//**********************************************************

let createPost={}

let title=document.getElementById("title")
let image=document.getElementById("image")
let  description=document.getElementById("description")
let userName=document.getElementById("userName")

let create=document.getElementById("create")
let update=document.getElementById("update")
let delete1=document.getElementById("delete")
let posts=document.getElementById("posts")

create.addEventListener('click', createPost1)
update.addEventListener('click', updatePost1)
delete1.addEventListener('click', deletePost1)
posts.addEventListener('click', postsPost1)


//******************************** create post ********************
function createPost1(){
    createPost.secretKey=a;
    createPost.title=title.value
    createPost.image=image.value
    createPost.description=description.value

    confirm("Do you want to create?") ? doFetchCreate("http://167.99.138.67:1111/createpost") : null
}

function doFetchCreate(str){
    fetch(str,{
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(createPost),
    }).then(res => res.json())
        .then(data => {
            data.success ? alert(data.message+"!"): alert("Failed to login: "+data.message)
            console.log(data)
            createPost={}
        })
}

//************************* gauti visus userio postus ******************

function postsPost1(){
    getAll("http://167.99.138.67:1111/getuserposts/"+b)
}

function getAll(str){
    fetch(str)
        .then(res => res.json())
        .then(data => {
            if(!data.success) {
                alert(data.message+"!")
            }
            else {
                let bbb;
                let userPost=document.getElementById("userPost")
                userPost.innerHTML="";
                console.log(data)
                for (let i = 0; i < data.data.length; i++) {
                    bbb=document.createElement("div")
                    userPost.innerHTML+=`<br><b>On ${new Date(data.data[i].timestamp).toLocaleString()}  message ID: "${data.data[i].id}" wrote:</b><br>
                      ${data.data[i].description}<br>`
                    userPost.appendChild(bbb)
                }
            }
        })
}
//*************************** Update Post ***************************

function updatePost1(){
    createPost.secretKey=a;
    createPost.title=title.value
    createPost.image=image.value
    createPost.description=description.value
    createPost.id=userName.value
    confirm("Do you want to update?") ? doFetchUpdate("http://167.99.138.67:1111/updatepost") : null
}

function doFetchUpdate(str){
    fetch(str,{
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(createPost),
    }).then(res => res.json())
        .then(data => {
            data.success ? alert(data.message+"!"): alert("Failed to login: "+data.message)
            console.log(data)
            createPost={}
        })
}

//***************************************** delete post ***************************************

function deletePost1(){
    createPost.secretKey=a;
    createPost.title=title.value
    createPost.image=image.value
    createPost.description=description.value
    createPost.id=userName.value

    confirm("Do you want to create?") ? doFetchDelete("http://167.99.138.67:1111/deletepost") : null
}

function doFetchDelete(str){
    fetch(str,{
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(createPost),
    }).then(res => res.json())
        .then(data => {
            data.success ? alert(data.message+"!"): alert("Failed to login: "+data.message)
            console.log(data)
            createPost={}
        })
}