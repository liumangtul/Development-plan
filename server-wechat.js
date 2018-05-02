const http = require("http");
const fs = require("fs");
const urlLib = require('url');
const queryString = require('querystring');
const uuid = require('uuid');

Buffer.prototype.split = Buffer.prototype.split || function (b){
    let arr = [];
    let cur = 0;
    let index = 0;
    while((index = this.indexOf(b,cur)) !==-1  ){
        arr.push( this.slice(cur,index) );
        cur = index+b.length;
    }

    arr.push(this.slice(cur));
    return arr;
};

let server = http.createServer((req,res)=>{
    console.log(req.headers['content-type']);
    let boundary = '--'+req.headers['content-type'].split('; ')[1].split('=')[1];
    let query = urlLib.parse(req.url,true).query;
    console.log('GET=>',query);

    let data = [];
    req.on('data',trunk=>{
        console.log('data',trunk)
        data.push(trunk);
    });
    req.on('end',()=>{
        console.log('END')
        data = Buffer.concat(data);
        data = data.split(boundary);
        // console.log(data)

        //去头去尾
        data.pop();
        data.shift();

        data = data.map(t=>{

            //去首位/r/n
            let item = t.slice(2,t.length-2);

            let index = item.indexOf('\r\n\r\n');

            let disposition = item.slice(0,index).toString();

            let value = item.slice(index+4);

            let fileType = '';
            if(disposition.indexOf('\r\n')==-1){
                disposition = disposition.split('; ')[1].split('=')[1];
                disposition = disposition.slice(1,disposition.length-1);
            }else{
                fileType = disposition.split('\r\n')[1].split(': ')[1].split('/')[1];
                fs.writeFile(`upload/${uuid()}.${fileType}`,value,err=>{
                    if(err){
                        console.log(err)
                    }
                })
            }

            console.log(index,'--',disposition,'--',value);
            console.log('--------------- buffer -------------------');
            return item;
        })
        // let post = queryString.parse(decodeURIComponent(data));
        // console.log('POST=>',post);
        res.end();
    });
});
server.listen(8080);