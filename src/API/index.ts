import axios from "axios"
import Cookies from "js-cookie"

export class BaseAPI {
    constructor() {
        if (!axios.defaults.baseURL) {
            //axios.defaults.baseURL = "http://92.255.108.184:68"
            axios.defaults.baseURL = "http://44.200.246.161:68"
            //axios.defaults.baseURL = "http://localhost:68"
        }
        if (axios.defaults.headers.post["Content-Type"] != "application/json") {
            axios.defaults.headers.post["Content-Type"] = 'application/json';
        }

        const jwt = Cookies.get("jwt")

        if (!axios.defaults.headers.common['Authorization'] && jwt) {
            axios.defaults.headers.common['Authorization'] = "Bearer " + jwt
        }
    }

    setAuthorizationHeader(jwt: string) {
        console.log(jwt)
        axios.defaults.headers.common['Authorization'] = "Bearer " + jwt
        console.log(axios.defaults.headers.common['Authorization'])
    }

    deleteAuthorizationHeader() {
        delete axios.defaults.headers.common['Authorization']
    }

    getJWT(): string | null {
        if (!Cookies.get("jwt")) return null
        return `${Cookies.get("jwt")}`
    }
}