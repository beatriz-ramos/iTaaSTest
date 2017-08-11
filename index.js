const read = require('./tools/readFile');
const buildAgoraLog = require('./tools/buildAgoraLog');
const write = require('write');
const response = read.readFile(process.argv[2]);
console.log("Log file received:\n" + response);
const result = buildAgoraLog.parseToAgoraFormat(response);
console.log(result);

write(process.argv[3], result, function(err) {
    if (err) console.log(err);
});