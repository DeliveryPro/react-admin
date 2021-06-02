import { Box, Button, makeStyles, Modal } from '@material-ui/core'
import BreadcrumbsContainer from 'components/BreadcrumbsContainer'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCouriersAction } from 'redux/actions/map-action'
import { getAllCourierPositionsSelector } from 'redux/selectors/map-selcetor'
import GoogleMapReact from 'google-map-react'
import CarIcon from 'assets/car'

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		width: '80vw',
		height: '100wh',
		margin: theme.spacing(1),
	},
	modal: {
		display: 'flex',
		padding: theme.spacing(1),
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	modalItem: {
		display: 'flex',
		alignItems: 'center',
	},
	buttonContainer: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
}))

const MapContent = () => {
	const classes = useStyles()
	const [modalIsOpen, setIsOpen] = useState(false)
	const [modalData, setModalData] = useState({})
	const toggleModal = () => {
		setIsOpen(!modalIsOpen)
	}

	const couriers = useSelector(getAllCourierPositionsSelector)

	const dispatch = useDispatch()

	useEffect(() => {
		if (!Object.keys(couriers).length) dispatch(getAllCouriersAction())
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const showData = (data) => () => {
		setModalData(data)
		toggleModal()
	}

	console.log(`modalData, modalIsOpen`, modalData, modalIsOpen)

	return (
		<Box className={classes.root}>
			{!!Object.keys(modalData).length && (
				<Modal
					open={modalIsOpen}
					onClose={toggleModal}
					disablePortal
					disableEnforceFocus
					disableAutoFocus
					className={classes.modal}
				>
					<div className={classes.paper}>
						<h2>Courier Info</h2>
						{Object.keys(modalData).map((key) => {
							if (key === 'password' || key === 'photo') return null
							return (
								<div className={classes.modalItem}>
									<h3>{key}</h3>: {modalData[key]}
								</div>
							)
						})}
						<div className={classes.buttonContainer}>
							<Button onClick={toggleModal} variant="contained" color="secondary">
								Close
							</Button>
						</div>
					</div>
				</Modal>
			)}
			<div style={{ width: '100vw', height: '80vh' }}>
				<GoogleMapReact
					bootstrapURLKeys={{ key: 'AIzaSyDqDolekINYGDtmYwTBXgKTI7PkN_LfrQc' }}
					defaultZoom={12}
					defaultCenter={{ lat: 50, lng: 36.22 }}
				>
					{Object.values(couriers).length &&
						Object.values(couriers)?.map(({ coords: { latitude, longitude } = {}, ...data }) => {
							return (
								<div
									lat={latitude}
									lng={longitude}
									text="my marker"
									style={{ cursor: 'pointer' }}
									onClick={showData(data)}
								>
									<CarIcon />
								</div>
							)
						})}
				</GoogleMapReact>
			</div>
		</Box>
	)
}

const MapComponent = () => <BreadcrumbsContainer component={<MapContent />} />

export default MapComponent
