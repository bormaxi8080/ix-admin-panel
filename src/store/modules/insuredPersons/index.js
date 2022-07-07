import { insuredPersonDetailModule } from "./insuredPersonDetailModule";
import { insuredPersonsAllModule } from "./insuredPersonsModule";
import { newInsuredPersonModule } from "./newInsuredPersonModule";

export const insuredPersonsModule = {
    modules: {
        newInsuredPerson: newInsuredPersonModule,
        insuredPersonsAll: insuredPersonsAllModule,
        insuredPersonDetail: insuredPersonDetailModule
    },
    namespaced: true
}