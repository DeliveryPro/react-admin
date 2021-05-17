import React, { useState } from 'react'
import BreadcrumbsContainer from 'components/BreadcrumbsContainer'
import {
	Box,
	Button,
	FormControl,
	InputLabel,
	makeStyles,
	MenuItem,
	Paper,
	Select,
	TextField,
	Typography,
} from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { createNewUserAction } from 'redux/actions/user-action'

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		padding: theme.spacing(1),
	},
	container: {
		padding: theme.spacing(2),
	},
	titleText: {
		fontSize: 30,
		fontWeight: 600,
	},
	inputContainer: {
		'& > *': {
			margin: theme.spacing(1),
			marginLeft: 0,
		},
		minWidth: 500,
		display: 'flex',
		flexDirection: 'column',
	},
	buttonContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		padding: theme.spacing(1),
	},
	submitButton: {
		width: 200,
	},
}))

const ADD_NEW_USER_FIELDS = {
	EMAIL: 'email',
	NAME: 'name',
	GIVEN_NAME: 'givenName',
	FAMILY_NAME: 'familyName',
	PHOTO: 'photo',
	PHONE: 'phone',
	ID: 'ID',
	ROLE: 'role',
}

const ROLES = [
	{ name: 'Admin', value: 'admin' },
	{ name: 'Courier', value: 'courier' },
]

const AddUserContent = () => {
	const [data, setData] = useState({})

	const classes = useStyles()
    const dispatch = useDispatch()

	const onChange =
		(type) =>
		({ target: { value } }) => {
			const d = { ...data }
			d[type] = value
			setData(d)
		}

    const onSubmit = () => {
        dispatch(createNewUserAction(data))
    }

	return (
		<Box className={classes.root}>
			<Box className={classes.container} component={Paper}>
				<Typography className={classes.titleText}>Add New User</Typography>
				<Box className={classes.inputContainer}>
					<TextField
						type="email"
						variant="outlined"
						label="Email"
						onChange={onChange(ADD_NEW_USER_FIELDS.EMAIL)}
					/>
					<TextField
						type="text"
						variant="outlined"
						label="Name"
						onChange={onChange(ADD_NEW_USER_FIELDS.NAME)}
					/>
					<TextField
						type="text"
						variant="outlined"
						label="Given Name"
						onChange={onChange(ADD_NEW_USER_FIELDS.GIVEN_NAME)}
					/>
					<TextField
						type="text"
						variant="outlined"
						label="Family Name"
						onChange={onChange(ADD_NEW_USER_FIELDS.FAMILY_NAME)}
					/>
					<TextField
						type="phone"
						variant="outlined"
						label="Phone"
						onChange={onChange(ADD_NEW_USER_FIELDS.PHONE)}
					/>
					<FormControl variant="outlined">
						<InputLabel id="demo-simple-select-label">Role</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							value={data[ADD_NEW_USER_FIELDS.ROLE]}
							onChange={onChange(ADD_NEW_USER_FIELDS.ROLE)}
						>
							{ROLES.map(({ value, name }) => (
								<MenuItem value={value}>{name}</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>
				<Box className={classes.buttonContainer}>
					<Button
						className={classes.submitButton}
						variant="contained"
						color={Object.values(data).length ? 'primary' : 'background'}
                        onClick={Object.values(data).length ? onSubmit: null}
					>
						Submit
					</Button>
				</Box>
			</Box>
		</Box>
	)
}

const AddUser = () => <BreadcrumbsContainer component={<AddUserContent />} />

export default AddUser
