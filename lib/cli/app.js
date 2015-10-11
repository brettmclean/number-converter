var os = require("os");
var commander = require("commander");
var NumberConverter = require("..").NumberConverter;

var appContext = null;

function run(rawArgs, inStream, outStream, options) {
	buildAppContext(rawArgs, inStream, outStream, options);
	processNumbers(appContext);
}

function buildAppContext(rawArgs, inStream, outStream, options) {

	var cliAppArguments = parseArguments(rawArgs);
	var cliAppOptions = new CliAppOptions(options);

	appContext = new CliAppContext(cliAppArguments, inStream, outStream, cliAppOptions);
}

function parseArguments(rawArgs) {
	clearCommanderOfPreviousParseData(commander);
	setMaxListenersInCommander(commander);
	setMetadataInCommander(commander);
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

function setMaxListenersInCommander(cmdr) {
	cmdr.setMaxListeners(50);
}

function setMetadataInCommander(cmdr) {
	setVersionInCommander(cmdr);
	setDescriptionInCommander(cmdr);
}

function setVersionInCommander(cmdr) {
	var packageObj = require("../../package.json");
	if(packageObj) {
		cmdr.version(packageObj.version);
	}
}

function setDescriptionInCommander(cmdr) {
	cmdr.description("Converts between number formats");
}

function parseAppArgumentsUsingCommander(cmdr, rawArgs) {
	// Fake adding first two arguments normally found in process.argv
	// Commander appears to expect it
	rawArgs = rawArgs.slice(0, rawArgs.length); // Clone first
	rawArgs.unshift(null, "number-converter");

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

function processNumbers(ctx) {
	var appArguments = ctx.appArguments;

	ctx.numberConverter = new NumberConverter(appArguments.fromFormat, appArguments.toFormat);

	if(appArguments.numbers.length > 0) {
		processNewNumbers(ctx, appArguments.numbers);
		endOutput(ctx);
		return;
	}

	waitForNumbersFromInput(ctx);
}

function waitForNumbersFromInput(ctx) {
	var inStream = ctx.inStream;

	if(inStream) {
		inStream.on("data", function(chunk) {
			var chunkStr = chunk.toString("utf8");
			var sanitizedStr = removeLeadingAndTrailingNewLines(convertWindowsNewLinesToUnix(chunkStr));
			var newNumbers = sanitizedStr.split("\n");
			processNewNumbers(ctx, newNumbers);
		});

		inStream.on("end", function() {
			endOutput(ctx);
		});
	}
}

function processNewNumbers(ctx, newNumbers) {
	var nc = ctx.numberConverter;
	var convertedNumbers = [];

	for(var i = 0; i < newNumbers.length; i++) {
		convertedNumbers.push(nc.convert(newNumbers[i]));
	}

	writeConvertedNumbersToOutput(ctx, convertedNumbers);
}

function writeConvertedNumbersToOutput(ctx, convertedNumbers) {
	var outStream = ctx.outStream;
	if(outStream) {
		if(ctx.hasOutputData) {
			outStream.write(os.EOL);
		}
		outStream.write(convertedNumbers.join(os.EOL));
		ctx.hasOutputData = true;
	}
}

function endOutput(ctx) {
	var outStream = ctx.outStream;
	var appOptions = ctx.appOptions;

	if(outStream) {
		if(appOptions.appendNewLine) {
			outStream.write(os.EOL);
		}

		if(outStream !== process.stdout) {
			outStream.end();
		}
	}
}

function convertWindowsNewLinesToUnix(str) {
	return str.replace(/\r/g, "");
}

function removeLeadingAndTrailingNewLines(str) {
	return str.replace(/^\n+/, "").replace(/\n+$/, "");
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
	this.numberConverter = null;
	this.hasOutputData = false;
};

exports.run = run;
