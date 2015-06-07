var Toolbar = require("material-ui").Toolbar;
// var ToolbarGroup = require("material-ui").ToolbarGroup;
var ToolbarTitle = require("material-ui").ToolbarTitle;

export default class DroneControlBar extends React.Component {
    render() {
        return (
            <Toolbar>
                {/* <ToolbarGroup key={0} float="left"> */}
                    <ToolbarTitle text={this.props.title} />
                {/* </ToolbarGroup> */}
            </Toolbar>
        );
    }
}
