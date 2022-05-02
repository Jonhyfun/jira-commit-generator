#!/usr/bin/env node

require('console-png').attachTo(console);
const readline = require('readline');
const { exec } = require("child_process");

const messagePrefixes = ['feat 💚', 'fix 🔧', 'refactor 🚧', 'chore 🧹', 'perf 🚀', 'build 🔨']
const messageColors = ["\x1b[32m", "\x1b[34m", "\x1b[33m", "\x1b[35m", "\x1b[31m", "\x1b[37m"]

const messageOptions = messagePrefixes.map((_, index) => (index + 1).toString())

const readLineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function readLine(query, callback) {
  let response;
  
  readLineInterface.setPrompt(query);
  readLineInterface.prompt();
  
  readLineInterface.on('line', (userInput) => {
    response = userInput;
    readLineInterface.close();
  });
  
  readLineInterface.on('close', () => {
    return callback(response);
  });
}

console.log("\x1b[0m")

var currentSlice = 2
var secondCommand = '';
var firstCommand = '';

var args = [];
process.argv.slice(currentSlice).some((arg) => {
  if(arg[0] === '-') {
    args.push(arg)
    currentSlice += 1
  }
  else {
    return true
  }
})

if(args.length > 0) {
  args.forEach((arg) => {
      if(arg[1] === 'a') {
        firstCommand = 'git add . &&'
      }
      if(arg[1] === 'p') {
        secondCommand += '&& git push'
      }
  })
}
  
if(!process.argv.slice(currentSlice).join(' ')) {
  console.log('fatal: por favor escreva a mensagem do commit como argumento do comando')
  process.exit();
}


readLine("Digite o código da task ou os códigos entre espaços (ie: FLOW-1234): ", ((prefix) => {
  
  const valid = prefix.split(' ').every(splittedPrefix => !!(/^\w+\-\d+$/.exec(splittedPrefix)));
  
  if(!valid) return console.log('fatal: código invalido (certifique-se de que é uma palavra, traço e um número)');
  
  
  const { stdin } = process;
  
  stdin.setRawMode(true);
  
  stdin.resume();
  
  stdin.setEncoding('utf8');

  
  console.log(`\nSelecione um prefixo:`)

  messageColors.forEach((color, index) => {
    console.log(color, `${index+1}) ${messagePrefixes[index]}`, "\x1b[0m")
  })

  stdin.on('data', (key) => {
    
    if (key === '\u0003') {
      console.log("^C")
      process.exit();
    }

    if(!messageOptions.includes(key)) return;

    console.log('\n')
    console.png(require('fs').readFileSync(__dirname + '/logo.png'));
    exec(`${firstCommand} git commit -m "${messagePrefixes[parseInt(key-1)].split(' ')[0]}: ${process.argv.slice(currentSlice).join(' ').toLowerCase()} [${prefix.toUpperCase()}]" ${secondCommand}`, (error, stdout, stderr) => {
      console.log('\n', error?.message ?? '', stderr ?? '', stdout ?? '');
      process.exit()
    });
  })

}));
