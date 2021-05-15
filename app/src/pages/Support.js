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
import { getSupportMessagesAction } from 'redux/actions/support-action'
import { getAllSupportMessagesSelector, isSupportMessagesLoadingSelector } from 'redux/selectors/support-selector'

const SUPPORT_TABLE_PAGE_FIELDS = {
	id: { name: 'Id', value: 'id' },
	email: { name: 'Email', value: 'email' },
	userId: { name: 'User ID', value: 'userId' },
	name: { name: 'Name', value: 'name' },
	question: { name: 'Question', value: 'question' },
	status: { name: 'Status', value: 'status' },
	answer: { name: 'Answer', value: 'answer' },
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

const SupportContent = () => {
	const supportMessages = useSelector(getAllSupportMessagesSelector)
	const isMessagesLoading = useSelector(isSupportMessagesLoadingSelector)

	const classes = useStyles()
	const history = useHistory()

	const dispatch = useDispatch()

	useEffect(() => {
		!supportMessages.length && getSupportMessages()
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const getSupportMessages = () => {
		dispatch(getSupportMessagesAction())
	}

	const toPage = (page) => () => history.push(page)

	return (
		<Box className={classes.root}>
			<TableContainer className={classes.container} component={Paper}>
				<Typography className={classes.titleText}>Support</Typography>

				<Table>
					<TableHead>
						<TableRow>
							{Object.values(SUPPORT_TABLE_PAGE_FIELDS).map(({ name, value }) => {
								return <TableCell>{name}</TableCell>
							})}
						</TableRow>
					</TableHead>
					<TableBody>
						{isMessagesLoading ? (
							<>
								{[0, 1, 2, 3, 4].map(() => (
									<TableRow>
										{Object.values(SUPPORT_TABLE_PAGE_FIELDS).map(() => (
											<TableCell>
												<Skeleton variant="text" />
											</TableCell>
										))}
									</TableRow>
								))}
							</>
						) : (
							<>
								{supportMessages &&
									Object.keys(supportMessages)?.map((id) => {
										const data = supportMessages[id]
										return (
											<TableRow>
												{Object.values(SUPPORT_TABLE_PAGE_FIELDS).map(({ value }) => (
													<TableCell>{data[value]}</TableCell>
												))}
												<TableCell>
													<Button
														variant="contained"
														color="secondary"
														onClick={toPage('/support/answer/' + id)}
													>
														Add an Answer
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

const Support = () => <BreadcrumbsContainer component={<SupportContent />} />

export default Support
