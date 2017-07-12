---
layout: post
title: Using Gulp to Start Karma ( Part 3 )
subtitle: Automate the test using GulpJS in headless browser
bigimg: /img/feature-image/gulpjs.png
---

In this article we will use [`Gulp`](http://gulpjs.com/) to run our `Specs`. `Gulp` is a **stream-based** build system with a simple yet powerful API focusing on `code` **over** `configuration`. `Gulp` builds use the `Node.js` streams that do not need to write temporary files or folders to disk, which results in **faster builds**.

`Gulp` is very easy to learn ( than Grunt - *opinionated view*) but I won't be covering basics of `Gulp` in this article. If you want to learn about gulp you can visit [Getting Started with Gulp](https://css-tricks.com/gulp-for-beginners/).

> First things first let's install `Gulp` globally

```bash
npm install -g gulp

# sudo if needed
```

> We also need to add `Gulp` in our project

```bash
npm install --save-dev gulp
```

> Create a `gulpfile.js` which is default file for `Gulp` configuration

> Since we are using `Gulp` and `Karma` we need to add `require()` statement in `gulpfile.js`

If you are interested where this code was copied from you can vist -> [Gulp-karma on GitHub](https://github.com/karma-runner/gulp-karma)

```javascript
var gulp = require('gulp');
var karma = require('karma');
```
> We are also interested on using `Karma Server` so add following line on `gulpfile.js`

```javascript
var Server = karma.Server;
```

> Now we need to create the `Gulp Tasks`. Let's create a **task** which runs all the test once and exits

```javascript
gulp.task('test', function(done) {
    new Server( 
        { 
            configFile: __dirname + '/karma.conf.js', 
            singleRun: true 
        }, 
        done 
    ).start();
});
```

In above *snippet* We are creating a `gulp` task named *test*. In the task we are creating new instance of `Karma Server` which we declared before.
To create the new instance of `Karma Server` we are passing some **properties**. We can **Override** properties inside of `karma.conf.js` from here.

1. First properties we are passing is `configFile` which is mandatory properties we need to pass. Which basically holds the path of our `Karma Configuration` file.
2. Second properties is optional. I'm passing this properties to **override** the properties that exist on `karma.conf.js`.

We are also passing `done` as second argument to `Server`. If you want to know more about `done` here's the [stackoverflow thread](http://stackoverflow.com/questions/29694425/what-does-gulp-done-method-do).

> To run the `Gulp` task that you created execute following command

```bash
gulp test
```

When you run above command you will see the same message that you saw earlier on **Part 2** of this article. Only difference is `Karma` runs the test and stops to watch the more changes. This is what `singleRun` does.
If this process is not working for you visit [here](http://www.bendangelo.me/javascript/2015/11/14/simple-karma-task-for-gulp.html) which tweaks some part of this code.

If you want to run the test like before where you watch for changes you can create new task like below

```javascript
gulp.task('test-watch', function(done) {
    new Server(
        {
            configFile: __dirname + '/karma.conf.js'
        },
        done
    ).start();
});
```

```bash
gulp test-watch
```
If you run the task you will see same kind of behaviour that you saw previously. Since we are not passing any properties to **Override** it loads the properties from `karma.conf.js`.

We are running our test on `Chrome` which pop ups on every run of the test. If we want we can use `headless` broswer i.e `PhantomJS`


To use `PhantomJS` we need `karma-phantomjs-launcher` plugin

> To install `karma-phantomjs-launcher`

```bash
npm install --save-dev karma-phantomjs-launcher
```

> Change the broswer on `karma.conf.js` to `PhantomJS`

```javascript
        browsers: ['PhantomJS']
```

Or if you want to you can pass the properties on `gulp` task too.

```javascript
gulp.task('phantom', function(done) {
    new Server(
        {
            configFile: __dirname + '/karma.conf.js',
            browsers: ['PhantomJS']
        },
        done
    ).start();
});
```

> To run the new task you can execute

```bash
gulp phantom
```

I'll end this article by adding the default `Gulp` task which can be done by adding the following line on `gulpfile.js`

```javascript
gulp.task('default', ['test-watch'])
```

So when you just type `gulp` on termial you will run `test-watch` by default.

This is what my `package.json` looks like

```json
{
  "name": "angular-testing",
  "version": "1.0.0",
  "description": "Simple Application to learn the how we can unit test AngularJS application",
  "main": "",
  "directories": {
    "test": "test"
  },
  "dependencies": {
    "angular": "^1.5.8",
    "angular-mocks": "^1.5.8"
  },
  "devDependencies": {
    "gulp": "^3.9.1",
    "jasmine-core": "^2.5.2",
    "karma": "^1.3.0",
    "karma-chrome-launcher": "^2.0.0",
    "karma-jasmine": "^1.0.2",
    "karma-phantomjs-launcher": "^1.0.2"
  },
  "scripts": {},
  "author": "Aman Tuladhar"
}
```

and `gulpfile.js`

```javascript
var gulp = require('gulp');
var karma = require('karma');
var Server = karma.Server;

/**
 * Run test once and exit
 */
gulp.task('test', function(done) {
    new Server(
        {
            configFile: __dirname + '/karma.conf.js',
            singleRun: true
        },
        done
    ).start();
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('test-watch', function(done) {
    new Server(
        {
            configFile: __dirname + '/karma.conf.js'
        },
        done
    ).start();
});

gulp.task('chrome', function(done) {
    new Server(
        {
            configFile: __dirname + '/karma.conf.js',
            browsers: ['Chrome'],
            singleRun: true
        },
        done
    ).start();
});

gulp.task('default', ['test-watch']);
```

and `karma.conf.js`

```javascript

// Karma configuration

module.exports = function(config) {
    config.set({

        basePath: '',
        port: 9876,
        frameworks: ['jasmine'],
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: false,
        files: [
            'node_modules/angular/angular.min.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'src/**/*.js',
            'test/**/*Spec.js'
        ],
        exclude: [],
        logLevel: config.LOG_INFO,

        preprocessors: {},
        reporters: ['progress'],
        colors: true,
        concurrency: Infinity
    })
};

```

I'll cover some other topics related to Angular Testing so stay tuned. **`THANKS`**










