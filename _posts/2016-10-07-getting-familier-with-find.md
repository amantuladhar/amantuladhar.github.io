---
type: post
title: Getting Familier with linux find command
subtitle: Search and locate files / directories using find command
---

The `find` command is one of the most important and much used command in Linux systems. `find` command is used to search and locate list of files and directories based on conditions you specify for files that match the arguments. In this article we will get familier with linux `find` command.

First things first, to get more knowledge on any linux command we can use linux manual page using `man <command_name>`. For more information about find you can use `man find` and you'll get in depth description on how we can use linux command.

Basic use of find looks somewhat like below

```bash
find .
```

Let's get familier which the syntax of `find`. In above example we have two parts

1. `find` : find is the command itself
2. `.` : `.` (dot) represents the path from where we want to search. We can pass any path here and find will start to look from the path what was provided.

If you run the command, you will get list of all the files and directories that is inside the path that was given as argument.

But I assume you don't want to search for all files. You may want to search for file from `/` directories that has specific name. To seach for specific file `/` directories we can use `-name option`. Here's an example of `find` which search for the file `/` directories with the name `.gitignore`

```bash
find . -name '.gitignore'

# OUTPUT

./.gitignore
```

You can see that we are using `.` here. If you wanted to start search from root you are free to pass `/` as you seach directory.

Did you notice that I kept on saying search for file or directories. By default `find` will try to match the option of `-name` on both directories and files. If you want to limit your search for file or directories you can use `-type` option.

```bash
find . -type d -name 'img'

# OUTPUT

./_site/img
./img
```

If you pass `d` argument on `-type` option your search will limit to directories only.

```bash
find . -type f -name '.gitignore'

# OUTPUT

./.gitignore
```

If you pass `f` argument on `-type` option your search will limit to files.

Linux system are case sensitive. What if you want to seach file ignoring the case. `-iname` can be use to do just that.

```bash
find . -iname '.gitignore'
```

You can also search file with certain extention. Let's search file with `.css` extention

```bash
find . -type f -name '*.css'

# OUTPUT
./css/bootstrap-theme.css
./css/pygment_highlights.css
./css/main-minimal.css
./css/bootstrap.css
./css/bootstrap.min.css
./css/normalize.css
./css/bootstrap-theme.min.css
./css/main.css
```

We can use `*` to indicate any character. We can also search files with multiple extention. Suppose you want to search file with `.css` and `.html`. You can do that with

```bash
find . -name '*.css' -or -name '*.html'

# OUTPUT

./_layouts/post.html
./_layouts/default.html
./_layouts/page.html
./_layouts/base.html
./index.html
./css/bootstrap-theme.css
./css/pygment_highlights.css
./css/main-minimal.css
./css/bootstrap.css
./css/bootstrap.min.css
./css/normalize.css
./css/bootstrap-theme.min.css
./css/main.css
```

Notice how we are joining the option `-name` in above syntax using `-or`. `-or` can be used with its alias `-o` You may have guessed that we can use `-and` too. Here's an example of `find` using `-and`.

```bash
# find . -name 'm*' -name '*.css'
find . -name 'm*' -and -name '*.css'

# OUTPUT
./_site/css/main-minimal.css
./_site/css/main.css
./css/main-minimal.css
./css/main.css
```

Now that you know about `-or` and `-and`, you may have imagined endless possibilities of search patterns. Just a quick note, if you use two `-name` without `-and` on above example it would act as `-and`. Quick hint !! you have `-not` option too. `-not` can be used with its alias `!`. `-or` , `-and` and `-not` can be used with other option too.


You can also control how deep you want to search usign `-maxdepth`

```bash
find . -maxdepth 1 -name '*.html'

# OUTPUT
./index.html
```

You can use `find` to search the files / directories based on modified, changed or accessed days and minutes.

For days you have `-mtime`, `-atime`, `-ctime` and for minutes you have `-mmin`, `-amin`, `-cmin`. Option prefixed with `m` denotes modified, `a` denotes accessed and `c` denotes changed.

```bash
find . -mtime 20
find . -atime 20
find . -ctime 20
find . -mmin 20
find . -amin 20
find . -cmin 20
```
We can also use `+` and `-` symbol number provied. For example

```bash
find . -mtime +5
```
Above command  find the file which was not modified in last 5 days.

