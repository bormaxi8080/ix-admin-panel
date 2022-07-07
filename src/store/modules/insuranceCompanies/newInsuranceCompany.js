import axios from "axios"
import { InsuranceCompaniesAPIInstance } from "../../../API/insuranceCompanies"

export const newInsuranceCompanyModule = {
    state() {
        return {
            newCompany: {
                email: "",
                address: "",
                phone: "",
                title: "",
                ie_number: "",
                password: ""
            }
        }
    },
    mutations: {
        setEmail(state, email) {
            state.newCompany = {
                ...state.newCompany,
                email
            }
        },
        setTitle(state, title) {
            state.newCompany = {
                ...state.newCompany,
                title
            }
        },
        setAddress(state, address) {
            state.newCompany = {
                ...state.newCompany,
                address
            }
        },
        setPhone(state, phone) {
            state.newCompany = {
                ...state.newCompany,
                phone
            }
        },
        setIENumber(state, ie_number) {
            state.newCompany = {
                ...state.newCompany,
                ie_number
            }
        },
        setPassword(state, password) {
            state.newCompany = {
                ...state.newCompany,
                password
            }
        }
    },
    actions: {
        async createInsuranceCompany({ state, dispatch }) {
            const data = await InsuranceCompaniesAPIInstance.createInsuranceCompany(state.newCompany)
            console.log(data)
            alert("Created")
            dispatch("common/fetchInsuranceCompanies", {}, { root: true })
        }
    },
    namespaced: true
}