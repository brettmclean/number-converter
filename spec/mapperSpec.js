var RomanNumeralMapper = require("../lib/mappers/RomanNumeralMapper");
var BaseNNumberMapper = require("../lib/mappers/BaseNNumberMapper");
var ScientificNotationMapper = require("../lib/mappers/ScientificNotationMapper");

var MapperInfo = function(ctor, description) {
	this.ctor = ctor;
	this.description = description;
};

var mappers = [
	new MapperInfo(RomanNumeralMapper, "A Roman Numeral Mapper"),
	new MapperInfo(BaseNNumberMapper, "A Base-N Number Mapper"),
	new MapperInfo(ScientificNotationMapper, "A Scientific Notation Mapper")
];

var createTestsForMapper = function(mapperInfo) {
	describe(mapperInfo.description, function() {

		it("has toDecimal and fromDecimal methods", function() {
			var bnnm = new mapperInfo.ctor();

			expect(typeof bnnm.toDecimal).toBe("function");
			expect(typeof bnnm.fromDecimal).toBe("function");
		});

		it("should throw a TypeError when fromDecimal is given a non-number", function() {
			var rnm = new RomanNumeralMapper();

			expect(function() {
				rnm.fromDecimal("Hello");
			}).toThrowError(TypeError);

			expect(function() {
				rnm.fromDecimal(true);
			}).toThrowError(TypeError);

			expect(function() {
				rnm.fromDecimal(function() {});
			}).toThrowError(TypeError);

			expect(function() {
				rnm.fromDecimal({});
			}).toThrowError(TypeError);
		});

	});
};

for(var mapperIdx = 0; mapperIdx < mappers.length; mapperIdx++) {
	var mapperInfo = mappers[mapperIdx];

	createTestsForMapper(mapperInfo);
}
