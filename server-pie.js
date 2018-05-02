// const fs = require('fs');

// let rs = fs.createReadStream('demo.txt');
// let ws = fs.createWriteStream('write.txt');
//
// rs.pipe(ws);

const http = require("http");
const fs = require('fs');

let server = http.createServer((req,res)=>{
    let rs = fs.createReadStream(`www${req.url}`);
    // let ws = fs.createWriteStream(res);?? error
    rs.pipe(res);

    //监听写入
    rs.on('error',err=>{
        console.log('读取失败',err);
        res.writeHeader(404);
        res.write("NOT FOUND");
        res.end();
    });

    //监听读取??
    // res.on('finsh',()=>{
    //     console.log('写入完成')
    //     res.end();
    // })
});
server.listen(8080);

