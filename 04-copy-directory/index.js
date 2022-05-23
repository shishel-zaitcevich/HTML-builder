// path.join: files, files-copy
// delete files-copy folder ? (rm {force: true, recursive: true})
// create .. (mkdir {recursive: true});
// func copyDir() {}
// copyDir();

const fs = require('fs');
const path = require('path');
const files = path.join(__dirname, 'files');
const files_copy = path.join(__dirname, 'files-copy');

function copyDir (){

    fs.rm(files_copy, {force: true, recursive: true}, (err) => {
      if(err){ console.error(err);}
      fs.mkdir(files_copy, { recursive: true }, (err) => {
        if (err) throw err;
        fs.cp(files, files_copy, {recursive: true}, err => {
          if(err) throw err; 
        });
      });
    });  
}

copyDir();