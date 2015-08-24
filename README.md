# number-converter
A Node.js library for converting between different numeric representations.

## Usage

```
var NumberConverter = require("number-converter").NumberConverter;

var nc = new NumberConverter(NumberConverter.DECIMAL, NumberConverter.ROMAN_NUMERAL);
console.log(nc.convert(1234)); // MCCXXXIV
console.log(nc.deconvert("MCMXCIX")); // 1999
```

## Installation

To use number-converter in your Node.js project, run:
```
npm install brettmclean/number-converter --save
```

To contribute to number-converter, clone this repository and install dependencies:
```
git clone https://github.com/brettmclean/number-converter.git
cd number-converter
npm install
```

## Testing

Number-converter uses Jasmine for testing its components. Jasmine can be installed using `npm install` then tests can be run using `npm test`.
