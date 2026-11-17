import { joinRoom } from "https://esm.run/trystero";

let room;
let message;
let user;

function addMessage(message) {
  const msg = document.createElement("div");
  msg.classList.add("message");
  msg.classList.add(message.type);
  if (message.user) msg.innerText = message.user + ": " + message.text;
  else msg.innerText = message.text;

  document.getElementById("chat").appendChild(msg);
  document.getElementById("chat").scrollTop =
    document.getElementById("chat").scrollHeight;
}

async function updateInfo() {
  const roomSelf = await room.getSelf();
  const roomUsers = await room.getUsers();
  document.getElementById("info").innerText = `\
Room ID: ${roomSelf.roomId}
Your ID: ${roomSelf.userId}
Your username: ${user.get().name}
Users: ${Object.keys(roomUsers).length + 1}`;
}

function openRoom(id) {
  room = joinRoom({ appId: "chat.ttomf.cc", identity: "none" }, id);

  room.onUserJoin(({ userId }) => {
    addMessage({ type: "info", text: `${userId} joined` });
    updateInfo();
  });
  room.onUserLeave(({ userId }) => {
    addMessage({ type: "info", text: `${userId} left` });
    updateInfo();
  });
  room.onError((err) => {
    addMessage({
      type: "error",
      text: `Error: ${err.code} ${err.message}`,
    });
    updateInfo();
  });

  message = room.makeAction("message");

  message.onMessage((data, { userId }) => {
    addMessage({ type: "msg", user: user.get(userId).name, text: data.text });
  });

  user = room.makeUserState("user", {
    name: "anonymous",
  });

  if (document.getElementById("username").value.trim())
    user.set({ name: document.getElementById("username").value.trim() });
  else user.set({ name: `User ${Math.floor(Math.random() * 1000)}` });

  document.getElementById("messageText").focus();
  addMessage({ type: "info", text: `Connected to room ${id}` });
  updateInfo();
}

function sendMessage(text) {
  if (!message) {
    addMessage({ type: "error", text: "No room connected" });
    return;
  }
  message.send({ text: text });
  addMessage({ type: "you", user: user.get().name, text: text });
}

document.getElementById("messageForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const text = document.getElementById("messageText").value.trim();

  if (!text) return;

  document.getElementById("messageText").value = "";
  sendMessage(text);
});

document.getElementById("joinForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const text = document.getElementById("roomId").value.trim();

  if (!text) return;

  openRoom(text);
  document.getElementById("roomId").value = "";
});

document.getElementById("userForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const text = document.getElementById("username").value.trim();

  if (!text) return;

  user.set({ name: text });
  document.getElementById("username").value = "";
  updateInfo();
});
