import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import { BaseAPI } from ".";
import { InsuredEventType } from '../types/insuredEvents';

class InsuredEventsAPI extends BaseAPI {
    axios: AxiosInstance

    constructor() {
        super()
        const jwt = Cookies.get("jwt")

        this.axios = axios.create({
            baseURL: axios.defaults.baseURL + "/insured-events",
            headers: { ['Authorization']: "Bearer " + jwt }

        })
    }

    createInsuredEvent(insuredEvent: InsuredEventType) {
        console.log(insuredEvent)
        return this.axios.post<void>("", insuredEvent, {
            headers: {
                ['Authorization']: "Bearer " + this.getJWT(),
                "Content-Type": "multipart/form-data"
            }
        })
    }

    fetchInsuredEvents(insuranceCompanyId: number) {
        return this.axios.get<Array<InsuredEventType>>("", {
            headers: {
                ['Authorization']: "Bearer " + this.getJWT()
            },
            params: {
                insuranceCompanyId
            }
        })
    }

    fetchInsuredEventById(id: number) {
        return this.axios.get<InsuredEventType>(`/${id}`, {
            headers: {
                ['Authorization']: "Bearer " + this.getJWT(),
                "Content-Type": "multipart/form-data"
            }
        })
    }

    updateInsuredEvent(id: number, insuredEvent: InsuredEventType) {
        return this.axios.post<void>(`/${id}`, insuredEvent, {
            headers: {
                ['Authorization']: "Bearer " + this.getJWT()
            }
        })
    }

    deleteInsuredEvent(id: number) {
        return this.axios.delete<void>(`/${id}`, {
            headers: {
                ['Authorization']: "Bearer " + this.getJWT()
            }
        })
    }
}

export const InsuredEventsAPIInstance = new InsuredEventsAPI()