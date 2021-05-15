import { createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme({
	primary: '#112d4e',
	secondary: '#3f72af',
	background: '#f9f7f7',
	backgroundSecondary: '#dbe2ef',
	palette: {
		primary: {
			main: '#112d4e',
			// contrastText: 'white',
		},
		secondary: {
			main: '#3f72af',
			// contrastText: 'white',
		},
		background: {
			main: '#f9f7f7',
		},
	},
    typography: {
		fontFamily: ['Ubuntu', 'Monsterrat'].join(','),
		button: {
			textTransform: 'none',
		},
	},
})

export default theme
