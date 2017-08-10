const read = require('./app/readTxt');
const dataArray = require('./app/dataArray');
const result = read.readTxt();
console.log(`The result is:\n${result}`);
var array = dataArray.toDataArray(result);
console.log(array);