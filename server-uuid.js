const http = require('http');
const fs = require('fs');
const uuid = require('uuid');


Buffer.prototype.split = Buffer.prototype.split || function(b){
    let arr = [];
    let cur = 0;
    let index = 0;
    while((index = this.indexOf(b,cur)) !== -1){
        arr.push(this.slice(cur,index));
        cur = index+b.length;
    }
    arr.push(this.slice(cur));
    return arr;
};

let server = http.createServer((req,res)=>{
    let datas = [];
    req.on('data',trunk=>{
        datas.push(trunk);
    });
    req.on('end',()=>{
        datas = Buffer.concat(datas);

        /**
         ------WebKitFormBoundaryMVlo7wM6K1Vk2lbw
         Content-Disposition: form-data; name="user"

         wangyan
         ------WebKitFormBoundaryMVlo7wM6K1Vk2lbw
         Content-Disposition: form-data; name="pass"

         123
         ------WebKitFormBoundaryMVlo7wM6K1Vk2lbw
         Content-Disposition: form-data; name="content"

         sdf
         sdfs
         ------WebKitFormBoundaryMVlo7wM6K1Vk2lbw
         Content-Disposition: form-data; name="file"; filename="demo.txt"
         Content-Type: text/plain

         测试文本内容
         测试文本内容
         测试文本内容

         ------WebKitFormBoundaryMVlo7wM6K1Vk2lbw--
         * */

        if(req.headers['content-type']){
            //multipart/form-data; boundary=----WebKitFormBoundaryMVlo7wM6K1Vk2lbw
            let boundary = `--${req.headers['content-type'].split('; ')[1].split('=')[1]}`;
            // console.log(boundary)//------WebKitFormBoundaryMVlo7wM6K1Vk2lbw

            datas = datas.split(boundary);
            datas.pop();
            datas.shift();
            datas.map(trunk=>{
                //去除首位换行\r\n;
                let item = trunk.slice(2,trunk.length-2);
                //切分disposition value;
                item = item.split('\r\n\r\n');
                let disposition = item[0].toString();
                let content = item[1];
                let type = 'normal';
                let filename = null;
                if(disposition.indexOf('\r\n') ==-1){
                    // Content-Disposition: form-data; name="user"
                    disposition = disposition.split('; ')[1].split('=')[1];
                    disposition = disposition.slice(1,disposition.length-1);
                }else{
                    disposition = disposition.split('\r\n');
                    // console.log(disposition)
                    type = disposition[1].split(': ')[1];
                    [,disposition,filename] = disposition[0].split('; ');
                    //name值
                    disposition = disposition.split('=')[1];
                    disposition = disposition.slice(1,disposition.length-1);
                    //文件名
                    filename = filename.split('=')[1];
                    filename = filename.slice(1,filename.length-1);

                    fs.writeFile(`upload/${uuid()}`,content,err=>{
                        if(err){
                            console.log('文件写入失败',err);
                        }
                    });
                }
                // console.log(content)
                console.log({
                    描述:disposition,
                    内容:content,
                    类型:type,
                    文件名:filename,
                    format:content.toString()
                });
                console.log('---------------------- buffer -------------------------')
            });
        }
        // console.log(datas);

        res.end();
    });
});
server.listen(8080);