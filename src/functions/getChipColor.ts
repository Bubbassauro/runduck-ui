import { Theme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import purple from '@material-ui/core/colors/purple';
import orange from '@material-ui/core/colors/orange';
import lime from '@material-ui/core/colors/lime';
import pink from '@material-ui/core/colors/pink';

export function getChipColor(theme: Theme, index: number) {
    switch (index) {
        case 0:
            return {
                backgroundColor: green[300],
                color: theme.palette.getContrastText(green[300])
            }
        case 1:
            return {
                backgroundColor: blue[300],
                color: theme.palette.getContrastText(blue[300])
            }
        case 2:
            return {
                backgroundColor: orange[300],
                color: theme.palette.getContrastText(orange[300])
            }
        case 3:
            return {
                backgroundColor: lime[300],
                color: theme.palette.getContrastText(lime[300])
            }
        case 4:
            return {
                backgroundColor: pink[300],
                color: theme.palette.getContrastText(pink[300])
            }
        case 5:
            return {
                backgroundColor: purple[300],
                color: theme.palette.getContrastText(purple[300])
            }


        default:
            return {
                backgroundColor: theme.palette.background.default,
                color: theme.palette.getContrastText(theme.palette.background.default)
            }
    }
}
