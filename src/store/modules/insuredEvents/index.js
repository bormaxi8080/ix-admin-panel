import { insuredEventsAllModule } from "./insuredEventsAllModule";
import { insuredEventDetailModule } from "./insuredEventDetailModule";
import { newInsuredEventModule } from "./newInsurendEvent";

export const insuredEventsModule = {
    modules: {
        insuredEventsAll: insuredEventsAllModule,
        newInsuredEvent: newInsuredEventModule,
        insuredEventDetail: insuredEventDetailModule
    },
    namespaced: true
}