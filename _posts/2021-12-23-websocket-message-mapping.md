---
layout: post 
title: "WebSocket @MessageMapping"  
description: "Build a simplest chat app with spring boot and websocket"
tags: java kotlin websocket spring spring-boot reactjs
minute: 10
---


#### **`TL;DR`**

[Source Code]

---
&nbsp;

#### Related Post
- [Part 1] - WebSocket Basics
- [Part 2] - (Current) WebSocket `@MessageMapping`

#### @MessageMapping - Process incoming data 

On our previous post [Part 1] we create a simple chat app.
Let's extend the app and add ability to create and join rooms.

In order for us to create a custom room, we need ability to `send()` a message and process that message on server.
On our previous post, we created a mechanism to `send()` a message, but server did not process that message.
If you want server to process the message that is received, you need to create a method that is annotated with `@MessageMapping(url)`. 
Any data we send is available on method parameter.
One catch is - we need to use `@Payload` annotation on parameter

```kotlin
@MessageMapping("$BASE_URL/createRoom")
fun createCustomRoom(@Payload roomName: String) {

}
```

Now we can do anything we want with the roomName. For our simple purpose we will create a variable to hold room names.
```kotlin
val roomNames: MutableSet<String> = HashSet()

@SubscribeMapping(BASE_URL)
fun broadcastAvailableRooms() {
    client.convertAndSend(BASE_URL, roomNames);
}

@MessageMapping("$BASE_URL/createRoom")
fun createCustomRoom(@Payload roomName: String) {
    if (!roomNames.contains(roomName)) {
        roomNames.add(roomName)
    }
    broadcastAvailableRooms();
}
```

We will add room to our list if it doesn't exist, and then we will broadcast all available rooms.
Note I modified our **base destination URL** `/ws/simple-chat-box` to broadcast list of rooms.

#### ReactJS App Subscribe To List Of Room
Let's update our frontend to allow us to create a room and view the list of rooms.
First let's connect our frontend with backend WebSocket and subscribe to `/ws/simple-chat-box` which will broadcast list of rooms.
```jsx
const onUpdateRoomList = (frame) => {
  setRoomList(JSON.parse(frame.body))
}

const onWebSocketConnect = (_stompClient) => {
  setStompClient(_stompClient)
  _stompClient.subscribe(baseDestinationUrl, onUpdateRoomList)
}

useEffect(() => {
    const _stompClient = Stomp.over(SockJS(wsConnectUrl));
    _stompClient.connect({}, () => onWebSocketConnect(_stompClient))
}, []);
```
&nbsp;
#### Rendering List Of Rooms  
Displaying the list of room names
```jsx
<div className={styles.roomList}>
  {
    roomList.length > 0
      ? roomList.map(room => (
          <a className={styles.room} onClick={() => onClickJoinRoom(room)}>
            Join {room}
          </a>
        )
      )
      : ("No Chat Rooms")
  }
</div>
```
&nbsp;
#### ReactJS App Create Room
Frontend is now subscribed to URL that broadcasts list of room available.
Now let's add UI to allow user to create room. Remember we already have backend code
that create a room.
```jsx
<input type="text"
    value={createRoomName}
    onChange={({target: {value}}) => setCreateRoomName(value)}/>
<button onClick={onClickCreateRoom}>Create Room</button>

const onClickCreateRoom = () => {
  stompClient.send(`${baseDestinationUrl}/createRoom`, createRoomName)
}
```
If you create a room now the UI should auto update.

#### ReactJS App Join Room
Now it is time to add ability to join the room.
When we implemented a UI to display list of room we also added
`onClick` handler that calls `onClickJoinRoom`.
```jsx

const onClickJoinRoom = (roomName) => {
  if (roomSubRef !== null) {
    roomSubRef.unsubscribe();
  }
  setJoinRoomName(roomName)
  setMessages([])
  const roomRef = stompClient.subscribe(`${baseDestinationUrl}/${roomName}`, onUpdateMessagesForRoom)
  setRoomSubRef(roomRef);
}
```

Here's an interesting part, it might look like we are subscribing to endpoint that we did not register on backend.
But remember on [Part 1] I mentioned we can subscribe to any URL we want, it doesn't need to be registered.
We are more or less doing the same thing. But important part here is that we are using
baseDestinationUrl as our starting path. Because we registered baseDestinationUrl, any destination URL
that client use that is prefixed by baseDestinationUrl can be intercepted by using special annotation like
@MessageMapping. baseDestinationUrl/createRoom is one of them. We did not register baseDesUrl/createRoom
on our WebSocket configuration, but we were able special behavior to that particular URL because the
subscription url was prefixed with baseDestination URl.

To show the messages we simply display messages content on UI
```jsx
<h3>Messages for Room: {joinRoomName}</h3>
<pre>{JSON.stringify(messages, null, ' ')}</pre>
<div>
    <input type="text"
           value={newMessage}
           onChange={({target: {value}}) => setNewMessage(value)}
           onKeyDown={onKeyDownUserMessage}/>
</div>
```



---
References:

- [Spring Websocket Documentation]


[Source Code]: <https://github.com/amantuladhar/sse-websocket-reactive-api-kafka/tree/002-simple-chat-box-with-custom-rooms>
{:target="_blank"}
[Spring Websocket Documentation]: <https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#websocket>
{:target="_blank"}

[Part 1]: <{% post_url 2021-12-22-websocket-basics-with-spring-boot %}>
{:target="_blank"}
[Part 2]: <{% post_url 2021-12-23-websocket-message-mapping %}>
{:target="_blank"}