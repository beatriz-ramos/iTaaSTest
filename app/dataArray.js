const moment = require('moment');
const arrayHandler = require("./arrayHandler");
function toDataArray(text) 
{
    var lines = arrayHandler.removeEmptyLines(text.replace(/\n/g, "&").split('&'));
    var fullArray = new Array();
    
    for (var i = 0; i < lines.length; i++) 
    {
        fullArray.push(lines[i].split("|"));
    }

    var output = "#Version: 1.0\n" +
    "#Date: " + moment().format("DD/MM/YYYY HH:mm:ss") + "\n" + 
    "#Fields: provider http-method status-code uri-path time-taken response-size cache-status\n";

    return arrayHandler.generateOutput(output, lines);
}
module.exports.toDataArray = toDataArray