import { Box, Button, makeStyles, Paper, Typography } from '@material-ui/core'
import BreadcrumbsContainer from 'components/BreadcrumbsContainer'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { getUserDataAction, sendNewCredentialsAction } from 'redux/actions/user-action'
import { isUserDataLoadingSelector, userDataSelector } from 'redux/selectors/user-selector'
import Skeleton from '@material-ui/lab/Skeleton'

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		padding: theme.spacing(1),
	},
	container: {
		padding: theme.spacing(2),
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	titleText: {
		fontSize: 30,
		fontWeight: 600,
	},
	rowContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		'& > *': {
			marginRight: theme.spacing(2),
		},
	},
	textBold: {
		fontWeight: 600,
	},
	fieldContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		'& > *': {
			marginRight: theme.spacing(1),
		},
		minWidth: 500,
	},
	leftMargin: {
		marginLeft: theme.spacing(2),
	},
	buttonContainer: {
		display: 'flex',
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	button: {
		width: 200,
		margin: theme.spacing(2),
	},
	skeleton: {
		width: 'calc(100% - 20px)',
	},
	skeletonCircle: {
		// width: 50,
		// height: 50,
	},
	avatar: {
		width: 50,
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
}))

// const USER_PAGE_FIELDS = {
// EMAIL: 'email',
// NAME: 'name',
// GIVEN_NAME: 'givenName',
// FAMILY_NAME: 'familyName',
// PHOTO: 'photo',
// PHONE: 'phone',
// ID: 'ID',
// ROLE: 'role',
// }

const USER_PAGE_FIELDS = {
	id: { name: 'Id', value: 'id' },
	email: { name: 'Email', value: 'email' },
	name: { name: 'Name', value: 'name' },
	givenName: { name: 'Primary Name', value: 'givenName' },
	familyName: { name: 'Family Name', value: 'familyName' },
	photo: { name: 'Photo', value: 'photo' },
	phone: { name: 'Phone', value: 'phone' },
	role: { name: 'Role', value: 'role' },
}

const UserContent = () => {
	const classes = useStyles()
	const location = window.location.pathname
	const userId = location.split('/')[location.split('/').length - 1]

	const dispatch = useDispatch()
	const history = useHistory()

	const userData = useSelector(userDataSelector)
	const isLoadingUserData = useSelector(isUserDataLoadingSelector)

	useEffect(() => {
		;(!userData || !Object.keys(userData).length) && dispatch(getUserDataAction(userId))
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const sendNewPassword = () => {
		dispatch(sendNewCredentialsAction({ userId, receiver: userData.email, name: userData.name }))
	}

	const toPage = (page) => () => history.push(page)

	return (
		<Box className={classes.root}>
			<Box className={classes.container} component={Paper}>
				<Box className={classes.rowContainer}>
					<Typography className={classes.titleText}>User</Typography>
					<Typography>{userId}</Typography>
				</Box>

				<Box className={classes.fieldsContainer}>
					{Object.values(USER_PAGE_FIELDS).map((field) => {
						if (field.name === USER_PAGE_FIELDS.photo.name) {
							return (
								<Box className={classes.fieldContainer}>
									<Typography className={classes.textBold}>{field.name}</Typography>
									{userData && userData[field.value] ? (
										<img className={classes.avatar} alt="user-avatar" src={userData[field.value]} />
									) : (
										<>
											{isLoadingUserData ? (
												<Box className={classes.skeletonCircle}>
													<Skeleton variant="circle" />
												</Box>
											) : (
												<Typography className={`${classes.textBold} ${classes.leftMargin}`}>
													none
												</Typography>
											)}
										</>
									)}
								</Box>
							)
						}

						return (
							<Box className={classes.fieldContainer}>
								<Typography className={classes.textBold}>{field.name}</Typography>
								{userData && userData[field.value] ? (
									<Typography>{userData[field.value]}</Typography>
								) : (
									<>
										{isLoadingUserData ? (
											<Box className={classes.skeleton}>
												<Skeleton variant="text" />
											</Box>
										) : (
											<Typography className={`${classes.textBold} ${classes.leftMargin}`}>
												none
											</Typography>
										)}
									</>
								)}
							</Box>
						)
					})}
				</Box>
				<Box className={classes.buttonContainer}>
					{
						<Button
							className={classes.button}
							variant="contained"
							color="secondary"
							onClick={sendNewPassword}
						>
							Send New Password
						</Button>
					}
					<Button
						className={classes.button}
						variant="contained"
						color="primary"
						onClick={toPage(`/users/edit/${userId}`)}
					>
						Edit
					</Button>
				</Box>
			</Box>
		</Box>
	)
}

const User = () => <BreadcrumbsContainer component={<UserContent />} />

export default User
