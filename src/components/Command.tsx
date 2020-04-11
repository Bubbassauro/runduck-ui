import React from 'react';
import { Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Computer from '@material-ui/icons/Computer';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/icons/Link';
import Box from '@material-ui/core/Box';

type JobRefInfo = {
    group?: string,
    name?: string,
    project?: string,
    uuid?: string
}

type CommandInfo = {
    description?: string,
    exec?: string,
    script?: string,
    jobref?: JobRefInfo
}

type CommandProps = {
    command: CommandInfo
}
class Exec extends Component<CommandProps> {
    render() {
        return (
            <Box>
                <Typography color="textSecondary">
                    {this.props.command.description}
                </Typography>
                <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>
                    <Tooltip title="exec">
                        <Computer fontSize="small" style={{ marginRight: "5px", marginBottom: "-5px" }} />
                    </Tooltip>
                    <code>{this.props.command.exec}</code>
                </Typography>
            </Box>
        )
    }
}
class Script extends Component<CommandProps> {
    render() {
        return (
            <Box>
                <Typography color="textSecondary">
                    {this.props.command.description}
                </Typography>
                <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>
                    <Tooltip title="script">
                        <AssignmentIcon fontSize="small" style={{ marginRight: "5px", marginBottom: "-5px" }} />
                    </Tooltip>
                    <code>{this.props.command.script}</code>
                </Typography>
            </Box>
        )
    }
}
class JobRef extends Component<CommandProps> {
    render() {
        const jobRef = this.props.command.jobref;
        return(
            <Box>
                <Typography color="textSecondary">
                    {jobRef?.project} {jobRef?.group ? `/ ${jobRef.group}` : ''}
                </Typography>
                <Typography>
                    <Tooltip title="jobref">
                        <Link fontSize="small" style={{ marginRight: "5px", marginBottom: "-5px" }} />
                    </Tooltip>
                    {jobRef?.name}
                </Typography>
            </Box>
        )
    }
}
class Command extends Component<CommandProps>   {
    render() {
        let commandType;
        if (this.props.command.jobref) {
            commandType = <JobRef command={this.props.command} />;
        }
        else if(this.props.command.exec) {
            commandType = <Exec command={this.props.command} />
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