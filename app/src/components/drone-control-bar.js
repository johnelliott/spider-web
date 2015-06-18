var Toolbar = require("material-ui").Toolbar;
var ToolbarGroup = require("material-ui").ToolbarGroup;
var RaisedButton = require("material-ui").RaisedButton;
var ToolbarTitle = require("material-ui").ToolbarTitle;
// var ToolbarSeparator = require("material-ui").ToolbarSeparator;

var FlightSettingIndicator = require("../components/flight-setting-indicator");

export default class DroneControlBar extends React.Component {
	render() {
		return (
			<Toolbar>
				<ToolbarGroup key={0} float="left">
					<ToolbarTitle text={"Battery " + this.props.battery + "%"} />
					<ToolbarTitle text={"Signal " + this.props.signal + "dBm"} />
				</ToolbarGroup>
				<ToolbarGroup key={1} float="right">
					<FlightSettingIndicator percentage={this.props.speed} size={0.2} />
					<FlightSettingIndicator percentage={this.props.steps} size={0.2} />
					<RaisedButton
						label={this.props.flying === true ? "Land now" : "Not Flying"}
						onClick={this.props.landButtonHandler}
						disabled={!this.props.flying}
						secondary={true} />
				</ToolbarGroup>
			</Toolbar>
		);
	}
}
