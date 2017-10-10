---
layout: post
title: Java 9 automatic module with example
date: 2017-10-09
desc: "Java 9 automatic module with example"
keywords: "java,java9,module,jigsaw,modulesystem,basics,intro,automatic-module,automatic"
categories: [Java]
tags: [java,module,jigsaw,java9,module-system,automatic-module,automatic]
icon: icon-java
---

In previous posts we were exploring how new module system works. 

[Java 9 Module System Intro](http://atuladhar-aman.github.io/java/2017/10/03/java-9-module-intro.html)

[Java 9 using exports and requires](http://atuladhar-aman.github.io/java/2017/10/04/java-9-exports-and-requires.html)

[Export to specific modules only](http://atuladhar-aman.github.io/java/2017/10/05/java-export-module-to-specific-module-only.html)

[Transitive Dependency in Java 9](http://atuladhar-aman.github.io/java/2017/10/05/java-using-transitive-dependency.html)

But in the real world we will use different **jars** which may or may not be modularized. In this post we will talk about what happens if you want to use **jars** that are not modularized yet.

For this example we will be working with following directory structure
```bash
├── jars
│   └── guava-23.0.jar
├── run.sh
└── src
    └── com.moduleone
        ├── com
        │   └── moduleone
        │       └── ModuleOne.java
        └── module-info.java

```
[GitHub code here](https://github.com/atuladhar-aman/java9-basics/tree/master/05-java-9-automatic-modules-example)

Let's write some code on ModuleOne that uses **google-guava** library.

```java
package com.moduleone;

import java.util.List;
import com.google.common.collect.FluentIterable;

class ModuleOne {

    public static void main(String[] args) {
        FluentIterable.from(List.of(1, 2, 3, 4, 5, 6, 7))
            .filter(input -> input % 2 == 0)
            .stream()
            .forEach(System.out::println);
    }
}
```
We could have done above code using Java Stream API but for this example we are using **google-guava** library.

Fill in `module-info.java`
```java
module com.moduleone{
}
```

Because we are using external jar we need to make sure we load it. We can load it alongside our app using `--module-path`
```bash
javac -d mods --module-path ./jars/ --module-source-path src $(find src -name "*.java")
```
Notice on `--module-path` we are using `./jars/`, that is where we are storing our external jars.

If we run the command above now, we will get the following error
```bash
src/com.moduleone/com/moduleone/ModuleOne.java:4: error: package com.google.common.collect is not visible
import com.google.common.collect.FluentIterable;
                        ^
  (package com.google.common.collect is declared in module guava, but module com.moduleone does not read it)
1 error
```

Error clearly says that the code we are trying to use is not specified as `requires` dependency. If you read my previous posts, you should know that we need to use `requries` here. But what module do we **require**. All we did we added a **jar** on the **module path**.

So if we add a external jars that are not modularized to `--module-path` we will be using Java 9 **`automatic modules`** feature. Basically what that means is, that list of exported packages is simply set to be all packages in the jar file.

So does that mean we add `requires external.library.package`? In this case **NO**. This is kind of odd but when we add external jar that is not modularied, and if we want to use that library we add `requires filename` without version numbers.

In this scenario our file name is `guava-23.0.jar` so we add `requires guava;` to our `module-info.java`

```java
module com.moduleone{
    requires guava;
}
```

So to run we need to add jar to `--module-path` like we did when we compiled our code.
```bash
java --module-path ./jars/:mods -m com.moduleone/com.moduleone.ModuleOne
```

If we forget to add our external jar on `--module-path` when we run our program we will get error

```bash
Error occurred during initialization of boot layer
java.lang.module.FindException: Module guava not found, required by com.moduleone
```

Well, this is it for Java 9 automatic module. Cheers!!




