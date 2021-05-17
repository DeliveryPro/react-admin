import {
	Box,
	makeStyles,
	Table,
	TableBody,
	TableCell,
	TableRow,
	TableHead,
	Typography,
	TableContainer,
	Paper,
	Button,
} from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'

import BreadcrumbsContainer from 'components/BreadcrumbsContainer'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { getAllUsersAction } from 'redux/actions/user-action'
import { getAllUsersSelector, isUsersLoadingSelector } from 'redux/selectors/user-selector'

const USERS_TABLE_PAGE_FIELDS = {
	id: { name: 'Id', value: 'id' },
	email: { name: 'Email', value: 'email' },
	role: { name: 'Role', value: 'role' },
	name: { name: 'Name', value: 'givenName' },
	familyName: { name: 'Family Name', value: 'familyName' },
	photo: { name: 'Photo', value: 'photo' },
}

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
	userImage: {
		width: 40,
	},
	titleContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
}))

const UsersContent = () => {
	const users = useSelector(getAllUsersSelector)
	const isUsersLoading = useSelector(isUsersLoadingSelector)

	const history = useHistory()

	const classes = useStyles()

	const dispatch = useDispatch()

	useEffect(() => {
		!users.length && getUsers()
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const getUsers = () => {
		dispatch(getAllUsersAction())
	}

	const toPage = (page) => () => history.push(page)

	console.log(`users`, users)

	return (
		<Box className={classes.root}>
			<TableContainer className={classes.container} component={Paper}>
				<Box className={classes.titleContainer}>
					<Typography className={classes.titleText}>Users</Typography>
					<Button variant="contained" color="primary" onClick={toPage('/users/new')}>
						Add a new user
					</Button>
				</Box>

				<Table>
					<TableHead>
						<TableRow>
							{Object.values(USERS_TABLE_PAGE_FIELDS).map(({ name, value }) => (
								<TableCell>{name}</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{isUsersLoading ? (
							<>
								{[0, 1, 2, 3, 4].map(() => (
									<TableRow>
										{Object.values(USERS_TABLE_PAGE_FIELDS).map(() => (
											<TableCell>
												<Skeleton variant="text" />
											</TableCell>
										))}
									</TableRow>
								))}
							</>
						) : (
							<>
								{users &&
									Object.keys(users)?.map((id) => {
										const data = users[id]
										console.log(`data`, data)
										return (
											<TableRow>
												<TableCell>{id}</TableCell>
												{Object.values(USERS_TABLE_PAGE_FIELDS).map(({ value }) => {
													if (value === 'id') return null
													if (value === 'photo') {
														return (
															<TableCell>
																{data[value] ? (
																	<img
																		alt={'user' + id}
																		className={classes.userImage}
																		src={data[value]}
																	/>
																) : (
																	'none'
																)}
															</TableCell>
														)
													}
													return <TableCell>{users[id][value]}</TableCell>
												})}
											</TableRow>
										)
									})}
							</>
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	)
}

const Users = () => <BreadcrumbsContainer component={<UsersContent />} />

export default Users
