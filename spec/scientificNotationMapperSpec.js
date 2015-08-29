var ScientificNotationMapper = require("../lib/mappers/ScientificNotationMapper");

describe("A Scientific Notation Mapper", function() {

	it("has toDecimal and fromDecimal methods", function() {
		var snm = new ScientificNotationMapper();

		expect(typeof snm.toDecimal).toBe("function");
		expect(typeof snm.fromDecimal).toBe("function");
	});

	it("can convert whole decimal numbers greater than one to scientific notation", function() {
		var snm = new ScientificNotationMapper();

		expect(snm.fromDecimal(3)).toBe("3e0");
		expect(snm.fromDecimal(500)).toBe("5e2");
		expect(snm.fromDecimal(10000000)).toBe("1e7");

		expect(snm.fromDecimal(3141592654)).toBe("3.141592654e9");
		expect(snm.fromDecimal(12345)).toBe("1.2345e4");
	});

	it("can convert fractional decimal numbers greater than one to scientific notation", function() {
		var snm = new ScientificNotationMapper();

		expect(snm.fromDecimal(1.2345)).toBe("1.2345e0");
		expect(snm.fromDecimal(12.345)).toBe("1.2345e1");
		expect(snm.fromDecimal(123.45)).toBe("1.2345e2");
		expect(snm.fromDecimal(1234.5)).toBe("1.2345e3");

		expect(snm.fromDecimal(984.18000)).toBe("9.8418e2");
		expect(snm.fromDecimal(984.180001)).toBe("9.84180001e2");
	});

	it("can convert one to scientific notation", function() {
		var snm = new ScientificNotationMapper();

		expect(snm.fromDecimal(1)).toBe("1e0");
	});

	it("can convert positive decimal numbers less than one to scientific notation", function() {
		var snm = new ScientificNotationMapper();

		expect(snm.fromDecimal(0.99999)).toBe("9.9999e-1");
		expect(snm.fromDecimal(0.5)).toBe("5e-1");
		expect(snm.fromDecimal(0.12345)).toBe("1.2345e-1");
		expect(snm.fromDecimal(0.0000001)).toBe("1e-7");
		expect(snm.fromDecimal(0.00101010)).toBe("1.0101e-3");
		expect(snm.fromDecimal(0.0000025)).toBe("2.5e-6");
	});

	it("can convert zero to scientific notation", function() {
		var snm = new ScientificNotationMapper();

		expect(snm.fromDecimal(0)).toBe("0e0");
	});

});
