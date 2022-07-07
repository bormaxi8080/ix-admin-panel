import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import { BaseAPI } from ".";

class AccountAPI extends BaseAPI {
    axios: AxiosInstance

    constructor() {
        super()
        const jwt = Cookies.get("jwt")
        this.axios = axios.create({
            baseURL: axios.defaults.baseURL + "/account",
            headers: { ['Authorization']: "Bearer " + jwt }
        })
    }

    async login(userData: any) {
        const { data: { token, user } } = await this.axios.post<{ token: string, user: any }>("/login", JSON.stringify(userData))
        this.setAuthorizationHeader(token)
        Cookies.set("jwt", token, { path: "/", expires: 30 })
        return user
    }

    fetchUser() {
        return this.axios.get("/get-user", {
            headers: {
                ['Authorization']: "Bearer " + this.getJWT()
            }
        })
    }
}

export const AccountAPIInstance = new AccountAPI()