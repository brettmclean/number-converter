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
		expect(NumberConverter.BINARY).not.toBe(undefined);
		expect(NumberConverter.OCTAL).not.toBe(undefined);
		expect(NumberConverter.DECIMAL).not.toBe(undefined);
		expect(NumberConverter.HEXADECIMAL).not.toBe(undefined);
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

	it("reverses a convert operation by its deconvert operation", function() {
		var testData = [1, 500, 687, 1247, 1999, 3000, 3999];

		var nc = new NumberConverter(NumberConverter.DECIMAL, NumberConverter.ROMAN_NUMERAL);

		for(var i = 0; i < testData.length; i++) {
			expect(nc.deconvert(nc.convert(testData[i]))).toBe(testData[i]);
		}
	});

	it("reverses a deconvert operation by its convert operation", function() {
		var testData = [1, 500, 687, 1247, 1999, 3000, 3999];

		var nc = new NumberConverter(NumberConverter.ROMAN_NUMERAL, NumberConverter.DECIMAL);

		for(var i = 0; i < testData.length; i++) {
			expect(nc.convert(nc.deconvert(testData[i]))).toBe(testData[i]);
		}
	});

	it("can be reversed by another NumberConverter with opposite conversion types", function() {
		var testData = [4, 498, 1000, 1568, 1799, 2845, 3666];

		var nc = new NumberConverter(NumberConverter.DECIMAL, NumberConverter.ROMAN_NUMERAL);
		var nc2 = new NumberConverter(NumberConverter.ROMAN_NUMERAL, NumberConverter.DECIMAL);

		for(var i = 0; i < testData.length; i++) {
			expect(nc2.convert(nc.convert(testData[i]))).toBe(testData[i]);
			expect(nc.deconvert(nc2.deconvert(testData[i]))).toBe(testData[i]);
		}
	});

	it("can convert between decimal numbers and roman numerals", function() {
		var nc = new NumberConverter(NumberConverter.DECIMAL, NumberConverter.ROMAN_NUMERAL);

		expect(nc.convert(1234)).toBe("MCCXXXIV");
		expect(nc.deconvert("MMCMCCXCLXIV")).toBe(3254);
	});

	it("can convert between binary and octal numbers", function() {
		var nc = new NumberConverter(NumberConverter.BINARY, NumberConverter.OCTAL);

		expect(nc.convert(110010010)).toBe("622");
		expect(nc.deconvert(3456)).toBe("11100101110");
	});

	it("can convert between hexadecimal numbers and roman numerals", function() {
		var nc = new NumberConverter(NumberConverter.HEXADECIMAL, NumberConverter.ROMAN_NUMERAL);

		expect(nc.convert("ABE")).toBe("MMDCCL");
		expect(nc.deconvert("MCMXLVII")).toBe("79B");
	});

	it("can convert between scientific notation and binary numbers", function() {
		var nc = new NumberConverter(NumberConverter.SCIENTIFIC_NOTATION, NumberConverter.BINARY);

		expect(nc.convert("2.4187451e5")).toBe("111011000011010010");
		expect(nc.deconvert("1111111111")).toBe("1.023e3");
	});

	it("can convert between scientific notation and roman numerals", function() {
		var nc = new NumberConverter(NumberConverter.SCIENTIFIC_NOTATION, NumberConverter.ROMAN_NUMERAL);

		expect(nc.convert("2.3542e3")).toBe("MMCCCLIV");
		expect(nc.deconvert("MMMCMLXXVIII")).toBe("3.978e3");
	});

});
