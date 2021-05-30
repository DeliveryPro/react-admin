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
import { getAllPackagesAction } from 'redux/actions/packages-action'
import { getAllPackagesSelector, isPackagesLoadingSelector } from 'redux/selectors/packages-selector'


const USERS_TABLE_PAGE_FIELDS = {
	id: { name: 'Id', value: 'id' },
	senderId: { name: 'Sender UID', value: 'sender_uid' },
	receiverId: { name: 'Receiver UID', value: 'receiver_uid' },
	date: { name: 'Date Creation', value: 'date' },
	addressFrom: { name: 'Address From', value: 'address_from' },
	addressTo: { name: 'Address To', value: 'address_to' },
	status: { name: 'Status', value: 'status' },
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

const PackagesContent = () => {
	const packages = useSelector(getAllPackagesSelector)
	const isPackagesLoading = useSelector(isPackagesLoadingSelector)

	const history = useHistory()

	const classes = useStyles()

	const dispatch = useDispatch()

	useEffect(() => {
		!packages.length && getPackages()
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const getPackages = () => {
		dispatch(getAllPackagesAction())
	}

	const toPage = (page) => () => history.push(page)

	return (
		<Box className={classes.root}>
			<TableContainer className={classes.container} component={Paper}>
				<Box className={classes.titleContainer}>
					<Typography className={classes.titleText}>Packages</Typography>
				</Box>

				<Table>
					<TableHead>
						<TableRow>
							{Object.values(USERS_TABLE_PAGE_FIELDS).map(({ name, value }, index) => (
								<TableCell key={value + name + index}>{name}</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{isPackagesLoading ? (
							<>
								{[0, 1, 2, 3, 4].map(() => (
									<TableRow>
										{Object.values(USERS_TABLE_PAGE_FIELDS).map((_, index) => (
											<TableCell key={'skeleton' + index}>
												<Skeleton variant="text" />
											</TableCell>
										))}
									</TableRow>
								))}
							</>
						) : (
							<>
								{packages &&
									Object.keys(packages)?.map((id) => {
										const data = packages[id]
										return (
											<TableRow key={'row' + id}>
												<TableCell key={'packageId' + id}>{id}</TableCell>
												{Object.values(USERS_TABLE_PAGE_FIELDS).map(({ value }) => {
													if (value === 'id') return null
													if (value === 'address_from' || value === 'address_to')
														return (
															<TableCell key={value+id} >
																{data[value].details.vicinity}
															</TableCell>
														)
													return (
														<TableCell key={data[value] + id}>
															{data[value]}
														</TableCell>
													)
												})}
												<TableCell>
													<Button
														variant="contained"
														color="primary"
														onClick={toPage(`/packages/${id}`)}
													>
														View
													</Button>
												</TableCell>
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

const Packages = () => <BreadcrumbsContainer component={<PackagesContent />} />

export default Packages
