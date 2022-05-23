// 1. rm(project-dist, {force: true, recursive: true}); mkdir project-dist
// 2. - const content = readFile template.html;
// - readdir -> for file in files {content = content.replace(`{{${fileName}}}`, readFile file)}
// - writeFile(content)
// 3. rm, 05-merge-styles
// 4.
// async f() => {await rm(folder, {force: true, recursive: true}, call);}

const fs = require("fs");
const path = require("path");
const projectDist = path.join(__dirname, "project-dist");
const components = path.join(__dirname, "components");
const style = path.join(projectDist, "style.css");
const styles = path.join(__dirname, "styles");

function createFolder() {
  return new Promise(function (resolve, reject) {
    fs.rm(projectDist, { force: true, recursive: true }, (err) => {
      if (err) {
        reject(err);
      }
      fs.mkdir(projectDist, { recursive: true }, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  });
}

function getTemplateContent() {
  return new Promise(function (resolve, reject) {
    fs.readFile(path.join(__dirname, "template.html"), "utf-8", (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

function handleTemplate(htmlContent) {
  return new Promise(function (resolve, reject) {
    fs.readdir(components, (err, files) => {
      if (err) reject(err);
      for (let i = 0; i < files.length; i++) {
        const fileName = files[i].name;
        fs.readFile(path.join(components, files[i]), "utf-8", (err, data) => {
          if (err) reject(err);

          htmlContent = htmlContent.replace(`{{${fileName}}}`, data);
          //resolve();
        });
      }
    });
  });
}

function getStyles() {
  return new Promise(function (resolve, reject) {
    if (err) reject(err);
      fs.readdir(styles, (err, files) => {
        if (err) reject(err);
        for (let i = 0; i < files.length; i++) {
          fs.stat(path.join(styles, files[i]), (err, stats) => {
            if (err) {
              reject(err);
            } else if (stats.isFile() && path.extname(files[i]) === ".css") {
              fs.readFile(path.join(styles, files[i]), "utf-8", (err, data) => {
                if (err) reject(err);
                fs.appendFile(style, data, (err) => {
                  resolve (style);
                  if (err) {
                    reject(err);
                  }
                });
              });
            }
          });
        }
      });
    });
}

const files = path.join(__dirname, 'assets');
const assets = path.join(projectDist, 'assets');

function copyDir (){
  return new Promise(function (resolve, reject) {
    fs.rm(assets, {force: true, recursive: true}, (err) => {
      if(err) reject(err);
      fs.mkdir(assets, { recursive: true }, (err) => {
        if (err) reject(err);;
        fs.cp(files, assets, {recursive: true}, err => {
          resolve(assets);
          if(err) reject(err);
        });
      });
    });  
});
}

copyDir();

createFolder()
  .then(() => {
    console.log("hi"); 
    getStyles().then(() => {
      console.log("getstyles"); 
    })
    .catch((err) => {
      console.log(err);
    });//вызвать ф-ии (.then для каждой
    copyDir().then(() => {
      console.log("copydir"); 
    })
    .catch((err) => {
      console.log(err);
    });
  })
  .catch((err) => {
    console.log(err);
  });

