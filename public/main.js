var socket = io.connect('http://localhost:3000');

//Query DOM

var output = document.getElementById('chat-window'),
    handle = document.getElementById('handle'),
    message = document.getElementById('message'),
    btn = document.getElementById('send'),
    feedback = document.getElementById('feedback');

btn.addEventListener('click', () => {
  socket.emit('chat', {
    handle: handle.value,
    message: message.value
  });
});
message.addEventListener('keypress', () => {
  socket.emit('typing', handle.value);
});
socket.on('chat', (data) => {
  feedback.innerHTML = "";
  message.value = "";
  output.innerHTML += ' <p><strong> ' + data.handle + ': </strong>' + data.message +'</p>';
});

socket.on('typing', (data) => {
  feedback.innerHTML = '<p><em>' + data + ' is typing....' + '</em></p>';
});
