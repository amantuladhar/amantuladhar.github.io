---
layout: post
title: Introduction to Java 9 Module
date: 2017-07-11
desc: "Hello World Java 9 Module"
keywords: "java,java9,module,jigsaw,modulesystem,basics,intro"
categories: [Java]
tags: [java,module,jigsaw,java9,module-system]
icon: icon-angular
---

With Java 9 we can use module system called `Jigsaw`. Without talking about module a lot let's dive into modular world of Java.

Before creating any module we have to keep few things in mind
1. Module name and directory name must be same
2. Module name are kept same as package name (reverse domain name) but not mandatory

## Now let's create a module
For this example let's create a module `com.mymodule`. To do so we need to create directory called **com.mymodule**. We will create all of our source files under `src` so our directory we create will be `src/com.mymodule`.

Inside the directory create `module-info.java` file with content

```java
module com.mymodule {
    
}
```
We create module by using `module` keyword. But module is not a reserved keyword in Java 9. `module` keyword is only special on this `module-info.java` file.
With this simple code we have created a module. But we still do not have any code to run so let's write some.

## Write some code to run
I will create a `MyModule.java` file that's prints some string inside `com.mymodule` package.

```java
package com.mymodule;

public class MyModule {
    public static void main(String[] args){
        System.out.println("Hello Module World");
    }
}
```

Here's a directory structure

```
└── src
    └── com.mymodule
        ├── com
        │   └── mymodule
        │       └── MyModule.java
        └── module-info.java
```
## Compile and run the program
To compile we can run 
```bash
javac -d mods --module-source-path src $(find src -name "*.java")
```
So above command compiles all the modules that are located on `src` directory and stores the bytecode at `mods` directory.

To run it we do
```bash
java --module-path mods -m com.mymodule/com.mymodule.MyModule
```

## Output
That's it and you will get the output

```bash
Hello Module World
```

> I wrote a bash script which can do compile and run the java module at one. You can find script [here](https://github.com/atuladhar-aman/java9-basics/blob/master/01-module-basics/run.sh)


With this script you can do `./run.sh main.module.name MainClassToRun`