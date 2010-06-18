#!/usr/bin/env node #// -*- Mode: Node.js JavaScript; tab-width: 4; -*-

require.paths.unshift('../Source');
var sys = require('sys');
var Safari = new (require('Safari').Safari);



Safari.exec("document.getElementsByTagName('div').length");



Safari.exec(function(){
	return [].map.call(document.querySelectorAll('[href]'),function(a){return a.href}).sort().join('\n');
},function(error,stdout,stderr){
	sys.print(stdout);
});


