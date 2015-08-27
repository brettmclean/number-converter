var ScientificNotationMapper = require("../lib/mappers/ScientificNotationMapper");

describe("A Scientific Notation Mapper", function() {

	it("has toDecimal and fromDecimal methods", function() {
		var snm = new ScientificNotationMapper();

		expect(typeof snm.toDecimal).toBe("function");
		expect(typeof snm.fromDecimal).toBe("function");
	});

	it("can convert positive, whole decimal numbers to scientific notation", function() {
		var snm = new ScientificNotationMapper();

		expect(snm.fromDecimal(3)).toBe("3e0");
	});

});
