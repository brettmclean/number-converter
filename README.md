# number-converter [![Build Status](https://travis-ci.org/brettmclean/number-converter.svg?branch=master)](https://travis-ci.org/brettmclean/number-converter)

A Node.js library for converting between different numeric representations.

## Usage

```
var NumberConverter = require("number-converter").NumberConverter;

var nc = new NumberConverter(NumberConverter.DECIMAL, NumberConverter.ROMAN_NUMERAL);
console.log(nc.convert(1234)); // MCCXXXIV
console.log(nc.deconvert("MCMXCIX")); // 1999
```

## Number Types

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
npm install brettmclean/number-converter --save
```

## Contributing Code

To contribute to number-converter, clone this repository and install dependencies:
```
git clone https://github.com/brettmclean/number-converter.git
cd number-converter
npm install
```

### Verifying Code

Before pushing any commits, ensure your code meets standards by running:
```
npm run check --silent
```
The output should look similar to:
```
Started
............................................................

60 specs, 0 failures
Finished in 0.050 seconds
```

If any problems are shown in the output, they should be fixed before code changes are committed. This command performs the following three steps.

#### Testing Code

Use `npm test` to run all unit tests in the `spec` directory.

#### Linting Code

Use `npm run lint` to check all code (including unit tests) for constructs which have been known to lead to bugs.

#### Checking Code Style

Use `npm run style` to check that code meets established style standards for this project.
