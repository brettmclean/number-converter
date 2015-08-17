var BASE_CHARACTERS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

var convertNumberTypeToString = function(number) {
	number = typeof number === "number" ? number.toString() : number;
	return number;
}

module.exports = {
	convertNumberTypeToString: convertNumberTypeToString,
	BASE_CHARACTERS: BASE_CHARACTERS
};
