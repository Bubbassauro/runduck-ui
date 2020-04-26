import React from 'react';
import { Component } from 'react';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment';
import { Typography } from '@material-ui/core';

type NextExecutionProps = {
    value?: string,
}

class NextExecution extends Component<NextExecutionProps> {
    render() {
        if (this.props.value) {
            return (
                <Tooltip title={moment(this.props.value).format('LLLL')}>
                    <Typography noWrap variant="body2">{moment(this.props.value).fromNow()}</Typography>
                </Tooltip>
            )
        }
        else {
            return (<Box></Box>)
        }
    }
}
export default NextExecution;