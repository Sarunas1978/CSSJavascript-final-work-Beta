let str="http://167.99.138.67:1111/getsinglepost/"
let userStr="";
let userId="";
let voidStr=""

let a=localStorage.getItem("id")
localStorage.removeItem("id")
let b=localStorage.getItem("user")
localStorage.removeItem("user")
if(a!==undefined && a!==null || b!==undefined && b!==null) {
    voidStr=a;
    userStr=b;
    console.log(a+"  "+b)
    getAll(str+b+"/"+a)
}

function getAll(str){
    fetch(str)
        .then(res => res.json())
        .then(data => {
            let b;
            let a;
            if(!data.success) {
                alert(data.message+"!")
            }
            else {
                a=document.getElementById("userPost")
                a.innerHTML=""
                b=document.createElement("div")
                a.innerHTML+=`<br><b>On ${new Date(data.data.timestamp).toLocaleString()} user ${userStr+" message ID:"+voidStr} wrote:</b><br>
                      ${data.data.description}<br>`
            }
            voidStr=""
        })
}

let userName=document.getElementById("userName")
let showUserPost=document.getElementById("showUserPost")
let loginSubmit=document.getElementById("loginSubmit")

userName.addEventListener("change", userNameEntered)
showUserPost.addEventListener("change", userPostIdEntered)
loginSubmit.addEventListener("click", userSubmitClicked)

function userNameEntered(){
    userStr=this.value
}
function userPostIdEntered(){
    userId=this.value
}
function userSubmitClicked(){
    getAll(str+userStr+"/"+userId)
}