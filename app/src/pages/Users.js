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
} from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'

import BreadcrumbsContainer from 'components/BreadcrumbsContainer'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsersAction } from 'redux/actions/user-action'
import { getAllUsersSelector, isUsersLoadingSelector } from 'redux/selectors/user-selector'

const USERS_TABLE_PAGE_FIELDS = {
	id: { name: 'Id', value: 'id' },
	email: { name: 'Email', value: 'email' },
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
}))

const UsersContent = () => {
	const users = useSelector(getAllUsersSelector)
	const isUsersLoading = useSelector(isUsersLoadingSelector)

	const classes = useStyles()

	const dispatch = useDispatch()

	useEffect(() => {
		!users.length && getUsers()
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const getUsers = () => {
		dispatch(getAllUsersAction())
	}

	return (
		<Box className={classes.root}>
			<TableContainer className={classes.container} component={Paper}>
				<Typography className={classes.titleText}>Users</Typography>

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
										return (
											<TableRow>
												{Object.values(USERS_TABLE_PAGE_FIELDS).map(({ value }) => {
													if (value === 'photo') {
														return (
															<TableCell>
																<img
																	alt={'user' + id}
																	className={classes.userImage}
																	src={data[value]}
																/>
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
