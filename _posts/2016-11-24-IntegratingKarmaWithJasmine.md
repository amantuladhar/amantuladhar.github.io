---
layout: post
title: Integrating Karma on AngularJS Testing (Part 2)
subtitle: Let's Integrate Karma into our Application to run our unit test 
bigimg: /img/feature-image/karma.png
---

In this article we will use `Karma` to run our `Jasmine` unit test that we created on [Part 1](https://atuladhar-aman.github.io/blog/2016-11-23-UnitTestingAngular1Part1/) of this series. I recommend you to go through **Part 1** before reading this article.

[`Karma`](http://karma-runner.github.io/,) is the test runner for test-driven development and continious integration. I'll walk you throught the basic proces to install `Karma`. `Karma` executes JavaScript code in browser. With help of `Karma` you can test against multiple browsers, locally or on continious integration server. We can enable `Karma watch` feature to run unit test when application code changes. Since we are using the `Jasmine` to write our `Specs` we need [`Jasmine-Core`](https://www.npmjs.com/package/jasmine-core) and [`Karma Jasmine`](https://github.com/karma-runner/karma-jasmine.) plugin. In this article we will run our `Specs` on Chrome browser so we need [`Karma Chrome launcher`](https://github.com/karma-runner/karma-chrome-launcher) plugin. 

We will use [`NodeJS`](https://nodejs.org/en/) to install `Karma`

> Run `npm init`

> Install `angular` and `angular-mocks`

```bash
npm install --save angular angular-mocks
```

> Using `npm` install `jasmine-core`, `karma`, `karma-jasmine`, `karma-chrome-launcher` 

```bash
npm install jasmine-core karma karma-jasmine karma-chrome-launcher --save-dev
```

> Install `karma-cli` (with or without globally)

```bash
npm install -g karma-cli

# OR

npm install karma-cli
```

We can create the `Karma Configuration` file and write the content of configuration from scratch but `Karma` provides the option to run initialization steps.

```bash
karma init

# if install without global option

./node_modules/.bin/karma init
```

1. Use `jasmine` as testing framework.
2. Don't use `requirejs` for now.
3. Use `chrome` as testing browser.
4. At the prompt to define source file location, press Enter to accept the default option of an empty string.
5. At the prompt to define file patterns to exclude, press Enter to accept the default option of an empty string.
6. Enable `autoWatch` feature. 

This will generate the `karma.conf.js` which is default `Karma` configuration file.

Let's modify `karma.conf.js` to start testing. `Karma` needs access to `angular.js` and `angular-mocks.js`.
Add the following line to `karma.conf.js` -> `files` section

```
files: [
      'node_modules/angular/angular.min.js',
      'node_modules/angular-mocks/angular-mocks.js'
    ]
```
Now we need to add our `JavaScript` and `Specs` file. To do so we can use `glob pattern`.

> Update `files` section as below

```
 files: [
            'node_modules/angular/angular.min.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'src/**/*.js',
            'test/**/*Spec.js'
        ]
```

Your `karma.conf.js` should look somewhat like below


```javascript
// Karma configuration

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'node_modules/angular/angular.min.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'src/**/*.js',
            'test/**/*Spec.js'
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {},


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
};
```

> Run the `Karma` to run the tests

```bash
karma start <file_name>
```

If you `Karma` configuration file name is `karma.conf.js` you can use `karma start` which will look for default file i.e `karma.conf.js`. If your configutaion file name is different you can issue the command and provide the `file_name`.

Of course if you didn't install `Karma` globally you can run

```bash
./node_modules/.bin/karma start
```

<div class='feature-post-image'
     style="padding-top: 55%; background-image: url('/blog/img/2016-11-24-Karma-Integration-Part2/Karma-Run-Test-001.png');">
</div>

Well, in this article you learned about `Karma` and how we can use `Karma` to run our unit test. I'll cover some other topics related to Angular Testing so stay tuned.


