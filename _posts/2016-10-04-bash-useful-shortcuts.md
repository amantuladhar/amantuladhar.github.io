---
layout: post
title: "Bash Shortcuts"
description: Useful shortcuts that we can use on Bash
summary: Useful shortcuts that we can use on Bash
tags: [linux, shell, shortcut, bash, zsh, command]
---

Most of us are familier with executing commands on terminal. But, did you now that bash has set of convinent shortcuts that can make our life a lot more easier.

Sometimes when we are typing command and all of sudden we forget to add **sudo**. We can press `CTRL + a` and goto start of command line then type **sudo**

<img src="{{ site.blog_img_path }}/2016-10-04-BashShortcuts/ctrl-a.gif" width="40%" />

Now we are at the middle and we want to complete our command. Pressing `CTRL + e` will move your cursor to End of line

<img src="{{ site.blog_img_path }}/2016-10-04-BashShortcuts/ctrl-e.gif" width="40%" />

When we try to install `VLC` we forget to add `-y` on our command. We know how to move cursor in the beginning but, how do we move cursor back a word. Don't worry `bash` has just the shortcut we need. If you want to traverse back a word at a time you can press `ALT + b`

<img src="{{ site.blog_img_path }}/2016-10-04-BashShortcuts/alt-b.gif" width="40%" />

In above *GIF* you can see that cursor is moved back twice. Hmm. All things looks good now. But **`WAIT!!!!`** We want to install `GIT` before `VLC` (consider it as dependency). We need to move cursor foward a word. We can press `ALT + f`

<img src="{{ site.blog_img_path }}/2016-10-04-BashShortcuts/alt-f.gif" width="40%" />

All of sudden you don't want to install `VLC` now. Cursor is at beginning of **vlc**. To delete the line after the cursor we can use `CTRL + k`.

<img src="{{ site.blog_img_path }}/2016-10-04-BashShortcuts/ctrl-k.gif" width="40%" />

Hmm. now we don't want to install `GIT` either. Since your cursor is at end we can use `CTRL + w` to delete just one word before the cursor.

<img src="{{ site.blog_img_path }}/2016-10-04-BashShortcuts/ctrl-w.gif" width="40%" />

We don't know what to install now. To delete remaining incomplete command you can use `CTRL + u`

<img src="{{ site.blog_img_path }}/2016-10-04-BashShortcuts/ctrl-u.gif" width="40%" />

----

### Searching History

Lets see how we can search through history. For demonstration here is the list of history that I have

<img src="{{ site.blog_img_path }}/2016-10-04-BashShortcuts/series-of-history.png" width="30%" />

Pressing `CTRL + p` will navigate back to history.

<img src="{{ site.blog_img_path }}/2016-10-04-BashShortcuts/ctrl-p.gif" width="40%" />

You may have guessed to go foward we have `CTRL + n`

<img src="{{ site.blog_img_path }}/2016-10-04-BashShortcuts/ctrl-n.gif" width="40%" />

`CTRL + p` and `CTRL + n` is handy shortcut but often when we search our history we may know `letter / word` the command starts with. Lets say we want to search history that start with `command`. Type `command` on terminal and pressing `ALT + p` will go back one history which starts with `letter / word` that is provided in our case `command`.

<img src="{{ site.blog_img_path }}/2016-10-04-BashShortcuts/alt-p.gif" width="40%" />

Similarly pressing `ALT + n` will navigate foward one history which starts with `letter / word` that is provided.

<img src="{{ site.blog_img_path }}/2016-10-04-BashShortcuts/alt-n.gif" width="40%" />

When we search through history we may not know how command is started. But, we may have a know some `letters / word` that the command has. In that case we can use `CTRL + r` to search history. Pressing `CTRL + r` will search the history and checks if the `letters / word` you provided is avaiable on any part of the command. Suppose you have a command like below

```bash
bundle exec jekyll serve
```

To search this command you can press `CTRL + r` and press any `letters / word` that is present on command. For example we can search by using word **jekyll**.

<img src="{{ site.blog_img_path }}/2016-10-04-BashShortcuts/ctrl-r.gif" width="40%" />

We may not find the command right away. We can go back a history again by pressing `CTRL + r`. If you want to move foward you can use `CTRL + s`.

Here's the simple example of moving **backward** and **foward** a history. (Using the history that was shown above)

<img src="{{ site.blog_img_path }}/2016-10-04-BashShortcuts/ctrl-rNs.gif" width="40%" />

Notice in above *GIF* when I was traversing back to history [`CTRL + r`], we can see text `bck-i-search`. And when I was traversing foward to history [`CTRL + s`], we can see text `fwd-i-search`

----

Let me know if you found this post useful. If I missed some cool shortcut that bash provides please add it in the comment below.

----

### Source

- [howtogeek]


[howtogeek]:<http://www.howtogeek.com/howto/ubuntu/keyboard-shortcuts-for-bash-command-shell-for-ubuntu-debian-suse-redhat-linux-etc/>






