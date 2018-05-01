const http = require('http');
const fs = require('fs');

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
    let arr = [];

    req.on('data',trunk=>{
       arr.push(trunk);
    });
    req.on('end',()=>{
        let data = Buffer.concat(arr);
        let post = {};
        if(req.headers['content-type']){

            //1 切分buffer --通过boundary
            let boundary = '--'+req.headers['content-type'].split('=')[1];
            let arr = data.split(boundary);

            //2 去掉数组头尾--空的，暂时不用
            arr.shift();
            arr.pop();

            //3 去除每个头尾的/r/n
            arr = arr.map(buffer=>{
               return buffer.slice(2,buffer.length-2);
            });

            //4 去除 每个第一个出现的/r/n/r/n，并切分
            arr.forEach(buffer=>{
                //切分 描述 和 内容
                let index = buffer.indexOf('\r\n\r\n');
                let disPos = buffer.slice(0,index).toString();
                let content = buffer.slice(index+4);

                if(disPos.indexOf('\r\n')==-1){
                    /**
                     * 普通数据
                     * Content-Disposition: form-data; name="user"
                     * */
                    content = content.toString();
                    let name = disPos.split('; ')[1].split('=')[1];
                    name = name.substring(1,name.lenght-1);
                    post[name] = content;
                }else{
                    /**
                     * 文件
                     * Content-Disposition: form-data; name="file"; filename="text.txt"
                       Content-Type: text/plain
                     */
                    let [l1,l2] = disPos.split('\r\n');
                    let [,name,filename] = l1.split('; ');
                    let type = l2.split(': ')[1];

                    name = name.split('=')[1];
                    name = name .substring(1,name.length-1);

                    filename = filename.split("=")[1];
                    filename = filename.substring(1,filename.length-1);

                    fs.writeFile('./upload/'+filename,content,{encoding:'utf8'},err=>{
                       console.log(err);
                    });

                    // console.log(name,filename,type)
                    console.log(content.toString())
                }
                // console.log(disPos,'||||||',content);
                console.log('---------------------------------------------')
            });

            res.end();
        }
    });
});
server.listen(8080);

// let a = new Buffer('aaa');
// let b = new Buffer('bbb');
// let c = Buffer.concat([a,b]);
// console.log(c.toString());