import { insuranceCompaniesAllModule } from "./insuranceCompaniesAllModule";
import { insuranceCompanyDetailModule } from "./insuranceCompanyDetailModule";
import { newInsuranceCompanyModule } from "./newInsuranceCompany";

export const insuranceCompaniesModule = {
    modules: {
        insuranceCompaniesAll: insuranceCompaniesAllModule,
        newInsuranceCompany: newInsuranceCompanyModule,
        insuranceCompanyDetail: insuranceCompanyDetailModule
    },
    namespaced: true
}