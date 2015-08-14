var RomanNumeralMapper = require("../lib/mappers/RomanNumeralMapper");

describe("A Roman Numeral Mapper", function() {

	it("has toDecimal and fromDecimal methods", function() {
		var rnm = new RomanNumeralMapper();

		expect(typeof rnm.toDecimal).toBe("function");
		expect(typeof rnm.fromDecimal).toBe("function");
	});

	it("can convert decimal numbers to simple roman numerals", function() {
		var rnm = new RomanNumeralMapper();

		expect(rnm.fromDecimal(1)).toBe("I");
		expect(rnm.fromDecimal(3)).toBe("III");
		expect(rnm.fromDecimal(5)).toBe("V");
		expect(rnm.fromDecimal(10)).toBe("X");
		expect(rnm.fromDecimal(50)).toBe("L");
		expect(rnm.fromDecimal(100)).toBe("C");
		expect(rnm.fromDecimal(500)).toBe("D");
		expect(rnm.fromDecimal(1000)).toBe("M");
		expect(rnm.fromDecimal(3888)).toBe("MMMDCCCLXXXVIII");
	});

	it("can convert decimal numbers to roman numerals requiring subtraction", function() {
		var rnm = new RomanNumeralMapper();

		expect(rnm.fromDecimal(4)).toBe("IV");
		expect(rnm.fromDecimal(9)).toBe("IX");
		expect(rnm.fromDecimal(14)).toBe("XIV");
		expect(rnm.fromDecimal(19)).toBe("XIX");
		expect(rnm.fromDecimal(49)).toBe("XLIX");
		expect(rnm.fromDecimal(99)).toBe("XCIX");
		expect(rnm.fromDecimal(199)).toBe("CXCIX");
		expect(rnm.fromDecimal(950)).toBe("CML");
		expect(rnm.fromDecimal(999)).toBe("CMXCIX");
		expect(rnm.fromDecimal(1994)).toBe("MCMXCIV");
		expect(rnm.fromDecimal(3999)).toBe("MMMCMXCIX");
	});

	it("can convert simple roman numerals to decimal numbers", function() {
		var rnm = new RomanNumeralMapper();

		expect(rnm.toDecimal("I")).toBe(1);
		expect(rnm.toDecimal("III")).toBe(3);
		expect(rnm.toDecimal("V")).toBe(5);
		expect(rnm.toDecimal("X")).toBe(10);
		expect(rnm.toDecimal("L")).toBe(50);
		expect(rnm.toDecimal("C")).toBe(100);
		expect(rnm.toDecimal("D")).toBe(500);
		expect(rnm.toDecimal("M")).toBe(1000);
		expect(rnm.toDecimal("MMMDCCCLXXXVIII")).toBe(3888);
	});

	it("can convert roman numerals requiring subtraction to decimal numbers", function() {
		var rnm = new RomanNumeralMapper();

		expect(rnm.toDecimal("IV")).toBe(4);
		expect(rnm.toDecimal("IX")).toBe(9);
		expect(rnm.toDecimal("XIV")).toBe(14);
		expect(rnm.toDecimal("XIX")).toBe(19);
		expect(rnm.toDecimal("XLIX")).toBe(49);
		expect(rnm.toDecimal("XCIX")).toBe(99);
		expect(rnm.toDecimal("CXCIX")).toBe(199);
		expect(rnm.toDecimal("CML")).toBe(950);
		expect(rnm.toDecimal("CMXCIX")).toBe(999);
		expect(rnm.toDecimal("MCMXCIV")).toBe(1994);
		expect(rnm.toDecimal("MMMCMXCIX")).toBe(3999);
	});
});
