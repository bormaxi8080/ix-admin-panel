import axios from "axios"
import { AppraisalCompaniesAPIInstance } from "../../../API/appraisalCompanies"

export const newAppraisalCompanyModule = {
    state() {
        return {
            appraisalCompany: {
                email: "",
                phone: "",
                insurance_company_id: "",
                appraisal_company_name: "",
                oao_ie_number: "",
                office_address: "",
                region_id: ""
            }
        }
    },
    mutations: {
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
        setRegionId(state, region_id) {
            state.appraisalCompany = {
                ...state.appraisalCompany,
                region_id
            }
        }
    },
    actions: {
        async createAppraisalCompany({ state, dispatch }) {
            const { email, phone, insurance_company_id, appraisal_company_name, oao_ie_number, office_address, region_id } = state.appraisalCompany

            const data = await AppraisalCompaniesAPIInstance.createAppraisalCompany({
                email,
                phone,
                insurance_company_id: insurance_company_id,
                appraisal_company_name: appraisal_company_name,
                oao_ie_number: oao_ie_number,
                office_address: office_address,
                region_id: region_id
            })
            console.log(data)
            alert("Created")
            dispatch("common/fetchAppraisalCompanies", {}, { root: true })
        }
    },
    namespaced: true
}