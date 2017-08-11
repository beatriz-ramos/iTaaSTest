function removeEmptyLines(lines){
    return lines.reduce(function(ret, element) {
        element = element.replace(/\r/g, "");
        
        if (element !== ""){
            ret.push(element);
        }

        return ret;
    }, []);
};

function separateResponseAttributes(array){
    return array.reduce(function(ret, element) {
        //check if it has spaces to split
        if (element.indexOf(" ") === -1){
            ret.push(element);
            return ret;
        }
        
        //remove string quotes and split text
        var textSplitted = element.replace(/["]+/g, "").split(" ");
        return ret.concat(textSplitted);
    }, []);
};

module.exports.removeEmptyLines = removeEmptyLines;
module.exports.separateResponseAttributes = separateResponseAttributes;