var CircularProgress = require("material-ui").CircularProgress;

export default class FlightSettingIndicator extends React.Component {
	render() {
		return (
			<CircularProgress mode="determinate" value={this.props.percentage} min={10} max={100} />
		);
	}
}