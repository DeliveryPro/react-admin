import { POST } from './axios-config'

export const mailSender = (data) => POST('/mailer', data)
