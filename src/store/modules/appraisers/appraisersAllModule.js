import { AppraisersAPIInstance } from "@/API/appraisers"

export const appraisersAllModule = {
    state() {
        return {
            appraisers: []
        }
    },
    mutations: {
        setAppraisers(state, appraisers) {
            state.appraisers = appraisers
        }
    },
    actions: {
        async fetchAppraisers({ commit, rootState }) {
            const user = rootState.account.user

            const { data } = await AppraisersAPIInstance.fetchAppraisers(user.role === "superadmin" ? null : user.insurance_company_id)
            commit("setAppraisers", data.appraisers.map(appraiser => ({
                ...appraiser,
                insurance_company: appraiser.insurance_company && appraiser.insurance_company.title,
                appraisal_company: appraiser.appraisal_company && appraiser.appraisal_company.appraisal_company_name,
                region: appraiser.region.region_name
            })))

        }
    },
    namespaced: true
}