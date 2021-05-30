import app from './firebase-middleware'

class PackagesApi {
	constructor(firebase) {
		this.firebase = firebase
	}

	getPackages = () =>
		this.firebase
			.database()
			.ref(`delivery`)
			.once('value')
			.then((snapshot) => snapshot.val())

	getPackage = (packageId) =>
		this.firebase
			.database()
			.ref(`delivery/${packageId}`)
			.once('value')
			.then((snapshot) => snapshot.val())

	updatePackage = (packageId, data) => this.firebase.database().ref(`delivery`).child(packageId).update(data)
}

export default new PackagesApi(app)
