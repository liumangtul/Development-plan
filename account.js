//一个简单的算账小神器
let str = `4.2****100.**50.****23.**50.
4.3**271.**38.****17.
4.4**49.****453.***99.***3.**14.`;

str = str.replace(/[^\d.\n]/mg,'*')
console.log(str)
str = str.split('\n');
// console.log(str);
let total = 0;
str.map(trunk=>{
    let m = trunk.match(/^\d+\.\d+/)[0];
    m = m.split('.');
    m = `${m[0]}月${m[1]}日`;
    let s = trunk.split(/^\d+\.\d+/);
    var trunk = s[1];
    trunk = trunk.split(/\D+/g);
    trunk.forEach((num,index)=>{
        if(!num){
            trunk.splice(index,1)
        }
    });
    console.log(trunk.join(' + '));
    if(trunk.length>1){
        total += trunk.reduce((total,num)=>{
            // console.log(total,num);
            return parseFloat(total || 0) + parseFloat(num || 0);
        });
    }else{
        total += parseFloat(trunk[0]);
    }

    console.log(m,' =>',total);
    console.log('--------------------------------------------------');
});
