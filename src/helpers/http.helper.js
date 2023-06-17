import axios from "axios"

const http = (token,) => {
    const headers = {}
    if(token){
        headers.Authorization = `Bearer ${token}`
    }
    const instance = axios.create({
        headers,
        baseURL: 'http://localhost:8888'
    })
    instance.interceptors.response.use((response)=> {
        return response
    }, (err)=> {
        return Promise.reject(err)
    })
    return instance
}

export default http