## Using in the Browser

This library can be used in web browsers as well as Node.js. You must first build it as a browser module and then include it in your web page.

#### Building Browser Module

Run `npm run browser`. This will create `dist/number_converter.js`. Copy `number_converter.js` to an appropriate location in your web application.

#### Usage

Once included on the web page, the browser module will be namespaced under the global variable `number_converter`. This will be equivalent to the return value of `require("number-converter")` in Node.js.

An example page using this module is shown below:

```
<!DOCTYPE html>
<html>
<head>
	<script type="text/javascript" src="number_converter.js"></script>
	<script type="text/javascript">
	(function() {
		// imports
		var NumberConverter = number_converter.NumberConverter;

		var nc = new NumberConverter(NumberConverter.DECIMAL, NumberConverter.ROMAN_NUMERAL);
		alert(nc.convert("1769")); // MDCCLXIX
	}());
	</script>
</head>
<body></body>
</html>
```
