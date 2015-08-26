var ScientificNotationMapper = require("../lib/mappers/ScientificNotationMapper");

describe("A Scientific Notation Mapper", function() {

	it("has toDecimal and fromDecimal methods", function() {
		var snm = new ScientificNotationMapper();

		expect(typeof snm.toDecimal).toBe("function");
		expect(typeof snm.fromDecimal).toBe("function");
	});

});
