

let userRegistration = {
    get name(){ return this._name },
    set name(value){ this._name=value },
    get password(){ return this._password },
    set password(value){ this._password=value },
    stringifyUser : function () { return JSON.stringify({name: this._name, password: this._password})}
}
let registerName=document.getElementById("registerName")
let registerPassword=document.getElementById("registerPassword")
let registerSubmit=document.getElementById("registerSubmit")
registerName.addEventListener("change", registerNameEntered)
function registerNameEntered(){
    userRegistration.name=this.value
}
registerPassword.addEventListener("change", registerPasswordEntered)
function registerPasswordEntered(){
    userRegistration.password=this.value
    //console.log(userRegistration.password ," + ", userRegistration.name)
}
registerSubmit.addEventListener("click", registerSubmitClicked)
function registerSubmitClicked() {

    userRegistration.name.length < 4 ? alert("Name's too short!") :
        userRegistration.password === " " || userRegistration.password === "" ||
        userRegistration.password === undefined ? alert("password field cann`t be empty!")
            : doFetch("http://167.99.138.67:1111/login")
}
function doFetch(str){
    fetch(str,{
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type" : "application/json"
        },
        body: userRegistration.stringifyUser(),
    }).then(res => res.json())
        .then(data => {
            data.success ? alert(data.message+"!"): alert("Failed to login: "+data.message)
            console.log(data.secretKey)
            localStorage.setItem("secretKey",data.secretKey)
            localStorage.setItem("currentUser", userRegistration.name)
        })
}