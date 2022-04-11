import Person from './person.js';
import database from './../database.json';
import TerminalController from './terminalController.js';
import { save } from './repository.js';

const DEFAULT_LANG = 'es';
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
    //3 navio,iate 450000 2022-03-10 2022-04-10
    const person = Person.generateInstanceFromString(answer);

    terminalController.updateTable(person.formatted(DEFAULT_LANG));

    await save(person);

    return mainLoop();
  } catch (error) {
    console.log('DEU RUIM**', error);
    return mainLoop();
  }
}

await mainLoop();
