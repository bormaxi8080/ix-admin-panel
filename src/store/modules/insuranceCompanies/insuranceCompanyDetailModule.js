import axios from "axios"
import { InsuranceCompaniesAPIInstance } from "../../../API/insuranceCompanies"

export const insuranceCompanyDetailModule = {
    state() {
        return {
            insuranceCompany: null,
            insuranceCompanyId: null,
            password: ""
        }
    },
    mutations: {
        setInsuranceCompany(state, insuranceCompany) {
            state.insuranceCompany = insuranceCompany
        },
        setInsuranceCompanyId(state, insuranceCompanyId) {
            state.insuranceCompanyId = insuranceCompanyId
        },
        setEmail(state, email) {
            state.insuranceCompany = {
                ...state.insuranceCompany,
                email
            }
        },
        setTitle(state, title) {
            state.insuranceCompany = {
                ...state.insuranceCompany,
                title
            }
        },
        setAddress(state, address) {
            state.insuranceCompany = {
                ...state.insuranceCompany,
                address
            }
        },
        setPhone(state, phone) {
            state.insuranceCompany = {
                ...state.insuranceCompany,
                phone
            }
        },
        setIENumber(state, ie_number) {
            state.insuranceCompany = {
                ...state.insuranceCompany,
                ie_number
            }
        },
        setPassword(state, password) {
            state.insuranceCompany = { ...state.insuranceCompany, password }
        }
    },
    actions: {
        async fetchInsuranceCompany({ state, commit }) {
            if (!state.insuranceCompanyId) {
                return
            }

            const { data: { insuranceCompany } } = await InsuranceCompaniesAPIInstance.fetchInsuranceCompanyById(state.insuranceCompanyId)
            commit("setInsuranceCompany", insuranceCompany)
        },
        async updateInsuranceCompany({ state, commit, dispatch }) {
            await InsuranceCompaniesAPIInstance.updateInsuranceCompany(state.insuranceCompanyId, state.insuranceCompany)
            alert("Updated")
            dispatch("common/fetchInsuranceCompanies", {}, { root: true })
        },
        async deleteInsuranceCompany({ state, commit, dispatch }) {
            await InsuranceCompaniesAPIInstance.deleteInsuranceCompany(state.insuranceCompanyId)
            alert("Deleted")
            dispatch("common/fetchInsuranceCompanies", {}, { root: true })
            dispatch("common/fetchInsuredPersons", {}, { root: true })
        }
    },
    namespaced: true
}