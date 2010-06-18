#!/usr/bin/env node #// -*- Mode: Node.js JavaScript; tab-width: 4; -*-
/*
---
name : AppleScriptApp.node
description : AppleScriptApp.node lets you control AppleScript apps using osascript using Node.js

authors   : Thomas Aylott
copyright : © 2010 Thomas Aylott
license   : MIT

provides:
- AppleScriptApp

requires:
- Node.js/sys.p
- Node.js/sys.print
- Node.js/sys.debug
- Node.js/child_process.exec
- escapeShell

environment:
- osx
- osascript
- Safari.app
...
*/
(function(exports){
require.paths.unshift('../lib');
var sys = require('sys');
var escape = require('escape');


exports.AppleScriptApp = AppleScriptApp;

function AppleScriptApp(appName){
	if (!(this instanceof AppleScriptApp)) throw new Error("Usage: `new AppleScriptApp(appName:String)`");
	this.appName = ''+appName;
}

AppleScriptApp.prototype.__exec__ = require('child_process').exec;
// AppleScriptApp.prototype.__exec__ = require('sys').print;

AppleScriptApp.prototype.tell = function(appleScript, callback){
	var command = 'osascript -e ' + 
		[	escape.String.escapeShell('tell application "' + this.appName + '"')
		,	escape.String.escapeShell(appleScript)
		,	'end tell'
		].join(' -e ')
	;

	if (this.debugLevel == 'debug') sys.debug(command);

	return this.__exec__(

		command
		, 
		{	encoding:	'utf8'
		,	timeout:	120 *1000
		,	maxBuffer:	10240 *1024
		//,	killSignal:	'SIGKILL'
		}
		,
		callback || this.handleExec

	);
}

AppleScriptApp.prototype.handleExec = function(error, stdout, stderr){
	sys.print(stdout);
	if (this.debugLevel == 'debug') sys.debug(stderr);
	if (error !== null) sys.p(error);
};


}(typeof exports != 'undefined' ? exports : this));
