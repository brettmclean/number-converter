#!/usr/bin/env node
var cliApp = require("../lib/cli/app");

var args = process.argv.slice(2);
var options = {
	appendNewLine: true
};
cliApp.run(args, process.stdin, process.stdout, options);
