var alt = require('../alt');

class LocationActions {
	updateLocations(locations) {
		this.dispatch(locations);
	}
}

module.exports alt.createActions(LocationActions);
