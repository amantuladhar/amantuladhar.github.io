---
layout: post
title: Java 9 exports and requires
date: 2017-10-04
desc: "Using Java 9 exports and requires"
keywords: "java,java9,module,jigsaw,modulesystem,basics,intro,exports,requires"
categories: [Java]
tags: [java,module,jigsaw,java9,module-system,exports,requires]
icon: icon-java
---

When we are dealing with Java 9 modules we can create an application such that one modules depends on other. We use `exports` keyword to define what visible to outside world and `requires` keyword to define module dependency.

For this example we will create two modules: `com.moduleone` and `com.moduletwo`


## **Scenario**
`com.moduleone` will have some code that will be used my `com.moduletwo`


## **Code for `com.moduleone`**
For now just create a simple method that will print some message

```java
package com.moduleone;

public class ModuleOne {
    public static void callMe(){
        System.out.println("Hello from module one");
    }
}
```


## **Code for `com.moduletwo`**
Create a class that will uses code from `com.moduleone`
```java
package com.moduletwo;

import com.moduleone.ModuleOne;

public class ModuleTwo {
    public static void main(String[] args){
        ModuleOne.callMe();
    }
}
```

## **Compile and run the code**
Compile: `javac -d mods --module-source-path src $(find src -name "*.java")`

Run: `java --module-path mods -m com.moduleone/com.moduleone.ModuleOne`

**OR** 

You can use the [script I created to compile and run the program.](https://github.com/atuladhar-aman/java9-basics/blob/master/01-module-basics/run.sh) 

We run the code using `./run.sh com.moduletwo ModuleTwo` 

```bash
src/com.moduletwo/com/moduletwo/ModuleTwo.java:3: error: package com.moduleone is not visible
import com.moduleone.ModuleOne;
          ^
  (package com.moduleone is declared in module com.moduleone, but module com.moduletwo does not read it)
1 error
```
We get this error because we have not specified that `com.moduletwo` depends on `com.moduleone`. To do this we will use `requires` keyword


## **Declare dependencies / `requires module.name`**
So we tell `com.moduletwo` require `com.moduleone` using `requires` statement. Simply add `requires com.moduletwo;` on `module-info.java` of `com.moduletwo`.

```java
module com.moduletwo {
    requires com.moduleone;
}
```
## **Compile and run again**
But this time you will get another error
```bash
src/com.moduletwo/com/moduletwo/ModuleTwo.java:3: error: package com.moduleone is not visible
import com.moduleone.ModuleOne;
          ^
  (package com.moduleone is declared in module com.moduleone, which does not export it)
1 error
```
If you look closely it says, `com.moduleone` does not exports it. So let's do that.

## **Make code visible outside module / `exports module.name`**
We need to add `exports` statement on module declartion file.
On `com.moduleone` `module-info.java` add `exports com.moduleone;`

```java
module com.moduleone {
    exports com.moduleone;
}
```

## **Compile and run again**
Now you will get console output: `./run.sh com.moduletwo ModuleTwo`

## **Output**
```bash
Hello from module one
```

## **Conclusion**
Hope this simple application helped you understand how `exports` and `requires` keyword works.