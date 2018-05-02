const querystring = require('querystring');

let obj = {user:['aa','bb','cccc'],name:1}
let str = querystring.stringify(obj);
console.log(str,querystring.parse(str))
