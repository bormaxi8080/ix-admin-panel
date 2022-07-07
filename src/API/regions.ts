import Cookies from 'js-cookie';
import axios, { AxiosInstance } from 'axios';
import { BaseAPI } from ".";
import { RegionType } from '../types/regions';

class RegionsAPI extends BaseAPI {
    axios: AxiosInstance

    constructor() {
        super()        
        const jwt = Cookies.get("jwt")

        this.axios = axios.create({
            baseURL: axios.defaults.baseURL + "/regions",
            headers: { ['Authorization']: "Bearer " + jwt }

        })
    }

    fetchRegions() {
        return this.axios.get<RegionType>("", {
            headers: {
                ['Authorization']: "Bearer " + this.getJWT()
            }
        })
    }
}

export const RegionsAPIInstance = new RegionsAPI()