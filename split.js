let b = new Buffer('aaabbbcc-=-123123-=-loiwls');
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

console.log(b.split('-=-').toString());
