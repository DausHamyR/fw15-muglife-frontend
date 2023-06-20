import axios from "axios"

const http = (token) => {
    const headers = {}
    if(token){
        headers.Authorization = `Bearer ${token}`
    }
    const instance = axios.create({
        headers,
        baseURL: process.env.NEXT_PUBLIC_BACKEND_URL
    })
    instance.interceptors.response.use((response)=> {
        return response
    }, (err)=> {
        return Promise.reject(err)
    })
    return instance
}

export default http