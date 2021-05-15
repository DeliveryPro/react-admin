import React from 'react'
import { Box, List, ListItem, makeStyles, Typography } from '@material-ui/core'
import { useHistory } from 'react-router'
import Support from 'pages/Support'
import Users from 'pages/Users'
import MapComponent from './Map'

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'row',
	},
	leftMenu: {},
	listItem: {
		margin: 10,
		width: 200,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: theme.backgroundSecondary,
	},
}))

const LEFT_MENU = [
	{ name: 'Support', link: '/support' },
	{ name: 'Users', link: '/users' },
	{ name: 'Map', link: '/map' },
]

const PAGES = {
	SUPPORT: { name: 'SUPPORT', component: Support },
	HOME: { name: 'HOME', component: null },
	USERS: { name: 'USERS', component: Users },
	MAP: { name: 'MAP', component: MapComponent },
}

const Home = ({ page = 'HOME' }) => {
	const classes = useStyles()
	const history = useHistory()

	const toPage = (link) => () => history.push(link)

	return (
		<Box className={classes.root}>
			<Box className={classes.leftMenu}>
				<List>
					{LEFT_MENU.map(({ name, link }) => {
						return (
							<ListItem className={classes.listItem} button onClick={toPage(link)}>
								<Typography>{name}</Typography>
							</ListItem>
						)
					})}
				</List>
			</Box>
			<Box className={classes.content}>{PAGES[page].component}</Box>
		</Box>
	)
}

export default Home
