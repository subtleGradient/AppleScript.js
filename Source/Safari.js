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

Safari.command.removeCSS = function(){
	return Array.prototype.map.call(document.querySelectorAll('link[rel=stylesheet][href],style'),function(css){
		css.disabled = true;
		css.parentNode.removeChild(css);
		return css;
	}).join('\n');
};
Safari.command.addCSS = function(){
	
	/*
	---
	name : Sheet.DOM
	description : Sheet.DOM adds some handy stuff for working with the browser's native CSS capabilities.

	authors   : Thomas Aylott
	copyright : © 2010 Thomas Aylott
	license   : MIT

	provides : Sheet.DOM
	...
	*/
	
	if (typeof Sheet == 'undefined') var Sheet = {};
	if (Sheet.DOM == null) Sheet.DOM = {};

	window.Sheet = Sheet;
	
	Sheet.DOM.createSheet = function(raw){
		var oldLength = document.styleSheets.length;

		if (document.createStyleSheet){
			document.createStyleSheet();
			document.styleSheets[document.styleSheets.length - 1].cssText = raw;
		}

		if (oldLength >= document.styleSheets.length){
			var style = document.createElement('style');
			style.setAttribute('type','text/css');
			style.appendChild(document.createTextNode(raw));
			document.getElementsByTagName('head')[0].appendChild(style);
		}

		if (oldLength >= document.styleSheets.length){
			var style = document.createElement('div');
			style.innerHTML = '<style type="text/css">' + raw + '</style>';
			document.getElementsByTagName('head')[0].appendChild(style);
		}

		if (oldLength >= document.styleSheets.length)
			throw new Error('no styleSheet added :(');

		var sheet = document.styleSheets[document.styleSheets.length - 1];
		sheet.cssText = raw;

		return sheet;
	};

	// Sheet.DOM.createSheet = function(raw){
	// 	var style = document.createElement('style');
	// 	style.setAttribute('type','text/css');
	// 	style.appendChild(document.createTextNode(raw));
	// 	document.getElementsByTagName('head')[0].appendChild(style);
	// 	
	// 	return document.styleSheets[document.styleSheets.length - 1];
	// };

	Sheet.DOM.createStyle = function(raw){
		var div = document.createElement('div');
		div.innerHTML = '<div style="' + raw + '"></div>';
		return { style:div.firstChild.style };
	};
};
Safari.prototype.setCSS = function(css){
	this.exec([uneval(Safari.command.addCSS), uneval(Safari.command.removeCSS), uneval('Sheet.DOM.createSheet("' + escape.String.escapeJS(css) + '")')].join(';'));
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
