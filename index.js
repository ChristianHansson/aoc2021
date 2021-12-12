const filecontent = require("./lib/file").load("data");
const log = function(){console.log.apply(null, arguments);};

const fish_data = filecontent.split(",").map(a => {return +a});
const fs = require("fs"), path = require("path");
const is_debug = Boolean(process.env.DEBUG) === true;
const debug = function(content, first = false){
	if (!is_debug){return;}
	first === false ? fs.appendFileSync(path.resolve(__dirname, 'debug.txt'), content) : fs.writeFileSync(path.resolve(__dirname, 'debug.txt'), content);
};

function part1(){

	const fishHelper = {
		fishes: fish_data,
		fishLen: null,
		spawn: [],
		spawnFishes(){
			if (this.spawn.length > 0){
				for(let i = 0; i < this.spawn.length; i++){
					this.fishes.push(8);
				}
				this.spawn = [];
			}
		},
		run(day){
			this.fishLen = this.fishes.length;
			this.spawnFishes();
			debug(this.fishes.toString() + "\n")
		}
	};
	debug('Initial state: ' + fishHelper.fishes.toString() + "\n", true)
	let days = 2;
	let percent_incrementer = 0;
	for(let i = 1; i < days + 1; i++){
		debug(`After ${i < 10 ? " " + i : i} ${i === 1 ? "day: " : "days:"} `);
		fishHelper.run.apply(fishHelper, [i]);
	}
	log(fishHelper.fishes.length)

	// 372984 == Right Answer
}

function part2_____() {
	const queue = Array(9).fill(0);
	for (const fish of fish_data) {
	  queue[fish]++;
	}
	for (let i = 0; i < 18; i++) {
	  const currentFishes = queue.shift();
	  queue.push(currentFishes);
	  queue[6] += currentFishes;
	}
  
	console.log(queue.reduce((a, b) => a + b, 0));
  }
function part2(){
	const queue = Array(9).fill(0);
	for(const fish of fish_data){
		queue[fish]++;
	}
	
	for(let i = 0; i < 256; i++){
		const a = queue.shift();
		queue.push(a);
		queue[6] += a;
	}
	log(queue.reduce((a,b) => a + b, 0))
}
part2();