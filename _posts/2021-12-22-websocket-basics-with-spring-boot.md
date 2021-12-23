---
layout: post 
title: "WebSocket Basics With Spring Boot And ReactJS" 
description: "Build a simplest chat app with spring boot and websocket"
tags: java kotlin websocket spring spring-boot reactjs
minute: 20
---


#### **`TL;DR`**

[Source Code]

---
&nbsp;

#### Related Post
- [Part 1] - (Current) WebSocket Basics
- [Part 2] - WebSocket `@MessageMapping`

#### Create Spring Boot Project

Create a spring boot app with websocket dependency from **[start.spring.io]**. I am using **Kotlin** with **Gradle** in this project. Feel free to
use **Java** or **Maven** if you want. The concept is same and as far as code goes, it should be easy to convert **Kotlin** to **Java**.

For reference here's my `build.gradle.kts`

```kotlin
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    id("org.springframework.boot") version "2.6.1"
    id("io.spring.dependency-management") version "1.0.11.RELEASE"
    kotlin("jvm") version "1.6.0"
    kotlin("plugin.spring") version "1.6.0"
}

group = "com.example"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_17

repositories {
    mavenCentral()
}

dependencies {
    developmentOnly("org.springframework.boot:spring-boot-devtools")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")

    implementation("org.springframework.boot:spring-boot-starter-websocket") 1️⃣
}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs = listOf("-Xjsr305=strict")
        jvmTarget = "17"
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
}

```

1️⃣ Websocket dependency, which is the most important one for this project.

#### Enable WebSocket

Now that our project has required dependency, we are ready to write code to enable **WebSocket**. To enable websocket we need to
use `@EnableWebSocketMessageBroker`. You can create a new `@Configuration` class or you can add to existing one. I will add this to our **`main`**
class.

```kotlin
@SpringBootApplication
@EnableWebSocketMessageBroker
class DemoApplication

fun main(args: Array<String>) {
    runApplication<DemoApplication>(*args)
}
```

&nbsp;

#### Configure WebSocket Connect Endpoint

We need to define a **URL** where client can establish a WebSocket connection. To define the endpoint we need to create a `@Configuration` class that
extends `WebSocketMessageBrokerConfigurer`

```kotlin
@Configuration
class WebSocketConfiguration : WebSocketMessageBrokerConfigurer {

}
```

Inside of this class, we can override `registerStompEndpoints(registry: StompEndpointRegistry)` method. The method has a `StompEndpointRegistry` as
parameter, which we can use to add our endpoint.

```kotlin
@Configuration
class WebSocketConfiguration : WebSocketMessageBrokerConfigurer {
    companion object {
        const val WEB_SOCKET_CONNECT_URL = "/ws/connect" // 2️⃣
    }

    override fun registerStompEndpoints(registry: StompEndpointRegistry) {
        super.registerStompEndpoints(registry)
        registry.addEndpoint(WEB_SOCKET_CONNECT_URL) // 1️⃣
            .setAllowedOrigins("http://localhost:3000") // 3️⃣
            .withSockJS() // 4️⃣
    }
}
```

1️⃣ We use `addEndpoint(url: String)` method to define our WebSocket connection endpoint.

2️⃣ We are setting our connection url to `/ws/connect`. This is a static constant on Kotlin.

3️⃣ Whitelisting request coming from `http://localhost:3000`. localhost:3000 will be our frontend dev server url.

4️⃣ Enable **SockJS** support. If some browser doesn't support WebSocket, SockJS can setup alternatively approach without needing to change the code.
This is almost like polyfill for WebSocket.

At this point we can create a client app that can connect with our WebSocket endpoint.

#### Creating ReactJS App

&nbsp; We will create a ReactJS App to play with our WebSocket API. I will be using [NextJS] for this project. You don't have to know NextJS to follow
this tutorial.

To create a simple ReactJS App using NextJS you can use

```bash
# Tested on Node 17
npx create-next-app frontend
```

Open frontend app on or IDE of choice. Open `pages/index.js` and replace with following code.

```jsx
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div className={styles.linkWrapper}>
                    <Link href={"/simple-chat-box"}> // 1️⃣
                        <a className={styles.link}>Simple Chatbox</a>
                    </Link>
                </div>
            </main>
        </div>
    )
}
```

