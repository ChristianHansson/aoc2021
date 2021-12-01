const file_contents = require("./lib/file").load("one");
const file_contents_arr = file_contents.split("\n");
const len = file_contents_arr.length;


const sum_indexes = function(i){
	const a = i;
	const b = i + 1;
	const c = i + 2;
	const aa = file_contents_arr[a];
	const bb = file_contents_arr[b];
	const cc = file_contents_arr[c];
	if (aa && bb && cc){
		return Number(aa) + Number(bb) + Number(cc);
	}
}
let i = 0;
let p = 0;
let increases = 0;
do {
	const sum = sum_indexes(i);
	if (!sum){break;}
	if (p > 0){
		if (sum > p){
			increases++;
		}
		
		// console.log(sum)
	}
	p = sum;
	i++;
} while (i < len)
console.log(increases) // 1311 RIGHT Answer! Merry Christiansmas

// let increases = 0, previous = 0;
// for(const row of file_contents_arr){
// 	const value = Number(row);
// 	if (previous === 0){
// 		previous = value;
// 		continue;
// 	}
// 	if (value > previous){
// 		increases++;
// 	}

// 	previous = value;
// }
// console.log(increases)