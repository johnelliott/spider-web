var alt = require('../alt');
var DroneActions = require('../actions/drone-actions');

class DroneStore {
  constructor() {
    this.commands = [];
    this.flightOptions = {};

    this.bindListeners({
      handleUpdateCommands: DroneActions.UPDATE_COMMANDS,
      handleUpdateFlightOptions: DroneActions.UPDATE_FLIGHT_OPTIONS
    });
  }

  handleUpdateCommands(command) {
    this.commands.push(command);
  }
  handleUpdateFlightOptions(options) {
    this.flightOptions = options;
  }
}


module.exports = alt.createStore(DroneStore, 'DroneStore');