1️⃣ We are creating a anchor tag that can navigate us to new page i.e `/simple-chat-box`

🤯 Ignore `className` attribute for now. `className` attribute doesn't affect any functionality and is there for purly styling purpose.

Now inside of **pages** directory, create a new folder with name `simple-chat-box`. Note this name must match 1️⃣. This is how **NextJS** handles
routes.

Inside of the new folder create a `index.js` which will get rendered when `/simple-chat-box` route is called.

```jsx
import SimpleChatBox from './SimpleChatBox.js'; // 1️⃣

export default function SimpleChatBoxIndex() {
    return <SimpleChatBox/>
}
```

1️⃣ We have not created this component yet. So let's create one inside of `pages/simple-chat-box` directory.

```jsx
import * as styles from './index.module.scss';

export default function SimpleChatBox() {

    return (
        <div>
            <main className={styles.main}>
                <h1>Simple Chat Box</h1>
            </main>
        </div>
    )
}
```

&nbsp;

#### Add Stomp and SockJS dependency on ReactAPP

To make our frontend code bit easier we will use some open source library. On your `package.json` add these line to your `dependencies` section.

```
    "sockjs-client": "^1.5.2",
    "webstomp-client": "^1.2.6"
```

&nbsp;

#### ReactJS App connect with WebSocket API

All of our dependency is now in place. All left for us to do is to make appropriate call to establish a handshake. On our `SimpleChatBox.js` add this
code

```jsx
import * as styles from './index.module.scss';
import Stomp from 'webstomp-client';
import SockJS from 'sockjs-client';
import {useEffect, useState} from 'react';

export default function SimpleChatBox() {
    const relativeWsConnectUrl = '/ws/connect'; // 1️⃣
    const wsConnectUrl = `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_WS_URL}:${process.env.REACT_APP_BACKEND_PORT}${relativeWsConnectUrl}`;
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        const stompClient = Stomp.over(SockJS(wsConnectUrl)); // 2️⃣ 
        stompClient.connect({}, // 3️⃣
            () => {
                setStompClient(stompClient); // 4️⃣
            })
    }, []);

    return (
        <div>
            <main className={styles.main}>
                <h1>Simple Chat Box</h1>
            </main>
        </div>
    )
}
```

Because this is not ReactJS tutorial I will not go into details about ReactJS stuff. But let's go through some important part of this code.

1️⃣ This is the same **URL** we defined on **backend** side. `relativeWsConnectUrl` is used to construct full url for `wsConnectUrl`. I am setting my
backend server URL as env variable, but feel free to change this to string literal.

2️⃣ Initialize **SockJS** and **Stomp** to establish a connection. This code is inside of `useEffect()` so that we do this initialize and connect when
component is mounted.

3️⃣ Calling `connect(header, successHandler, errorHandler)` method to initiate a handshake to our **backend** WebSocket url.

4️⃣ Saving our reference to our `stompClient` for future use. Above code is saving reference after successful connection, but we can do that right
after initialization if you want.

As a bonus let's update our JSX to display some helpful message
```jsx
 return (
        <div>
            <main className={styles.main}>
                <h1>Simple Chat Box</h1>
                <div className={styles.contentWrapper}>
                    <div>
                        Websocket Connection: <b>{stompClient == null ? 'No Ready' : 'Ready'}</b><br/>
                        Client Connected: <b>{stompClient?.connected == null ? 'No' : 'Yes'}</b><br/>
                    </div>
                </div>
            </main>
        </div>
    )
```

If you run **backend** and **frontend** now, and on frontend code if you navigate to `/simple-chat-box` you should see WebSocket connection was
successful.

```text
Websocket Connection: Ready
Client Connected: Yes
```

&nbsp;

#### Add Subscription Endpoint

To add endpoint where client can subscribe to, we need to **override** `configureMessageBroker(registry: MessageBrokerRegistry)` method
on `WebSocketConfiguration`.

