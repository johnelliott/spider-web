var Toolbar = require("material-ui").Toolbar;
var ToolbarGroup = require("material-ui").ToolbarGroup;
var RaisedButton = require("material-ui").RaisedButton;
var ToolbarTitle = require("material-ui").ToolbarTitle;

var FlightSettingIndicator = require("../components/flight-setting-indicator");

export default class DroneControlBar extends React.Component {
    render() {
        return (
            <Toolbar>
                <ToolbarGroup key={0} float="left">
                    <ToolbarTitle text={this.props.title} />
                </ToolbarGroup>
                <ToolbarGroup key={1} float="right">
                    <FlightSettingIndicator percentage={this.props.speed} size={0.5} />
                    <FlightSettingIndicator percentage={this.props.steps} size={0.5} />
                    <RaisedButton
                        label={this.props.flying === true ? "Land now" : "Not Flying"}
                        disabled={this.props.flying === false}
                        primary={this.props.flying === true} />
                </ToolbarGroup>
            </Toolbar>
        );
    }
}
