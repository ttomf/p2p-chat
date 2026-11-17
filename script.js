import { joinRoom } from "https://esm.run/trystero";

const messages = document.getElementById("messages");
const form = document.getElementById("messageForm");
const messageText = document.getElementById("messageText");

let room;
let message;

function addMessage(message) {
  const msg = document.createElement("div");
  msg.classList.add("message");
  msg.innerText = message;
  messages.appendChild(msg);
}

function openRoom(id) {
  room = joinRoom({ appId: "chat.ttomf.cc" }, id);

  room.onUserJoin(({ userId }) => addMessage(`${userId} joined`));
  room.onUserLeave(({ userId }) => addMessage(`${userId} left`));
  room.onError((err) => addMessage(`${err.code} ${err.message}`));

  message = room.makeAction("message");

  message.onMessage((data, { userId }) => {
    addMessage(`${userId}: ${data.text}`);
  });
}

openRoom(window.location.hash.slice(1));

form.addEventListener("submit", (event) => {
  event.preventDefault();

  message.send({ text: messageText.value });
  addMessage(`You: ${messageText.value}`);
});
