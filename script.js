import { joinRoom } from "https://esm.run/trystero";

const chatView = document.getElementById("chatView");
const joinView = document.getElementById("joinView");
const chat = document.getElementById("chat");
const form = document.getElementById("messageForm");
const messageText = document.getElementById("messageText");
const joinForm = document.getElementById("joinForm");
const roomId = document.getElementById("roomId");

let room;
let message;

function addMessage(message) {
  const msg = document.createElement("div");
  msg.classList.add("message");
  msg.classList.add(message.type);
  msg.innerText = message.user + ": " + message.text;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

function openRoom(id) {
  room = joinRoom({ appId: "chat.ttomf.cc" }, id);

  room.onUserJoin(({ userId }) =>
    addMessage({ type: "info", user: userId, text: `joined` }),
  );
  room.onUserLeave(({ userId }) =>
    addMessage({ type: "info", user: userId, text: `left` }),
  );
  room.onError((err) =>
    addMessage({
      type: "error",
      user: "Error",
      text: `${err.code} ${err.message}`,
    }),
  );

  message = room.makeAction("message");

  message.onMessage((data, { userId }) => {
    addMessage({ type: "msg", user: userId, text: data.text });
  });

  chatView.hidden = false;
  joinView.hidden = true;

  messageText.focus();
}

function sendMessage(text) {
  message.send({ text: text });
  addMessage({ type: "you", user: "You", text: text });
}

if (window.location.hash) {
  openRoom(window.location.hash.slice(1));
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = messageText.value.trim();

  if (!text) return;

  sendMessage(text);
  messageText.value = "";
});

joinForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = roomId.value.trim();

  if (!text) return;

  window.location.hash = text;
  openRoom(window.location.hash.slice(1));
});
