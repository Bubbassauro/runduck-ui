import React from 'react';
import { Component } from 'react';
import { NotificationType } from './types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import NotificationEmail from './NotificationEmail';

type NotificationProps = {
    notification?: NotificationType,
}

class Notification extends Component<NotificationProps> {
    render() {
        let notificationSuccess;
        let notificationFailure;

        if (this.props.notification) {
            if (this.props.notification.onsuccess) {
                notificationSuccess = <NotificationEmail
                    email={this.props.notification.onsuccess.email}
                    title="On Success" />;
            }
            if (this.props.notification.onfailure) {
                notificationFailure = <NotificationEmail
                    email={this.props.notification.onfailure.email}
                    title="On Failure" />;
            }
        }
        return (
            <Box>
                { this.props.notification ?
                <Grid container spacing={2} alignItems="stretch">
                    { notificationSuccess ?
                    <Grid item xs>
                        <Paper style={{height: '100%', padding: '1em'}}>
                            {notificationSuccess}
                        </Paper>
                    </Grid>
                    : '' }
                    { notificationFailure ?
                    <Grid item xs>
                        <Paper style={{height: '100%', padding: '1em'}}>
                            {notificationFailure}
                        </Paper>
                    </Grid>
                    : ''}
                </Grid>
                : ''}
            </Box>
        )
    }
}
export default Notification;