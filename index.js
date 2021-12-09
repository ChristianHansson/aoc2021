const filecontent = require("./lib/file").load("data");
const log = function(){console.log.apply(null, arguments);};
const file_arr = filecontent.split("\n");

const lines = (() => {
	let a = [];
	for (const line of file_arr){
		if (line.indexOf("#") === 0){continue;}
		if (line.trim().length === 0){continue;}
		const [from, to] = line.split(" -> ").map((p) => {
			const [x, y] = p.split(",")
			return {x: +x, y: +y}
		});
		a.push({from, to});
	}
	return a;
})();

function part1(){
	const l = lines.filter(a => {
		if (a.from.x === a.to.x || a.from.y === a.to.y){
			return true;
		}else{
			return false;
		}
	});
	const points = new Map();
	let intersections = 0;
	const add_to_points = key => {
		let prev = points.get(key);
		if (!prev){
			prev = 0;
		}
		prev++;
		if (prev === 2){
			intersections++;
		}
		points.set(key, prev);
	};
	for (const segment of l) {
		const horizontal = segment.from.y === segment.to.y;
		const vertical = segment.from.x === segment.to.x;
		let currentPoint = {x: +segment.from.x, y: +segment.from.y};
		while (currentPoint.x !== segment.to.x || currentPoint.y !== segment.to.y){
			add_to_points([currentPoint.x, currentPoint.y].join(","));

			if (horizontal){
				currentPoint.x += currentPoint.x < segment.to.x ? 1 : -1;
			}else if(vertical){
				currentPoint.y += currentPoint.y < segment.to.y ? 1 : -1;
			}else{
				currentPoint.x += currentPoint.x < segment.to.x ? 1 : -1;
				currentPoint.y += currentPoint.y < segment.to.y ? 1 : -1;
			}
		}
		add_to_points([currentPoint.x, currentPoint.y].join(","));

		break;
	}
	console.log(intersections)


	// 4745 === RIGHT
}

// part1();

function part2(){
	const l = lines.filter(a => {
		if (a.from.x === a.to.x || a.from.y === a.to.y){
			a.dir = 'dir_or_vert';
		}else{
			a.dir = "diagonal";
		}
		return true;
	});
	const points = new Map();
	let intersections = 0;
	const add_to_points = key => {
		let prev = points.get(key);
		if (!prev){
			prev = 0;
		}
		prev++;
		if (prev === 2){
			intersections++;
		}
		points.set(key, prev);
	};
	for (const segment of l) {
		const horizontal = segment.from.y === segment.to.y;
		const vertical = segment.from.x === segment.to.x;
		let currentPoint = { x: segment.from.x, y: segment.from.y };
		while (currentPoint.x !== segment.to.x || currentPoint.y !== segment.to.y){
			add_to_points([currentPoint.x, currentPoint.y].join(","));

			if (horizontal){
				currentPoint.x += currentPoint.x < segment.to.x ? 1 : -1;
			}else if(vertical){
				currentPoint.y += currentPoint.y < segment.to.y ? 1 : -1;
			}else{
				currentPoint.x += currentPoint.x < segment.to.x ? 1 : -1;
				currentPoint.y += currentPoint.y < segment.to.y ? 1 : -1;
			}
		}
		add_to_points([currentPoint.x, currentPoint.y].join(","));
	}
	console.log(intersections)


	// 18442 === RIGHT
}

part2();