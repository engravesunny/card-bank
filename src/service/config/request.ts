import axios from "axios";
import { BaseURL, timeout } from './config'
import { token } from "../../store";
const request = axios.create({
    baseURL: BaseURL,
    timeout
})

const url_notAuth = ['/atm/user/register', '/atm/user/login']

request.interceptors.request.use(config => {
    if (!url_notAuth.includes(config.url as string)) {
        config.headers['Authorization'] = `Bearer ${token.value}`
    }
    return config
})
request.interceptors.response.use(config => {
    const { data: response } = config;
    const { code, data, message } = response;
    if (code === 0) {
        return data
    } else {
        throw new Error(message)
    }
})

export default request;
