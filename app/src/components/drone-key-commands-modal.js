var Dialog = require("material-ui").Dialog;
var DroneKeysList = require("../components/drone-keys-list");

export default class DroneKeyCommandsModal extends React.Component {
	constructor(props) {
		super(props);
		//Standard Actions
		this.standardActions = [
			{ text: "Cancel", onClick: this.dismiss }
		];
	}
	handleOKClick () {
		console.log("ok was clicked");
		console.log(this);
		Dialog.dismiss().bind(this);
	}
	render() {
		return (
			<Dialog
				title="Keyboard Commands"
				actions={this.standardActions}
				actionFocus="OK"
				modal={false}
				openImmediately={true}>
				<DroneKeysList message="keys" />
			</Dialog>
		);
	}
}
