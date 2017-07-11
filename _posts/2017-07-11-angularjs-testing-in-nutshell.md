---
layout: post
title: AngularJS Testing in Nutshell
subtitle: AngularJS testing as simple as possible
---

In this post I will talk about AngularJS testing. This will be quick and easy guide to get up and running with AngularJS testing.
This post cover basics of testing

- Karma
- Jasmine
- Testing Controller
- Testing Services (`http` request)
- Testing Directive

--- 

# Karma
- Is a command line tool that can be used to spawn a web server which loads your application's source code and executes your tests. 
- Configurable : Can be configured to run against a number of browsers, which is useful for being confident that your application works on all browsers you need to support. 
- Executed on the command line and will display the results of your tests on the command line once they have run in the browser.
- Default configuration file name: `karma.conf.js`

---

# Jasmine
- Is behavior driven development framework for JavaScript.
- AngularJS API recommends Jasmine for unit testing.
- Provides functions to help with structuring your tests.
- Provides API to make assertions. 

Jasmine provides the function to group the tests together.

```javascript
describe('Description for group of tests', function(){
    
    // individual tests go here
    
});
```

In Jasmine we create a **spec**(test) by calling `it` function.

```javascript
it('This is description for test', function(){
    
    // Test code go here
    
});
```

So basically our test looks like below.

```javascript
describe('some description', function(){
    
    it('some descrption', function(){
        
        //test code go here
        
    });
    
});
```

---

# Testing Controller

Let us assume that we have controller like below

```javascript
 angular
        .module('appName', [])

        .controller('MainCtrl', function(MainService) {
            var vm = this;

            vm.someText = 'Initial Text';
            vm.serviceReturnedValue = MainService.callMe();

            vm.changeText = function() {
                vm.someText = 'Text Changed';
            };
        });
```

In order to test this simple controller we need to

**STEP 1**. Load the module using `angular.mock.module('appName');` or `module('appName');`

**STEP 2**. Get the hold of `$controller` service using `inject` function.

```javascript
var $controller;
inject(function(_$controller_) {
    $controller = _$controller_;
});
// _ (underscore) is used if you want to cache $controller service with same name.
```

**STEP 3**. Initialize the controller using `$controller` service.

```java

// $controller('ControllerName', dependenciesObject);

var MainService = {
    callMe: function() {
        return 'Hello World';
    }
}; // notice how we are simply mocking services

var MainCtrl = $controller('MainCtrl', {MainService: MainService});

```

**STEP 4**. Make assertion

```javascript

expect(MainCtrl.someText).toBe('Initial Text');
expect(MainCtrl.someText).not.toBe('Random Text');

expect(MainCtrl.serviceReturnedValue).toBe('Hello World');
expect(MainCtrl.serviceReturnedValue).not.toBe('Random World');

MainCtrl.changeText();
expect(MainCtrl.someText).not.toBe('Initial Text');
expect(MainCtrl.someText).toBe('Text Changed');

```

More on [Jasmine Expectation here.](https://jasmine.github.io/2.4/introduction.html#section-Expectations)

---

# Testing Services

Suppose we have a service that makes AJAX calls, which looks like

```javascript
.factory('MainService', function($resource) {
    return $resource('/api/:id');
})
```

To unit test this component we need to make sure we do not mock the actual service `MainService` we are trying to mock. We also need to make sure we do not make an actual call to external resources.
So we need to somehow mock the http requests itself. Luckily, we have `$httpBackend` service which will help us mock `http` requests. Let's see how we can achieve this

**STEP 1 .** Load the module with `module('appName');`

**STEP 2 .** Get hold of `$httpBackend` and `MainService`. Notice we don't mock `MainService` here.

```javascript

var $httpBackend;
var MainService;
inject(function(_$httpBackend_, _MainService_) {
    $httpBackend = _$httpBackend_;
    MainService = _MainService_;
});

```

**STEP 3 .** Mock request that we will be making using `$httpBackend`.

```javascript

$httpBackend
    .expectGET('/api/1')
    .respond( 200, { name: 'Aman', id: 1 } );

```
Notice we are using expectGET method here to expect the GET request to be made and when we get one we tell our mock request to respond with status `200` and return an object.
Like expectGET we have expectPOST, expectDELETE ... etc.

**STEP 4 .** Make a `http` request and make it synchronous using `$httpBackend.flush()`

```javascript
var result;
MainService.get({id: 1}, function(data) {
    result = data;
});

$httpBackend.flush();
```

**STEP 5 .** Make Expectation

```javascript

expect(result.name).toBe('Aman');
expect(result.name).not.toBe('Random Text');

expect(result.id).toBe(1);
expect(result.id).not.toBe(5);

```

---

# Testing Directive

```javascript
// simple directive
.directive('myDirective', function() {
    return function(scope, elem) {
        elem.append('<span>This is appended element</span>');
    };
});

// OR

.directive('myDirective', function() {
    return {
        template: '<span>This is appended element</span>'
    };
});
```

Let's see how we can test this directive.

**STEP 1** Load the module. `module('appName');`

**STEP 2** Get hold of `$compile` service and `$rootScope`

```javascript
var $compile, $rootScope;
inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
});
```

**STEP 3** Compile the directive

```javascript
var directiveElem = getCompiledElement();

function getCompiledElement() {
    var element = angular.element('<div my-directive/></div>');
    var compiledElement = $compile(element)($rootScope);
    $rootScope.$digest();
    return compiledElement;
}
```
For compiling the directive we are first creating the element that has our directive.
Then we are using `$compile` servie to compile our direcive
For completing hte compile process we start the digest cycle
Then at end we return the compiled element.

**STEP 4** Make Expectation

```javascript
var spanElement = directiveElem.find('span');
expect(spanElement).toBeDefined();
expect(spanElement.text()).toEqual('This is appended element');
expect(spanElement.text()).not.toEqual('Some random text');

```

---

# Testing Directive with templateUrl

Testing a directive with template referred from a file is tricky, as the directive makes an `$httpBackend` request to the templateUrl. 
Adding this template to `$templateCache` makes the task of testing easier and the template will be easy to share. This can be done using the karma-ng-html2js-preprocessor.

This preprocessor converts HTML files into JS strings and generates Angular modules. 
These modules, when loaded, puts these HTML files into the `$templateCache` and therefore Angular won't try to fetch them from the server.


```javascript

preprocessors: {
    'path/to/html/template': ['ng-html2js'],
},

ngHtml2JsPreprocessor: {
    moduleName: 'Templates'
}
```

**Just make sure you load `Templates` module when you test your directive.**

---




