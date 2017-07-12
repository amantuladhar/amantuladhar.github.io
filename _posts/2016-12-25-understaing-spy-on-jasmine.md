---
layout: post
title:  "Getting familiar with spyOn for Angular Testing"
date: 2016-12-25
desc: "Let's look at power of spyOn"
keywords: "js,javascript,jasmine,test,angularjs,spy"
categories: [Angular]
tags: [JavaScript,Karma,Jasmine,AngularJS, spy]
icon: icon-angular
---

Now that we know how to do simple testing let's get familiar with `spy` feature of `jasmine`.
In previous post we saw different way of mocking services and/or objects.

Let's start with simple example of `spyOn`

```javascript

    it('spy', function() {
        var spyObject = {
            someFunction: function(args) {
                return 'SomeFunction' + ' ' +  args;
            }
        };

        spyOn(spyObject,'someFunction');

        spyObject.someFunction();

        expect(spyObject.someFunction).toHaveBeenCalledTimes(1);

    });

```

In above example we declared simple object (`spyObject`) which has one function (`someFunction()`).
If we want to spy on some method we can use jasmine global function `spyOn()`.
`spyOn(<object>,<method_to_spy_on>)` accepts object as first parameter. It is a object where our target function which we 
want to spy on exist.
Second parameter is the name of the method that we want to spy on.
After we stated the statement to spy on our function we called that function and we added expectation to check if the function
was called exactly once.

A spy can stub any function and tracks calls to it and all arguments. 
When ever we track any function we need to remember that it will be removed after each spec. 

If we want to check if the method was called ignoring the number of times it was called we can use `.toHaveBeenCalled()`

```javascript

    expect(spyObject.someFunction).toHaveBeenCalled();

```

If we want to check if the function was called with specific argument we can we `.toHaveBeenCalledWith()`

```javascript

    spyObject.someFunction('ABC');
    expect(spyObject.someFunction).toHaveBeenCalledWith('ABC');

```

One thing to remember about `.toHaveBeenCalledWith()` that this method checks if the function was called which specified
argument at least one time. For example following snippet is also true

```javascript

spyObject.someFunction('ABC');
spyObject.someFunction('ABCDEGF');
expect(spyObject.someFunction).toHaveBeenCalledWith('ABC');

```

This method works fine when we want to track calls but if we check the return value from the function you will see that 
it doesn't return anything.

```javascript

 var returnValue = spyObject.someFunction('ABC');

expect(returnValue).toEqual('SomeFunction ABC'); // This will fail

```

So whats happening here. When we spied the function the function stopped all the calles and it just tracked calls and argument.
If you want function call to delegate to the actual implemantation we need to add `.and.callThrouch()` on spy statement.

```javascript

spyOn(spyObject,'someFunction').and.callThrough();

var returnValue = spyObject.someFunction('ABC');

expect(returnValue).toEqual('SomeFunction ABC'); // This will now pass

```

we can also return fake value from spied function

```javascript

spyOn(spyObject,'someFunction').and.returnValue('Returned');

var returnValue = spyObject.someFunction('ABC');

expect(returnValue).toEqual('Returned');

```

We can also call fake function from spied function

```javascript

        spyOn(spyObject,'someFunction').and.callFake(function(){
            return 'FakeFunction'
        });

        var returnValue = spyObject.someFunction('ABC');

        expect(returnValue).toEqual('FakeFunction');
        
```

We have lot of other traking properties which can be view on [Jasmine Introduction Page](https://jasmine.github.io/edge/introduction.html?spec=Manually%20ticking%20the%20Jasmine%20Clock%20causes%20an%20interval%20to%20be%20called%20synchronously#section-Spies)


