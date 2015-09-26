var cliApp = require("cli/app");

var arguments = process.argv.slice(2);
cliApp.run(arguments, process.stdin, process.stdout);
