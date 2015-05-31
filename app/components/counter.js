var io = require("../lib/socket.io.js");
var jsxT = require("../lib/JSXTransformer-0.13.3.js");
var react = require("../lib/react-0.13.3.js");

// var CounterView = React.createClass({
// 	getInitialState: function() {
// 		return {message: "initial message"};
// 	},
// 	componentDidMount: function() {
// 		var socket = io("http://localhost:3000");
// 		socket.on("hit", function(data) {
// 			console.log("hit event");
// 			this.setState({message: data});
// 		}.bind(this));
// 	},
// 	render: function() {
// 		var text = this.state.message;
// 		return (
// 			<p>
// 				Message: {text}
// 			</p>
// 		);
// 	}
// });

// React.render(
// 	<CounterView />,
// 	document.getElementById("example")
// );
