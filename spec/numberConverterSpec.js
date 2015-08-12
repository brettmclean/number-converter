var NumberConverter = require("../lib").NumberConverter;

describe("A Number Converter", function() {

	describe("constructor function", function() {
		it("returns a NumberConverter object", function() {
			expect(typeof NumberConverter).toBe("function");

			var nc = new NumberConverter();
			expect(nc instanceof NumberConverter).toBe(true);
		});
	});

	it("has number type constants", function() {
		expect(NumberConverter.ROMAN_NUMERAL).not.toBe(undefined);
		expect(NumberConverter.DECIMAL).not.toBe(undefined);
	});

	it("has convert and deconvert methods", function() {
		var nc = new NumberConverter();
		
		expect(typeof nc.convert).toBe("function");
		expect(typeof nc.deconvert).toBe("function");
	});

});
