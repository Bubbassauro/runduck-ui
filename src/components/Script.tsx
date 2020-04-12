import React from 'react';
import { Component } from 'react';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { CommandProps } from './types';

class Script extends Component<CommandProps> {
    render() {
        return (
            <Box>
                <Typography color="textSecondary">
                    <Tooltip title="script">
                        <AssignmentIcon fontSize="small" style={{ marginRight: "5px", marginBottom: "-5px" }} />
                    </Tooltip>
                    {this.props.command.description}
                </Typography>
                <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>
                    <code>{this.props.command.script}</code>
                </Typography>
            </Box>
        )
    }
}
export default Script;