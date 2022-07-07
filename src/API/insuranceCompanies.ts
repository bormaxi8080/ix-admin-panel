import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import { BaseAPI } from ".";
import { InsuranceCompanyType } from '../types/insuranceCompanies';

class InsuranceCompaniesAPI extends BaseAPI {
    axios: AxiosInstance

    constructor() {
        super()        
        const jwt = Cookies.get("jwt")

        this.axios = axios.create({
            baseURL: axios.defaults.baseURL + "/insurance-companies",
            headers: { ['Authorization']: "Bearer " + jwt }

        })
    }

    createInsuranceCompany(insuranceCompany: InsuranceCompanyType) {
        return this.axios.post<void>("", JSON.stringify(insuranceCompany), {
            headers: {
                ['Authorization']: "Bearer " + this.getJWT(),
            }
        })
    }

    fetchInsuranceCompanies() {
        return this.axios.get<Array<InsuranceCompanyType>>("", {
            headers: {
                ['Authorization']: "Bearer " + this.getJWT()
            }
        })
    }

    fetchInsuranceCompanyById(id: number) {
        return this.axios.get<InsuranceCompanyType>(`/${id}`, {
            headers: {
                ['Authorization']: "Bearer " + this.getJWT()
            }
        })
    }

    updateInsuranceCompany(id: number, insuranceCompany: InsuranceCompanyType) {
        return this.axios.post<void>(`/${id}`, JSON.stringify(insuranceCompany), {
            headers: {
                ['Authorization']: "Bearer " + this.getJWT()
            }
        })
    }

    deleteInsuranceCompany(id: number) {
        return this.axios.delete<void>(`/${id}`, {
            headers: {
                ['Authorization']: "Bearer " + this.getJWT()
            }
        })
    }
}

export const InsuranceCompaniesAPIInstance = new InsuranceCompaniesAPI()