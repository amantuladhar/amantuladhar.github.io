---
layout: post
title:  "Testing Controller in AngularJS"
date: 2016-11-30
description: "In this article I'll show you how we can test AngularJS Controller which doesn't have any dependencies"
keywords: "js,javascript,jasmine,test,angularjs,karma,controller"
categories: [Angular]
tags: [JavaScript,Karma,Jasmine,AngularJS, controller]
icon: icon-angular
---

In [Part 1](https://atuladhar-aman.github.io/blog/2016-11-23-unit-testing-angular-1-part-1/) [Part 2](https://atuladhar-aman.github.io/blog/2016-11-24-integrate-karma-with-jasmine/) and [Part 3](https://atuladhar-aman.github.io/blog/2016-11-25-using-gulp-to-run-karma/) of this article we didn't talk a lot about testing. Those 3 parts were more focused on **configuration** required to do testing.

In this article I'll show you how we can test simple AngularJS **`Controllers`**.

Here's the folder structure that we are going to use.

<img src="{{ site.blog_img_path }}/2016-11-30-angular-testing-simple-controller/angular-app-structure.png" width="40%" style="padding-left: 20%" />

[Here are content of those file if you want to follow along](https://gist.github.com/atuladhar-aman/47a2ad4f53cba8977be3943ec883c3ff)

We are going to write our test on `TodoControllerSpec.js`. Before writing the test let's look at `todo.controller.js`

```javascript
(function(angular) {
    'use strict';
    angular
        .module('app')
        .controller('TodoController', TodoController);

    TodoController.$inject = ['$scope'];

    function TodoController($scope) {
        $scope.todos = [
            {'title': 'First Todo', 'done': false}
        ];
        $scope.add = add;
        $scope.clearCompleted = clearCompleted;

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        function add() {
            $scope.todos.unshift({'title': $scope.newTodo, 'done': false});
            $scope.newTodo = "";
        }

        function clearCompleted() {
            $scope.todos = $scope.todos.filter(function(todo) {
                return !todo.done;
            });
        }
    }

})(angular);
```

If you look at above code snippet carefully you can see that the controller has convenience method to `add()` and `clearCompleted()` to add the Todo and Clear the completed Todo.

Since we are going to write the `unit test` we can ignore the **HTML** file and focus on business logic.

Open `TodoControllerSpec.js` and create the suite by using `describe()`. [Here's the full content](https://gist.github.com/atuladhar-aman/75b77a45b42666b963a654b27cc6b686) of `TodoControllerSpec.js` if you want to peek at it.

```javascript
describe('Test for TodoController', function(){

});
```
Now we need to initialize the `module` we can do that by using `module` function.

```javascript
describe('Test for TodoController', function(){
    beforeEach(angular.mock.module('app'));
});
```

Now that module is loaded we need to resolve reference of `$controller` service we can do that by using `inject()`

```javascript
describe('Test for TodoController', function(){
    beforeEach(angular.mock.module('app'));

    var $controller;

    beforeEach(angular.mock.inject(function(_$controller_) {
        $controller = _$controller_;
    }));
});
```

Now we have reference of `$controller` service which can be used to get initialize our `TodoController`.

First of all let's create the inner suite to test the `add()` functionality of our controller.

```javascript
describe('Test for TodoController', function(){
    beforeEach(angular.mock.module('app'));

    var $controller;

    beforeEach(angular.mock.inject(function(_$controller_) {
        $controller = _$controller_;
    }));
    
    describe('Test add functionality of Controller',function(){
        
    });
});
```

Inside of new suite we will write some unit test using `it()`. On each on every test we need our `TodoController` so this is a good candidate for using `beforeEach()`. Let's initialize `TodoController`.

```javascript
describe('Test add functionality of Controller', function() {
        var controller;
        var scope;

        beforeEach(function() {
            scope = {};
            controller = $controller('TodoController', {
                $scope: scope
            });
        });

});
```

To initialize the `TodoController` we use `$controller` service. First argument `$controller` accepts is the controller name.

Second arguments on the curly braces are the dependencies that the controller has. I know I told you that we will be testing the controller that doesn't have any dependencies. But relax it is just `$scope`.

We are ready to write some unit tests. If you looked at the code you will see that we have default todo. So when our app starts there must be atleast one todo in the list. Let's check that with some expectation.

```javascript
describe('Test add functionality of Controller', function() {
        var controller;
        var scope;

        beforeEach(function() {
            scope = {};
            controller = $controller('TodoController', {
                $scope: scope
            });
        });

        it('Should have 1 todo at first', function() {
            expect(scope.todos.length).toEqual(1);
        });

    });
```

In above test we are expecting that there must be exactly 1 todo on the `scope`.

Let's add some more test for `add` behaviour.

```javascript
it('Should add new Todo when click go', function() {
    scope.newTodo = "Second Todo";
    scope.add();
    expect(scope.todos.length).toEqual(2);
});

it('Should add new todo at top of list', function() {
    scope.newTodo = "Second Todo";
    scope.add();
    var addedTodo = scope.todos[0];
    expect(addedTodo.title).toBe('Second Todo');
    expect(addedTodo.done).toBe(false);
});

it('Should Clear scope.newTodo after add()', function() {
    scope.newTodo = "Second Todo";
    scope.add();
    expect(scope.newTodo).toBe("");
});
```

The first test adds the new todo and checks the length of todos and see if its incremented by 1 i.e 2 for us.

Second one also adds the new todo but it checks to see if todo is added in top. Since we are using `unshift` it should add todo on top of the list.

Third one simply checks if `newTodo` properties is cleared after todo was added.

Like wise you can create the test to check the behaviour of `clearCompleted`. Here's how I wrote the test

```javascript
describe('Test should clear completed todos', function() {

        var controller;
        var scope;

        beforeEach(function() {
            scope = {};
            scope.todos = [
                {
                    'title': "One",
                    'done': false
                }, {
                    'title': "Two",
                    'done': true
                }, {
                    'title': "Three",
                    'done': true
                }
            ];
            controller = $controller('TodoController', {
                $scope: scope
            });
        });

        it('Should clear completed todos', function() {
            scope.clearCompleted();
            expect(scope.todos.length).toBe(1);
        });

        it('Should clear completed todos', function() {
            scope.clearCompleted();
            var remainingItem = scope.todos;

            remainingItem.forEach(function(item) {
                expect(item.done).toBe(false);
            });
        });

    });
```

To run the test you can use `gulp test`. You can see the result on terminal.

In this post you got familier with basic unit testing capabilities for an angular controller. We will see some more advance angular testing using mock services in next part of this series. Until we meet again. GOOD BYE !!
