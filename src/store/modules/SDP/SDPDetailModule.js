import { SDPAPIInstance } from "@/API/SDP"

export const SDPDetailModule = {
    state() {
        return {
            SDP: null,
            SDPId: null
        }
    },
    mutations: {
        setSDP(state, SDP) {
            state.SDP = SDP
        },
        setSDPId(state, SDPId) {
            console.log(SDPId)
            state.SDPId = SDPId
        },
        setEmail(state, email) {
            state.SDP = {
                ...state.SDP,
                email
            }
        },
        setAddress(state, address) {
            state.SDP = {
                ...state.SDP,
                address
            }
        },
        setPhone(state, phone) {
            state.SDP = {
                ...state.SDP,
                phone
            }
        },
        setInsuranceCompanyId(state, insurance_companies) {
            state.SDP = {
                ...state.SDP,
                insurance_companies
            }
        },
        setRegionId(state, region_id) {
            state.SDP = {
                ...state.SDP,
                region_id
            }
        },
        setName(state, name) {
            state.SDP = {
                ...state.SDP,
                name
            }
        },
        setLoginId(state, login_id) {
            state.SDP = {
                ...state.SDP,
                login_id
            }
        },
    },
    actions: {
        async fetchSDP({ state, commit }) {
            if (!state.SDPId) {
                return
            }

            const { data: { SDP } } = await SDPAPIInstance.fetchSDPById(state.SDPId)
            commit("setSDP", SDP)
        },
        async updateSDP({ state, commit }) {
            await SDPAPIInstance.updateSDP(state.SDPId, {
                ...state.SDP,
                insurance_company_ids: state.SDP.insurance_companies.map(company => company.id)
            })
            alert("Updated")
        },
        async deleteSDP({ state, commit }) {
            await SDPAPIInstance.deleteSDP(state.SDPId)
            alert("Deleted")
        }
    },
    namespaced: true
}