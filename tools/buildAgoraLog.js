const arrayHandler = require("./arrayHandler");
const moment = require('moment');
const parseInt = require("lodash.parseint");

const SEPARATOR = "&&&";

const VERSION = "1.0";
const DATE = moment().format("DD/MM/YYYY HH:mm:ss");
const FIELDS = "provider http-method status-code uri-path time-taken response-size cache-status";

const PROVIDER = "MINHA CDN";

function splitText(text) {
    return arrayHandler.removeEmptyLines(
        text.replace(/\n/g, SEPARATOR).split(SEPARATOR)
    );
};

function parseToAgoraFormat(text) {
    let lines = splitText(text);
    let header = "#Version: " + VERSION + "\n" +
    "#Date: " + DATE + "\n" + 
    "#Fields: " + FIELDS + "\n";
    
    const content = lines.map(function(line) {
        let preparedLine = arrayHandler.separateResponseAttributes(line.split("|"));
        return new LogData(preparedLine);
    });
    
    return content.reduce(function(ret, log) {
        return ret + log.getFormattedInfo() + "\n";
    }, header);
};

function LogData(array) {
    this.provider = PROVIDER;
    this.method = array[3];
    this.statusCode = array[1];
    this.uriPath = array[4];
    this.timeTaken = Math.round(parseInt(array[6], 10));
    this.responseSize = array[0];
    this.cacheStatus = getCacheStatus(array[2]);
    this.getFormattedInfo = function(){
        return this.provider + "\t" + 
        this.method + "\t" + 
        this.statusCode + "\t" + 
        this.uriPath + "\t" + 
        this.timeTaken + "\t" + 
        this.responseSize + "\t" + 
        this.cacheStatus;
    }
};

function getCacheStatus(status) {
    if (status == "INVALIDATE"){
        return "REFRESH_HIT";
    }
    return status;
};

module.exports.parseToAgoraFormat = parseToAgoraFormat;