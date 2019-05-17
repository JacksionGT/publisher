var process = require('child_process');
const iconv = require('iconv-lite');
console.log("准备打开文件！");
process.exec('C:\\Windows\\System32\\inetsrv\\appcmd.exe list vdir', {
    encoding: 'buffer'
}, function (error, stdout, stderr) {
    if (error !== null) {
        console.log(error);
    }
    console.log(iconv.decode(stdout, 'cp936'));
});

/*注意：该例子需要在同级目录下完成及该脚本去监听另一个与之同目录下的文件，然后发生变化后，将所有内容重新生成到Index.js中*/

// var fs = require('fs');
// var fileder = "./First/sourse"; //需要监听的文件路径
// fs.watch(fileder, function (ev, file) { //不需要判断是否有内容

//     //1.只有有一个文件发生了变化，我们就需要对这个文件夹下的文件进行读取，然后合并
//     fs.readdir(fileder, function (err, dataList) {
//         var arr = [];

//         dataList.forEach(function (f) { //回调函数中的f对应每一个文件名
//             // console.log(dataList);
//             // console.log(f);
//             var info = fs.statSync(fileder + '/' + f); //fs.stat() 检查一个文件是否存在

//             // console.log(info);
//             if (info.mode == 33206) {
//                 arr.push(fileder + '/' + f);
//             }
//         });
//         //console.log(arr)
//         //2.读取数组中的文件并合并
//         var content = '';
//         arr.forEach(function (f) {
//             var c = fs.readFileSync(f)
//             //console.log(c.toString());
//             content += c.toString() + '\n';
//         });
//         //console.log(content)
//         fs.writeFile('./First/js/Index.js', content) //将变化后的内容生成到指定位置
//     })
// });