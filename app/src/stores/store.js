var alt = require("../alt");
var DroneActions = require("../actions/drone-actions");

class DroneStore {
	constructor() {
		this.commands = [];
		this.flightOptions = {};
		this.status = {};
		this.uuid = "";
		this.signalStrength = 0;
		this.batteryStatus = 0;

		this.bindListeners({
			handleUpdateCommands: DroneActions.UPDATE_COMMANDS,
			handleUpdateDroneData: DroneActions.UPDATE_DRONE_DATA
		});
	}

	handleUpdateCommands(command) {
		this.commands.push(command);
	}
	handleUpdateDroneData(data) {
		// INFO having to parse it this way smells a little...
		if(data.uuid) {
			this.uuid = data.uuid;
		}
		if(data.flightOptions) {
			this.flightOptions = data.flightOptions;
		}
		if(data.status) {
			this.status = data.status;
			this.batteryStatus = data.status.battery;
		}
		if(data.signalStrength) {
			this.signalStrength = data.signalStrength;
		}
		if(data.batteryStatus) {
			this.batteryStatus = data.batteryStatus;
		}
	}
}

module.exports = alt.createStore(DroneStore, "DroneStore");
