# kwest-debug [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]

Logs debug information to [kwest](https://github.com/Janpot/kwest) requests.

## Installation

    $ npm install --save kwest-debug

## Use

Just add the body middleware
```js
var request = require('kwest'),
    debug   = require('kwest-debug');

request.use(debug());

request('http://www.example.com');
// request and response info is now logged to the console
```


[travis-url]: http://travis-ci.org/Janpot/kwest-debug
[travis-image]: http://img.shields.io/travis/Janpot/kwest-debug.svg?style=flat

[depstat-url]: https://david-dm.org/Janpot/kwest-debug
[depstat-image]: http://img.shields.io/david/Janpot/kwest-debug.svg?style=flat
