var os = require("os");
var commander = require("commander");
var NumberConverter = require("..").NumberConverter;

var appendNewLine;

function run(args, inStream, outStream, options) {
	parseOptions(options);

	var parsedArgs = parseArguments(args);
	var inputNumbers = determineInputNumbers(args);

	var outputString = determineOutputString(parsedArgs, inputNumbers);
	writeResults(outStream, outputString);
}

function parseOptions(options) {
	options = options || {};

	appendNewLine = options.appendNewLine || false;
}

function parseArguments(args) {
	var packageObj = require("../../package.json");
	if(packageObj) {
		commander.version(packageObj.version);
	}

	// Fake adding first two arguments normally found in process.argv
	// Commander appears to expect it
	args = args.slice(0, args.length); // Clone args first
	args.unshift(null, null);

	commander
		.option("-t, --to <toFormat>", "Convert to this number format (binary, octal, decimal, hexadecimal, roman, scientific)")
		.parse(args);

	var argumentsObj = {
		toFormat: commander.to
	};

	return argumentsObj;
}

function determineInputNumbers(args) {
	return [args[args.length - 1]];
}

function determineOutputString(args, inputNumbers) {
	var nc = new NumberConverter(args.toFormat);

	var resultNumbers = [];
	for(var i = 0; i < inputNumbers.length; i++) {
		resultNumbers.push(nc.convert(inputNumbers[i]));
	}

	return resultNumbers.join(os.EOL);
}

function writeResults(outStream, outputString) {
	if(outStream) {
		outStream.write(outputString);

		if(appendNewLine) {
			outStream.write(os.EOL);
		}

		if(outStream !== process.stdout) {
			outStream.end();
		}
	}
}

exports.run = run;
