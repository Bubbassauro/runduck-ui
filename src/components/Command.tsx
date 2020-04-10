import React from 'react';
import { Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Computer from '@material-ui/icons/Computer';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Typography from '@material-ui/core/Typography';

type CommandProps = {
    command: string,
    typeName: string
}

class Command extends Component<CommandProps>   {
    render() {
        if (!this.props.command) {
            return <Typography />;
        }
        if (this.props.typeName === 'exec') {
            return (<Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>
                <Tooltip title="exec">
                    <Computer fontSize="small" style={{ marginRight: "5px", marginBottom: "-5px" }} />
                </Tooltip>
                <code>{this.props.command}</code>
            </Typography>)
        }
        else {
            return (<Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>
                <Tooltip title="script">
                    <AssignmentIcon fontSize="small" style={{ marginRight: "5px", marginBottom: "-5px" }} />
                </Tooltip>
                <code>{this.props.command}</code>
            </Typography>)
        }
    }
}
export default Command;