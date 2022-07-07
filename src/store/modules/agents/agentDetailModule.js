import axios from "axios"
import { AgentsAPIInstance } from "../../../API/agents"

export const agentsDetailModule = {
    state() {
        return {
            agent: null,
            agentId: null
        }
    },
    mutations: {
        setAgent(state, agent) {
            state.agent = agent
        },
        setAgentId(state, agentId) {
            state.agentId = agentId
        },
        setEmail(state, email) {
            state.agent = {
                ...state.agent,
                email
            }
        },
        setAddress(state, address) {
            state.agent = {
                ...state.agent,
                address
            }
        },
        setPhone(state, phone) {
            state.agent = {
                ...state.agent,
                phone
            }
        },
        setInsuranceCompanyIds(state, insurance_companies) {
            state.agent = {
                ...state.agent,
                insurance_companies
            }
        },
        setFirstName(state, first_name) {
            state.agent = {
                ...state.agent,
                first_name
            }
        },
        setSecondName(state, second_name) {
            state.agent = {
                ...state.agent,
                second_name
            }
        },
        setEmployeeNumber(state, employee_number) {
            state.agent = {
                ...state.agent,
                employee_number
            }
        },
        setLoginId(state, login_id) {
            state.agent = {
                ...state.agent,
                login_id
            }
        },
        setRegionId(state, region_id) {
            state.agent = {
                ...state.agent,
                region_id
            }
        },
    },
    actions: {
        async fetchAgent({ state, commit }) {
            console.log(state)
            if (!state.agentId) {
                return
            }

            const { data: { agent } } = await AgentsAPIInstance.fetchAgentById(state.agentId)
            commit("setAgent", agent)
        },
        async updateAgent({ state, commit, dispatch }) {
            await AgentsAPIInstance.updateAgent(state.agentId, {
                ...state.agent, insurance_companies: state.agent.insurance_companies.map(company => company.id),
            })
            alert("Updated")
            dispatch("common/fetchAgents", {}, { root: true })
        },
        async deleteAgent({ state, commit, dispatch }) {
            await AgentsAPIInstance.deleteAgent(state.agentId)
            alert("Deleted")
            dispatch("common/fetchAgents", {}, { root: true })
        }
    },
    namespaced: true
}