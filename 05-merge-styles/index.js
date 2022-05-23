// delete bundle.css (rm) ?
// styles = '' or []
// readdir -> isFile && css { readFile; bundle appendFile or styles += fileContent}
// styles -> bundle.css

const fs = require("fs");
const path = require("path");
const dist = path.join(__dirname, "project-dist");
const styles = path.join(__dirname, "styles");
const bundle = path.join(dist, "bundle.css");

function writeBundle() {
  fs.rm(bundle, { force: true, recursive: true }, (err) => {
    if (err) {
      throw err;
    }
    fs.readdir(styles, (err, files) => {
      if (err) throw err;
      for (let i = 0; i < files.length; i++) {
        fs.stat(path.join(styles, files[i]), (err, stats) => {
          if (err) {
            throw err;
          } else if (stats.isFile() && path.extname(files[i]) === ".css") {
            fs.readFile(path.join(styles, files[i]), "utf-8", (err, data) => {
              if (err) throw err;
              fs.appendFile(bundle, data, (err) => {
                if (err) {
                  console.log(err);
                }
              });
            });
          }
        });
      }
    });
  });
}

writeBundle();
