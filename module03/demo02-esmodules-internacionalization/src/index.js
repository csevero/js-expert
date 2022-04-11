import Person from './person.js';
import database from './../database.json';
import TerminalController from './terminalController.js';

const DEFAULT_LANG = 'pt-BR';
const STOP_TERM = ':q';

const terminalController = new TerminalController();

terminalController.initializeTerminal(database, DEFAULT_LANG);

async function mainLoop() {
  try {
    const answer = await terminalController.question();

    if (answer === STOP_TERM) {
      terminalController.closeTerminal();
      console.log('process finished');
      return;
    }

    //2 car,bike 20000 2022-03-10 2022-04-10
    const person = Person.generateInstanceFromString(answer);

    console.log(person.formatted(DEFAULT_LANG));

    database.push(person);
    return mainLoop();
  } catch (error) {
    console.log('DEU RUIM**', error);
    return mainLoop();
  }
}

await mainLoop();
