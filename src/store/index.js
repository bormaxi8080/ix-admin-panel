import Vuex from "vuex"
import Vue from "vue"
import { accountModule, agentsModule, appraisalCompaniesModule, appraisersModule, commonModule, insuranceCompaniesModule, insuredEventsModule, insuredPersonsModule, SDPModule } from "./modules"

Vue.use(Vuex)

export default new Vuex.Store({
    state() {
        return {
            id: 1
        }
    },
    modules: {
        insuranceCompanies: insuranceCompaniesModule,
        insuredPersons: insuredPersonsModule,
        common: commonModule,
        agents: agentsModule,
        appraisalCompanies: appraisalCompaniesModule,
        appraisers: appraisersModule,
        SDP: SDPModule,
        insuredEvents: insuredEventsModule,
        account: accountModule
    },
    namespaced: true
})