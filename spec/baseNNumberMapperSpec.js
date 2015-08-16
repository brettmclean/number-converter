var BaseNNumberMapper = require("../lib/mappers/BaseNNumberMapper");

describe("A Base-N Number Mapper", function() {

	it("has toDecimal and fromDecimal methods", function() {
		var bnnm = new BaseNNumberMapper();

		expect(typeof bnnm.toDecimal).toBe("function");
		expect(typeof bnnm.fromDecimal).toBe("function");
	});

});
