---
layout: post
title: PostConstruct Annotation
subtitle: What and where can we use @PostConstruct
---

In this article we will talk about `@PostConstruct`. Let's start with simple example

```java
@Service
@Slf4j
public class SomeServiceImpl implements SomeService{
    public SomeServiceImpl(){
        log.info("From constructor");
    }
    @PostConstruct
    public void postConstruct(){
        log.info("From PostConstruct");

    }
}
```

If we run our application we will see output displayed on following sequence

    From constructor
    From PostConstruct

From the output we can see that method annotated with `@PostConstruct` is called after the `Constructor`.

`@PostConstruct` is an annotation which can be used on a method that needs to be executed after *dependency injection* is done to perform any *initialization*. So method annotated with `@PostConstruct` are called after the `Constructor` and after all the dependency of the class are resolved too. This kind of behaviour is not much important when we are doing **Constructor Injection**. But if we are using **Setter or Field Injection** then dependency of the class may not be resolved when `Constructor` is invoked. For example

```java
@Service
@Slf4j
public class SomeServiceImpl implements SomeService{

    @Autowired
    SomeRepository someRepository;

    public SomeServiceImpl(){
        someRepository.someMethod();
        log.info("From constructor");
    }

    @PostConstruct
    public void postConstruct(){
        log.info("From PostConstruct");

    }
}
```

In above code we are `Autowiring` **(Field Injection)**  `SomeRepository` and we are calling the method of *someRepository* on `Constructor`. If we try to run this program then we will get a `NullPointerException` on Line Number 9. When `Constructor` is invoked `SomeRepository` is not yet resolved and is still `null`.

If we move the *method call* from `Constructor` to `@PostConstruct` like below

```java
@Service
@Slf4j
public class SomeServiceImpl implements SomeService{

    @Autowired
    SomeRepository someRepository;

    public SomeServiceImpl(){
        log.info("From constructor");
    }

    @PostConstruct
    public void postConstruct(){
        someRepository.someMethod();
        log.info("From PostConstruct");

    }
}
```

all the dependencies will be resolve and instance of `someRepository` will not be `null` when `@PostConstruct` is called.

# Some Key Points
 - `@PostConstruct` is called after `Constructor`
 - By the time `@PostConstruct` is called all the dependencies of the class will already be resolved
 - Can be annotated for one method per class
 - The method on which `@PostConstruct` is applied **MAY** be `public, protected, package private or private`.
 - The method **MUST NOT** be `static` except for the application client.
 - The method **MAY** be `final`.

[Click here for more information]

[Click here for more information]: <http://docs.oracle.com/javaee/7/api/javax/annotation/PostConstruct.html>

