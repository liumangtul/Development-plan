const http = require("http");
const fs = require("fs");
const EventEmitter = require('events');

let server = http.createServer((req,res)=>{

});

/*
class MyEmitter extends EventEmitter{};

const myEmitter = new MyEmitter();

myEmitter.on('event',()=>{
    console.log('Event')
});
myEmitter.emit('event');

server.listen(8080);
*/

class Myemitter extends EventEmitter{};

const myEmitter = new MyEmitter();

myEmitter.on('event',function(a,b){
   console.log(a,b,this);
});

myEmitter.emit('event','arg1','arg2');
