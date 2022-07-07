import axios from "axios"
import { AppraisalCompaniesAPIInstance } from "../../../API/appraisalCompanies"

export const appraisalCompaniesAllModule = {
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
        async fetchCompanies({ commit, rootState }) {
            const user = rootState.account.user

            const { data } = await AppraisalCompaniesAPIInstance.fetchAppraisalCompanies(user.role === "superadmin" ? null : user.insurance_company_id)
            commit("setCompanies", data.appraisalCompanies.map(appraisalCompany => ({
                ...appraisalCompany,
                insurance_companies: appraisalCompany.insurance_companies.map(insuranceCompany => insuranceCompany.title).join(", ")
            })))
        }
    },
    namespaced: true
}