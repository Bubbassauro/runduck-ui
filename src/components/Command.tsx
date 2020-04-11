import React from 'react';
import { Component } from 'react';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssistantIcon from '@material-ui/icons/Assistant';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import Computer from '@material-ui/icons/Computer';

type ConfigurationInfo = {
    command?: string,
}

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
    jobref?: JobRefInfo,
    configuration?: ConfigurationInfo,
    nodeStep?: boolean,
    type?: string,
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
                <Typography variant="subtitle1">
                    <Tooltip title="jobref">
                        <CollectionsBookmarkIcon fontSize="small" style={{ marginRight: "5px", marginBottom: "-5px" }} />
                    </Tooltip>
                    {jobRef?.name}
                </Typography>
            </Box>
        )
    }
}
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

class Command extends Component<CommandProps>   {
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