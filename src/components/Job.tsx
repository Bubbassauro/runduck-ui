import React from 'react';
import { Component } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { withTheme, Theme } from '@material-ui/core/styles';
import Command from './Command';
import Notification from './Notification';

type JobProps = {
    data: any,
    theme: Theme
}

class Job extends Component<JobProps> {
    state = {
        description: '-',
        name: '',
        commands: [],
        notification: {}
    }

    componentDidMount() {
        const env = this.props.data["env"]
        const uuid = this.props.data["uuid"]
        let url = `http://localhost:3825/api/job/${env}/${uuid}`
        fetch(url)
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    name: data["name"],
                    description: data["description"],
                    commands: (data["sequence"] ? data["sequence"]["commands"] : []),
                    notification: data["notification"]
                })
            })
            .catch(console.log)
    }

    render() {
        return (
            <Box pl={6} p={2} style={{backgroundColor: this.props.theme.palette.background.default}}>
                <Typography variant="h6">{this.state.name}</Typography>
                {this.state.commands.map((command, i) => {
                    return (<Box key={i}>
                        <Command command={command} />
                        </Box>)
                    })}
                <Notification notification={this.state.notification} />
            </Box>
        )
    }
}
const JobWithStyles = withTheme(Job);
export default JobWithStyles;