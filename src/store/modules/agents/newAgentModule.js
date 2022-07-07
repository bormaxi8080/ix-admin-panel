import axios from "axios"
import { AgentsAPIInstance } from "../../../API/agents"

export const newAgentModule = {
    state() {
        return {
            newAgent: {
                email: "",
                address: "",
                phone: "",
                login_id: "",
                region_id: "",
                first_name: "",
                second_name: "",
                insurance_company_idss: [],
                employee_number: ""
            }
        }
    },
    mutations: {
        setEmail(state, email) {
            state.newAgent = {
                ...state.newAgent,
                email
            }
        },
        setAddress(state, address) {
            state.newAgent = {
                ...state.newAgent,
                address
            }
        },
        setLoginId(state, login_id) {
            state.newAgent = {
                ...state.newAgent,
                login_id
            }
        },
        setPhone(state, phone) {
            state.newAgent = {
                ...state.newAgent,
                phone
            }
        },
        setRegionId(state, region_id) {
            state.newAgent = {
                ...state.newAgent,
                region_id
            }
        },
        setFirstName(state, first_name) {
            state.newAgent = {
                ...state.newAgent,
                first_name
            }
        },
        setSecondName(state, second_name) {
            state.newAgent = {
                ...state.newAgent,
                second_name
            }
        },
        setInsuranceCompanyId(state, insurance_company_ids) {
            state.newAgent = {
                ...state.newAgent,
                insurance_company_ids
            }
        },
        setEmployeeNumber(state, employee_number) {
            state.newAgent = {
                ...state.newAgent,
                employee_number
            }
        },
    },
    actions: {
        async createAgent({ state, dispatch }) {
            const { first_name, second_name, employee_number, address, phone, email, insurance_company_ids, region_id, login_id } = state.newAgent
            await AgentsAPIInstance.createAgent({
                first_name: first_name,
                second_name: second_name,
                employee_number: employee_number,
                address: address,
                phone,
                email,
                insurance_company_ids: insurance_company_ids.map(company => company.id),
                region_id: region_id,
                login_id: login_id
            })
            alert("Created")
            dispatch("common/fetchAgents", {}, { root: true })
        }
    },
    namespaced: true
}