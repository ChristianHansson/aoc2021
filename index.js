const filecontent = require("./lib/file").load("data");
const arr = filecontent.split("\n");

let legend = [];
let len = 0;
for (const line of arr){
	legend.push(line.split(""));
	len === 0 ? len = legend[0].length : !1;
}


const get_most_common_at_index = function(i){
	let n = 0;
	let l = {0: 0, 1: 0};
	while (n < legend.length){
		let num = legend[n++][i];
		l[num]++;
	}
	return l["0"] > l["1"] ? 0 : 1;
}

let gamma = "";
let epsilon = "";
for (let i = 0; i < len; i++){
	let most_common = get_most_common_at_index(i);
	epsilon += most_common === 1 ? 0 : 1;
	gamma += most_common;
}
gamma = parseInt(gamma, 2);
epsilon = parseInt(epsilon, 2);
const consumption = gamma * epsilon;
console.log(gamma, epsilon, consumption);
// 1337 2758 3687446 Correct!
