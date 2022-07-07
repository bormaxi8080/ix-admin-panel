import axios from "axios"
import { InsuredPersonsAPIInstance } from "../../../API/insuredPersons"

export const insuredPersonDetailModule = {
    state() {
        return {
            insuredPerson: null,
            insuredPersonId: null
        }
    },
    mutations: {
        setInsuredPerson(state, insuredPerson) {
            state.insuredPerson = insuredPerson
        },
        setInsuredPersonId(state, insuredPersonId) {
            state.insuredPersonId = insuredPersonId
        },
        setEmail(state, email) {
            state.insuredPerson = {
                ...state.insuredPerson,
                email
            }
        },
        setAddress(state, address) {
            state.insuredPerson = {
                ...state.insuredPerson,
                address
            }
        },
        setLoginId(state, login_id) {
            state.insuredPerson = {
                ...state.insuredPerson,
                login_id
            }
        },
        setPhone(state, phone) {
            state.insuredPerson = {
                ...state.insuredPerson,
                phone
            }
        },
        setRegionId(state, region_id) {
            state.insuredPerson = {
                ...state.insuredPerson,
                region_id
            }
        },
        setPassportId(state, passport_id) {
            state.insuredPerson = {
                ...state.insuredPerson,
                passport_id
            }
        },
        setFirstName(state, first_name) {
            state.insuredPerson = {
                ...state.insuredPerson,
                first_name
            }
        },
        setSecondName(state, second_name) {
            state.insuredPerson = {
                ...state.insuredPerson,
                second_name
            }
        },
        setInsuranceCompanyId(state, insurance_company_id) {
            state.insuredPerson = {
                ...state.insuredPerson,
                insurance_company_id
            }
        },
        setAgentId(state, agent_id) {
            state.insuredPerson = {
                ...state.insuredPerson,
                agent_id
            }
        },
    },
    actions: {
        async updateInsuredPerson({ state, dispatch }) {
            console.log(11)
            const data = await InsuredPersonsAPIInstance.updateInsuredPerson(state.insuredPersonId, state.insuredPerson)
            console.log(data)
            alert("Updated")
            dispatch("common/fetchInsuredPersons", {}, { root: true })
        },
        async fetchInsuredPerson({ commit, state }) {
            const { data } = await InsuredPersonsAPIInstance.fetchInsuredPersonById(state.insuredPersonId)
            console.log(data)
            commit("setInsuredPerson", data.insuredPerson)

        },
        async deleteInsuredPerson({ state, dispatch }) {
            await InsuredPersonsAPIInstance.deleteInsuredPerson(state.insuredPersonId)
            alert("Deleted")
            dispatch("common/fetchInsuredPersons", {}, { root: true })
        }
    },
    namespaced: true
}