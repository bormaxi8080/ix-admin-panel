import axios from "axios"
import { InsuredPersonsAPIInstance } from "../../../API/insuredPersons"

export const insuredPersonsAllModule = {
    state() {
        return {
            persons: []
        }
    },
    mutations: {
        setInsuredPersons(state, insuredPersons) {
            state.persons = insuredPersons
        }
    },
    actions: {
        async fetchInsuredPersons({ commit, rootState }) {
            const user = rootState.account.user

            const { data } = await InsuredPersonsAPIInstance.fetchInsuredPersons(user.role === "superadmin" ? null : user.insurance_company_id)
            console.log(data)
            commit("setInsuredPersons", data.insuredPersons.map(insuredPerson => ({
                ...insuredPerson,
                insurance_company: insuredPerson.insurance_company.title,
                region: insuredPerson.region.region_name,
                agent: insuredPerson.agent && insuredPerson.agent.first_name + " " + insuredPerson.agent.second_name
            })))
            console.log(data)
        }
    },
    namespaced: true
}