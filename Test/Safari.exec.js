#!/usr/bin/env node #// -*- Mode: Node.js JavaScript; tab-width: 4; -*-
// 
// REPL 
//     Safari.exec
//     document.documentElement.outerHTML
//     document.documentElement.childNodes.length
//     ^D
//     Bye!
// 
// STDIN
//     echo 'document.documentElement.outerHTML'|Safari.exec
// 
// ARGV
//     Safari.exec document.documentElement.outerHTML
// 

var Safari = new (require('AppleScript/Source/Safari').Safari);

var commands = process.ARGV.slice(2);
if (commands && commands.length)
	commands.forEach(Safari.execSync);

else {
	var stdin = process.openStdin();
	stdin.setEncoding('utf8');
	stdin.addListener('data', Safari.execSync);
	stdin.addListener('end', function(){
		process.stdout.write('\nBye!\n');
	});
}
