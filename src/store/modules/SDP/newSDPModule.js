import { SDPAPIInstance } from "@/API/SDP"

export const newSDPModule = {
    state() {
        return {
            newSDP: {
                email: "",
                address: "",
                phone: "",
                insurance_company_id: "",
                login_id: "",
                name: "",
                region_id: ""
            }
        }
    },
    mutations: {
        setEmail(state, email) {
            state.newSDP = {
                ...state.newSDP,
                email
            }
        },
        setAddress(state, address) {
            state.newSDP = {
                ...state.newSDP,
                address
            }
        },
        setPhone(state, phone) {
            state.newSDP = {
                ...state.newSDP,
                phone
            }
        },
        setInsuranceCompanyId(state, insurance_company_id) {
            console.log(insurance_company_id)
            state.newSDP = {
                ...state.newSDP,
                insurance_company_id
            }
        },
        setRegionId(state, region_id) {
            state.newSDP = {
                ...state.newSDP,
                region_id
            }
        },
        setName(state, name) {
            state.newSDP = {
                ...state.newSDP,
                name
            }
        },
        setLoginId(state, login_id) {
            state.newSDP = {
                ...state.newSDP,
                login_id
            }
        },
    },
    actions: {
        async createSDP({ state }) {
            const data = await SDPAPIInstance.createSDP({
                ...state.newSDP,
                insurance_company_ids: state.newSDP.insurance_company_id.map(company => company.id)
            })
            console.log(data)
            alert("Created")
        }
    },
    namespaced: true
}