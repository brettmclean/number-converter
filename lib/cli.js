var cliApp = require("cli/app");

var args = process.argv.slice(2);
cliApp.run(args, process.stdin, process.stdout);
