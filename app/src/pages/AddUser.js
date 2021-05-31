import React, { useEffect, useState } from 'react'
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
import { useDispatch, useSelector } from 'react-redux'
import {
	createNewUserAction,
	getUserDataAction,
	sendNewCredentialsAction,
	updateUserAction,
} from 'redux/actions/user-action'
import { userDataSelector } from 'redux/selectors/user-selector'
import { useHistory } from 'react-router'

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
	EMAIL: { name: 'email', type: 'email', label: 'Email', visible: true },
	NAME: { name: 'name', type: 'text', label: 'Name', visible: true },
	GIVEN_NAME: { name: 'givenName', type: 'text', label: 'Given Name', visible: true },
	FAMILY_NAME: { name: 'familyName', type: 'text', label: 'Family Name', visible: true },
	PHOTO: { name: 'photo', type: 'photo', label: 'Photo', visible: false },
	PHONE: { name: 'phone', type: 'text', label: 'Phone', visible: true },
	ID: { name: 'ID', type: 'text', label: 'Id', visible: 'false' },
	ROLE: { name: 'role', type: 'select', label: 'Role', visible: false },
}

const ROLES = {
	admin: { name: 'Admin', value: 'admin' },
	courier: { name: 'Courier', value: 'courier' },
	none: { name: 'None', value: 'none' },
}

const AddUserContent = () => {
	const [data, setData] = useState({})

	const classes = useStyles()
	const dispatch = useDispatch()

	const history = useHistory()

	const location = window.location.pathname
	const userId =
		location.split('/')[location.split('/').length - 1] === 'new'
			? null
			: location.split('/')[location.split('/').length - 1]

	const PAGE_TITLE = userId ? 'Edit User Data' : 'Add New User'

	const userData = useSelector(userDataSelector)

	useEffect(() => {
		if (userId) dispatch(getUserDataAction(userId))
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userId])

	useEffect(() => {
		if (userData) setData({ [ADD_NEW_USER_FIELDS.ID.name]: userId, ...userData })
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userData])

	const toPage = (page) => history.push(page)

	useEffect(() => {
		if (userData.uid) {
			dispatch(
				sendNewCredentialsAction({
					userId: userData.uid,
					receiver: data[ADD_NEW_USER_FIELDS.EMAIL.name],
					name: data[ADD_NEW_USER_FIELDS.NAME.name],
				}),
			)
			toPage('/users')
		}
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userData.uid, userData.success])

	const onChange =
		(type) =>
		({ target: { value } }) => {
			const d = { ...data }
			d[type] = value
			setData(d)
		}

	const onSubmit = () => {
		if (!userId) {
			dispatch(createNewUserAction({ email: data[ADD_NEW_USER_FIELDS.EMAIL.name], adminRegisterData: data }))
			return
		}
		dispatch(updateUserAction(userId, data))
	}

	return (
		<Box className={classes.root}>
			<Box className={classes.container} component={Paper}>
				<Typography className={classes.titleText}>{PAGE_TITLE}</Typography>
				<Box className={classes.inputContainer}>
					<UserFields data={data} onChange={onChange} />
					<FormControl variant="filled">
						<InputLabel id="demo-simple-select-label">Role</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							value={
								data[ADD_NEW_USER_FIELDS.ROLE.name]
									? data[ADD_NEW_USER_FIELDS.ROLE.name]
									: ROLES.none.value
							}
							onChange={onChange(ADD_NEW_USER_FIELDS.ROLE.name)}
						>
							{Object.values(ROLES).map(({ value, name }) => (
								<MenuItem key={name} value={value}>
									{name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>
				<Box className={classes.buttonContainer}>
					<Button
						className={classes.submitButton}
						variant="contained"
						color={Object.values(data).length ? 'primary' : 'background'}
						onClick={Object.values(data).length ? onSubmit : null}
					>
						Submit
					</Button>
				</Box>
			</Box>
		</Box>
	)
}

const UserFields = ({ data, onChange }) => {
	return Object.keys(ADD_NEW_USER_FIELDS).map((fieldName, index) => {
		const { name, label, type, visible } = ADD_NEW_USER_FIELDS[fieldName]

		if (!visible) return null

		return (
			<TextField
				key={index + label}
				type={type}
				variant="filled"
				label={label}
				value={data[name]}
				onChange={onChange(ADD_NEW_USER_FIELDS[fieldName].name)}
			/>
		)
	})
}

const AddUser = () => <BreadcrumbsContainer component={<AddUserContent />} />

export default AddUser
