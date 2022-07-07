import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import { BaseAPI } from ".";
import { AgentType } from '../types/agents';

class AgentsAPI extends BaseAPI {
    axios: AxiosInstance

    constructor() {
        super()
        this.axios = axios.create({
            baseURL: axios.defaults.baseURL + "/agents",
        })
    }

    createAgent(agent: AgentType) {
        console.log(agent)
        return this.axios.post<void>("", JSON.stringify(agent), {
            headers: {
                ['Authorization']: "Bearer " + this.getJWT()
            }
        })
    }

    fetchAgents(insuranceCompanyId: number) {
        const jwt = Cookies.get("jwt")
        return this.axios.get<Array<AgentType>>("", {
            headers: {
                ['Authorization']: "Bearer " + this.getJWT()
            },
            params: {
                insuranceCompanyId
            }
        })
    }

    fetchAgentById(id: number) {
        return this.axios.get<AgentType>(`/${id}`, {
            headers: {
                ['Authorization']: "Bearer " + this.getJWT()
            }
        })
    }

    updateAgent(id: number, agent: AgentType) {
        return this.axios.post<void>(`/${id}`, JSON.stringify(agent), {
            headers: {
                ['Authorization']: "Bearer " + this.getJWT()
            }
        })
    }

    deleteAgent(id: number) {
        return this.axios.delete<void>(`/${id}`, {
            headers: {
                ['Authorization']: "Bearer " + this.getJWT()
            }
        })
    }
}

export const AgentsAPIInstance = new AgentsAPI()