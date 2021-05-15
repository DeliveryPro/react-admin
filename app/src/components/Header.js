import { Box, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'row',
		padding: theme.spacing(1),
		backgroundColor: theme.background,
		borderBottom: `1px solid ${theme.primary}`,

	},
	logoContainer: {
		display: 'flex',
		flexDirection: 'row',
	},
	text: {
		alignSelf: 'center',
	},
	logoText: {
		fontSize: 30,
		fontFamily: 'Monsterrat',
		fontWeight: 600,
		lineHeight: '40px',
	},
	logoTextSecondary: {
		fontSize: 15,
		lineHeight: '20px',
	},
}))

const Header = () => {
	const classes = useStyles()
	return (
		<header>
			<Box className={classes.root}>
				<Box className={classes.logoContainer}>
					<Typography className={classes.logoText}>Delivery</Typography>
					<Typography className={classes.logoTextSecondary}>admin</Typography>
				</Box>
			</Box>
		</header>
	)
}

export default Header
