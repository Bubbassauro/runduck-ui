import React from 'react';
import { Component } from 'react';
import Chip from '@material-ui/core/Chip';
import { withTheme, Theme } from '@material-ui/core/styles';
import { getChipColor } from '../functions/getChipColor'

type EnvironmentProps = {
    theme: Theme,
    label: string,
    index: number
}

class Environment extends Component<EnvironmentProps> {
    render() {
        return (
        <Chip size="small"
        label={this.props.label}
        style={getChipColor(this.props.theme, this.props.index)} />
        )
    }
}
const EnvironmentWithTheme = withTheme(Environment);
export default EnvironmentWithTheme;