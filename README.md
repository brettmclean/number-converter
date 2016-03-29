# number-converter
[![npm version](https://badge.fury.io/js/number-converter.svg)](http://badge.fury.io/js/number-converter)
[![Build Status](https://travis-ci.org/brettmclean/number-converter.svg?branch=master)](https://travis-ci.org/brettmclean/number-converter)
[![Dependency Status](https://david-dm.org/brettmclean/number-converter.svg)](https://david-dm.org/brettmclean/number-converter)
[![devDependency Status](https://david-dm.org/brettmclean/number-converter/dev-status.svg)](https://david-dm.org/brettmclean/number-converter#info=devDependencies)

A Node.js library for converting between different numeric representations.

## Usage

```
var NumberConverter = require("number-converter").NumberConverter;

var nc = new NumberConverter(NumberConverter.DECIMAL, NumberConverter.ROMAN_NUMERAL);
console.log(nc.convert(1234)); // MCCXXXIV
console.log(nc.deconvert("MCMXCIX")); // 1999
```

### Number Types

A NumberConverter can convert between different numeric representations specified in its constructor. To convert between hexadecimal and binary, write:
```
var nc = new NumberConverter(NumberConverter.HEXADECIMAL, NumberConverter.BINARY);
console.log(nc.convert("F8F")); // "111110001111"
```

Here are the available number types:
* `NumberConverter.DECIMAL` - Base-10 number system (digits 0-9)
* `NumberConverter.BINARY` - Base-2 number system (digits 0 and 1)
* `NumberConverter.OCTAL` - Base-8 number system (digits 0-7)
* `NumberConverter.HEXADECIMAL` - Base-16 number system (digits 0-9 and letters A-F)
* `NumberConverter.ROMAN_NUMERAL` - Numeric system used in ancient Rome (letters I, V, X, L, C, D and M)
* `NumberConverter.SCIENTIFIC_NOTATION` - Scientific notation: a way of writing numbers too large or small to be conveniently written as decimal (e.g. 5200000 -> 5.2e6)

## Installation

To use number-converter in your Node.js project, run:
```
npm install number-converter --save
```

## Other Topics

* [NumberConverter Options](docs/options.md)
* [Using from Command line](docs/command-line.md)
* [Using in the Browser](docs/browser.md)
* [Contributing Code](docs/contributing.md)
