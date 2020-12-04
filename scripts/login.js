let userLogin = {
    get name(){ return this._name },
    set name(value){ this._name=value },
    get password(){ return this._password },
    set password(value){ this._password=value },
    get password2(){ return this._password2 },
    set password2(value){ this._password2=value },
    stringifyUser : function () { return JSON.stringify({name: this._name, passwordOne: this._password, passwordTwo: this._password2 })}
}
let loginName=document.getElementById("loginName")
let loginPassword=document.getElementById("passwordOne")
let loginPassword2=document.getElementById("passwordTwo")
let loginSubmit=document.getElementById("loginSubmit")
loginName.addEventListener("change", loginNameEntered)
function loginNameEntered(){
    userLogin.name=this.value
}
loginPassword.addEventListener("change", loginPasswordEntered)
function loginPasswordEntered(){
    userLogin.password=this.value
    console.log(userLogin.password ," + ", userLogin.name)
}
loginPassword2.addEventListener("change", loginPassword2Entered)
function loginPassword2Entered(){
    userLogin.password2=this.value
    //console.log( userLogin.name, " + ", userLogin.password ," + ", userLogin.password2)
}
loginSubmit.addEventListener("click", loginSubmitClicked)
function loginSubmitClicked(){

    userLogin.name.length<4 ? alert("Name's too short!") :userLogin.password!==userLogin.password2 ? alert("Both passwords must match!") :
        userLogin.password===" " ||  userLogin.password==="" || userLogin.password===undefined ? alert("password field cann`t be empty!")
            : doFetch("http://167.99.138.67:1111/createaccount")
}
function doFetch(str){
    fetch(str,{
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type" : "application/json"
        },
        body: userLogin.stringifyUser(),
    }).then(res => res.json())
        .then(data => {
            data.success ? alert(data.message+"!"): alert("Failed create an account: "+data.message)
            console.log(data)
        })
}