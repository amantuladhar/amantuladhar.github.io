---
layout: post title: Java open and opens keyword with example date: 2017-10-16 description: "Java open and opens keyword
with example"
tags: [java,java9]
---

We have come a long way to exploring the Java Platform Module System.

[Java 9 Module System Intro]({% post_url 2017-10-03-java-9-module-intro %})

[Java 9 using exports and requires]({% post_url 2017-10-04-java-9-exports-and-requires %})

[Export to specific modules only]({% post_url 2017-10-05-java-export-module-to-specific-module-only %})

[Transitive Dependency in Java 9]({% post_url 2017-10-05-java-using-transitive-dependency %})

[Java 9 Automatic Modules]({% post_url 2017-10-09-java-9-automatic-module-with-example %})

In this post we will look at `open` and `opens` keyword.

To make a long story short, we use `open` and `opens` keyword on `module-info.java` file, if we want to provide
reflection API access to module packages.

We will be working with following directory structure. (All files are empty right now)

```bash
└── src
    ├── com.exported
    │   ├── com
    │   │   └── exported
    │   │       └── Exported.java
    │   └── module-info.java
    ├── com.user
    │   ├── com
    │   │   └── user
    │   │       └── User.java
    │   └── module-info.java
    └── com.usertwo
        ├── com
        │   └── usertwo
        │       └── UserTwo.java
        └── module-info.java
```

Let's look at our first module `com.exported`. `module-info.java` file is simple

```java
module com.exported {
    exports com.exported;
}
```

This `com.exported/module-info.java` simply defines module and exportes some packages. This is nothing we haven't seen
yet.

Here's a content of `com.exported.Exorted.java`

```java
package com.exported;

public class Exported {
    public String callMe() {
        return "callMe";
    }
}
```

For now this class is simple, with just one `public` method.

Notice: we haven't used `open` / `opens` yet.

In module `com.user` `module-info.java` file we have fairly simple code as well.

```java
module com.user {
    requires com.exported;
}
```

If we look at `com.user.User.java` we have code that uses reflection.

```java
package com.user;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class User {
    public static void main(String[] args) throws Exception {

        Class<?> exportedClass = Class.forName("com.exported.Exported");
        Constructor<?> con = exportedClass.getDeclaredConstructor();
        con.setAccessible(true);
        Object exportedObj = con.newInstance();

        Method m;

        m = exportedObj.getClass().getMethod("callMe");
        m.setAccessible(true);
        System.out.println("Public : " + m.invoke(exportedObj));
    }
}
```

If we compile and run the program we get following result

```bash
javac -d mods --module-source-path src $(find src -name "*.java")
java --module-path mods -m com.user/com.user.User

--- OUTPUT ---
Public : callMe
```

### Wait!!!

Earlier in the post I said that I had to use `open` / `opens` keyword if I wanted to give reflection API access to
modules code. Why am I able to use reflection now then?. Of course because this is **publicly available exported
package.**

Let's add some code to twist this example. On `com.exported.Exported.java` add one `private` method.

```java
package com.exported;

public class Exported {
    public String callMe() {
        return "callMe";
    }

    private String callMePrivate() {
        return "callMePrivate";
    }
}
```

Now on `com.user.User.java` let's add reflection code to access that method.

```java
package com.user;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class User {
    public static void main(String[] args) throws Exception {

        Class<?> exportedClass = Class.forName("com.exported.Exported");
        Constructor<?> con = exportedClass.getDeclaredConstructor();
        con.setAccessible(true);
        Object exportedObj = con.newInstance();

        Method m;

        m = exportedObj.getClass().getMethod("callMe");
        m.setAccessible(true);
        System.out.println("Public : " + m.invoke(exportedObj));

        m = exportedObj.getClass().getDeclaredMethod("callMePrivate");
        m.setAccessible(true);
        System.out.println("Private : " + m.invoke(exportedObj));
    }
}
```

Compile and run it and we will get following output

```bash
javac -d mods --module-path ./jars/ --module-source-path src $(find src -name "*.java")
java --module-path ./jars/:mods -m com.user/com.user.User

--- OUTPUT ---
Public : callMe
Exception in thread "main" java.lang.reflect.InaccessibleObjectException: Unable to make private java.lang.String com.exported.Exported.callMePrivate() accessible: module com.exported does not "opens com.exported" to module com.user
        at java.base/java.lang.reflect.AccessibleObject.checkCanSetAccessible(AccessibleObject.java:337)
        at java.base/java.lang.reflect.AccessibleObject.checkCanSetAccessible(AccessibleObject.java:281)
        at java.base/java.lang.reflect.Method.checkCanSetAccessible(Method.java:198)
        at java.base/java.lang.reflect.Method.setAccessible(Method.java:192)
        at com.user/com.user.User.main(User.java:22)
```

