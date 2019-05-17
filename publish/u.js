const fs = require("fs");
const process = require('child_process');
const iconv = require('iconv-lite');
const moment = require('moment');
const path = require('path');

// 获取IIS站点信息
async function getIISInfo() {
  var infos1 = new Promise((resolve, reject) => {
    process.exec('C:\\Windows\\System32\\inetsrv\\appcmd.exe list site', {
      encoding: 'buffer'
    }, function (error, stdout, stderr) {
      if (error !== null) {
        reject(error);
      }
      resolve(iconv.decode(stdout, 'cp936'));
    });
  })

  // C:\\Windows\\System32\\inetsrv\\appcmd.exe list app

  var infos3 = new Promise((resolve, reject) => {
    process.exec('C:\\Windows\\System32\\inetsrv\\appcmd.exe list vdir', {
      encoding: 'buffer'
    }, function (error, stdout, stderr) {
      if (error !== null) {
        reject(error);
      }
      resolve(iconv.decode(stdout, 'cp936'));
    });
  })

  var infos3arr = (await infos3).split("\n").filter(s => s && s.trim().length > 0).map(str => {
    // console.log(str);
    var match = str.match(/(".*")/);
    var dir = str.substr(match.index + match[0].length).trim().replace(/[\(\)(physicalPath:)]/g, "");
    var name = match[0].replace(/["/]/g, "");
    return {
      siteName: name,
      siteDir: dir
    }
  });

  var infos1arr = (await infos1).split("\n").filter(s => s && s.trim().length > 0).map(str => {
    var match = str.match(/(".*")/);
    var port = str.substr(match.index + match[0].length).trim();
    var name = match[0].replace(/["/]/g, "");
    var siteDir = infos3arr.filter(o => o.siteName == name)[0];
    var res = {
      siteName: name,
      siteDir: siteDir.siteDir
    }

    port.replace(/[\(\)]+/g, "").split(",").map(item => {
      var splitCharIndex = item.indexOf(":");
      var Obj = {};
      Obj[item.substr(0, splitCharIndex)] = item.substr(splitCharIndex + 1);
      return Obj;
    }).forEach(item => {
      res = Object.assign({}, res, item);
    })
    return res;
  })

  return infos1arr;
}

// 将文件字节数转换为简短容量显示
function bytesToSize(bytes) {
  if (bytes === 0) return '0 B';
  var k = 1024, // or 1024
    sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));

  return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}

// 获取指定路径文件的文件属性信息
async function getFileInfo(filepath) {
  var fileInfo = {
    name: "",
    size: 0,
    modifiedTime: null,
    isDirectory:false,
    info:{}
  }
  fileInfo.name = path.basename(filepath);
  var promise = new Promise((resolve, reject) => {
    fs.stat(filepath, function (err, stats) {
      if (err) { reject(fileInfo); }
      var isDirectory = stats.isDirectory();
      fileInfo.size = isDirectory ? null : bytesToSize(stats.size);
      fileInfo.modifiedTime = moment(stats.mtime).format("YYYY-MM-DD HH:mm:ss");
      fileInfo.isDirectory = isDirectory;
      fileInfo.info = stats
      // 检测文件类型
      // console.log("是否为文件(sisFile) ? " + stats.isFile());
      // console.log("是否为目录(isDirectory) ? " + stats.isDirectory());
      resolve(fileInfo);
    });
  })

  var fileInfo = await promise;
  return fileInfo;
}

// 获取指定路径下的所有文件夹及文件信息
async function getFileList(dirPath){
  const dirs = fs.readdirSync(dirPath);
  // const files = fs.readFileSync(dirPath);
  // console.log(dirs);
  // console.log(files);
  var arr = [];
  for(var i=0,len = dirs.length;i<len;i++){
    var fileInfo = await getFileInfo(path.join(dirPath,dirs[i]));
    arr.push(fileInfo)
  }
  return arr;
}

console.log(this);

module.exports = {
  getFileInfo:getFileInfo,
  getFileList:getFileList,
  getIISInfo:getIISInfo
}