var alt = require("../alt");

class CommandActions {
  updateCommands(commands) {
    this.dispatch(commands);
  }
}

module.exports = alt.createActions(CommandActions);