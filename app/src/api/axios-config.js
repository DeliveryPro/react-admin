import axios from 'axios'
import { clearAuth } from 'utils/localStorageHandler.js'
import logger from '/utils/logger.js'

const authApiUrl = process.env.REACT_APP_AUTH_API_URL

const config = {
	baseURL: authApiUrl,
}

const axiosInstance = axios.create(config)

axiosInstance.interceptors.request.use((req) => {
	logger('axiosInstance', req)
	return req
})

export const getRequestWithFilters = (filters) =>
	Object.keys(filters).reduce((prev, key) => {
		if (typeof filters[key] !== 'undefined') {
			if (typeof filters[key] === 'number') {
				prev += `${key}=${filters[key]}&`
				return prev
			}
			if (filters[key].length > 0) {
				prev += `${key}=${filters[key]}&`
			}
		}
		return prev
	}, '')

export const GET = async (link, filters = {}) => {
	try {
		console.log('filters', getRequestWithFilters(filters))
		const res = await axiosInstance.get(`${link}?${getRequestWithFilters(filters)}`)
		if (res?.status === 200) {
			return res.data
		}
	} catch (error) {
		logger(`error in GET  link = ${link}, ${error}`)

		throw error.response.data?.message || error
	}
}

export const POST = async (link, data = {}) => {
	try {
		const res = await axiosInstance.post(link, data)

		if (res?.status === 200) {
			return res.data
		}
	} catch (error) {
		logger(`error in POST link = ${link}`, error)
		throw error.response.data?.message || error
	}
}

export const PATCH = async (link, data = {}) => {
	try {
		const res = await axiosInstance.patch(link, data)

		if (res?.status === 200) {
			return res.data
		}
	} catch (error) {
		logger(`error in PATCH link = ${link}`, error)
		throw error.response.data?.message || error
	}
}

export const DELETE = async (link, data = {}) => {
	try {
		const res = await axiosInstance.delete(link, { data })

		if (res?.status === 204) {
			clearAuth()
			window.location.reload()
			return res.data
		}
	} catch (error) {
		logger(`error in DELETE link = ${link}`, error)
		throw error.response.data?.message || error
	}
}
