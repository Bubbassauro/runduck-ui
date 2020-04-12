import React from 'react';
import { Component } from 'react';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import AssistantIcon from '@material-ui/icons/Assistant';
import { CommandProps } from './types';

class Configuration extends Component<CommandProps> {
    render() {
        return(
            <Box>
                <Typography color="textSecondary">
                    {this.props.command?.type}
                </Typography>
                <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>
                    <Tooltip title="configuration">
                        <AssistantIcon fontSize="small" style={{ marginRight: "5px", marginBottom: "-5px" }} />
                    </Tooltip>
                    <code>{this.props.command.configuration?.command}</code>
                </Typography>
            </Box>
        )
    }
}
export default Configuration;