```kotlin
@Configuration
class WebSocketConfiguration : WebSocketMessageBrokerConfigurer {
    companion object {
        const val WEB_SOCKET_CONNECT_URL = "/ws/connect"
        const val SIMPLE_CHAT_BOX_URL = "/ws/simple-chat-box" //3️⃣
    }

    override fun registerStompEndpoints(registry: StompEndpointRegistry) {
        super.registerStompEndpoints(registry)
        registry.addEndpoint(WEB_SOCKET_CONNECT_URL)
            .setAllowedOrigins("http://localhost:3000")
            .withSockJS()
    }

    override fun configureMessageBroker(registry: MessageBrokerRegistry) { // 1️⃣
        super.configureMessageBroker(registry)
        registry.enableSimpleBroker(SIMPLE_CHAT_BOX_URL) // 2️⃣
    }
}
```

1️⃣ Implementation for method to **override**

2️⃣ We use `enableSimpleBroker(vararg url: String)`. **varargs** simply means this methods can accept multiple url separated by comma. This will
create a **in-memory** broker.

3️⃣ URL where client can subscribe to get our messages.

#### ReactJS App Add a Code To Subscribe
Our **backend** code is now configured to send message to specific urls (`/ws/simple-chat-box` for us).

Note: We can somehow subscribe to any URL we want to e.g even `/xyx/foo`. I don't know why this works. If I ever find the reason I will update my finding here.
Later in the post I will let you know benefit of explicitly defining our **subscription endpoint**.

On our `SimpleChatBox.js` let's update our UI to include the **Join Chat** button.
```jsx
const onClickJoinChat = () => {
    const subRef = stompClient.subscribe(destinationUrl, onMessageReceived); // 2️⃣
    setSubscriptionRef(subRef);
};

<button disabled={stompClient === null} // 1️⃣
        onClick={onClickJoinChat}>
    Join Chat
</button>
```
1️⃣ Button implementation for Join Chat

2️⃣ We use **stompClient** `subscribe()` to subscribe to a specific URL. 
The first param for the method is the URL you want to subscribe to. 
Second parameter is a callback that gets called when you receive a update from the URL.

#### ReactJS App Send Message To Subscription URL
We subscribed to a specific destination URL, but if no one update the subscription, no one will get an update.
To **send** a message to subscription we can use 
```jsx
const onChangeUserText = ({target: {value}}) => (setUserText(value))
const onKeyDownUserText = ({keyCode}) => {
    if (subscriptionRef !== null && keyCode === 13) { // Enter
        sendMessage()
    }
}
const sendMessage = () => {
    stompClient.send(destinationUrl, userText) // 2️⃣
}
<input placeholder="Enter your message" // 1️⃣
        type="text"
        value={userText}
        onChange={onChangeUserText}
        onKeyDown={onKeyDownUserText}/>
```
1️⃣ Input field where user can type their messages.

2️⃣ Using **stompClient** to send the message to destinationUrl.
`send()` has multiple implementation, the one I am using take two parameter.
First parameter is URL where you want to send message to.
Second parameter is the actual message you want to send. 
For us it is a `userText` as user entered value gets stored on that variable.

Now we have mechanism in place to **send** message. But what good is sending message if you can't see it right?
Let's add that part in.

```jsx
<pre>{JSON.stringify(messageHistory, null, '  ')}</pre> // 1️⃣
```
1️⃣ Here's `messageHistory` will store the list of messages that client receives.

But how does `messageHistory` gets updated? Remember `onMessageReceived` callback we passed when we subscribed to destination URL?. Here's a implementation for that method.
```jsx
const onMessageReceived = (newState) => {
    setMessageHistory(previousState => [...previousState, newState.body])
    setUserText('')
};
```

**Dang!! this is getting complex. Show me the whole code**

