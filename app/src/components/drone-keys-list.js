var Menu = require("material-ui").Menu;
var controls = require("../keyboard-controls");


export default class DroneKeysList extends React.Component {
	render() {
		// TODO find out how to not to parse over this many
		var KeysListItems = controls.map((mapping, index) => {
			return (
				{ payload: index, text: mapping.command, number: mapping.key }
			);
		});
		return (
			<Menu menuItems={KeysListItems} autoWidth={false}/>
		);
	}
}
