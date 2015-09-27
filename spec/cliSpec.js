var ReadableTestData = require("./utils/ReadableTestData");
var WritableTestResults = require("./utils/WritableTestResults");
var cliApp = require("../lib/cli/app");

var runCliAppAndGetOutput = function(args, inputData, outputResults) {
	args = args || "";
	inputData = inputData || new ReadableTestData();
	outputResults = new WritableTestResults();
	cliApp.run(args, inputData, outputResults);
	return outputResults.getData();
};

var trimFinalNewline = function(str) {
	return str.replace(/\n+$/, "");
};

describe("The command-line application", function() {

	it("should have a run function", function() {
		expect(typeof cliApp.run).toBe("function");
	});

	it("should output a number when given a number as only argument", function() {
		var number = "3";
		var output = runCliAppAndGetOutput([number]);
		expect(trimFinalNewline(output)).toBe(number);

		number = "6745.167";
		output = runCliAppAndGetOutput([number]);
		expect(trimFinalNewline(output)).toBe(number);
	});

});
