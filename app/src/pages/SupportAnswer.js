import { Box, Button, makeStyles, Paper, TextField, Typography } from '@material-ui/core'
import BreadcrumbsContainer from 'components/BreadcrumbsContainer'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSupportMessageSelector, isOneSupportMessagesLoadingSelector } from 'redux/selectors/support-selector'
import { getOneSupportMessageAction, updateAnswerAction } from 'redux/actions/support-action'
import Skeleton from '@material-ui/lab/Skeleton'

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	container: {
		margin: theme.spacing(1),
		padding: theme.spacing(1),
		minWidth: '40vw',
	},
	textTitle: {
		fontSize: 30,
		fontWeight: 600,
	},
	boldText: {
		fontWeight: 600,
		marginRight: 20,
	},
	textContainer: {
		display: 'flex',
		marginBottom: theme.spacing(1),
		width: '100%',
	},
	dataContainer: {
		display: 'flex',
		flexDirection: 'column',
		padding: theme.spacing(1),
	},
	skeleton: {
		width: '100%',
	},
	submitButton: {
		marginTop: theme.spacing(1),
		minWidth: 200,
		alignSelf: 'flex-end',
	},
}))

const SupportAnswerContent = () => {
	const [answer, setAnswer] = useState('')
	const location = window.location.pathname
	const questionId = location.split('/')[location.split('/').length - 1]

	const classes = useStyles()

	const dispatch = useDispatch()
	const questionData = useSelector(getSupportMessageSelector)
	const isQuestionLoading = useSelector(isOneSupportMessagesLoadingSelector)

	useEffect(() => {
		if (questionData?.id !== questionId) {
			dispatch(getOneSupportMessageAction(questionId))
		}
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [questionId])

	const onChange = ({ target: { value } }) => {
		setAnswer(value)
	}
	const onSubmitAnswer = () => {
		dispatch(updateAnswerAction(questionId, { ...questionData, answer, status: 'answered' }))
	}

	return (
		<Box className={classes.root}>
			<Box className={classes.container} component={Paper}>
				<Box className={classes.dataContainer}>
					<Typography className={classes.textTitle}>Support Question Answer</Typography>
				</Box>
				<Box className={classes.dataContainer}>
					<Box className={classes.textContainer}>
						<Typography className={classes.boldText}>User:</Typography>
						{isQuestionLoading ? (
							<Skeleton className={classes.skeleton} variant="text" />
						) : (
							<Typography> {questionData?.name}</Typography>
						)}
					</Box>
					<Box className={classes.textContainer}>
						<Typography className={classes.boldText}>Email:</Typography>
						{isQuestionLoading ? (
							<Skeleton className={classes.skeleton} variant="text" />
						) : (
							<Typography> {questionData?.email}</Typography>
						)}
					</Box>
					<Box className={classes.textContainer}>
						<Typography className={classes.boldText}>Question status:</Typography>
						{isQuestionLoading ? (
							<Skeleton className={classes.skeleton} variant="text" />
						) : (
							<Typography> {questionData?.status}</Typography>
						)}
					</Box>
					<Box className={classes.textContainer}>
						<Typography className={classes.boldText}>Question:</Typography>
						{isQuestionLoading ? (
							<Skeleton className={classes.skeleton} variant="text" />
						) : (
							<Typography> "{questionData?.question}"</Typography>
						)}
					</Box>
					{questionData?.answer && (
						<Box className={classes.textContainer}>
							<Typography className={classes.boldText}>Answer:</Typography>
							{isQuestionLoading ? (
								<Skeleton className={classes.skeleton} variant="text" />
							) : (
								<Typography> "{questionData?.answer}"</Typography>
							)}
						</Box>
					)}
				</Box>
				{!questionData?.answer && (
					<Box className={classes.dataContainer}>
						<TextField multiline type="text" variant="outlined" label="Answer" onChange={onChange} />
						<Button
							className={classes.submitButton}
							variant="contained"
							color={answer ? 'primary' : 'background'}
							onClick={answer ? onSubmitAnswer : null}
						>
							Submit
						</Button>
					</Box>
				)}
			</Box>
		</Box>
	)
}

const SupportAnswer = () => <BreadcrumbsContainer component={<SupportAnswerContent />} />

export default SupportAnswer
