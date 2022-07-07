import { RegionsAPIInstance } from "@/API/regions.ts"
import { InsuranceCompaniesAPIInstance } from "../../API/insuranceCompanies"
import { AgentsAPIInstance } from "@/API/agents"
import { AppraisalCompaniesAPIInstance } from "@/API/appraisalCompanies"
import { InsuredPersonsAPIInstance } from "@/API/insuredPersons"
import { AppraisersAPIInstance } from "@/API/appraisers"

export const commonModule = {
    state() {
        return {
            regions: [],
            agents: [],
            insuranceCompanies: [],
            appraisalCompanies: [],
            insuredPersons: [],
            appraisers: []
        }
    },
    mutations: {
        setRegions(state, regions) {
            state.regions = regions
        },
        setAgents(state, agents) {
            state.agents = agents
        },
        setInsuranceCompanies(state, insuranceCompanies) {
            state.insuranceCompanies = insuranceCompanies
        },
        setAppraisalCompanies(state, appraisalCompanies) {
            state.appraisalCompanies = appraisalCompanies
        },
        setInsuredPersons(state, insuredPersons) {
            state.insuredPersons = insuredPersons
        },
        setAppraisers(state, appraisers) {
            state.appraisers = appraisers
        }
    },
    actions: {
        async fetchRegions({ commit }) {
            const { data: { regions } } = await RegionsAPIInstance.fetchRegions()
            console.log(regions)
            console.log(regions)
            commit("setRegions", regions)
        },
        async fetchInsuranceCompanies({ commit }) {
            const { data } = await InsuranceCompaniesAPIInstance.fetchInsuranceCompanies()
            commit("setInsuranceCompanies", data.insuranceCompanies)
        },
        async fetchAgents({ commit }) {
            const { data: { agents } } = await AgentsAPIInstance.fetchAgents()
            commit("setAgents", agents)
        },
        async fetchAppraisalCompanies({ commit }) {
            const { data: { appraisalCompanies } } = await AppraisalCompaniesAPIInstance.fetchAppraisalCompanies()
            commit("setAppraisalCompanies", appraisalCompanies)
        },
        async fetchInsuredPersons({ commit }) {
            const { data: { insuredPersons } } = await InsuredPersonsAPIInstance.fetchInsuredPersons()
            commit("setInsuredPersons", insuredPersons)
        },
        async fetchAppraisers({ commit }) {
            const { data: { appraisers } } = await AppraisersAPIInstance.fetchAppraisers()
            commit("setAppraisers", appraisers)
        }
    },
    namespaced: true
}