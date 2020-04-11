import React from 'react';
import { Component } from 'react';
import Box from '@material-ui/core/Box';
import Exec from './Exec';
import CommandProps from './types';
import JobRef from './JobRef';
import Configuration from './Configuration';
import Script from './Script';

class Command extends Component<CommandProps> {
    render() {
        let commandType;
        if (this.props.command.jobref) {
            commandType = <JobRef command={this.props.command} />;
        }
        else if(this.props.command.exec) {
            commandType = <Exec command={this.props.command} />
        }
        else if(this.props.command.configuration) {
            commandType = <Configuration command={this.props.command} />
        }
        else {
            commandType = <Script command={this.props.command} />
        }

        return (
            <Box pl={6} pb={2}>{commandType}</Box>
        )
    }
}
export default Command;