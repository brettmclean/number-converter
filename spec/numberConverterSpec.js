var NumberConverter = require("../lib").NumberConverter;

describe("A Number Converter", function() {

	describe("constructor function", function() {
		it("returns a NumberConverter object", function() {
			expect(typeof NumberConverter).toBe("function");

			var nc = new NumberConverter();
			expect(nc instanceof NumberConverter).toBe(true);
		});

		it("requires only one number type", function() {
			var nc = new NumberConverter(NumberConverter.ROMAN_NUMERAL);

			expect(nc.convert(1111)).toBe("MCXI");
			expect(nc.deconvert("DLV")).toBe(555);
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

	it("defaults to a base-10 number mapper", function() {
		var nc = new NumberConverter();

		expect(nc.convert(82)).toBe(82);
	});

	it("can convert roman numerals", function() {
		var nc = new NumberConverter(NumberConverter.DECIMAL, NumberConverter.ROMAN_NUMERAL);

		expect(nc.convert(1234)).toBe("MCCXXXIV");
		expect(nc.deconvert("MMCMCCXCLXIV")).toBe(3254);
	});

});
