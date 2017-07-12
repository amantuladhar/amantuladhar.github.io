---
layout: post
title:  "Mapping CapsLock to Esc or Control"
date: 2016-10-09
desc: "Changing the behaviour of Caps such that when Caps is clicked it acts as Esc but when click with supporting Letter"
keywords: "linux,mac,osx,map,key,capslock,esc,ctrl,control"
categories: [Misc]
tags: [Linux, OSX, Keyboard]
icon: icon-osx
---

If you use `VIM` you know pain of pressing `ESC` button. Your pinky finger needs to stretch a lot. In this post I'll try to remove the burden of your pinky finger.I'll show you ways to map your `Caps` as `ESC` when pressed alone but, when pressed with other keys like `a` will it will be registered as `Control`. To make long story short when you press `Caps` you will register `ESC` key and when you press `Caps + a` you will register `Ctrl + a`.

For this to work we are going to use [xcape](https://github.com/alols/xcape)

You can install the `xcape` with the instruction provided. After following the instruction type

```bash
which xcape

# OUTPUT
/usr/bin/xcape
```
If it shows you the path then you are all good to go.

----

Follow the instruction below 

- Copy your `xcape` executable to your `$PATH`

- Add the following snippet to you `~/.profile`

```bash
setxkbmap -option `ctrl:nocaps`
xcape -e 'Caps_Lock=Escape;Control_L=Escape;Control_R=Escape'
```

- Restart your machine and you should be good to go.

----
Sometime above instructions doesn't work if above instruction doesn't work for you, Here's another way to configure keys

- Edit `/etc/default/keyboard`( `sudo vim /etc/default/keyboard`)

- On `XKBOPTIONS` add `ctrl:nocaps`. If your `XKBOPTIONS` are not empty you can append options with `;`. 

- Add 

```bash
xcape -e 'Caps_Lock=Escape;Control_L=Escape;Control_R=Escape'
```
- Run 

```bash
sudo dkpg-reconfigure keyboard-configuration
```

Now you should be good to go. Let me know if this worked for you.


