import React from 'react';
import { Component } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { withTheme, Theme } from '@material-ui/core/styles';
import Command from './Command';

type JobProps = {
    data: any,
    theme: Theme
}

class Job extends Component<JobProps> {
    state = {
        description: '-',
        commands: []
    }

    componentDidMount() {
        const env = this.props.data["env"]
        const uuid = this.props.data["uuid"]
        let url = `http://localhost:3825/api/job/${env}/${uuid}`
        fetch(url)
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    description: data["description"],
                    commands: (data["sequence"] ? data["sequence"]["commands"] : [])
                })
            })
            .catch(console.log)
    }

    render() {
        return (
            <Box p={1} style={{backgroundColor: this.props.theme.palette.background.default}}>
                {this.state.commands.map((command, i) => {
                    return (
                        <Box key={i} pl={6} pb={2}>
                            <Typography color="textSecondary">
                                {command["description"]}
                            </Typography>
                            <Command command={command["exec"]} typeName="exec" />
                            <Command command={command["script"]} typeName="script" />
                        </Box>
                    )
                })}
            </Box>
        )
    }
}
const JobWithStyles = withTheme(Job);
export default JobWithStyles;