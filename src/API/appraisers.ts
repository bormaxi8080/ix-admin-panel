import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import { BaseAPI } from ".";
import { AppraiserType } from '../types/appraisers';

class AppraisersAPI extends BaseAPI {
    axios: AxiosInstance

    constructor() {
        super()        
        const jwt = Cookies.get("jwt")

        this.axios = axios.create({
            baseURL: axios.defaults.baseURL + "/appraisers",
            headers: { ['Authorization']: "Bearer " + jwt }

        })
    }

    fetchAppraisers(insuranceCompanyId: number) {
        return this.axios.get<Array<AppraiserType>>("", {
            headers: {
                ['Authorization']: "Bearer " + this.getJWT()
            },
            params: {
                insuranceCompanyId
            }
        })
    }

    createAppraiser(appraiser: AppraiserType) {
        return this.axios.post<void>("", JSON.stringify(appraiser), {
            headers: {
                ['Authorization']: "Bearer " + this.getJWT()
            }
        })
    }

    fetchAppraiserById(id: number) {
        return this.axios.get<AppraiserType>(`/${id}`, {
            headers: {
                ['Authorization']: "Bearer " + this.getJWT()
            }
        })
    }

    updateAppraiser(id: number, appraiser: AppraiserType) {
        return this.axios.post<void>(`/${id}`, JSON.stringify(appraiser), {
            headers: {
                ['Authorization']: "Bearer " + this.getJWT()
            }
        })
    }

    deleteAppraiser(id: number) {
        return this.axios.delete<void>(`/${id}`, {
            headers: {
                ['Authorization']: "Bearer " + this.getJWT()
            }
        })
    }
}

export const AppraisersAPIInstance = new AppraisersAPI()