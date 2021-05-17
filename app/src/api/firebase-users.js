import app from './firebase-middleware'

class UsersApi {
	constructor(firebase) {
		this.firebase = firebase
	}

	getUsers = () =>
		this.firebase
			.database()
			.ref(`users`)
			.once('value')
			.then((snapshot) => snapshot.val())

	addNew = (data) => this.firebase.database().ref(`users`).push({ ...data })
	// .then((snapshot) => snapshot.val())
}

export default new UsersApi(app)
