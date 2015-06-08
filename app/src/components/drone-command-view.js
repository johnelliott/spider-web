var Menu = require("material-ui").Menu;

export default class DroneControlBar extends React.Component {
	render() {
		// TODO find out how to not to parse over this many
		var commandListItems = this.props.commands.map((command, index) => {
			return (
				{ payload: index, text: command, number: index }
			);
		}).slice(-5);
		return (
			<Menu menuItems={commandListItems} autoWidth={false}/>
		);
	}
}
