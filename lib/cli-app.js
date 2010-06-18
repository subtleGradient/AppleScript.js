#!/usr/bin/env node #// -*- Mode: Node.js JavaScript; tab-width: 4; -*-

/*
---
name : cli-app
description : cli-app lets you convert a standard JavaScript object or class into a CLI app

authors   : Thomas Aylott
copyright : © 2010 Thomas Aylott
license   : MIT

provides : CLIApp
requires : Node.js/sys
...
*/

var CLIApp = (function(exports){

exports.CLIApp = CLIApp;

function CLIApp(cliMe){
	if (!(this instanceof CLIApp)) return CLIApp.from(cliMe);
}
CLIApp.from = function(cliMe){
	
};
CLIApp.fromClass = function(cliMe){
	
};
CLIApp.fromObject = function(cliMe){
	
};


return exports;
}(typeof exports != 'undefined' ? exports : CLIApp))
.CLIApp;

if (require.main == module) {
	
	function CLIAppDemo(){
		
	}
	CLIAppDemo.prototype = new CLIApp;
	if (require.main == module) new CLIAppDemo;
	
}


if (require.main == module) {
	
	function Person(){}
	
	Person.help = "Person totally rocks socks, bro!";
	
	Person.prototype = 
	
	{	'jump help':"Command your Person to jump!"
	,	jump: function(){
			this.
			return this;
		}
	,	'dance help':"Command your Person to dance!"
	,	dance: function(){
			return this;
		}
	};
	
	Person.prototype.jumpSuccess = "jumped";
	Person.prototype.jumpFail = "failed jumping";
	
	
}