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
		this.state = {message: "this is the state from the constructor"};
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
				{keys: "j", on_keyup: function() {socket.emit("down")}},
				{keys: "k", on_keyup: function() {socket.emit("up")}},
				{keys: "w", on_keyup: function() {socket.emit("forward")}},
				{keys: "s", on_keyup: function() {socket.emit("back")}},
				{keys: "a", on_keyup: function() {socket.emit("left")}},
				{keys: "d", on_keyup: function() {socket.emit("right")}},
				{keys: "f", on_keyup: function() {socket.emit("fly")}}
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
		var data = this.state;
		return (
			<p>
			Drone server: {data}
			</p>
		);
	}
}
