const fs = require('fs');
const path = require('path');
const secretFolderPath = path.join(__dirname, 'secret-folder');

fs.readdir(secretFolderPath,  (err,files)=>{
  if (err) throw err;
  for(let i = 0; i < files.length; i++){
    let size;
    fs.stat(path.join(secretFolderPath, files[i]), (err, stats) => {
      if (err) {
        // console.log(err);
        throw err;
      } 
      if(stats.isFile()) { //проверяем файл это или что-то другое - ошибка
        size = (stats.size)/1024;
        let name = (path.parse(files[i]).name + '-' + path.parse(files[i]).ext.substring(1) + '-' + size) + 'Kb';
        console.log(name);
      } else{
        return;
      }
    });
  }
});
