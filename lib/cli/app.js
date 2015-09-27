var os = require("os");

var appendNewLine;

var outputStr;

function run(args, inStream, outStream, options) {
	parseOptions(options);

	outputStr = args[args.length - 1];

	writeResults(outStream);
}

function parseOptions(options) {
	options = options || {};

	appendNewLine = options.appendNewLine || false;
}

function writeResults(outStream) {
	if(outStream) {
		outStream.write(outputStr);

		if(appendNewLine) {
			outStream.write(os.EOL);
		}

		if(outStream !== process.stdout) {
			outStream.end();
		}
	}
}

exports.run = run;
