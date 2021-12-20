---
layout: post
title: Java 9 Transitive Dependency
date: 2017-10-05
description: "Java 9 Transitive Dependency"
keywords: "java,java9,module,jigsaw,modulesystem,basics,intro,exports,requires,transitive"
categories: [Java]
tags: java
icon: icon-java
---



Let's see how Java handles transitive dependencies. We will be creating three modules
1. `com.moduleone`
2. `com.moduletwo`
3. `com.modulethree`

With these module we will see how `transitive` keyword works.

Here's a directory structure we will be creating

```bash
└── src
    ├── com.moduleone
    │   ├── com
    │   │   └── moduleone
    │   │       └── ModuleOne.java
    │   └── module-info.java
    ├── com.modulethree
    │   ├── com
    │   │   └── modulethree
    │   │       └── ModuleThree.java
    │   └── module-info.java
    └── com.moduletwo
        ├── com
        │   └── moduletwo
        │       └── ModuleTwo.java
        └── module-info.java
```

Let's start with creating `com.moduleone`
```java
module com.moduleone{
    exports com.moduleone;
}
```
```java
package com.moduleone;

public class ModuleOne{
    public static void callMe(){
        System.out.println("This is module one code");
    }
}
```
This was straight foward right!!

Now let's create `com.moduletwo`
```java
module com.moduletwo{
    requires com.moduleone;
    exports com.moduletwo;
}
```
```java
package com.moduletwo;

public class ModuleTwo{}
```

In `com.moduletwo` we declared that we required `com.moduleone` but we are not using it. But for this sake of this example let's assume `com.moduletwo` is using `com.moduleone` code.

Now to the fun part!!
Create a third module `com.modulethree`

```java
module com.modulethree {
    requires com.moduletwo;
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
If we run it now, we will get the problem because we have not declared that `com.modulethree` **requires** `com.moduleone`.

We can fix that by adding add `requires` statement on `src/com.modulethree/module-info.java`
```java
module com.modulethree {
    requires com.moduletwo;
    requires com.moduleone;   
}
```

But this is not the solution we will be using because we want know how transitive dependencies work on Java 9. So, we will remove that `requires` statement we added and on `com.moduletwo` `module-info.java` file we add `transitive` keyword after `requires` like

```java
// src/com.moduletwo/module-info.java
module com.moduletwo{
    requires transitive com.moduleone;
    exports com.moduletwo;
}
```
Now if you compile our code compile and runs successfully. Notice we are still not declaring that `com.modulethree` requires `com.moduleone` but because of transitive dependency we are able to use it. Keyword `transitive` must come after keyword `requires`. 

If **module B** has `requires transitive` dependency on **module A** and **module C** simpley `requires` **module B**, then **module C** will have *implicit dependence* on **module A**.

[GitHub Code](https://github.com/atuladhar-aman/java9-basics/tree/master/04-java-transitive-dependency)