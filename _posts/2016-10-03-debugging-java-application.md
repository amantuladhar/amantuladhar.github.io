---
layout: post
title: 'Debugging Java Application Running on Docker'
description: Remote Debugging Java Application like a boss
summary: Remote Debugging Java Application like a boss
tags: java docker
keywords: "Java,Remote Debugging,remote-debugging, debugging"
minute: 1
---

In this post I will explain how you can **debugging Java Application** that is running on **Docker** like a **`boss`**. To be precise I will explain how we can debug the application that uses `Maven`. I will show you how we can attach our debugger on `IntelliJ Idea`.

Let's assume we have a `SpringBoot Application`. To run our application we use `mvn spring-boot:run`. If we were to use `IDE` directly to run our application, we can directly use `debugging` feature provided by `IDE`. But, when we run our application on `Docker` we execute our application with help of `command [mvn spring-boot:run]`.

When we use `IDE` to debug our application it *adds* some *meta-data* information on *run* command. The *meta-data* information to be precise is a `JVM Arguments`. This is what **JVM Arguments** looks like:

    -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005

To send this meta-data information [i.e JVM Arguments] when we run our application, we need to do something like below :

```bash
mvn spring-boot:run -Drun.jvmArguments="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005"
```

You can see that we are sending those meta information with help of `-Drun.jvmArguments`.

### Options on `agentlib:jdwp`
- `transport=dt_socket`  means the way used to connect to JVM.
- `address=5005` : **TCP/IP** port exposed, to connect from the debugger
- `suspend=y` : if **`y`**, tell the JVM to wait until debugger is attached to begin execution, otherwise (if **`n`**), starts execution right away.

### Debugging with `IntelliJ Idea`

Open `IntelliJ Idea` and Go to `Edit Coniguration` ( Run > Edit Configuration)

![Edit Configuration PNG]

Click `+` Icon. [Alt + Insert] then Type `remote` and select `Remote`
![Select Remote PNG]

You will see dialog like below.
![Remote Option PNG]

From the information you can see that I copied the `Remote Debugging` information from this dialog. If you didn't change any of the option from previous section you are good to go.
Just a quick note though, on `Host` if you are using `Linux` `'localhost'` will work but, if you are on `Windows / Mac` replace `localhost` with `IP Docker Machine` is running on. Before you click Debug make sure you already executed your application with *meta information*.
If you change the `address` option when you added *meta information* just replace the port number with same.

You should be able to debug your application. If you were stuck on some step please comment below.

### Some references

- [Remote Debugging Maven Spring Boot]
- [Remote Debugging Options]

[Edit Configuration PNG]: {{ site.blog_img_path }}/2016-10-03-remote-debugging/01-edit-configuration.png
{: height="200px" width="500px"}

[Select Remote PNG]: {{ site.blog_img_path }}/2016-10-03-remote-debugging/02-select-remote.png
{: height="200px" width="500px"}

[Remote Option PNG]: {{ site.blog_img_path }}/2016-10-03-remote-debugging/03-remote-option.png
{: height="200px" width="500px"}

[Remote Debugging Options]: <http://stackoverflow.com/questions/138511/what-are-java-command-line-options-to-set-to-allow-jvm-to-be-remotely-debugged>
[Remote Debugging Maven Spring Boot]: <http://stackoverflow.com/questions/39469438/how-to-execute-spring-bootrun-from-terminal-for-remote-debugging>


