import React from 'react';
import { Component } from 'react';
import Box from '@material-ui/core/Box';
import { withTheme, Theme } from '@material-ui/core/styles';
import Command from './Command';
import Link from '@material-ui/core/Link';

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
                    return (<Command command={command} key={i} />)
                })}
            </Box>
        )
    }
}
const JobWithStyles = withTheme(Job);
export default JobWithStyles;