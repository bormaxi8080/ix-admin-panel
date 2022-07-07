import axios from "axios"
import { InsuranceCompaniesAPIInstance } from "../../../API/insuranceCompanies"

export const insuranceCompaniesAllModule = {
    state() {
        return {
            companies: []
        }
    },
    mutations: {
        setCompanies(state, companies) {
            state.companies = companies
        }
    },
    actions: {
        async fetchCompanies({ commit }) {
            const { data } = await InsuranceCompaniesAPIInstance.fetchInsuranceCompanies()
            commit("setCompanies", data.insuranceCompanies)
        }
    },
    namespaced: true
}