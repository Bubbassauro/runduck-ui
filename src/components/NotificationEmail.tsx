import React from 'react';
import { Component } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { NotificationEmailProps } from './types';

class NotificationEmail extends Component<NotificationEmailProps> {
    render() {
        return (
            <Box>
                <Typography variant="h6">{this.props.title}</Typography>
                <Typography variant="subtitle1" color="textSecondary">{this.props.email.subject} </Typography>
                <Typography variant="body2">{this.props.email.recipients} </Typography>
            </Box>
        )
    }
}
export default NotificationEmail;