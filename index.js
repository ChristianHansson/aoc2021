const file_contents = require("./lib/file").load("one");
const file_contents_arr = file_contents.split("\n");

let increases = 0, previous = 0;
for(const row of file_contents_arr){
	const value = Number(row);
	if (previous === 0){
		previous = value;
		continue;
	}
	if (value > previous){
		increases++;
	}

	previous = value;
}
console.log(increases)