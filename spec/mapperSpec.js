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
			var mapper = new mapperInfo.ctor();

			expect(typeof mapper.toDecimal).toBe("function");
			expect(typeof mapper.fromDecimal).toBe("function");
		});

		it("should throw a TypeError when fromDecimal is given a non-number", function() {
			var mapper = new mapperInfo.ctor();

			expect(function() {
				mapper.fromDecimal("Hello");
			}).toThrowError(TypeError);

			expect(function() {
				mapper.fromDecimal(true);
			}).toThrowError(TypeError);

			expect(function() {
				mapper.fromDecimal(function() {});
			}).toThrowError(TypeError);

			expect(function() {
				mapper.fromDecimal(undefined);
			}).toThrowError(TypeError);

			expect(function() {
				mapper.fromDecimal({});
			}).toThrowError(TypeError);
		});

	});
};

for(var mapperIdx = 0; mapperIdx < mappers.length; mapperIdx++) {
	var mapperInfo = mappers[mapperIdx];

	createTestsForMapper(mapperInfo);
}
