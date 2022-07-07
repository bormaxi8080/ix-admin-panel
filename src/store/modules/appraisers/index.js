import { appraisersAllModule } from "./appraisersAllModule";
import { appraiserDetailModule } from "./appraiserDetailModule";
import { newAppraiserModule } from "./newAppraiserModule";

export const appraisersModule = {
    modules: {
        appraisersAll: appraisersAllModule,
        newAppraiser: newAppraiserModule,
        appraiserDetail: appraiserDetailModule
    },
    namespaced: true
}