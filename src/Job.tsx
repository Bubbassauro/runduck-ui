import React from 'react';
import { Component } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Computer from '@material-ui/icons/Computer';
import AssignmentIcon from '@material-ui/icons/Assignment';

type JobProps = {
    data: any
}

type CommandProps = {
    command: string,
    typeName: string
}

function Command(props: CommandProps) {
    if (!props.command) {
        return <Typography />;
    }
    if (props.typeName == 'exec') {
        return (<Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>
            <Tooltip title="exec">
                <Computer fontSize="small" style={{ marginRight:"5px", marginBottom: "-5px" }} />
            </Tooltip>
            <code>{props.command}</code>
        </Typography>)
    }
    else {
        return (<Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>
            <Tooltip title="script">
                <AssignmentIcon fontSize="small" style={{ marginRight:"5px", marginBottom: "-5px" }} />
            </Tooltip>
            <code>{props.command}</code>
        </Typography>)
    }
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
            <Box p={1}>
                {this.state.commands.map((command, i) => {
                    return (<Box pl={6}>
                        <Typography key={i} color="textSecondary">
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

export default Job;