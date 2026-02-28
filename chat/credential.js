const questions = [

"What is your age?",

"Are you a student? (yes/no)",

"What is your annual family income?",

"What is your gender?",

"What is your category? (General/OBC/SC/ST)"

];

let step = 0;

let answers = {};

const chatBox = document.getElementById("chatBox");

function addMessage(text, sender){

const msg = document.createElement("div")

msg.classList.add("message")

msg.classList.add(sender)

msg.innerText = text

chatBox.appendChild(msg)

chatBox.scrollTop = chatBox.scrollHeight

}

function askQuestion(){

if(step < questions.length){

setTimeout(()=>{
addMessage(questions[step],"ai")
},500)

}else{

localStorage.setItem("userData", JSON.stringify(answers))

window.location.href="/loading"

}

}

function sendMessage(){

const input = document.getElementById("userInput")

const text = input.value.trim()

if(text==="") return

addMessage(text,"user")

answers["q"+step] = text

input.value=""

step++

askQuestion()

}
