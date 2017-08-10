var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function readTxt() {
  var text = "";
  var file = new XMLHttpRequest();
  file.open("GET", "https://s3.amazonaws.com/uux-itaas-static/minha-cdn-logs/input-01.txt", false);
  file.onreadystatechange = function onReady(){
    if (file.readyState == 4 && (file.status == 200 || file.status == 0)){
      text = file.responseText;
    }
  }
  file.send(null);
  return text;
}
module.exports.readTxt = readTxt