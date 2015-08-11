var NumberConverter = require("../lib").NumberConverter;

describe("A Number Converter", function() {

	it("constructor function returns a NumberConverter object", function() {
		expect(typeof NumberConverter).toBe("function");

		var nc = new NumberConverter();
		expect(nc instanceof NumberConverter).toBe(true);
	});

});
