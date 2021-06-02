import app from './firebase-middleware'

class MapApi {
	constructor(firebase) {
		this.firebase = firebase
	}

	getAllCouriers = () =>
		this.firebase
			.database()
			.ref('couriers')
			.get()
			.then((data) => data.val())

	getCourierData = (userId) =>
		this.firebase
			.database()
			.ref('users')
			.child(userId)
			.once('value')
			.then((data) => ({ id: userId, ...data.val() }))

	getCourierPosition = (userId, cb) =>
		this.firebase
			.database()
			.ref(`couriers/${userId}`)
			.on('value', (data) => cb({ id: userId, data: data.val() }))
}

export default new MapApi(app)
