import axios from "axios"
import { InsuredPersonsAPIInstance } from "../../../API/insuredPersons"

export const newInsuredPersonModule = {
    state() {
        return {
            newInsuredPerson: {
                email: "",
                address: "",
                phone: "",
                login_id: "",
                region_id: "",
                passport_id: "",
                first_name: "",
                second_name: "",
                insurance_company_id: "",
                agent_id: ""
            }
        }
    },
    mutations: {
        setEmail(state, email) {
            state.newInsuredPerson = {
                ...state.newInsuredPerson,
                email
            }
        },
        setAddress(state, address) {
            state.newInsuredPerson = {
                ...state.newInsuredPerson,
                address
            }
        },
        setLoginId(state, login_id) {
            state.newInsuredPerson = {
                ...state.newInsuredPerson,
                login_id
            }
        },
        setPhone(state, phone) {
            state.newInsuredPerson = {
                ...state.newInsuredPerson,
                phone
            }
        },
        setRegionId(state, region_id) {
            state.newInsuredPerson = {
                ...state.newInsuredPerson,
                region_id
            }
        },
        setPassportId(state, passport_id) {
            state.newInsuredPerson = {
                ...state.newInsuredPerson,
                passport_id
            }
        },
        setFirstName(state, first_name) {
            state.newInsuredPerson = {
                ...state.newInsuredPerson,
                first_name
            }
        },
        setSecondName(state, second_name) {
            state.newInsuredPerson = {
                ...state.newInsuredPerson,
                second_name
            }
        },
        setInsuranceCompanyId(state, insurance_company_id) {
            state.newInsuredPerson = {
                ...state.newInsuredPerson,
                insurance_company_id
            }
        },
        setAgentId(state, agent_id) {
            state.newInsuredPerson = {
                ...state.newInsuredPerson,
                agent_id
            }
        },
    },
    actions: {
        async createInsuredPerson({ state, dispatch }) {
            console.log(11)
            const data = await InsuredPersonsAPIInstance.createInsuredPerson(state.newInsuredPerson)
            console.log(data)
            alert("Created")
            dispatch("common/fetchInsuredPersons", {}, { root: true })
        }
    },
    namespaced: true
}