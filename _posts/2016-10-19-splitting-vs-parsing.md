---
layout: post
title:  "Splitting with REGex vs Parsing"
date: 2016-10-19
description: "Let's see how we can split the Strings with its performance"
keywords: "java,split,regex,parse,peformance"
categories: [Java]
tags: [Java,REGex]
icon: icon-java
---

In this post I'll walk you through a simple scenario where you have to split the CSV file. It's pretty simple with `JAVA` you just need to call the `split(String)` method of String class. If you want to split your string with comma (,) you can pass comma as argument of `split(,)`.

You need to split the CSV provided below (from now on refer this String as `row`).

```java

// 6 Fields
"1,Jesse,Arnold,jarnold0@cyberchimps.com,Fully-configurable even-keeled portal,65001 Jenna Alley";
```
You can `split()` method of `String` class

```java
final String row = "1,Jesse,Arnold,jarnold0@cyberchimps.com,Fully-configurable even-keeled portal,65001 Jenna Alley";

final int length = row.split(",").length;
System.out.println(length);
```
```
#OUTPUT

6
```
You can see in above example `split()` method is called with comma as argument. Notice we will print out size/length of splitted String to see if we are getting expected result. 

CSV row provided above was simple but, let's add a little twist to our row.

```java
final String row = "1,Jesse,Arnold,jarnold0@cyberchimps.com,\"Fully-configurable, even-keeled, portal\",\"65001, Jenna Alley\"";

final int length = row.split(",").length;
System.out.println(length);
```
```
#OUTPUT

9
```

In above example you have same row but now some field have a comma as there value (**value comma**). **Value comma** are wrapped inside quotes. When you run above program you will have output as `9`. `split()` cannot distinguish between **value comma** and **separator comma** in above example. But with simple Regex magic we can make our `split()` method more **SMART**.

We can pass a Regex as `split()` argument which can target complex scenario as above. ( We will be using *Google Guava Splitter* from now on to split the String)

Here's a method that takes a String as argument and splits it. When you call method below it will ignore the comma that is inside quotes.


```java
public static List<String> splitRegexBackReference(String field) {
    final String otherThanQuote = " [^\"] ";
    final String quotedString = String.format(" \" %s* \" ", otherThanQuote);

    // regex for ignoring comma (,) that is inside quote ("")
    // looking for even number of quotes after the comma

    final String regex = String.format("(?x) " + // enable comments, ignore white spaces
            "%s                         " + // match a delimiter
            "(?=                       " + // start positive look ahead
            "  (                       " + //   start group 1
            "    %s*                   " + //     match 'otherThanQuote' zero or more times
            "    %s                    " + //     match 'quotedString'
            "  )*                      " + //   end group 1 and repeat it zero or more times
            "  %s*                     " + //   match 'otherThanQuote'
            "  $                       " + // match the end of the string
            ")                         ", // stop positive look ahead
        ",", otherThanQuote, quotedString, otherThanQuote
    );

    return Splitter
        .on(Pattern.compile(regex))
        .splitToList(field);
}

```
Let's see this method in action

```java
l String row = "1,Jesse,Arnold,jarnold0@cyberchimps.com,\"Fully-configurable, even-keeled, portal\",\"65001, Jenna Alley\"";

final int size = splitRegexBackReference(row).size();
System.out.println(size);
```
```
# OUTPUT

6
```

When you split the String with the method `splitRegexBackReference()` you will get the expected result and which is shown by printing out the **size** of `List`. Even thought this form of splitting works its not the fastest. Splitting with Regex can be slow.

Another way to split the row is by parsing each character one by one. Let's see what method looks like

```java

private static List<String> parseAndSplit(String field) {
    final List<String> tokensList = new ArrayList<>();
    boolean inQuotes = false;
    StringBuilder b = new StringBuilder();
    for (char c : field.toCharArray()) {
        switch (c) {
        case ',': // this is seperator symbol
            if (inQuotes) {
                b.append(c);
            } else {
                tokensList.add(b.toString());
                b = new StringBuilder();
            }
            break;
        case '\"':
            inQuotes = !inQuotes;
        default:
            b.append(c);
            break;
        }
    }
    tokensList.add(b.toString());
    return tokensList;
}
```

Let's see `parseAndSplit()` in action

```java
final String row = "1,Jesse,Arnold,jarnold0@cyberchimps.com,\"Fully-configurable, even-keeled, portal\",\"65001, Jenna Alley\"";

final int size = parseAndSplit(row).size();
System.out.println(size);
```
```
# OUTPUT

6
```

If you run the above snippet you will get the expected result i.e row is split in 6 parts. I introduced this method telling you that *splitRegexBackReference()* is not the fastest. Let's prove this with little speed calculation.

Here's the example that called both mothod 1000 times and when print average execution nano time.

```java
final String row = "1,Jesse,Arnold,jarnold0@cyberchimps.com,\"Fully-configurable, even-keeled, portal\",\"65001, Jenna Alley\"";

long start = System.nanoTime();
for (int i = 0; i < 1000; i++) {
    splitRegexBackReference(row);
}
final long timeWithSplitting = System.nanoTime() - start;

start = System.nanoTime();
for (int i = 0; i < 1000; i++) {
    parseAndSplit(row);
}
final long timeWithParsing = System.nanoTime() - start;

System.out.printf("Time with splitting:\t%10d\n", timeWithSplitting / 1000);
System.out.printf("Time with parsing:\t%10d\n", timeWithParsing / 1000);
```
```
#OUTPUT 1
Time with splitting:	    266928
Time with parsing:	      9680


#OUTPUT 2
Time with splitting:	    296860
Time with parsing:	      5904

#OUTPUT 3
Time with splitting:	    186909
Time with parsing:	      8605

#OUTPUT 4
Time with splitting:	    225039
Time with parsing:	      6765

#OUTPUT 5
Time with splitting:	    266563
Time with parsing:	      5820

```

If you look at output the time taken by parsing is drastically faster than splitting with Regex.

Here's a Stackoverflow thread from where I've gathered code examples
[Java: splitting a comma-separated string but ignoring commas in quotes](http://stackoverflow.com/questions/1757065/java-splitting-a-comma-separated-string-but-ignoring-commas-in-quotes){:target="_blank"}

Why I called 1000 time instead of just once
[Is nano time useless](http://stackoverflow.com/a/518438){:target="_blank"}
