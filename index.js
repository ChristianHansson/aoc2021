const file_contents = require("./lib/file").load("two");
const arr = file_contents.split("\n");

const d = {
	horizontal: 0,
	depth: 0,
	aim: 0,
	forward(n){
		this.horizontal += n;
		if (this.aim > 0){
			const nv = n * this.aim;
			this.depth += nv;
		}
	},
	down(n){
		this.aim += n;
	},
	up(n){
		this.aim -= n;
	},
};

for (const r of arr){
	const tmp = r.split(" ");
	const dir = tmp[0];
	const value = +tmp[1];
	if (!(dir in d)){console.log(`${dir} missing in var:d`);process.exit();}
	d[dir].apply(d, [value]);
}
// 1817 997833 1813062561 Correct for part 2
console.log(d.horizontal, d.depth, d.horizontal * d.depth);
