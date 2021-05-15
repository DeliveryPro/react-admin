import { PATCH, POST, DELETE, GET } from 'api/auth/axiosAuth.config'

export const loginFunction = (name, data) => POST(`/logo/users/${name}/auth`, data)

export const registerFunction = (data) => POST(`/logo/users`, data)

export const updateProfileFunction = (name, data) => PATCH(`/logo/users/${name}`, data)

export const removeProfileFunction = (name, data) => DELETE(`/logo/users/${name}`, data)

export const getUserByIdFunction = (id) => GET(`/logo/users/uid/${id}`)
