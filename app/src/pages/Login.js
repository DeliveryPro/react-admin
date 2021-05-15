import { Box, TextField, makeStyles, Button, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import logger from 'utils/logger'

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		height: '100%',
		flexDirection: 'column',
		alignItems: 'center',
	},
	container: {
		'& > *': {
			margin: theme.spacing(1),
		},
		display: 'flex',
		flexDirection: 'column',
        width:'100%',
		maxWidth: '400px',
		backgroundColor: theme.backgroundSecondary,
		borderRadius: 4,
        margin: theme.spacing(1),
		padding: theme.spacing(1),
		marginTop: '15vh',
		marginBottom: '5vh',
	},
	text: {
		alignSelf: 'center',
		fontSize: '40px',
	},
}))

const LOGIN_PAGE_FIELDS = {
	EMAIL: 'email',
	PASSWORD: 'password',
}

const Login = () => {
	const [data, setData] = useState({})
	const classes = useStyles()

	const onChange =
		(type) =>
		({ target: { value } }) => {
			const d = { ...data }
			d[type] = value
			setData(d)
		}

	logger('Login', data)

	const onSubmit = () => {
		// console.log(`(data[LOGIN_PAGE_FIELDS.EMAIL].length`, data[LOGIN_PAGE_FIELDS.EMAIL].length)
		if (data[LOGIN_PAGE_FIELDS.EMAIL].length && data[LOGIN_PAGE_FIELDS.PASSWORD].length) {
			console.log('go next')
		}
	}

	return (
		<Box className={classes.root}>
			<Box className={classes.container}>
				<Typography className={classes.text}>Login</Typography>

				<TextField type="email" variant="outlined" label="email" onChange={onChange(LOGIN_PAGE_FIELDS.EMAIL)} />
				<TextField
					type="password"
					variant="outlined"
					label="password"
					onChange={onChange(LOGIN_PAGE_FIELDS.PASSWORD)}
				/>

				<Button variant="contained" color="primary" onClick={onSubmit}>
					Sign In
				</Button>
				<Button />
			</Box>
		</Box>
	)
}

export default Login
