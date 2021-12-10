const name = prompt("Enter your name to connect : ");
if(!name){
    window.location.href = '/notexist'
}
const send = new Audio('sounds/send.wav');
const recieve = new Audio('sounds/recieve.wav');
const socket = io();
socket.emit('new-user-joined', name);
const form = document.getElementById('chat-form');
const myMsg = document.getElementById('my-message');
const chatContainer = document.getElementById('chat-container');
myMsg.focus();
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    if (myMsg.value) {
        socket.emit('chat message', myMsg.value);
        chatbox = document.createElement('div');
        chatbox.setAttribute('class', 'd-flex justify-content-end')
        chatbox.innerHTML = `<span class="py-2 px-2 bg-primary text-white rounded my-2">You: ${myMsg.value}</span>`;
        chatContainer.appendChild(chatbox);
        // console.log(chatbox)
        myMsg.value = '';
        myMsg.focus();
        chatContainer.scrollTop = chatContainer.scrollHeight;
        send.play();
      }
})

socket.on('user-connected', function(name) {
    chatbox = document.createElement('div');
    chatbox.setAttribute('class', 'd-flex justify-content-start')
    chatbox.innerHTML = `<span class="py-2 px-2 bg-secondary text-white rounded my-2"><span style="text-transform: capitalize;">${name}</span> has joined the chat</span>`;
    chatContainer.appendChild(chatbox)
    // console.log(chatbox)
    chatContainer.scrollTop = chatContainer.scrollHeight;
    recieve.play();
});

socket.on('messege', function(data) {
    chatbox = document.createElement('div');
    chatbox.setAttribute('class', 'd-flex justify-content-start')
    chatbox.innerHTML = `<span class="py-2 px-2 bg-secondary text-white rounded my-2"><span style="text-transform: capitalize;">${data.name}: </span>${data.msg}</span>`;
    chatContainer.appendChild(chatbox)
    // console.log(chatbox)
    chatContainer.scrollTop = chatContainer.scrollHeight;
    recieve.play();
});
socket.on('user-leave', function(data) {
    chatbox = document.createElement('div');
    chatbox.setAttribute('class', 'd-flex justify-content-start')
    chatbox.innerHTML = `<span class="py-2 px-2 bg-secondary text-white rounded my-2"><span style="text-transform: capitalize;">${data.name}</span> ${data.msg}</span>`;
    chatContainer.appendChild(chatbox)
    // console.log(chatbox)
    chatContainer.scrollTop = chatContainer.scrollHeight;
    recieve.play();
});