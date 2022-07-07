import { appraisalCompaniesAllModule } from "./appraisalCompaniesAllModule";
import { appraisalCompanyDetailModule } from "./appraisalCompanyDetailModule";
import { newAppraisalCompanyModule } from "./newAppraisalCompany";

export const appraisalCompaniesModule = {
    modules: {
        appraisalCompaniesAll: appraisalCompaniesAllModule,
        newAppraisalCompany: newAppraisalCompanyModule,
        appraisalCompanyDetail: appraisalCompanyDetailModule
    },
    namespaced: true
}