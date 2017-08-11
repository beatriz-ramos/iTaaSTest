const read = require('./tools/readTxt');
const buildAgoraLog = require('./tools/buildAgoraLog');
const write = require('write');
var response = read.readTxt();
console.log(`Log file received:\n${response}`);
var result = buildAgoraLog.parseToAgoraFormat(response);
console.log(result);
write("./output/result.csv", result, function(err) {
    if (err) console.log(err);
});