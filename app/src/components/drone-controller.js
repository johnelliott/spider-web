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
	componentDidMount() {
		DroneStore.listen(this.onChange);
		var socket = io("http://localhost:3000/drones");
		socket.on("connect", function() {
			// make keyboard mapping from human-readable map file
			var keyboardRegistrationMap = controls.map(function(mapping){
				return {
					keys: mapping.key,
					on_keyup: function() {
						socket.emit(mapping.command);
					}
				};
			});
			// create keyboard and listen to keystrokes
			var keyboard = new Keypress.Listener();
			keyboard.register_many(keyboardRegistrationMap);
			keyboard.listen();
		});
		socket.on("command", function(data) {
			DroneActions.updateCommands(data);
		});
		socket.on("data", function(data) {
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
					steps={this.state.flightOptions.steps} />
			</div>
		);
	}
}

// do this stupid thing for the material ui thing
DroneController.childContextTypes = {
  muiTheme: React.PropTypes.object
};
