# P2P chat

Simple peer-to-peer chat running in the browser, without a custom backend or accounts.
Messages are sent directly between peers using WebRTC.

Try it here: [chat.ttomf.cc](https://chat.ttomf.cc).

## How it works

The page is built using HTML, CSS and JavaScript.
[Trystero](https://trystero.dev) handles peer discovery, signaling and message exchange.

Messages are not stored by the application, so reloading the page will erase them.

## Run locally

```sh
python -m http.server 8000
```

Then open http://localhost:8000.
An internet connection is required for peer discovery and communication.

## Usage

Enter a room ID and optionally a username, then click **Join**.
You can then send messages to other peers in the room.

You can join another room or rejoin the same room with a different username.

## Limitations

- All peers must be online at the same time
- No message history or offline delivery
- Anyone who knows the room ID can join
