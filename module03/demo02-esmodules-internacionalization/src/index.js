import DraftLog from 'draftlog';
import chalk from 'chalk';
import chalkTable from 'chalk-table';
import readline from 'readline';
import Person from './person.js';

import database from './../database.json';

DraftLog(console).addLineListener(process.stdin);
const DEFAULT_LANG = 'pt-BR';

const options = {
  leftPad: 2,
  columns: [
    { field: 'id', name: chalk.cyan('ID') },
    { field: 'vehicles', name: chalk.magenta('Vehicles') },
    { field: 'kmTraveled', name: chalk.green('KM Traveled') },
    { field: 'from', name: chalk.magentaBright('From') },
    { field: 'to', name: chalk.blue('To') },
  ],
};

//creating our terminal table using chalkTable, the columns need to be equals of our database columns
const table = chalkTable(
  options,
  database.map(item => new Person(item).formatted(DEFAULT_LANG)),
);
const print = console.draft(table);

//creating an user interface to get and show data directly by terminal
const terminal = readline.createInterface({
  //data input
  input: process.stdin,
  //data output
  output: process.stdout,
});

terminal.question('Qual é seu nome?', msg => {
  console.log('msg', msg.toString());
});
