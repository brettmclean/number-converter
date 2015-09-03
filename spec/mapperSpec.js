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

	});
};

for(var mapperIdx = 0; mapperIdx < mappers.length; mapperIdx++) {
	var mapperInfo = mappers[mapperIdx];

	createTestsForMapper(mapperInfo);
}
