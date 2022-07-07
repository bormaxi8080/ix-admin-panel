import { AppraisersAPIInstance } from "@/API/appraisers"

export const appraiserDetailModule = {
    state() {
        return {
            appraiser: null,
            appraiserId: null
        }
    },
    mutations: {
        setAppraiser(state, appraiser) {
            state.appraiser = appraiser
        },
        setAppraiserId(state, appraiserId) {
            state.appraiserId = appraiserId
        },
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
        }
    },
    actions: {
        async fetchAppraiser({ state, commit }) {
            console.log(state)
            if (!state.appraiserId) {
                return
            }

            const { data: { appraisers } } = await AppraisersAPIInstance.fetchAppraiserById(state.appraiserId)
            commit("setAppraiser", appraisers)
        },
        async updateAppraiser({ state, commit, dispatch }) {
            await AppraisersAPIInstance.updateAppraiser(state.appraiserId, state.appraiser)
            alert("Updated")
            dispatch("common/fetchAppraisers", {}, { root: true })

        },
        async deleteAppraiser({ state, commit, dispatch }) {
            await AppraisersAPIInstance.deleteAppraiser(state.appraiserId)
            alert("Deleted")
            dispatch("common/fetchAppraisers", {}, { root: true })

        }
    },
    namespaced: true
}