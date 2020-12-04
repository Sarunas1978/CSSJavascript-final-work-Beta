let str="http://167.99.138.67:1111/getallposts"
let array = []

getAll(str)

function getAll(str){
     fetch(str)
         .then(res => res.json())
         .then(data => {
             array=data.data
             let index=0;
             console.log(array)
             for (let i = 0; i < data.data.length; i++) {
                 if(index===0){
                     createCard(index,i)
                     index++;
                 } else if(index===1){
                     createCard(index,i)
                     index++;
                 } else if(index===2){
                     createCard(index,i)
                     index++;
                 } else if(index===3){
                     createCard(index,i)
                     index=0;
                 }
             }
         })
}
function createCard(index, i){
    let div0=document.getElementById("div0")
    let div1=document.getElementById("div1")
    let div2=document.getElementById("div2")
    let div3=document.getElementById("div3")
    let a=[div0, div1, div2, div3];

    let div=document.createElement("div")
    div.classList.add("container", "overflow-hidden")
    div.setAttribute("id",`${i}`)

    let image=document.createElement("img")
    image.classList.add("w-100", "p-1", "mt-4")
    image.src=array[i].image
    // image.addEventListener('click', userClicked)


    let user=document.createElement("a")
    user.classList.add("w-100", "pb-2")
    user.innerHTML=`<b>${array[i].username}</b> wrote:<br>`
    user.href="user_post_selected.html"
    user.addEventListener('click', userClicked)


    let title=document.createElement("a")
    title.classList.add("w-100", "mb-4")
    title.innerHTML=`<b>Title:</b> ${array[i].title}`
    title.href="single_post.html"
    title.addEventListener('click', titleClicked)

    a[index].appendChild(div)
    div.appendChild(image)
    div.appendChild(user)
    div.appendChild(title)
}
function userClicked(event){

    localStorage.setItem("id",array[event.path[1].id].username)
}
function titleClicked(event){
    localStorage.setItem("id",array[event.path[1].id].id)
    localStorage.setItem("user",array[event.path[1].id].username)
}
