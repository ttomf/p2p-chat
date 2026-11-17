# P2P chat

Simple peer-to-peer chat running entirely in the browser.
No backend, no accounts, no stored messages.

## Features

- Rooms identified with room ID
- Optional username
- Messages sent directly between peer
- See room info and connected users

## How it works

Plain HTML, CSS, and JavaScript with no build step.
[Trystero](https://trystero.dev) handles signaling and peer discovery.
After that, messages are sent directly between browsers.
Messages exist only in the open page, so there is no history.

## Run locally

```sh
python -m http.server 8000
```

Then open http://localhost:8000.
An internet connection is required to load Trystero and reach the signaling relays.

## Usage

1. Enter a room ID and optionally a username, then click **Join**
2. Share the room ID, everyone can chat
3. Join another room or rejoin with changed username

## Limitations

- All peers must be online at the same time
- No message history or offline delivery
- Everyone can join any room
