export const setAuth = ({ user }) => {
	localStorage.setItem('user', JSON.stringify(user))
}
export const clearAuth = () => {
	localStorage.removeItem('user')
}

export const getAuth = () => {
	const userString = localStorage.getItem('user')
	return userString ? JSON.parse(userString) : null
}
