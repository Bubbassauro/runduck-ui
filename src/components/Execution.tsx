import React from 'react';
import { Component } from 'react';
import { Typography } from '@material-ui/core';
import { getApiUrl } from '../functions/getApiUrl';
import { Box } from '@material-ui/core';

type ExecutionProps = {
    env: string,
    uuid: string
}

function formatLocalDate(isoDate: string) {
    if (isoDate) {
        const dt = new Date(isoDate);
        return dt.toLocaleString();
    }
    return '';
}

function getStatusColor(status: string) {
    switch (status) {
        case "succeeded":
            return "success.main";
        case "running":
            return "info.main";
        case "aborted":
            return "warning.main";
        case "failed":
        case "timeout":
        case "failed-with-retry":
            return "error.main";
        case "scheduled":
            return "primary.main";
        default:
            return "text.primary";
    }
}

class Execution extends Component<ExecutionProps> {
    state = {
        executionStatus: '',
        dateStarted: '',
        dateEnded: '',
        duration: ''
    }


    loadExecutionData() {
        const env = this.props.env;
        const uuid = this.props.uuid;
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
        this.loadExecutionData();
    }

    render() {
        if (this.state.executionStatus) {
            return (
                <Typography variant="body2" color="textPrimary">
                    Last execution
                    <Box display="inline" color={getStatusColor(this.state.executionStatus)} px={.5}>
                        {this.state.executionStatus}
                    </Box>
                at {this.state.dateEnded}&nbsp;
                in {this.state.duration}
                </Typography>
            )
        }
        else {
            return (<Typography />)
        }
    }
}
export default Execution;