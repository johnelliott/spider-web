var io = require("socket.io-client/socket.io");
var Keypress = require("keypress.js");
var DroneStore = require("../stores/store");
var DroneActions = require("../actions/drone-actions");

var mui = require("material-ui");
var ThemeManager = new mui.Styles.ThemeManager();

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
		console.log("flux state:", this.state)
	}
	componentDidMount() {
		console.log("hello componentDidMount");
		DroneStore.listen(this.onChange);
		var socket = io("http://localhost:3000/drones");
		socket.on("connect", function() {
			this.keyboard = new Keypress.Listener();
			this.keyboard.register_many([
				{keys: "=", on_keyup: function() {socket.emit("faster")}},
				{keys: "-", on_keyup: function() {socket.emit("slower")}},
				{keys: "]", on_keyup: function() {socket.emit("longer")}},
				{keys: "[", on_keyup: function() {socket.emit("shorter")}},

				{keys: "j", on_keyup: function() {socket.emit("down")}},
				{keys: "k", on_keyup: function() {socket.emit("up")}},

				{keys: "h", on_keyup: function() {socket.emit("turnLeft")}},
				{keys: "l", on_keyup: function() {socket.emit("turnRight")}},

				{keys: "w", on_keyup: function() {socket.emit("forward")}},
				{keys: "s", on_keyup: function() {socket.emit("back")}},
				{keys: "a", on_keyup: function() {socket.emit("left")}},
				{keys: "d", on_keyup: function() {socket.emit("right")}},

				{keys: "f", on_keyup: function() {socket.emit("fly")}},
				{keys: "g", on_keyup: function() {socket.emit("flip")}}
			]);
			this.keyboard.listen();
		});
		socket.on("command", function(data) {
			DroneActions.updateCommands(data);
		});
		socket.on("data", function(data) {
			DroneActions.updateDroneData(data);
		});
	}
	componentWillUnmount() {
		DroneStore.unlisten(this.onChange);
	}
	render() {
		console.log("could be rendering uuid:", this.state.uuid);
		return (
			<div>
				<DroneInfoBar title={this.state.uuid} />
				<DroneCommandView message="commands"
					commands={this.state.commands.slice(-7)} />
				<DroneControlBar
					title={"Battery " + this.state.status.battery + "%"}
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
