import axios from "axios"
import { AppraisalCompaniesAPIInstance } from "../../../API/appraisalCompanies"

export const appraisalCompanyDetailModule = {
    state() {
        return {
            appraisalCompany: null,
            appraisalCompanyId: null
        }
    },
    mutations: {
        setAppraisalCompany(state, appraisalCompany) {
            state.appraisalCompany = appraisalCompany
        },
        setAppraisalCompanyId(state, appraisalCompanyId) {
            state.appraisalCompanyId = appraisalCompanyId
        },
        setEmail(state, email) {
            state.appraisalCompany = {
                ...state.appraisalCompany,
                email
            }
        },
        setPhone(state, phone) {
            state.appraisalCompany = {
                ...state.appraisalCompany,
                phone
            }
        },
        setInsuranceCompanyId(state, insurance_company_id) {
            state.appraisalCompany = {
                ...state.appraisalCompany,
                insurance_company_id
            }
        },
        setAppraisalCompanyName(state, appraisal_company_name) {
            state.appraisalCompany = {
                ...state.appraisalCompany,
                appraisal_company_name
            }
        },
        setOAOIENumber(state, oao_ie_number) {
            state.appraisalCompany = {
                ...state.appraisalCompany,
                oao_ie_number
            }
        },
        setOfficeAddress(state, office_address) {
            state.appraisalCompany = {
                ...state.appraisalCompany,
                office_address
            }
        },
    },
    actions: {
        async fetchAppraisalCompany({ state, commit }) {
            console.log(state)
            if (!state.appraisalCompanyId) {
                return
            }

            const { data: { appraisalCompany } } = await AppraisalCompaniesAPIInstance.fetchAppraisalCompanyById(state.appraisalCompanyId)
            commit("setAppraisalCompany", appraisalCompany)
        },
        async updateAppraisalCompany({ state, commit, dispatch }) {
            await AppraisalCompaniesAPIInstance.updateAppraisalCompany(state.appraisalCompanyId, state.appraisalCompany)
            alert("Updated")
            dispatch("common/fetchAppraisalCompanies", {}, { root: true })
        },
        async deleteAppraisalCompany({ state, commit, dispatch }) {
            await AppraisalCompaniesAPIInstance.deleteAppraisalCompany(state.appraisalCompanyId)
            alert("Deleted")
            dispatch("common/fetchAppraisalCompanies", {}, { root: true })

        }
    },
    namespaced: true
}