---
layout: post
title: AngularJS Testing (First Step) Part 1
subtitle: "Let's get familiar with how we test AngularJS application using Jasmine"
bigimg: /img/feature-image/jasmine.jpg
---

In this article we will look at how we can test AngularJS application. Since this is the initial step and a first look this article will cover a very basic testing. We will be creating a simple application which has a `controller` whose sole responsibility is to initialize value to some variable on `$scope`.

Let's create a Simple application

> Download ( or use CDN URL) AngularJS file.

> Create `src` folder

> Inside `src` Create a file `app.js`.

> > Inside `app.js` create a module name `app` and create one `controller` named `MainCtrl`.

```javascript
angular
    .module('app', [])

.controller('MainCtrl', ['$scope', function($scope) {
  $scope.someVar = "Some Text"
}])
;
```

> Create `index.html` on root directory

> > Inside `index.html` add simple html content

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Angular Testing</title>
    </head>
    <body ng-app='app'>
        <div ng-controller="MainCtrl">
            <span>Hello World : {% raw %}{{someVar}}{% endraw %} </span>
        </div>

        <script type="text/javascript" src="angular.min.js"></script>
        <script type="text/javascript" src="src/app.js"></script>
    </body>
</html>
```

> Now that we have simple application that we can test. Download [Jasmine Standalone Zip](https://github.com/jasmine/jasmine/releases)

> Copy Unzipped Jasmine Jar to our WorkDir

> Copy `SpecRunner.html` from `Jasmine Folder` to `test/SpecRunner.html`

> Update the path so that `test/SpecRunner.html` can load `js` and `css` files

```minesmall
<link rel="shortcut icon" type="image/png" href="../jasmine-standalone/lib/jasmine-2.5.2/jasmine_favicon.png">
<link rel="stylesheet" href="../jasmine-standalone/lib/jasmine-2.5.2/jasmine.css">
<script src="../jasmine-standalone/lib/jasmine-2.5.2/jasmine.js"></script>
<script src="../jasmine-standalone/lib/jasmine-2.5.2/jasmine-html.js"></script>
<script src="../jasmine-standalone/lib/jasmine-2.5.2/boot.js"></script>
```

> For testing `AngularJS` we need one more dependency. i.e `Angular Mock`. Download [Angular-Mock](https://github.com/angular/bower-angular-mocks/blob/master/angular-mocks.js)

> Add following lines in `test/SpecRunner.html`

```html
  <script type="text/javascript" src="../angular.min.js"></script>
  <script type="text/javascript" src="../angular-mock.js"></script>
```

> We also need to add the source file in `test/SpecRunner.html`. Add following line to `test/SpecRunner.html`

```html
        <!-- include source files here... -->
        <script src="../src/app.js"></script>
```

> Next we need to Write some test. In `AngularJS` world test are called `specs`. So let's create the `specfile` under `test` directory named `appSpec.js`

> Add `specfile` to `test/SpecRunner.html`

```html
<script src="appSpec.js"></script>
```

> Now that All things are on the place let's fill the `appSpec.js` with some test content. I highly recommend you read throught [Jasmine Introduction](https://jasmine.github.io/2.0/introduction.html)

> We start by calling the **global jasmine function** `describe(string, function)`. `describe` simply defines the test suite

```javascript
describe('This is description for test suite', function(){

});
```

> `Jasmine` provides the global `beforeEach` and `afterEach` functions. `beforeEach` function is called once before each `spec` in the `describe` in which it is called, and the `afterEach` function is called once after each `spec`.

> Since we want to load our `Angular Module` for each test let's call the `beforeEach` **global function**

```javascript
describe('This is description for test suite', function(){
  beforeEach(module('app'));
});
```

> Let's write some test. To write the test we call global function `it(string, function);`. A spec contains one or more expectations that test the state of the code.

```javascript
describe('This is description for test suite', function(){
  beforeEach(module('app'));

  it(
    'This is use to describe the test',
    function(){
      expect(1).toEqual(1);
    }
  );
});
```
> In above example we just we have one expectations (which is not useful at all). Let's create the `spec` to test if Controller was able to set `someVar` and see if the value is `Some Text` as we assigned.

> Let's create a basic test that `injects` the `$controller` service and `$rootscope`. We can then create a `new $scope` object and instantiate a `new instance of our controller providing the $scope object`:

```javascript
describe('This is description for test suite', function() {
    beforeEach(module('app'));

    it(
        'This is use to describe the test',
        inject(function($controller, $rootScope) {
            // creating the new scope variable
            $scope = $rootScope.$new();

            // assign new $scope to Main controller
            $controller('MainCtrl', {
                $scope: $scope
            });

            expect($scope.someVar).toEqual('Some Text');
        })
    );
});
```

> We can still go one step further by instantiating our controller in `beforeEach` function

```javascript
describe('This is description for test suite', function() {
    beforeEach(module('cookbook'));
    beforeEach(inject(function($controller, $rootScope) {
        $scope = $rootScope.$new();
        $controller('MainCtrl', {
            $scope: $scope
        });
    }));
    it('This is use to describe the test', function() {
        expect($scope.someVar).toEqual('Aman Tuladhar');
    });
});

```

Open `test/SpecRunner.html` on any browser and you can see the Test result

<div class='feature-post-image'
     style="padding-top: 55%; background-image: url('/blog/img/2016-11-20-AngularJsTestingJasminePart1/jasmine-test-001.png');">
</div>

Let's wrap up this article and In Part 2 i'll show you how we can integrate `Karma` with `Jasmine` and `AngularJS`.
