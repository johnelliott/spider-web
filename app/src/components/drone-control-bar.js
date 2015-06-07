var Toolbar = require("material-ui").Toolbar;
var ToolbarGroup = require("material-ui").ToolbarGroup;
var RaisedButton = require("material-ui").RaisedButton;
var ToolbarSeparator = require("material-ui").ToolbarSeparator;
var ToolbarTitle = require("material-ui").ToolbarTitle;

var FlightSettingIndicator = require("../components/flight-setting-indicator");

export default class DroneControlBar extends React.Component {
    render() {
        return (
            <Toolbar>
                <ToolbarGroup key={0} float="left">
                    <ToolbarTitle text={this.props.message} />
                    <ToolbarSeparator/>
                    <FlightSettingIndicator percentage={this.props.speed} size={0.5} />
                    <FlightSettingIndicator percentage={this.props.steps} size={0.5} />
                </ToolbarGroup>
                <ToolbarGroup key={1} float="right">
                    <RaisedButton label="Land Now" primary={true} />
                </ToolbarGroup>
            </Toolbar>
        );
    }
}
