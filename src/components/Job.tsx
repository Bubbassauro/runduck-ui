import React from 'react';
import { Component } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Refresh from '@material-ui/icons/Refresh';
import { withTheme, Theme } from '@material-ui/core/styles';
import Command from './Command';
import Notification from './Notification';
import { Typography } from '@material-ui/core';
import { getApiUrl } from '../functions/getApiUrl';

type JobProps = {
    data: any,
    theme: Theme
}

function formatLocalDate(isoDate: string) {
    if (isoDate) {
        const dt = new Date(isoDate);
        return dt.toLocaleString();
    }
    return '';
}

class Job extends Component<JobProps> {
    state = {
        description: '-',
        name: '',
        permalink: '',
        commands: [],
        notification: {},
        updated: '',
        executionStatus: '',
        dateStarted: '',
        dateEnded: '',
        duration: ''
    }

    getUpdatedStr(updated: string) {
        if (updated) {
            const updated_dt = new Date(updated);
            const updated_msg = `Last Updated: ${updated_dt.toString()}`
            return updated_msg;
        }
        return "";
    }

    loadJobData(refresh: boolean = false) {
        const env = this.props.data["env"]
        const uuid = this.props.data["uuid"]
        let path = `api/job/${env}/${uuid}?force_refresh=${refresh}`
        let url = getApiUrl(path);
        fetch(url)
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    name: data["name"],
                    permalink: data["permalink"],
                    description: data["description"],
                    commands: (data["sequence"] ? data["sequence"]["commands"] : []),
                    notification: data["notification"],
                    updated: this.getUpdatedStr(data["updated"])
                })
            })
            .catch(console.log)
    }

    loadExecutionData() {
        const env = this.props.data["env"]
        const uuid = this.props.data["uuid"]
        let path = `api/job/${env}/${uuid}/execution`
        let url = getApiUrl(path);
        fetch(url)
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    executionStatus: data["status"],
                    dateStated: formatLocalDate(data["date-started"]["date"]),
                    dateEnded: formatLocalDate(data["date-ended"]["date"]),
                    duration: data["duration"]
                })
            })
            .catch(console.log)
    }

    componentDidMount() {
        this.loadJobData();
        this.loadExecutionData();
    }

    render() {
        return (
            <Box pl={6} p={2} style={{ backgroundColor: this.props.theme.palette.background.default }}>
                <Grid container>
                    <Grid item style={{ flex: 1 }}>
                        <Link variant="h6" href={this.state.permalink} color="textPrimary"
                            target="_blank">{this.state.name}</Link>
                        <Typography variant="body2" color="textSecondary">
                            Last execution&nbsp;
                            {this.state.executionStatus}&nbsp;
                            at {this.state.dateEnded}&nbsp;
                            for {this.state.duration}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography noWrap variant="body2" color="textSecondary">{this.state.updated}
                            &nbsp;&nbsp;
                            <Button
                                variant="contained"
                                size="small"
                                startIcon={<Refresh />}
                                onClick={() => this.loadJobData(true)}
                            >
                                Refresh
                            </Button>
                        </Typography>
                    </Grid>
                </Grid>
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