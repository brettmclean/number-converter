# number-converter
A Node.js library for converting between different numeric representations.

## Usage

```
var NumberConverter = require("./lib").NumberConverter;

var nc = new NumberConverter(NumberConverter.DECIMAL, NumberConverter.ROMAN_NUMERAL);
console.log(nc.convert(1234)); // MCCXXXIV
console.log(nc.deconvert("MCMXCIX")); // 1999
```

## Testing

The library uses Jasmine for testing its components. Install it using `npm install`, then run `npm test` to run tests.
