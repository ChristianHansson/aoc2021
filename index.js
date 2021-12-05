const filecontent = require("./lib/file").load("data");
const arr = filecontent.split("\n");

let legend = [];
let len = 0;
for (const line of arr){
	legend.push(line.split(""));
	len === 0 ? len = legend[0].length - 1 : !1;
}

const remove_from_l_by_value_and_index = (value, index, l) => {
	let i = 0;
	let n = [];
	while(i < l.length){
		let row = l[i++];
		if (+value === +row[index]){
			n.push(row);
		}
	}
	return n;
};

const parse_array = (index, l, keep_one_with_most = true) => {
	let i = 0;
	let o = {1: 0, 0: 0};
	let splice_at_indexes = -1;
	while (i < l.length){
		let char = l[i++][index];
		if (!(char in o)){
			console.log(char)
			process.exit()
		}
		o[char]++;
	}
	if (l.length === 1){
		return l;
	}
	if (keep_one_with_most){
		if (o["1"] > o["0"]){
			l = remove_from_l_by_value_and_index("1", index, l);
		}else if (o["0"] > o["1"]){
			l = remove_from_l_by_value_and_index("0", index, l);
		}else{
			l = remove_from_l_by_value_and_index("1", index, l);
		}
	}else{
		if (o["1"] > o["0"]){
			l = remove_from_l_by_value_and_index("0", index, l);
		}else if (o["0"] > o["1"]){
			l = remove_from_l_by_value_and_index("1", index, l);
		}else{
			l = remove_from_l_by_value_and_index("0", index, l);
		}
	}
	return index < len ? parse_array(index + 1, l, keep_one_with_most) : l;
};

let oxygen_value = parse_array(0, legend);
let oxygen_value_decimal = parseInt(oxygen_value[0].join(""), 2);
console.log(`oxygen_value: ${oxygen_value_decimal}`);
let co_two_value = parse_array(0, legend, false);
let co_two_value_decimal = parseInt(co_two_value[0].join(""), 2);
console.log(`co_two_value: ${co_two_value_decimal}`);
const life_support_rating = oxygen_value_decimal * co_two_value_decimal;
console.log(`life_support_rating: ${life_support_rating}`);

// oxygen_value: 1599
// co_two_value: 2756
// life_support_rating: 4406844 Correct!