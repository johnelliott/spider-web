var alt = require("../alt");

class CommandActions {
  updateCommands(commands) {
    this.dispatch(commands);
  }
  updateFlightOptions(flightOptions) {
    this.dispatch(flightOptions);
  }
}

module.exports = alt.createActions(CommandActions);