import { Box, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		height: '3vh',
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: theme.spacing(1),
		backgroundColor: theme.backgroundSecondary,
		borderTop: `1px solid ${theme.primary}`,
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
	copyright: {
		alignSelf: 'center',
	},
}))

const Footer = () => {
	const classes = useStyles()
	return (
		<footer>
			<Box className={classes.root}>
				<Box className={classes.logoContainer}>
					<Typography className={classes.logoTextSecondary}>admin</Typography>
				</Box>
				<Box className={classes.copyright}>created by Roman Kameniev PZPI-17-1</Box>
				<Box />
			</Box>
		</footer>
	)
}

export default Footer
