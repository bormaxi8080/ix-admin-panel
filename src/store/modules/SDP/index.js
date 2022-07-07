import { SDPAllModule } from "./SDPAllModule";
import { newSDPModule } from "./newSDPModule";
import { SDPDetailModule } from "./SDPDetailModule";

export const SDPModule = {
    modules: {
        SDPAll: SDPAllModule,
        newSDP: newSDPModule,
        SDPDetail: SDPDetailModule
    },
    namespaced: true
}