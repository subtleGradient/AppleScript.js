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

var CSS = '';

var stdin = process.openStdin();
stdin.setEncoding('utf8');
stdin.addListener('data', function(chunk){
	CSS += chunk;
});
stdin.addListener('end', function(){
	
	Safari.setCSS(CSS);
	
	require('sys').debug('\
	\n\
	Setting the CSS…\
	\n\
	');
});
