import chalk from 'chalk';
import chalkTable from 'chalk-table';
import DraftLog from 'draftlog';
import readline from 'readline';
import Person from './person.js';

export default class TerminalController {
  constructor() {
    this.print = {};
    this.data = {};
  }

  initializeTerminal(database, language) {
    DraftLog(console).addLineListener(process.stdin);
    //creating an user interface to get and show data directly by terminal
    this.terminal = readline.createInterface({
      //data input
      input: process.stdin,
      //data output
      output: process.stdout,
    });

    this.initializeTable(database, language);
  }

  initializeTable(database, language) {
    //creating our terminal table using chalkTable, the columns need to be equals of our database columns
    const data = database.map(item => new Person(item).formatted(language));

    const table = chalkTable(this.getTableOptions(), data);

    this.print = console.draft(table);
    this.data = data;
  }

  updateTable(item) {
    this.data.push(item);
    this.print(chalkTable(this.getTableOptions, this.data));
  }

  question(msg = '') {
    return new Promise(resolve => this.terminal.question(msg, resolve));
  }

  closeTerminal() {
    this.terminal.close();
  }

  getTableOptions() {
    return {
      leftPad: 2,
      columns: [
        { field: 'id', name: chalk.cyan('ID') },
        { field: 'vehicles', name: chalk.magenta('Vehicles') },
        { field: 'kmTraveled', name: chalk.green('KM Traveled') },
        { field: 'from', name: chalk.magentaBright('From') },
        { field: 'to', name: chalk.blue('To') },
      ],
    };
  }
}
