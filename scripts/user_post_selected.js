let str="http://167.99.138.67:1111/getuserposts/"
let array=[]
let userStr=""
let voidStr=""

let a=localStorage.getItem("id")
localStorage.removeItem("id")

if(a!==undefined && a!==null) {
    voidStr=a;
    console.log(a)
    getAll(str+a)
}

function getAll(str){
    fetch(str)
        .then(res => res.json())
        .then(data => {
            if(!data.success) {
                alert(data.message+"!")
            }
            else {
                let b;
                let a=document.getElementById("userPosts")
                a.innerHTML=""

                console.log(data)
                for (let i = 0; i < data.data.length; i++) {
                    b=document.createElement("div")
                    a.innerHTML+=`<br><b>On ${new Date(data.data[i].timestamp).toLocaleString()} user ${userStr+voidStr}  message ID: "${data.data[i].id}" wrote:</b><br>
                      ${data.data[i].description}<br>`
                    a.appendChild(b)
                }
            voidStr=""
            }
        })
}

let userName=document.getElementById("userName")
let showUserPost=document.getElementById("showUserPost")


userName.addEventListener("change", userNameEntered)
showUserPost.addEventListener("click", userSubmitClicked)

function userNameEntered(){
    userStr=this.value
}
function userSubmitClicked(){
    getAll(str+userStr)
}
