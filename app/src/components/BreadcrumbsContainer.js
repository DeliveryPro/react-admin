import { Box, Breadcrumbs, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
	},
	defaultBreadcrumb: {
		fontSize: 16,
		cursor: 'pointer',
	},
	activeBreadcrumb: {
		color: theme.primary,
	},
	breadcrumbs: {
		padding: theme.spacing(1),
	},
}))

const BreadcrumbsContainer = ({ component }) => {
	const classes = useStyles()
	const history = useHistory()

	const toPage = (page) => () => history.push(page)

	const getLinks = () => {
		const mainLink = window.location.pathname

		const links = mainLink.split('/')

		return links.map((name, index) => {
			let link = '/'
			for (let a = 0; a < index; a++) link += name + '/'

			return (
				<Typography
					className={index === links.length - 1 ? classes.activeBreadcrumb : classes.defaultBreadcrumb}
					onClick={index === links.length - 1 ? null : toPage(link)}
				>
					{name || 'home'}
				</Typography>
			)
		})
	}

	return (
		<Box className={classes.root}>
			<Box className={classes.breadcrumbs}>
				<Breadcrumbs aria-label="breadcrumb">{getLinks()}</Breadcrumbs>
			</Box>
			{component}
		</Box>
	)
}

export default BreadcrumbsContainer
