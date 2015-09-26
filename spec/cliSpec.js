var cliApp = require("../lib/cli/app");

describe("The command-line application", function() {

	it("should have a run function", function() {
		expect(typeof cliApp.run).toBe("function");
	});

});
