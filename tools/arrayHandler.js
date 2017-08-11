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

function separateResponseAttributes(array){
    array.forEach(function(element) {
        //check if it has spaces to split
        if (element.indexOf(" ") > -1){
            var index = array.indexOf(element);
            var arrayEnd = array.splice(index + 1, array.length);
            var textSplitted = array[index].split(" ");
            array.pop();
            textSplitted.forEach(function(text){
                //remove string quotes
                text = text.replace(/["]+/g, "")
                array.push(text);
            })
            arrayEnd.forEach(function(end){
                array.push(end);
            })
        }
    }, this);
    return array;
}

module.exports.removeEmptyLines = removeEmptyLines;
module.exports.separateResponseAttributes = separateResponseAttributes;