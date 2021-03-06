import React from 'react';
import { Component } from 'react';
import { Typography } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';
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
function processResponse(response: any) {
    const statusCode = response.status;
    const data = response.json();
    return Promise.all([statusCode, data]).then(res => ({
        statusCode: res[0],
        data: res[1]
    }));
}
class Execution extends Component<ExecutionProps> {
    state = {
        executionStatus: '',
        dateStarted: '',
        dateEnded: '',
        duration: '',
        message: '',
        friendlyMessage: '',
    }


    loadExecutionData() {
        const env = this.props.env;
        const uuid = this.props.uuid;
        let path = `api/job/${env}/${uuid}/execution`
        let url = getApiUrl(path);
        fetch(url)
            .then(processResponse)
            .then(res => {
                const { statusCode, data } = res;
                if (statusCode === 200) {
                    if (data["status"]) {
                        this.setState({
                            executionStatus: data["status"],
                            dateStated: formatLocalDate(data["date-started"]["date"]),
                            dateEnded: formatLocalDate(data["date-ended"]["date"]),
                            duration: data["duration"]
                        })
                    }
                }
                else {
                    this.setState({
                        message: data["message"],
                        friendlyMessage: "Unable to retrieve last execution details"
                    })
                }
            })
            .catch((error) => {
                // Treat api error when running in debug mode
                this.setState({
                    message: error.toString(),
                    friendlyMessage: "Unable to retrieve last execution details"
                });
            })
    }

    componentDidMount() {
        this.loadExecutionData();
    }

    render() {
        if (this.state.executionStatus) {
            return (
                <Box>
                    <Typography variant="body2" color="textPrimary" display="inline">
                        Last execution
                    </Typography>
                    <Box display="inline" color={getStatusColor(this.state.executionStatus)} px={.5}>
                        {this.state.executionStatus}
                    </Box>
                    <Typography variant="body2" color="textPrimary" display="inline">
                        at {this.state.dateEnded}&nbsp;
                        in {this.state.duration}
                    </Typography>
                </Box>
            )
        }
        else {
            return (
                <Box>
                    <Tooltip title={this.state.message} placement="right">
                        <Typography variant="body2" color="error" display="inline">
                            {this.state.friendlyMessage}
                        </Typography>
                    </Tooltip>
                </Box>
            )
        }
    }
}
export default Execution;