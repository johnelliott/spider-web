var io = require("socket.io-client/socket.io");
var Keypress = require("keypress.js");
var controls = require("../keyboard-controls");
var DroneStore = require("../stores/store");
var DroneActions = require("../actions/drone-actions");

var mui = require("material-ui");
var ThemeManager = new mui.Styles.ThemeManager();
var StPalette = require("../styles/colorPalette");

var AppBar = require("material-ui").AppBar;
var DroneInfoBar = require("../components/drone-info-bar");
var DroneCommandView = require("../components/drone-command-view");
var DroneControlBar = require("../components/drone-control-bar");

export default class DroneController extends React.Component {
	constructor(props) {
		super(props);
		// there is no auto-binding:
		// https://medium.com/@goatslacker/react-0-13-x-and-autobinding-b4906189425d
		this.onChange = this.onChange.bind(this);
		this.state = DroneStore.getState();
	}
	getChildContext() {
		return {
			muiTheme: ThemeManager.getCurrentTheme()
		};
	}
	onChange(state) {
		this.setState(state);
	}
	handleLandButtonClick() {
		this.socket.emit("land");
	};
	componentDidMount() {
		DroneStore.listen(this.onChange);

		// make keyboard mapping from human-readable map file
		var keyboardRegistrationMap = controls.map((mapping) => {
			return {
				keys: mapping.key,
				on_keyup: () => {
					this.socket.emit(mapping.command);
				 }
			};
		});
		var keyboard = new Keypress.Listener();
		keyboard.register_many(keyboardRegistrationMap);

		// connect to sockets server, then listen for keyboard input
		this.socket = io("http://localhost:3000/drones");
		this.socket.on("connect", () => {
			// listen to keystrokes only when we can get feedback from the server
			keyboard.listen();
		});
		this.socket.on("disconnect", () => {
			// stop listening to keystrokes if the server restarts
			// and we are still here
			keyboard.stop_listening();
		});
		this.socket.on("command", function(data) {
			DroneActions.updateCommands(data);
		});
		this.socket.on("data", function(data) {
			DroneActions.updateDroneData(data);
		});
	}
	componentWillMount() {
		ThemeManager.setPalette(StPalette);
	}
	componentWillUnmount() {
		DroneStore.unlisten(this.onChange);
	}
	render() {
		return (
			<div>
				<AppBar title='Spider-web' iconClassNameRight="muidocs-icon-custom-github" tooltip="View on GitHub"/>
				<DroneInfoBar title={this.state.uuid} />
				<DroneCommandView message="commands"
					commands={this.state.commands} />
				<DroneControlBar
					battery={this.state.batteryStatus}
					signal={this.state.signalStrength}
					flying={this.state.status.flying}
					speed={this.state.flightOptions.speed}
					steps={this.state.flightOptions.steps}
					landButtonHandler={this.handleLandButtonClick.bind(this)} />
			</div>
		);
	}
}

// do this stupid thing for the material ui thing
DroneController.childContextTypes = {
  muiTheme: React.PropTypes.object
};

