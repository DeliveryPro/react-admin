import { POST } from './axios-config'

export const mailSender = (data) => POST('/mailer', data)

export const passwordRestore = data => POST('/passwordRestoration', data)

export const addAnswer = data => POST('/addAnswer', data)

export const registerUser = data => POST(`/registerUser`, data)