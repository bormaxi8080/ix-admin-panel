import { AppraisersAPIInstance } from "@/API/appraisers"

export const newAppraiserModule = {
    state() {
        return {
            appraiser: {
                email: "",
                phone: "",
                insurance_company_id: "",
                appraisal_company_id: "",
                ooo_number: "",
                ie_number: "",
                employee_number: "",
                address: "",
                login_id: "",
                first_name: "",
                second_name: ""
            }
        }
    },
    mutations: {
        setEmail(state, email) {
            state.appraiser = {
                ...state.appraiser,
                email
            }
        },
        setPhone(state, phone) {
            state.appraiser = {
                ...state.appraiser,
                phone
            }
        },
        setInsuranceCompanyId(state, insurance_company_id) {
            state.appraiser = {
                ...state.appraiser,
                insurance_company_id
            }
        },
        setAppraisalCompanyId(state, appraisal_company_id) {
            state.appraiser = {
                ...state.appraiser,
                appraisal_company_id
            }
        },
        setOAONumber(state, ooo_number) {
            state.appraiser = {
                ...state.appraiser,
                ooo_number
            }
        },
        setIENumber(state, ie_number) {
            state.appraiser = {
                ...state.appraiser,
                ie_number
            }
        },
        setAddress(state, address) {
            state.appraiser = {
                ...state.appraiser,
                address
            }
        },
        setLoginId(state, login_id) {
            state.appraiser = {
                ...state.appraiser,
                login_id
            }
        },
        setFirstName(state, first_name) {
            state.appraiser = {
                ...state.appraiser,
                first_name
            }
        },
        setSecondName(state, second_name) {
            state.appraiser = {
                ...state.appraiser,
                second_name
            }
        },
        setRegionId(state, region_id) {
            state.appraiser = {
                ...state.appraiser,
                region_id
            }
        },
        setEmployeeNumber(state, employee_number) {
            state.appraiser = {
                ...state.appraiser,
                employee_number
            }
        }
    },
    actions: {
        async createAppraiser({ state, dispatch }) {
            const data = await AppraisersAPIInstance.createAppraiser(state.appraiser)
            alert("Created")
            dispatch("common/fetchAppraisers", {}, { root: true })
        }
    },
    namespaced: true
}