Notice we were able to access the `public` method with help of reflection but not `private` method. And the error
clearly states that we are not adding statement `opens com.exported`. So let's do that
on `com.exported/module-info.java`.

```java
module com.exported {
    exports com.exported;
    opens com.exported;
}
```

Now if we compile and run the code we will get the following result

```bash
javac -d mods --module-path ./jars/ --module-source-path src $(find src -name "*.java")
java --module-path ./jars/:mods -m com.user/com.user.User

--- OUTPUT ---
Public : callMe
Private : callMePrivate
```

We can take this even further. Because we are using reflection to access the `public` method as well we can
remote `exports com.exported` statement from `com.exported/module-info.java`.

We used `opens` keyword and there more to it, but before going further on `opens` I want to talk about `open` keyword.
So we use `open` keyword when we want to make all of the packages on the module to be accessed by reflection API.
Because this is for all of the packages we use `open` on `module` decleration level.

```java
open module com.exported {
}
```

If you compile and run the command now it will run fine. But for the moment let's step back and foucus more on `opens`
keyword. You know now that `opens` is used if we want selected package to be accessed by reflection API. But what if you
want to give `open` access to only certain packages. Like `exports .. to`, we have `opens .. to` which enables use to
give a fine grain access control mechanism even for reflection API.

Let's see this in action shall we.

For this we will update our `com.exported/module-info.java` so that it `opens` its packages only to `com.user` module.

```java
module com.exported {
    opens com.exported to com.user;
}
```

If you run the program now of course it runs right. By the if you are thinking why I removed `open` keyword we can't
combine those.

So `com.user` module code remains same.

On our third module `com.usertwo` let's add some code (Basically same as `com.user`)

Here's `com.usertwo/module-info.java`

```java
module com.usertwo {
    requires com.exported;
}
```

```java
package com.usertwo;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

// This class cannot use reflection API for com.exporter.Exported
public class UserTwo {
    public static void main(String[] args) throws Exception {
        Class<?> exportedClass = Class.forName("com.exported.Exported");
        Constructor<?> con = exportedClass.getDeclaredConstructor();
        con.setAccessible(true);
        Object exportedObj = con.newInstance();

        Method m;

        m = exportedObj.getClass().getMethod("callMe");
        m.setAccessible(true);
        System.out.println("Public : " + m.invoke(exportedObj));

        m = exportedObj.getClass().getDeclaredMethod("callMePrivate");
        m.setAccessible(true);
        System.out.println("Private : " + m.invoke(exportedObj));
    }
}
```

If we run `com.user/com/user/User.java` as main class we will run our program successfully. But let's try to run our
program with main class `com.usertwo/com/usertwo/UserTwo.java`.

```bash
javac -d mods --module-path ./jars/ --module-source-path src $(find src -name "*.java")
java --module-path ./jars/:mods -m com.usertwo/com.usertwo.UserTwo

--- OUTPUT ---
Exception in thread "main" java.lang.reflect.InaccessibleObjectException: Unable to make public com.exported.Exported() accessible: module com.exported does not "exports com.exported" to module com.usertwo
        at java.base/java.lang.reflect.AccessibleObject.checkCanSetAccessible(AccessibleObject.java:337)
        at java.base/java.lang.reflect.AccessibleObject.checkCanSetAccessible(AccessibleObject.java:281)
        at java.base/java.lang.reflect.Constructor.checkCanSetAccessible(Constructor.java:192)
        at java.base/java.lang.reflect.Constructor.setAccessible(Constructor.java:185)
        at com.usertwo/com.usertwo.UserTwo.main(UserTwo.java:12)
```

We will get this kind of error, it's because we have delecated `opens` to `com.user` only. And for other package this is
still not accesssable.

By the way, did you notice we were using `requires com.exported;` on both module. Even thought we are using reflection
API to access the code. We need to declare that we are using code from that module or else we will get a error.

```bash
avac -d mods --module-path ./jars/ --module-source-path src $(find src -name "*.java")
java --module-path ./jars/:mods -m com.user/com.user.User

--- OUTPUT ---
Exception in thread "main" java.lang.ClassNotFoundException: com.exported.Exported
        at java.base/jdk.internal.loader.BuiltinClassLoader.loadClass(BuiltinClassLoader.java:582)
        at java.base/jdk.internal.loader.ClassLoaders$AppClassLoader.loadClass(ClassLoaders.java:185)
        at java.base/java.lang.ClassLoader.loadClass(ClassLoader.java:496)
        at java.base/java.lang.Class.forName0(Native Method)
        at java.base/java.lang.Class.forName(Class.java:292)
        at com.user/com.user.User.main(User.java:10)
```

So this is it for `open` and `opens` keyword. You can find
the [Github code here](https://github.com/atuladhar-aman/java9-basics/tree/master/06-reflection-java-open-keyword)