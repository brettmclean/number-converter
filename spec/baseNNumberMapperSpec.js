var BaseNNumberMapper = require("../lib/mappers/BaseNNumberMapper");

describe("A Base-N Number Mapper", function() {

	it("has toDecimal and fromDecimal methods", function() {
		var bnnm = new BaseNNumberMapper();

		expect(typeof bnnm.toDecimal).toBe("function");
		expect(typeof bnnm.fromDecimal).toBe("function");
	});

	it("should throw a RangeError when given a negative number", function() {
		var bnnm = new BaseNNumberMapper();

		expect(function() {
			bnnm.fromDecimal(-5);
		}).toThrowError(RangeError);

		expect(function() {
			bnnm.toDecimal(-5);
		}).toThrowError(RangeError);

		expect(function() {
			bnnm.fromDecimal("-10011010");
		}).toThrowError(RangeError);
	});

	it("should throw a RangeError when given a base outside of an acceptable range", function() {
		expect(function() {
			new BaseNNumberMapper(1);
		}).toThrowError(RangeError);

		expect(function() {
			new BaseNNumberMapper(37);
		}).toThrowError(RangeError);

		expect(function() {
			new BaseNNumberMapper(-8);
		}).toThrowError(RangeError);
	});

});