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

	it("can convert decimal numbers to roman numbers requiring subtraction", function() {
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
});
