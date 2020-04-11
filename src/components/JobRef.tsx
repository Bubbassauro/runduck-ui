import React from 'react';
import { Component } from 'react';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import CommandProps from './types';

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
export default JobRef;