```bash
find . -mtime -5
```

Above command  find the file which was modified within last 5 days.

You can also go for range of days and minutes. Here's an example

```bash
find . -mtime +5 -mtime -10
```
Above command finds the files / directories that are modifined between 5 to 10 days


```bash
find . -mmin +5 -mtime -10
```

Above command finds the files / directories that are modifined between 5 to 10 minutes.

To search the file that has specific size you can use `-size` option

```bash
find . -type f -size 2M
```
Above command search file that has exactly 50M. We can also use `+` and `-` symbol on the number here. For example

```bash
find . -type f -size -2M
```
This command will find the files that has size of 2MB and less

For range you can do

```bash
find . -type f -size +2M -size -10M
```

To find empty file or directory you can use `-empty` option

```bash
find . -empty
```

`find` also has option `-user`, `-group` and `-perm` which lets you search the file that is associated with specific user, group or if the file has certain permission.

You can also perform certain operation on the files / directories that are searched and found using `-exec` option.

For this example here is the list of files and dir that I have

```
-rw-rw-r--  1 aman aman    0 Oct  7 10:30 four.html
-rw-rw-r--  1 aman aman    0 Oct  7 10:30 one.txt
drwxrwxr-x  2 aman aman 4096 Oct  7 10:31 somedir
-rw-rw-r--  1 aman aman    0 Oct  7 10:30 three.txt
-rw-rw-r--  1 aman aman    0 Oct  7 10:30 two.php
```

To rename the two.php to two.html you can issue following command

```bash
find . -type f -name 'two.php' -exec mv -f {} two.html \;

# ls -l

-rw-rw-r--  1 aman aman    0 Oct  7 10:30 four.html
-rw-rw-r--  1 aman aman    0 Oct  7 10:30 one.txt
drwxrwxr-x  2 aman aman 4096 Oct  7 10:31 somedir
-rw-rw-r--  1 aman aman    0 Oct  7 10:30 three.txt
-rw-rw-r--  1 aman aman    0 Oct  7 10:30 two.html
```

Let's explain what `-exec` is performing. After `-exec` we are writing the command that we want to execute. In our example we wanted to change `two.php` to `two.html`. Notice we are using `{}` placeholder in **source** section. To end the `-exec` command we are using `\;`.

I know on destination we used static text. What if we want to use change all `html` files to `php` now. Here's the command

```bash
find . -type f -name '*.html' -exec bash -c 'mv "$1" "${1%.html}".php' - {} \;
```
Now that's a complex command. Let's me explain what's happening.

First we are passing `bash -c '<command_to_execute_inside_bash>' - <param_to_send>` on `-exec`. The command will execute for each entry that is found by `find` command. If find finds 5 files with `*.html` it will run the command 5 times.

Lets look at the command that we passed for execution i.e `mv "$1" "${1%.html}".php`.

`$1` is the first argument that was passed to command. For example if we have 2 file with html extention. It will send 1st file found to command as its 1st argument and command execution will take place. Then, it goes for 2nd find found and will again pass the file name as its 1st argument.So if we have two file `one.html` and `two.html` our `find` command will find the `one.html` first and it will execute our command which argument `one.html`. So on first execution `$1` value will be `one.html` and on second execution `$1` will be `two.html`

Next we have `"${1%.html}".php`. In a simple term if `$1` represents `one.html` then `"${1%.html}"` will represent `one`. So `"${1%.html}".php` will represent `one.php`. Visit [Bash Referrence Manural](http://www.gnu.org/software/bash/manual/bashref.html#Shell-Parameter-Expansion) for more detail.

If we have two file `one.html` and `two.html`. When our command execute the first time ti will look like `bash -c 'mv one.html one.php'` and second time `bash -c 'mv two.html two.php'`.

Here's the output

```bash
-rw-rw-r-- 1 aman aman    0 Oct  7 10:30 four.php
-rw-rw-r-- 1 aman aman    0 Oct  7 10:30 one.txt
drwxrwxr-x 2 aman aman 4.0K Oct  7 10:31 somedir
-rw-rw-r-- 1 aman aman    0 Oct  7 10:30 three.txt
-rw-rw-r-- 1 aman aman    0 Oct  7 10:30 two.php
```

`find` is very handy command and I hope this article helped you get an insight on how you can use `find` to search files and directories you need.
