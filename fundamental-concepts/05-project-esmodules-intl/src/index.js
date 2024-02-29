import TerminalController from './terminalController.js';
import database from './../database.json' with { type: "json" };
import Person from './person.js';

const STOP_TERMINAL_COMMAND = ':q';

const terminalController = new TerminalController();
terminalController.initializeTerminal(database);

async function mainLoop() {
  try {
    const answer = await terminalController.question('')

    if(answer === STOP_TERMINAL_COMMAND) {
      terminalController.closeTerminal();
      console.log('process finished!')
      return;
    }
    // 2 Aviao,Barco,Trem 23000 2007-09-12 2008-03-15
    // 3 Moto 5000 2022-01-01 2022-01-15
    // 4 Aviao 14000 2022-01-01 2022-01-15

    const person = Person.generateInstanceFromString(answer);
    terminalController.updateTable(person.formatted());
    return mainLoop();

  } catch (error) {
    console.log('Error:', error)
    return mainLoop();
  }
}

await mainLoop();