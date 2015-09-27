function run(args, inStream, outStream) {
	var number = args[args.length - 1];
	outStream.write(number + "\n");
}

exports.run = run;
