
const fs          = require("fs");
const crypto      = require("crypto");


const Writable    = require("stream").Writable;
const Readable    = require("stream").Readable;
const Transform   = require("stream").Transform;
const PassThrough = require("stream").PassThrough;

const input = fs.createReadStream("test.txt");
const output1 = fs.createWriteStream("test_output1.txt");
const output2 = fs.createWriteStream("test_output2.txt");

task1();
task2();


function task1()
{
	input.on("data", console.log);

	input.pipe(crypto.createHash('md5')).pipe(output1);
}

function task2()
{
	const calcMD5 = new Transform({
		transform(chunk, encoding, callback){
			let md5 = crypto.createHash('md5').update(chunk).digest("hex");
			console.log(md5);
			callback(null,md5); 	
		}
	});
	input.setEncoding('utf8');
	input.pipe( calcMD5 ).pipe(output2);
}