import { Box, makeStyles } from '@material-ui/core'
import BreadcrumbsContainer from 'components/BreadcrumbsContainer'
import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		width: '80vw',
		margin: theme.spacing(1),
	},
}))

const MapContent = () => {
	const classes = useStyles()
	return (
		<Box className={classes.root}>
			<MyMapComponent
				isMarkerShown
				googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: 800, width:1800 }} />}
				mapElement={<div style={{ height: `100%` }} />}
			/>
		</Box>
	)
}

const MyMapComponent = withScriptjs(
	withGoogleMap((props) => (
		<GoogleMap defaultZoom={8} defaultCenter={{ lat: 50.024, lng: 36.22 }}>
			{props.isMarkerShown && <Marker position={{ lat: 50.024, lng: 36.22}} />}
		</GoogleMap>
	)),
)

const MapComponent = () => <BreadcrumbsContainer component={<MapContent />} />

export default MapComponent
