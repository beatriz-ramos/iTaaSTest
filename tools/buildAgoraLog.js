const arrayHandler = require("./arrayHandler");
const moment = require('moment');
const parseInt = require("lodash.parseint");
function parseToAgoraFormat(text) 
{
    text = text.replace(/\n/g, "&&&"); //setting &&& as separator
    var lines = arrayHandler.removeEmptyLines(text.replace().split("&&&"));
    var output = "#Version: 1.0\n" +
    "#Date: " + moment().format("DD/MM/YYYY HH:mm:ss") + "\n" + 
    "#Fields: provider http-method status-code uri-path time-taken response-size cache-status\n";
    
    var fullArray = new Array();
    for (var i = 0; i < lines.length; i++) {
        var array = lines[i].split("|");
        array = arrayHandler.separateResponseAttributes(array);
        fullArray.push(new LogData(array));
    }
    for (var i = 0; i < fullArray.length; i++){
        output = output.concat(fullArray[i].getLogInfo());
    }
    return output;
}

function LogData(array){
    this.provider = "MINHA CDN\t";
    this.method = array[3] + "\t";
    this.statusCode = array[1] + "\t";
    this.uriPath = array[4] + "\t";
    this.timeTaken = Math.round(parseInt(array[6].replace("", ""))) + "\t";
    this.responseSize = array[0] + "\t";
    this.cacheStatus = getCacheStatus(array[2]);
    this.getLogInfo = function(){
        return this.provider + this.method + this.statusCode + this.uriPath + this.timeTaken + this.responseSize + this.cacheStatus + "\n";
    }
}

function getCacheStatus(status){
    if (status == "INVALIDATE"){
        return "REFRESH_HIT"
    }
    return status;
}

module.exports.parseToAgoraFormat = parseToAgoraFormat