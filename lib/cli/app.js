var os = require("os");
var commander = require("commander");
var NumberConverter = require("..").NumberConverter;

var context = null;

function run(rawArgs, inStream, outStream, options) {
	buildAppContext(rawArgs, inStream, outStream, options);

	var inputNumbers = determineInputNumbers(context.inStream, context.appArguments);

	var outputString = determineOutputString(context.appArguments, inputNumbers);
	writeResults(context.outStream, outputString, context.appOptions);
}

function buildAppContext(rawArgs, inStream, outStream, options) {

	var cliAppArguments = parseArguments(rawArgs);
	var cliAppOptions = new CliAppOptions(options);

	context = new CliAppContext(cliAppArguments, inStream, outStream, cliAppOptions);
}

function parseArguments(rawArgs) {
	clearCommanderOfPreviousParseData(commander);
	setVersionInCommander(commander);
	parseAppArgumentsUsingCommander(commander, rawArgs);
	return getCliAppArgumentsFromParsedCommander(commander);
}

function clearCommanderOfPreviousParseData(cmdr) {
	delete cmdr.from;
	delete cmdr.to;
	if(cmdr.args) {
		cmdr.args.length = 0;
	}
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
		.usage("[options] [number]")
		.option("-f, --from <fromFormat>", "Convert from this number format (binary, octal, decimal, hexadecimal, roman, scientific)")
		.option("-t, --to <toFormat>", "Convert to this number format (binary, octal, decimal, hexadecimal, roman, scientific)")
		.parse(rawArgs);
}

function getCliAppArgumentsFromParsedCommander(cmdr) {
	var fromFormat = cmdr.from || NumberConverter.DECIMAL;
	var toFormat = cmdr.to || NumberConverter.DECIMAL;
	var numbers = cmdr.args;

	return new CliAppArguments(fromFormat, toFormat, numbers);
}

function determineInputNumbers(inStream, cliAppArguments) {
	var inputNumbers = getInputNumbersFromAppArguments(cliAppArguments);

	if(inputNumbers.length <= 0) {
		inputNumbers = getInputNumbersFromReadableStream(inStream);
	}

	return inputNumbers;
}

function getInputNumbersFromAppArguments(cliAppArguments) {
	if(cliAppArguments && cliAppArguments.numbers) {
		return cliAppArguments.numbers;
	}
	return [];
}

function getInputNumbersFromReadableStream(inStream) {
	if(inStream) {
		var buffer = inStream.read();
		var inString = buffer.toString("utf8");
		var sanitizedString = inString.replace(/\n$/, "");
		return sanitizedString.split("\n");
	}
	return [];
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

var CliAppArguments = function(fromFormat, toFormat, numbers) {
	this.fromFormat = fromFormat;
	this.toFormat = toFormat;
	this.numbers = numbers;
};

var CliAppContext = function(cliAppArguments, inStream, outStream, options) {
	this.appArguments = cliAppArguments;
	this.inStream = inStream;
	this.outStream = outStream;
	this.appOptions = options;
};

exports.run = run;
