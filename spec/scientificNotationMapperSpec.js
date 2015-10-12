var ScientificNotationMapper = require("../lib/mappers/ScientificNotationMapper");

describe("A Scientific Notation Mapper", function() {

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

	it("can convert positive decimal numbers less than one to scientific notation", function() {
		var snm = new ScientificNotationMapper();

		expect(snm.fromDecimal(0.99999)).toBe("9.9999e-1");
		expect(snm.fromDecimal(0.5)).toBe("5e-1");
		expect(snm.fromDecimal(0.12345)).toBe("1.2345e-1");
		expect(snm.fromDecimal(0.0000001)).toBe("1e-7");
		expect(snm.fromDecimal(0.00101010)).toBe("1.0101e-3");
		expect(snm.fromDecimal(0.0000025)).toBe("2.5e-6");
	});

	it("can convert whole decimal numbers less than negative one to scientific notation", function() {
		var snm = new ScientificNotationMapper();

		expect(snm.fromDecimal(-3)).toBe("-3e0");
		expect(snm.fromDecimal(-500)).toBe("-5e2");
		expect(snm.fromDecimal(-10000000)).toBe("-1e7");

		expect(snm.fromDecimal(-3141592654)).toBe("-3.141592654e9");
		expect(snm.fromDecimal(-12345)).toBe("-1.2345e4");
	});

	it("can convert fractional decimal numbers less than negative one to scientific notation", function() {
		var snm = new ScientificNotationMapper();

		expect(snm.fromDecimal(-1.2345)).toBe("-1.2345e0");
		expect(snm.fromDecimal(-12.345)).toBe("-1.2345e1");
		expect(snm.fromDecimal(-123.45)).toBe("-1.2345e2");
		expect(snm.fromDecimal(-1234.5)).toBe("-1.2345e3");

		expect(snm.fromDecimal(-984.18000)).toBe("-9.8418e2");
		expect(snm.fromDecimal(-984.180001)).toBe("-9.84180001e2");
	});

	it("can convert negative decimal numbers greater than negative one to scientific notation", function() {
		var snm = new ScientificNotationMapper();

		expect(snm.fromDecimal(-0.99999)).toBe("-9.9999e-1");
		expect(snm.fromDecimal(-0.5)).toBe("-5e-1");
		expect(snm.fromDecimal(-0.12345)).toBe("-1.2345e-1");
		expect(snm.fromDecimal(-0.0000001)).toBe("-1e-7");
		expect(snm.fromDecimal(-0.00101010)).toBe("-1.0101e-3");
		expect(snm.fromDecimal(-0.0000025)).toBe("-2.5e-6");
	});

	it("can convert zero to scientific notation", function() {
		var snm = new ScientificNotationMapper();

		expect(snm.fromDecimal(0)).toBe("0e0");
	});

	it("can convert one to scientific notation", function() {
		var snm = new ScientificNotationMapper();

		expect(snm.fromDecimal(1)).toBe("1e0");
	});

	it("can convert string decimal numbers to scientific notation", function() {
		var snm = new ScientificNotationMapper();

		expect(snm.fromDecimal("6.12")).toBe("6.12e0");
		expect(snm.fromDecimal("-12.345")).toBe("-1.2345e1");
		expect(snm.fromDecimal("3141592654")).toBe("3.141592654e9");
	});

	it("can convert zero as string to scientific notation", function() {
		var snm = new ScientificNotationMapper();

		expect(snm.fromDecimal("0")).toBe("0e0");
	});

	it("can convert MeN notation with positive coefficients and exponents to decimal", function() {
		var snm = new ScientificNotationMapper();

		expect(snm.toDecimal("5e4")).toBe(50000);
		expect(snm.toDecimal("1.23456789e1")).toBe(12.3456789);
		expect(snm.toDecimal("7.777e0")).toBe(7.777);
	});

	it("can convert MeN notation with positive coefficients and negative exponents to decimal", function() {
		var snm = new ScientificNotationMapper();

		expect(snm.toDecimal("1.25e-5")).toBe(0.0000125);
		expect(snm.toDecimal("9e-0")).toBe(9);
	});

	it("can convert MeN notation with negative coefficients and positive exponents to decimal", function() {
		var snm = new ScientificNotationMapper();

		expect(snm.toDecimal("-5e4")).toBe(-50000);
		expect(snm.toDecimal("-123.456e2")).toBe(-12345.6);
	});

	it("can convert MeN notation with negative coefficients and exponents to decimal", function() {
		var snm = new ScientificNotationMapper();

		expect(snm.toDecimal("-5e-4")).toBe(-0.0005);
		expect(snm.toDecimal("-1e-1")).toBe(-0.1);
	});

	it("can convert M*10^N notation to decimal", function() {
		var snm = new ScientificNotationMapper();

		expect(snm.toDecimal("2*10^10")).toBe(20000000000);
	});

	it("can convert Mx10^N notation to decimal", function() {
		var snm = new ScientificNotationMapper();

		expect(snm.toDecimal("5x10^5")).toBe(500000);
	});

	it("can convert M*10**N notation to decimal", function() {
		var snm = new ScientificNotationMapper();

		expect(snm.toDecimal("2*10**10")).toBe(20000000000);
	});

	it("can convert Mx10**N notation to decimal", function() {
		var snm = new ScientificNotationMapper();

		expect(snm.toDecimal("5x10**5")).toBe(500000);
	});

	it("can convert scientific notation to decimal regardless of case", function() {
		var snm = new ScientificNotationMapper();

		expect(snm.toDecimal("6.5E10")).toBe(65000000000);
		expect(snm.toDecimal("9X10^3")).toBe(9000);
	});

	it("can convert scientific notation to decimal regardless of whitespace", function() {
		var snm = new ScientificNotationMapper();

		expect(snm.toDecimal("3 e 3")).toBe(3000);
		expect(snm.toDecimal("          8.26e               5")).toBe(826000);
		expect(snm.toDecimal("	1	.	2	3		e				2")).toBe(123);
	});

	it("will ignore plus signs on coefficient and exponent portions of scientific notation", function() {
		var snm = new ScientificNotationMapper();

		expect(snm.toDecimal("+5e+4")).toBe(50000);
		expect(snm.toDecimal("5e+4")).toBe(50000);
		expect(snm.toDecimal("+5e4")).toBe(50000);
	});

});
