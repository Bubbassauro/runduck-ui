import React from 'react';
import { Component } from 'react';
import Box from '@material-ui/core/Box'

type JobProps = {
    data: any
}

class Job extends Component<JobProps> {
    state = {
        description: '-'
    }

    componentDidMount() {
        const env = this.props.data["env"]
        const uuid = this.props.data["uuid"]
        const id = this.props.data["id"]
        let url = `http://localhost:3825/api/job/${env}/${uuid}`
        fetch(url)
            .then(res => res.json())
            .then((data) => {
                this.setState({ description: data["description"] })
            })
            .catch(console.log)
    }
    render() {
        return (<Box p={1}>test: {this.state.description}</Box>)
    }
}

export default Job;