const path = require("path");
const fs = require("fs");
const data_path = path.resolve(__dirname, "../", "data");
module.exports = {
	filename: null,
	exists(){return fs.existsSync(path.join(data_path, this.filename));},
	get_filename(n){
		return `${(process.env.NODE_ENV && process.env.NODE_ENV === "dev" ? true : false) ? 'test_' : ''}${n}.txt`;
	},
	load(n){
		this.filename = this.get_filename(n);
		if(!this.exists()) return null;
		return fs.readFileSync(path.join(data_path, this.filename)).toString();
	}
};
