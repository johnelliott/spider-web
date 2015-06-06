var alt = require('../alt');
var CommandActions = require('../actions/CommandActions');

class CommandStore {
  constructor() {
    this.commands = [];

    this.bindListeners({
      handleUpdateCommands: CommandActions.UPDATE_COMMANDS
    });
  }

  handleUpdateCommands(command) {
    this.commands.push(command);
  }
}

module.exports = alt.createStore(CommandStore, 'CommandStore');