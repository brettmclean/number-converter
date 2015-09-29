var os = require("os");
var commander = require("commander");
var NumberConverter = require("..").NumberConverter;

function run(rawArgs, inStream, outStream, options) {
	var cliAppOptions = new CliAppOptions(options);

	var cliAppArguments = parseArguments(rawArgs);
	var inputNumbers = determineInputNumbers(rawArgs);

	var outputString = determineOutputString(cliAppArguments, inputNumbers);
	writeResults(outStream, outputString, cliAppOptions);
}

function parseArguments(rawArgs) {
	setVersionInCommander(commander);
	parseAppArgumentsUsingCommander(commander, rawArgs);
	return getCliAppArgumentsFromParsedCommander(commander);
}

function setVersionInCommander(cmdr) {
	var packageObj = require("../../package.json");
	if(packageObj) {
		cmdr.version(packageObj.version);
	}
}

function parseAppArgumentsUsingCommander(cmdr, rawArgs) {
	// Fake adding first two arguments normally found in process.argv
	// Commander appears to expect it
	rawArgs = rawArgs.slice(0, rawArgs.length); // Clone first
	rawArgs.unshift(null, null);

	cmdr
		.option("-t, --to <toFormat>", "Convert to this number format (binary, octal, decimal, hexadecimal, roman, scientific)")
		.parse(rawArgs);
}

function getCliAppArgumentsFromParsedCommander(cmdr) {
	var fromFormat = null;
	var toFormat = cmdr.to;

	return new CliAppArguments(fromFormat, toFormat);
}

function determineInputNumbers(args) {
	return [args[args.length - 1]];
}

function determineOutputString(cliAppArguments, inputNumbers) {
	var nc = new NumberConverter(cliAppArguments.fromFormat, cliAppArguments.toFormat);

	var resultNumbers = [];
	for(var i = 0; i < inputNumbers.length; i++) {
		resultNumbers.push(nc.convert(inputNumbers[i]));
	}

	return resultNumbers.join(os.EOL);
}

function writeResults(outStream, outputString, cliAppOptions) {
	if(outStream) {
		outStream.write(outputString);

		if(cliAppOptions.appendNewLine) {
			outStream.write(os.EOL);
		}

		if(outStream !== process.stdout) {
			outStream.end();
		}
	}
}

var CliAppOptions = function(options) {
	options = options || {};

	this.appendNewLine = options.appendNewLine || false;
};

var CliAppArguments = function(fromFormat, toFormat) {
	this.fromFormat = fromFormat;
	this.toFormat = toFormat;
};

exports.run = run;
