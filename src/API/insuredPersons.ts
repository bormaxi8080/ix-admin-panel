import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import { BaseAPI } from ".";
import { InsuredPersonType } from '../types/insuredPersons';

class InsuredPersonsAPI extends BaseAPI {
    axios: AxiosInstance

    constructor() {
        super()        
        const jwt = Cookies.get("jwt")

        this.axios = axios.create({
            baseURL: axios.defaults.baseURL + "/insured-persons",
            headers: { ['Authorization']: "Bearer " + jwt }

        })
    }

    createInsuredPerson(insuredPerson: InsuredPersonType) {
        return this.axios.post<void>("", JSON.stringify(insuredPerson), {
            headers: {
                ['Authorization']: "Bearer " + this.getJWT()
            }
        })
    }

    fetchInsuredPersons(insuranceCompanyId: number) {
        return this.axios.get<Array<InsuredPersonType>>("", {
            headers: {
                ['Authorization']: "Bearer " + this.getJWT()
            },
            params: {
                insuranceCompanyId
            }
        })
    }

    fetchInsuredPersonById(id: number) {
        return this.axios.get<InsuredPersonType>(`/${id}`, {
            headers: {
                ['Authorization']: "Bearer " + this.getJWT()
            }
        })
    }

    updateInsuredPerson(id: number, insuredPerson: InsuredPersonType) {
        return this.axios.post<void>(`/${id}`, JSON.stringify(insuredPerson), {
            headers: {
                ['Authorization']: "Bearer " + this.getJWT()
            }
        })
    }

    deleteInsuredPerson(id: number) {
        return this.axios.delete<void>(`/${id}`, {
            headers: {
                ['Authorization']: "Bearer " + this.getJWT()
            }
        })
    }
}

export const InsuredPersonsAPIInstance = new InsuredPersonsAPI()