import axios from "axios";
import { BaseURL, timeout } from './config'
import { ElMessage } from 'element-plus'
const request = axios.create({
    baseURL: BaseURL,
    timeout
})
request.interceptors.request.use(config => {
    return config
})
request.interceptors.response.use(config => {
    const { data: response } = config;
    const { code, data, message } = response;
    if (code === 0) {
        return data
    } else {
        ElMessage.error(message)
        Promise.reject(message)
    }
    return config
})
