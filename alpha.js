var arr = [];



function numeric(str) {
  var p = parseInt(str, 10);
  return p == str ? p : str.charCodeAt(0);
}


function alpha(i) {
  arr.push(String.fromCharCode(i));
  return arr;
}

console.log(alpha(numeric('a')))