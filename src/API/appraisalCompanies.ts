import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import { BaseAPI } from ".";
import { AppraisalCompanyType } from '../types/appraisalCompanies';

class AppraisalCompaniesAPI extends BaseAPI {
    axios: AxiosInstance

    constructor() {
        super()
        const jwt = Cookies.get("jwt")

        this.axios = axios.create({
            baseURL: axios.defaults.baseURL + "/appraisal-companies",
            headers: { ['Authorization']: "Bearer " + jwt }

        })
    }

    fetchAppraisalCompanies(insuranceCompanyId: number) {
        return this.axios.get<Array<AppraisalCompanyType>>("", {
            headers: {
                ['Authorization']: "Bearer " + this.getJWT()
            },
            params: {
                insuranceCompanyId
            }
        })
    }

    createAppraisalCompany(appraisalCompany: AppraisalCompanyType) {
        return this.axios.post<void>("", JSON.stringify(appraisalCompany), {
            headers: {
                ['Authorization']: "Bearer " + this.getJWT()
            }
        })
    }

    fetchAppraisalCompanyById(id: number) {
        return this.axios.get<AppraisalCompanyType>(`/${id}`, {
            headers: {
                ['Authorization']: "Bearer " + this.getJWT()
            }
        })
    }

    updateAppraisalCompany(id: number, appraisalCompany: AppraisalCompanyType) {
        return this.axios.post<void>(`/${id}`, JSON.stringify(appraisalCompany), {
            headers: {
                ['Authorization']: "Bearer " + this.getJWT()
            }
        })
    }

    deleteAppraisalCompany(id: number) {
        return this.axios.delete<void>(`/${id}`, {
            headers: {
                ['Authorization']: "Bearer " + this.getJWT()
            }
        })
    }
}

export const AppraisalCompaniesAPIInstance = new AppraisalCompaniesAPI()