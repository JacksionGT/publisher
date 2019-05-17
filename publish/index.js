
const { getFileInfo, getFileList, getIISInfo } = require('./u');

debugger;

var exampleFilePathString = 'C:/Users/12455/Downloads/PresidentoCarConcept.mp4';
var exampleDirPathString = 'C:/Users/12455/Downloads';


async function res(){
  console.log("正在输出......");
  // var result = await getIISInfo();

    var result = await getFileInfo("D:/Excise/FrentEnd/NodeJS/publish/dir/b");
  
  // var result = await  getFileList('D:/Excise/FrentEnd/NodeJS/publish');

  console.log(JSON.stringify(result,null,4));
  console.log(result.info.mtime.getTime()+"");


};res();


// // console.log("准备打开文件！");
// console.log("准备打开文件！");
// console.log();

// console.log(path.dirname(examplePathString));
// console.log(path.basename(examplePathString));
// console.log(path.basename('C:/Users/12455/Downloads'));
