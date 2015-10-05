var os = require("os");
var ReadableTestData = require("./utils/ReadableTestData");
var WritableTestResults = require("./utils/WritableTestResults");
var cliApp = require("../lib/cli/app");

var runCliAppAndGetOutput = function(args, inputData, outputResults, options) {
	args = args || "";
	inputData = inputData || new ReadableTestData();
	outputResults = outputResults || new WritableTestResults();

	cliApp.run(args, inputData, outputResults, options);
	return outputResults.getData();
};

describe("The command-line application", function() {

	it("should have a run function", function() {
		expect(typeof cliApp.run).toBe("function");
	});

	it("should output a number when given a number as only argument", function() {
		var number = "3";
		var output = runCliAppAndGetOutput([number]);
		expect(output).toBe(number);

		number = "6745.167";
		output = runCliAppAndGetOutput([number]);
		expect(output).toBe(number);
	});

	it("should output a trailing new line when requested", function() {
		var number = "1234";
		var options = {
			appendNewLine: true
		};
		var expectedOutput = number + os.EOL;

		var output = runCliAppAndGetOutput([number], null, null, options);

		expect(output).toBe(expectedOutput);
	});

	it("should fire 'finish' event on output stream when done", function(done) {
		var number = "1234";

		var resultsStream = new WritableTestResults();
		resultsStream.on("finish", function() {
			done();
		});

		runCliAppAndGetOutput([number], null, resultsStream);
	});

	it("should not throw an error if no writable stream is given", function() {
		var args = ["987"];
		var inputStream = new ReadableTestData();
		var outputStream = null;

		expect(function() {
			cliApp.run(args, inputStream, outputStream);
		}).not.toThrow();
	});

	it("can convert from decimal to roman numerals", function() {
		var args = ["--to", "roman", "851"];
		var expectedOutput = "DCCCLI";

		var output = runCliAppAndGetOutput(args);

		expect(output).toBe(expectedOutput);
	});

	it("can convert from binary to decimal", function() {

		var args = ["--from", "binary", "11001110"];
		var expectedOutput = "206";

		var output = runCliAppAndGetOutput(args);

		expect(output).toBe(expectedOutput);
	});

	it("can convert directly from hexadecimal to scientific notation", function() {
		var args = ["--from", "hexadecimal", "--to", "scientific", "10000"];
		var expectedOutput = "6.5536e4";

		var output = runCliAppAndGetOutput(args);

		expect(output).toBe(expectedOutput);
	});

	it("can use short form switches", function() {
		var args = ["-f", "hexadecimal", "-t", "scientific", "8000"];
		var expectedOutput = "3.2768e4";

		var output = runCliAppAndGetOutput(args);

		expect(output).toBe(expectedOutput);
	});

	it("can provide switches and arguments in any order", function() {
		var args = ["-t", "binary", "1.048576e6", "-f", "scientific"];
		var expectedOutput = "100000000000000000000";

		var output = runCliAppAndGetOutput(args);

		expect(output).toBe(expectedOutput);
	});

});
