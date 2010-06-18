#!/usr/bin/env node #// -*- Mode: Node.js JavaScript; tab-width: 4; -*-

var Safari = 
(function(exports){


var hasOwnProperty = {}.hasOwnProperty;
var escape = require('../lib/escape');
var AppleScriptApp = require('./AppleScriptApp-node').AppleScriptApp;


function uneval(fn){
	fn = ''+fn;
	var string = '';
	
	if (/^function\b/.test(fn)) string += '(' + fn + ')()';
	else return fn;
	return string;
}



exports.Safari = Safari;

function Safari(){
	if (!(this instanceof Safari)) throw new Error("Usage: `new Safari`");
	var self = this;
	this.execSync = function(js){
		return self.exec(js);
	};
}

Safari.prototype.debugLevel = '';

Safari.prototype = new AppleScriptApp('Safari');

Safari.prototype.exec = 
Safari.prototype.evalJS = 
Safari.prototype.doJavaScript = function(js, callback){
	js = uneval(Safari.command[js] || js);
	
	return this.tell
	(	'tell the first document to do javascript "'
		+	escape.String.escapeAppleScript(js)
		+	'"'
		,	callback
	);
}

Safari.prototype.get = function(propertyName){
	return this.tell('get '+ propertyName +' of the first document');
}

Safari.prototype.getHTML = function(){
	var HTML = '';
	HTML += docType;
	HTML += this.doJavaScript('getHTML');
	return HTML;
};



Safari.command = {};

Safari.command.getHTML = function(){
	return document.documentElement.outerHTML;
};

Safari.command.reload = function(){
	return document.location.reload();
};

Safari.command.reloadCSS = function(){
	return Array.prototype.map.call(document.querySelectorAll('link[rel=stylesheet][href]'),function(link){
		var href = link.href;
		href = href.replace(/(&|\?)forceReload=\d+/g, '$1');
		href += (1+href.indexOf('?') ? '&' : '?') + 'forceReload=' + (+new Date)
		link.href = href;
		return href;
	}).join('\n');
};


return exports;
}(typeof exports != 'undefined' ? exports : this))
.Safari;


if (require.main == module) {
	var safari = new Safari;
	
	//require('cli-app')
	
	safari.doJavaScript(function(){
		alert("Hello Safari! — Love, Node.js");
	});
	//safari.doJavaScript('reload');
	
}
