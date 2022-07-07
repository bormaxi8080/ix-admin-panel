import axios from "axios"
import { AgentsAPIInstance } from "../../../API/agents"

export const agentsAllModule = {
    state() {
        return {
            agents: []
        }
    },
    mutations: {
        setAgents(state, agents) {
            state.agents = agents
        }
    },
    actions: {
        async fetchAgents({ commit, rootState }) {
            const user = rootState.account.user

            const { data: { agents } } = await AgentsAPIInstance.fetchAgents(user.role === "superadmin" ? null : user.insurance_company_id)
            console.log(agents)
            commit("setAgents", agents.map((agent) => ({
                ...agent,
                insurance_companies: agent.insurance_companies.map(insuranceCompany => insuranceCompany.title).join(", "),
                region: agent.region.region_name
            })))
        }
    },
    namespaced: true
}