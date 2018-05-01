/**
 * 上传文本文件ok。图片等其他非字符串格式不行！
 * */
const http = require("http");
const fs = require('fs');

let server = http.createServer((req,res)=>{
    let str = '';
    let count = 0;
    req.on('data',data=>{
        // console.log('data',data);
        str+=data;
    });
    req.on('end',()=>{
        console.log(count+'==>',str);
        res.end();
    });
});
server.listen(8080);