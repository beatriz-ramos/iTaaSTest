const parseInt = require("lodash.parseint");
function removeEmptyLines(lines){
    var ret = new Array();
    lines.forEach(function(element) {
        element = element.replace(/\r/g, "");
        if (element == ""){
            lines.splice(lines.indexOf(""), 1);
        }
        else{
            ret.push(element);
        }
    }, this);
    return ret;
}

function generateOutput(output, lines)
{
    var fullArray = new Array();
    for (var i = 0; i < lines.length; i++) {
        {
            var array = lines[i].split("|");
            array.forEach(function(element) {
                if (element.indexOf(" ") > -1){
                    var index = array.indexOf(element);
                    var end = array.splice(index + 1, array.length);
                    var textSplitted = array[index].split(" ");
                    array.pop();
                    textSplitted.forEach(function(text){
                        text = text.replace(/["]+/g, "")
                        array.push(text);
                    })
                    array.push(end[0]);
                }
            }, this);
            fullArray.push(new LogData(array));
        }
    }
    for (var i = 0; i < fullArray.length; i++){
        output = output.concat(fullArray[i].getLogInfo());
    }
    console.log(output);
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

module.exports.removeEmptyLines = removeEmptyLines;
module.exports.generateOutput = generateOutput;