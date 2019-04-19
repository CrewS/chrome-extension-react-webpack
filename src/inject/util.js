import pako from "pako";
export const zip = str => {
  var binaryString = pako.gzip(str, {to: "string"});
  return btoa(binaryString);
};
export const unzip = b64Data => {
  var strData = atob(b64Data);
  var data = pako.ungzip(strData, {to: "string"});
  return data;
};
export const getQueryVariable = variable => {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
};
