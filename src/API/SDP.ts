import Cookies from 'js-cookie';
import axios, { AxiosInstance } from 'axios';
import { BaseAPI } from ".";
import { SDPType } from '../types/SDP';

class SDPAPI extends BaseAPI {
    axios: AxiosInstance

    constructor() {
        super()
        const jwt = Cookies.get("jwt")

        this.axios = axios.create({
            baseURL: axios.defaults.baseURL + "/SDP",
            headers: { ['Authorization']: "Bearer " + jwt }
        })
    }

    createSDP(SDP: SDPType) {
        return this.axios.post<void>("", JSON.stringify(SDP), {
            headers: {
                ['Authorization']: "Bearer " + this.getJWT()
            }
        })
    }

    fetchSDP(insuranceCompanyId: number) {
        return this.axios.get<Array<SDPType>>("", {
            headers: {
                ['Authorization']: "Bearer " + this.getJWT()
            },
            params: {
                insuranceCompanyId
            }
        })
    }

    fetchSDPById(id: number) {
        return this.axios.get<SDPType>(`/${id}`, {
            headers: {
                ['Authorization']: "Bearer " + this.getJWT()
            }
        })
    }

    updateSDP(id: number, SDP: SDPType) {
        return this.axios.post<void>(`/${id}`, JSON.stringify(SDP), {
            headers: {
                ['Authorization']: "Bearer " + this.getJWT()
            }
        })
    }

    deleteSDP(id: number) {
        return this.axios.delete<void>(`/${id}`, {
            headers: {
                ['Authorization']: "Bearer " + this.getJWT()
            }
        })
    }
}

export const SDPAPIInstance = new SDPAPI()