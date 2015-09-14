var MAPPINGS = [
	{ number: 1000, numeral: "M" },
	{ number: 500, numeral: "D" },
	{ number: 100, numeral: "C" },
	{ number: 50, numeral: "L" },
	{ number: 10, numeral: "X" },
	{ number: 5, numeral: "V" },
	{ number: 1, numeral: "I" }
];

var mappingsByNumber = {};
var mappingsByNumeral = {};

var getNumeralMappings = function() {
	var result = [];

	for(var i = 0; i < MAPPINGS.length; i++) {
		result.push(cloneSimpleObject(MAPPINGS[i]));
	}

	return result;
};

var getMappingsByNumber = function() {
	return cloneSimpleObject(mappingsByNumber);
};

var getMappingsByNumeral = function() {
	return cloneSimpleObject(mappingsByNumeral);
};

var cloneSimpleObject = function(obj) {
	var clone = {};

	for(var prop in obj) {
		/* istanbul ignore else  */
		if(obj.hasOwnProperty(prop)) {
			clone[prop] = obj[prop];
		}
	}

	return clone;
};

(function populateMappingHashes() {
	for(var i = 0; i < MAPPINGS.length; i++) {
		var mapping = MAPPINGS[i];
		mappingsByNumber[mapping.number] = mapping;
		mappingsByNumeral[mapping.numeral] = mapping;
	}
}());

module.exports = {
	getNumeralMappings: getNumeralMappings,
	getMappingsByNumber: getMappingsByNumber,
	getMappingsByNumeral: getMappingsByNumeral
};