```jsx
import * as styles from './index.module.scss';
import Head from 'next/head.js';
import {useEffect, useState} from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';

export default function SimpleChatBox() {
  const wsConnectUrl = `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_WS_URL}:${process.env.REACT_APP_BACKEND_PORT}/ws/connect`;
  const destinationUrl = '/ws/simple-chat-box'
  const [stompClient, setStompClient] = useState(null);
  const [messageHistory, setMessageHistory] = useState([]);
  const [subscriptionRef, setSubscriptionRef] = useState(null);
  const [userText, setUserText] = useState('');

  useEffect(() => {
    const stompClient = Stomp.over(SockJS(wsConnectUrl))
    stompClient.connect({},
      () => {
        setStompClient(stompClient)
      })
  }, []);

  const onMessageReceived = (newState) => {
    setMessageHistory(previousState => [...previousState, newState.body])
    setUserText('')
  };

  const onClickJoinChat = () => {
    const subRef = stompClient.subscribe(destinationUrl, onMessageReceived)
    setSubscriptionRef(subRef)
  };

  const onChangeUserText = ({target: {value}}) => (setUserText(value))
  const onKeyDownUserText = ({keyCode}) => {
    if (subscriptionRef !== null && keyCode === 13) { // Enter
      sendMessage()
    }
  }
  const sendMessage = () => {
    stompClient.send(destinationUrl, userText)
  }

  return (
    <div>
      <Head>
        <title>Simple Chat App</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.contentWrapper}>
          <div>
            Websocket Connection: <b>{stompClient == null ? 'No Ready' : 'Ready'}</b><br/>
            Client Connected: <b>{stompClient?.connected == null ? 'No' : 'Yes'}</b><br/>
          </div>
          <div>
            {subscriptionRef == null
              ? <button disabled={stompClient === null}
                        onClick={onClickJoinChat}>
                Join Chat
              </button>
              : ''
            }
          </div>
          <div>
            <pre>{JSON.stringify(messageHistory, null, '  ')}</pre>
            <div>
              <input placeholder="Enter your message"
                     type="text"
                     value={userText}
                     onChange={onChangeUserText}
                     onKeyDown={onKeyDownUserText}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
```

If you run both **backend** and **frontend**. You should have a working basic chat system. Make sure you open two browser and try it out.

&nbsp;

#### Sending message to client when they subscribe - @SubscribeMapping
To send message to client when they subscribe, we need to add a `@Controller`.
```kotlin
@Controller // 1️⃣
class SimpleChatBoxController {
    companion object {
        const val BASE_URL = WebSocketConfiguration.SIMPLE_CHAT_BOX_URL
    }

    @SubscribeMapping(BASE_URL) // 2️⃣
    @SendTo(BASE_URL) // 3️⃣
    fun welcomeToTheChat(): String {
        return "Someone joined the chat";
    }
}
```
1️⃣ Define a @Controller to add our **WebSocket** mapping.

2️⃣ @SubscribeMapping - The method will get called whenever client subscribes to provided URL on @SubscribeMapping.

3️⃣ @SendTo - Whatever method returns will be published to the destination URL passed into @SendTo

Alternative way to send message with **SimpMessagingTemplate**

```kotlin
@Controller
class SimpleChatBoxController(var client: SimpMessagingTemplate) {
    companion object {
        const val BASE_URL = WebSocketConfiguration.SIMPLE_CHAT_BOX_URL
    }

    @SubscribeMapping(BASE_URL)
    fun welcomeToTheChat() {
        client.convertAndSend(BASE_URL, "Someone joined the chat")
    }
}
```

Note: This is the benefit of explicitly defining our endpoint. 
@SubscribeMapping URL only works when url is registered on our WebSocket configuration.


---
References:

- [Spring Websocket Documentation]

[start.spring.io]: <https://start.spring.io/#!type=gradle-project&language=kotlin&platformVersion=2.6.2&packaging=jar&jvmVersion=17&groupId=com.example&artifactId=demo&name=demo&description=Demo%20project%20for%20Spring%20Boot&packageName=com.example.demo&dependencies=websocket>
{:target="_blank"}
[NextJS]: <https://nextjs.org/>
{:target="_blank"}
[Source Code]: <https://github.com/amantuladhar/sse-websocket-reactive-api-kafka/tree/001-simple-chat-box>
{:target="_blank"}
[Spring Websocket Documentation]: <https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#websocket>
{:target="_blank"}

[Part 1]: <{% post_url 2021-12-22-websocket-basics-with-spring-boot %}>
{:target="_blank"}
[Part 2]: <{% post_url 2021-12-23-websocket-message-mapping %}>
{:target="_blank"}