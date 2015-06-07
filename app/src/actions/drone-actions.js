var alt = require("../alt");

class CommandActions {
  updateCommands(commands) {
    this.dispatch(commands);
  }
  updateDroneData(data) {
    this.dispatch(data);
  }
}

module.exports = alt.createActions(CommandActions);
