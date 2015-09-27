var os = require("os");

var appendNewLine;

var inputNumbers;

function run(args, inStream, outStream, options) {
	parseOptions(options);

	inputNumbers = determineInputNumbers(args);

	var outputString = determineOutputString(inputNumbers);
	writeResults(outStream, outputString);
}

function parseOptions(options) {
	options = options || {};

	appendNewLine = options.appendNewLine || false;
}

function determineInputNumbers(args) {
	return [args[args.length - 1]];
}

function determineOutputString(resultNumbers) {
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
