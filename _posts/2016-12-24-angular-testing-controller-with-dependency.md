---
layout: post
title:  "Testing Controller (with Dependencies) in AngularJS"
date: 2016-12-24
desc: "In this article I'll show you how we can test AngularJS Controller which have any dependencies"
keywords: "js,javascript,jasmine,test,angularjs,karma,controller"
categories: [Angular]
tags: [JavaScript,Karma,Jasmine,AngularJS, controller]
icon: icon-angular
---

In [Part 4](https://atuladhar-aman.github.io/blog/2016-11-30-angular-testing-controller/) of this series we looked at 
how we can test AngularJS Controller which doesn't have any dependencies. But, in real world,
AngularJS Controllers usually dependent on Services. In this post we will look, how we can unit test controllers
which have dependencies.
On the way, we will explore how we can use `angular.mock.module(...)`. 
We will get insight on how `angular.mock.inject()` works.

Here's a simple todo app which has has `TodoController` and `TodoService`. `TodoController` is dependent on `TodoService`.

```javascript

(function(angular) {
    'use strict';
    angular
        .module('app')
        .controller('TodoController', TodoController)
        .factory('TodoService', TodoService);

    TodoController.$inject = ['$scope','TodoService'];

    function TodoService() {
        var that = this;

        that.todos = [
            {'title': 'First Todo', 'done': false}
        ];

        return {
            getAll : getAll,
            add: add,
            clearCompleted: clearCompleted
        };

        function getAll(){
            return that.todos;
        }

        function add(newTodo) {
            that.todos.unshift({'title': newTodo, 'done': false});
            return that.todos;
        }

        function clearCompleted() {
            that.todos = that.todos.filter(function(todo) {
                return !todo.done;
            });
            return that.todos;
        }
    }

    function TodoController($scope, TodoService) {

        $scope.todos = TodoService.getAll();

        $scope.add = add;
        $scope.clearCompleted = clearCompleted;

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        function add() {
            $scope.todos = TodoService.add($scope.newTodo);
            $scope.newTodo = "";
        }

        function clearCompleted() {
            $scope.todos = TodoService.clearCompleted();
        }
    }
})(angular);

```

Since we will be unit testing controller we will need the **mocked** `TodoService`. We can create mocked `TodoService` using 3 ways

1. Using `angular.mock.module(<passing object>)`
2. Using `angular.mock.module(<passing function>)`
3. Creating `simple object` and passing it when we initialize controller

Before we start these 3 topic let's write some test

```javascript

describe('TodoController', function() {

    var $controller;

    beforeEach(module('app'));

    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
    }));

    describe('When initialized', function() {

        it('Then $scope.todos must have default todo', function() {

            var scope = {};
            $controller('TodoController', {$scope: scope});

            expect(scope.todos.length).toBe(1);

        });

    });

});

```

If you run above test it will run fine. We didn't mock the `TodoService` and we didn't passed `TodoServie` so how is this test working.
This example shows the `angular injector` in action. Here `injector` acts as **Service locator**.

If we want to get hold of `TodoService` we can use `angular.mock.inject(..)` which acts as wrapper for angular injector

```javascript

        it('Directly calling Service', function() {

            var TodoService;
            inject(function(_TodoService_){
                TodoService = _TodoService_;
            });

            var length = TodoService.getAll().length;
            expect(length).toBe(1);

        });

```

Now that we know how angular `injector` helps to locate our service, let's look at how we can mock the service classes. Note: 
above example calles the real service methods.


### Let's mock services using `angular.mock.module(...)` by passing object

Here's a updated test

```javascript

describe('TodoController', function() {

    var $controller;

    beforeEach(module('app'));

    // Mocking TodoService
    // Using angular.mock.module(object);
    beforeEach(function() {
        var todo = [
            {'title': 'Test Todo', 'done': false},
            {'title': 'Test Todo', 'done': false}
        ];

        var TodoService = {
            todos: todo,
            getAll: function() {
                return todo;
            },
            add: function() {
            },
            clearCompleted: function() {
            }
        };

        var objectToBePassed = {
            'TodoService': TodoService
        };

        module(objectToBePassed);
    });

    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
    }));


    describe('When initialized', function() {

        it('Then $scope.todos must have default todo', function() {
            var scope = {};
            $controller('TodoController', {$scope: scope});

            expect(scope.todos.length).toBe(2);

        });
    });

});

```

In above example we are passing `object` to `angular.module.module(...)`.
Object that we passed to `angular.mock.module(...)` have key that matches service name that we want to mock.
In our case its `TodoService`.
To prove we are using mocked service we increased the default size of todo to 2. If you look at our `expectation` we are
asserting length of todos to be 2 instead to 1 to match with mocked service.

### Using `angular.mock.module(...) by passing function to mock service`

Example

```javascript

describe('TodoController', function() {

    var $controller;

    beforeEach(module('app'));

    // Mocking TodoService
    // Using angular.mock.module(function);
    beforeEach(function() {
        var functionToBePassed = function($provide){

            var todo = [
                {'title': 'Test Todo', 'done': false},
                {'title': 'Test Todo', 'done': false}
            ];

            var TodoService = {
                todos: todo,
                getAll: function() {
                    return todo;
                },
                add: function() {
                },
                clearCompleted: function() {
                }
            };


            $provide.service('TodoService', function(){
                return TodoService;
            });
        };

        module(functionToBePassed);
    });

    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
    }));


    describe('When initialized', function() {

        it('Then $scope.todos must have default todo', function() {
            var scope = {};
            $controller('TodoController', {$scope: scope});

            expect(scope.todos.length).toBe(2);

        });
    });

});

```

In above example we are using `angular.mock.module(...)` and passing function. One important thing to note here is that when we pass
function in `angular.mock.module(...)` we need to get reference of `$provide`. We will use `$provide` to mock the services.
To mock service we use `$provide.service(serviceName, serviceFunction)`.

### Let's look how we can mock with simple object

```javascript

describe('TodoController', function() {

    var $controller;

    beforeEach(module('app'));

    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
    }));


    describe('When initialized', function() {

        it('Then $scope.todos must have default todo', function() {
            var scope = {};

            var todo = [
                {'title': 'Test Todo', 'done': false},
                {'title': 'Test Todo', 'done': false}
            ];

            // Using simple Object only
            var TodoService = {
                todos: todo,
                getAll: function() {
                    return todo;
                },
                add: function() {
                },
                clearCompleted: function() {
                }
            };

            // Passing TodoService when initialize controller
            $controller(
                'TodoController',
                {
                    $scope: scope,
                    TodoService: TodoService
                }
            );

            expect(scope.todos.length).toBe(2);

        });
    });

});

```

Above example is very simple and I don't think it needs any explanation. In next post we will se how we can spy object using `spyOn`
and change the behaviour of spied function.





