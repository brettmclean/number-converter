var os = require("os");

function run(args, inStream, outStream, options) {
	options = options || {};

	var appendNewLine = options.appendNewLine || false;

	var number = args[args.length - 1];

	if(outStream) {
		outStream.write(number);

		if(appendNewLine) {
			outStream.write(os.EOL);
		}

		if(outStream !== process.stdout) {
			outStream.end();
		}
	}
}

exports.run = run;
