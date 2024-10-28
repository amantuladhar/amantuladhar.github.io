---
layout: post
title: Java 9 Using exports with to
description: "Java 9 using exports with to"
keywords: "java,java9,module,jigsaw,modulesystem,basics,intro,exports,requires"
tags: java
---

In this example we will create three module
1. `com.moduleone`
2. `com.moduletwo`
3. `com.modulethree`

We will create an example such that `com.moduletwo` and `com.modulethree` is dependent on `com.moduleone` but `com.moduleone` will only export its code to `com.moduletwo`. We will see error that pops up when we try to use the module where it is not exported.

Here's the directory structure

```bash
├── run.sh
└── src
    ├── com.moduleone
    │   ├── com
    │   │   └── moduleone
    │   │       └── ModuleOne.java
    │   └── module-info.java
    ├── com.modulethree
    │   ├── com
    │   │   └── modulethree
    │   │       └── ModuleThree.java
    │   └── module-info.java
    └── com.moduletwo
        ├── com
        │   └── moduletwo
        │       └── ModuleTwo.java
        └── module-info.java
```
I will be modifying the example from previous post so, if you haven't read it here's a link to them
1. [Part 1: Java Module Basics/Intro](http://amantuladhar.github.io/java/2017/10/03/java-9-module-intro.html)
2. [Part 2: Java exports and requires keyword](http://amantuladhar.github.io/java/2017/10/04/java-9-exports-and-requires.html)


From previous example I just modified the `com.moduleone` `module-info.java` file to use `to` keyword.

```java
module com.moduleone {
    exports com.moduleone to com.modulethree;
}
```
```java
package com.moduleone;

public class ModuleOne {
    public static void callMe(){
        System.out.println("Hello from module one");
    }
}
```
The difference here is `com.moduleone` is only exporting it's code to `com.modulethree`. Others cannot access it.

If we don't change the `com.moduletwo` code i.e
```java
module com.moduletwo {
    requires com.moduleone;
}
```
```java
package com.moduletwo;

import com.moduleone.ModuleOne;

public class ModuleTwo {
    public static void main(String[] args){
        ModuleOne.callMe();
    }
}
```

If we compile and run: `./run.sh com.moduletwo ModuleTwo` our example we get error like below
```bash
src/com.moduletwo/com/moduletwo/ModuleTwo.java:3: error: package com.moduleone is not visible
import com.moduleone.ModuleOne;
          ^
  (package com.moduleone is declared in module com.moduleone, which does not export it to module com.moduletwo)
1 error
```
You can see that we get error saying `com.moduleone` doesn't export its code to `com.moduletwo`.

So let's comment out the code on `com.moduletwo` to remove the reference that we are using `com.moduleone`.
```java
module com.moduletwo {
    // requires com.moduleone;
}
```

```java
package com.moduletwo;

// import com.moduleone.ModuleOne;

public class ModuleTwo {
    public static void main(String[] args){
        // ModuleOne.callMe();
    }
}
```

Let's create a third module `com.modulethree` which is the module `com.moduleone` exports its code to.
```java
module com.modulethree {
    requires com.moduleone;
}
```
```java
package com.modulethree;

import com.moduleone.ModuleOne;

public class ModuleThree {
    public static void main(String[] args){
        ModuleOne.callMe();
    }
}
```
Compile and run the code: `./run.sh com.modulethree ModuleThree` and your code will compile successfully and show the result as well.

> NOTE: You can also export your modules to multiple modules by using comma (,) to separate them.

## **Conclusion**
You can see the power of using `exports` with `to` here. If you want your code to be visible to only certain modules you can do that easily.

[GitHub Code](https://github.com/amantuladhar/java9-basics/tree/master/03-export-to-specific-module-only)
