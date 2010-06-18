(function(exports){
var String = exports.String || (exports.String = function(){});


// escape text to make it usable in a shell script as one “word” (string)
//	Based on TextMate.app/Contents/SharedSupport/Support/lib/escape.rb e_sh
String.escapeShell = function(str){
	// Ruby: str.to_s.gsub(/(?=[^a-zA-Z0-9_.\/\-\x7F-\xFF\n])/n, '\\').gsub(/\n/, "'\n'").sub(/^$/, "''")
	return (''+str).replace(/(?=[^a-zA-Z0-9_.\/\-\x7F-\xFF\n])/gm, '\\').replace(/\n/g, "'\n'").replace(/^$/, "''");
}

// escape text for use in an AppleScript string
//	Based on TextMate.app/Contents/SharedSupport/Support/lib/escape.rb e_as
String.escapeAppleScript = function(str){
	// Ruby: str.to_s.gsub(/(?=["\\])/, '\\')
	return (''+str).replace(/(?=["\\])/g, '\\');
}


}(typeof exports != 'undefined' ? exports : this));
