const readline = require('readline');
const rl = readline.createInterface(
  process.stdin,
  process.stdout
);

const fs = require('fs');
const path = require('path');
const folder = path.join(__dirname, 'text.txt');

fs.rm(folder, {force: true, recursive: true}, (err) => {
  if(err){ console.error(err);}

});

process.stdout.write('Hello \n');

rl.on('line', function(answer) {
  if (answer === 'exit') {
    rl.close();
  }

  fs.writeFile(folder, answer, {flag: 'a'}, function(error){
    if(error) throw error; 
  });
});

const { stdout } = process;
process.on('exit', () => stdout.write('Удачи в изучении Node.js!'));