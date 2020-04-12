import React from 'react';
import { Component } from 'react';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Computer from '@material-ui/icons/Computer';
import { CommandProps } from './types';

class Exec extends Component<CommandProps> {
    render() {
        return (
            <Box>
                <Typography color="textSecondary">
                    <Tooltip title="exec">
                        <Computer fontSize="small" style={{ marginRight: "5px", marginBottom: "-5px" }} />
                    </Tooltip>
                    {this.props.command.description}
                </Typography>
                <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>
                    <code>{this.props.command.exec}</code>
                </Typography>
            </Box>
        )
    }
}
export default Exec;