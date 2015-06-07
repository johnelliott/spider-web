var io = require("socket.io-client/socket.io");
var Keypress = require("keypress.js");
var CommandStore = require("../stores/store");
var CommandActions = require("../actions/CommandActions");

export default class DroneController extends React.Component {
	constructor(props) {
		super(props);
		// there is no auto-binding:
		// https://medium.com/@goatslacker/react-0-13-x-and-autobinding-b4906189425d
		this.onChange = this.onChange.bind(this);
		this.state = {
			message: "Drone Server",
			commands: []
		};
	}
	getInitialState() {
		return CommandStore.getState();
	}
	onChange(state) {
		this.setState(state);
	}
	componentDidMount() {
		console.log("hello componentDidMount");
		CommandStore.listen(this.onChange);
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
			CommandActions.updateCommands(data);
		});
	}
	componentWillUnmount() {
		CommandStore.unlisten(this.onChange);
	}
	render() {
		return (
			<ul>
				<li>{this.state.message}</li>
				{this.state.commands.map((command) => {
					return (
						<li>{command}</li>
					);
				})}
			</ul>
		);
	}
}
