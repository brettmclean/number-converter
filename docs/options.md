## NumberConverter Options

A set of options can be provided when creating a new NumberConverter.

#### fractionalBaseN

If set to true, NumberConverter will convert the fractional part of numbers when using `NumberConverter.BINARY`, `NumberConverter.OCTAL` or `NumberConverter.HEXADECIMAL`.

```
var NumberConverter = require("number-converter").NumberConverter;

var options = {
	fractionalBaseN: true
};
var nc = new NumberConverter(NumberConverter.BINARY, NumberConverter.HEXADECIMAL, options);

console.log(nc.convert("10001110.10101111")); // "8E.AF"
console.log(nc.deconvert("A.83")); // "1010.10000011"
```
