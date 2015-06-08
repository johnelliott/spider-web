var Menu = require("material-ui").Menu;



export default class DroneControlBar extends React.Component {
	render() {
		// var numberMenuItems = [
		//    { payload: '1', text: 'All', number: '22' },
		//    { payload: '3', text: 'Uncategorized', number: '6'},
		//    { payload: '4', text: 'Trash', number: '11' }
		// ];
		var commandListItems = this.props.commands.map((command, index) => {
			return (
				{ payload: index, text: command, number: index }
			);
		}).slice(-5);
		console.log("here is the thing I made", commandListItems);
		return (
			<Menu menuItems={commandListItems} autoWidth={false}/>
		);
	}
}
