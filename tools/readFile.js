const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function readFile(source) {
    let text = "";
    let file = new XMLHttpRequest();
 
    file.open("GET", source, false);
    file.onreadystatechange = function onReady() {
        if (file.readyState == 4 && (file.status == 200 || file.status == 0)) {
            text = file.responseText;
        }
    };

    file.send(null);
    return text;
};

module.exports.readFile = readFile;