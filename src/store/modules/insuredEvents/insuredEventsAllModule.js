import { InsuredEventsAPIInstance } from "@/API/insuredEvents"

export const insuredEventsAllModule = {
    state() {
        return {
            insuredEvents: []
        }
    },
    mutations: {
        setInsuredEvents(state, insuredEvents) {
            state.insuredEvents = insuredEvents
        }
    },
    actions: {
        async fetchInsuredEvents({ commit, rootState }) {
            const user = rootState.account.user

            const { data } = await InsuredEventsAPIInstance.fetchInsuredEvents(user.role === "superadmin" ? null : user.insurance_company_id)
            console.log(data)
            commit("setInsuredEvents", data.insuredEvents.map(insuredEvent => ({
                ...insuredEvent,
                insurance_company: insuredEvent.insurance_company && insuredEvent.insurance_company.title,
                agent: insuredEvent.agent && insuredEvent.agent.first_name + " " + insuredEvent.agent.second_name,
                appraiser: insuredEvent.appraiser && insuredEvent.appraiser.first_name + " " + insuredEvent.appraiser.second_name,
                region: insuredEvent.region.region_name,
                insured_person: insuredEvent.insured_person && insuredEvent.insured_person.first_name + " " + insuredEvent.insured_person.second_name,
                appraisal_company: insuredEvent.appraisal_company && insuredEvent.appraisal_company.appraisal_company_name
            })))
        }
    },
    namespaced: true
}