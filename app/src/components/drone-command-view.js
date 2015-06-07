// import mui from "material-ui";

export default class DroneControlBar extends React.Component {
    render() {
        return (
            // TODO throw some material-ui paper around this
            <ul>
                <li>{this.props.message}</li>
                {this.props.commands.map((command) => {
                    return (
                        <li>{command}</li>
                    );
                })}
            </ul>
        );
    }
}
