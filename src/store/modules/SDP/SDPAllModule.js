import { SDPAPIInstance } from "@/API/SDP"

export const SDPAllModule = {
    state() {
        return {
            SDP: []
        }
    },
    mutations: {
        setSDP(state, SDP) {
            state.SDP = SDP
        }
    },
    actions: {
        async fetchSDP({ commit, rootState }) {
            const user = rootState.account.user

            const { data } = await SDPAPIInstance.fetchSDP(user.role === "superadmin" ? null : user.insurance_company_id)
            commit("setSDP", data.SDP.map(SDP => ({
                ...SDP,
                insurance_companies: SDP.insurance_companies.map(id => id.title).join(", "),
                region: SDP.region.region_name
            })))
        }
    },
    namespaced: true
}