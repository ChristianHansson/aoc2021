const filecontent = require("./lib/file").load("data");
const arr = filecontent.split("\n");
class RandomBingoNumbers{
	index = 0;
	bingo_numbers = [];
	len = 0;
	constructor(line){
		this.bingo_numbers = line.split(",");
		this.len = this.bingo_numbers.length - 1;
	}
	draw(){
		let n = this.bingo_numbers[this.index];
		this.index += 1;
		return n;
	}
}
class Board {
	lines = [];
	formatted_lines = [];
	line_length = null;
	board_index = {};
	winner = false;
	add_row(line){
		this.lines.push(line);
		this.line_length = this.lines.length - 1;
	}
	is_full_board(){return this.line_length === 4;}
	index(){
		let i = 0;
		let o = 0;
		while(i < this.lines.length){
			let row = this.lines[i++];
			row = row.replace(/^\s+/, "");
			row = row.replace(/\s+$/, "");
			let s_row = row.replace(/\s+/g, ",").split(",");
			for (let p = 0; p < s_row.length; p++){
				let num = s_row[p];
				this.board_index[num] = {checked: false, y: i - 1, x: p};
			}
			this.formatted_lines.push(s_row);
			o++;
		}
	}
	have_i_won(n){
		const y = this.board_index[n].y;
		const x = this.board_index[n].x;
		const check_numbers = this.formatted_lines[y];
		for(const a of check_numbers){
			if (this.board_index[a].checked === false){
				return false;
			}
		}
		this.winner = true;
		return true;
	}
	checkNumber(n){
		if (n in this.board_index){
			this.board_index[n].checked = true;
			return this.have_i_won(n);
		}
		return false;
	}
	calc_unmarked(){
		if (!this.winner){return 0;}
		let c = 0;
		const keys = Object.keys(this.board_index);
		for(const key of keys){
			if (this.board_index[key].checked === false){
				c += Number(key);
			}
		}
		return c
	}
}
class Boards{
	boards = [];
	tmp = null;
	constructor(){}
	add_line(line){
		this.tmp.add_row(line);
		if (this.tmp.is_full_board()){
			this.boards.push(this.tmp);

			this.tmp = null;
		}
	}
	prepare(){
		this.tmp = new Board();
	}
	index(){
		let i = 0;
		while(i < this.boards.length){
			this.boards[i++].index();
		}
	}
	check(n){
		let i = 0;
		while(i < this.boards.length){
			if(this.boards[i++].checkNumber(n)){
				return true;
			}
		}
		return false;
	}
	get_unmarked_numbers(){
		let n = 0;
		let i = 0;
		while(i < this.boards.length){
			n += this.boards[i++].calc_unmarked()
		}
		return n;
	}
}

let bingoNumbers = null;
let board = new Boards();
let i = 0;
for (const line of arr){
	if (i === 0){
		bingoNumbers = new RandomBingoNumbers(line);
		i++;
		continue;
	}
	if (line.trim().length === 0){
		board.prepare();
		continue;
	}
	board.add_line(line);
}
board.index();

const BingoPlayer = function(draw_numbers = bingoNumbers.len){
	let winning_draw_number = 0;
	let unmarked_numbers = 0;
	for (let i = 0; i < draw_numbers; i++){
		let n = bingoNumbers.draw();
		let we_have_a_winner = board.check(n);
		if (we_have_a_winner){
			winning_draw_number = n;
			unmarked_numbers = board.get_unmarked_numbers();
			break;
		}
	}
	const bingo_score = unmarked_numbers * winning_draw_number;
	console.log(`winning_draw_number: ${winning_draw_number}`);
	console.log(`unmarked_numbers: ${unmarked_numbers}`);
	console.log(`bingo_score: ${bingo_score}`);
}

BingoPlayer();

// winning_draw_number: 41
// unmarked_numbers: 871
// bingo_score: 35711