var io = require("socket.io-client/socket.io");
var Keypress = require("keypress.js");

export default class DroneController extends React.Component {
	constructor(props) {
		super(props);
		this.state = { message: "constructor this.state" };
		// this.
		// this.controls = ;
	}
	componentDidMount() {
		console.log("hello componentDidMount");
		var socket = io("http://localhost:3000");
		socket.on("connect", function() {
			this.keyboard = new Keypress.Listener();
			this.keyboard.register_many([
				{ keys: "w", on_keydown: function() {
						socket.emit("up");
						console.log("key w");
					}
				},
				{ keys: "s", on_keydown: function() {
						socket.emit("down");
						console.log("key s");
					}
				},
				{ keys: "j", on_keydown: function() {
						socket.emit("fly");
						console.log("key j");
					}
				},
				{ keys: "k", on_keydown: function() {
						socket.emit("land");
						console.log("key k");
					 }
				}
			]);
			this.keyboard.listen();
		});
		socket.on("data", function(data) {
			this.setState({message: data});
		}.bind(this));
	}
	render() {
		var text = this.state.message;
		return (
			<p>
			Drone server says: {text}
			</p>
		);
	}
}
