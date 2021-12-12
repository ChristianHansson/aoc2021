const filecontent = require("./lib/file").load("data");
const log = function(){console.log.apply(null, arguments);};
const fs = require("fs"), path = require("path");
const is_debug = Boolean(process.env.DEBUG) === true;
const debug = function(content, first = false){
	if (!is_debug){return;}
	first === false ? fs.appendFileSync(path.resolve(__dirname, 'debug.txt'), content) : fs.writeFileSync(path.resolve(__dirname, 'debug.txt'), content);
};