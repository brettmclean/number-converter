var cliApp = require("./cli/app");

var args = process.argv.slice(2);
var options = {
	appendNewLine: true
};
cliApp.run(args, process.stdin, process.stdout, options);
