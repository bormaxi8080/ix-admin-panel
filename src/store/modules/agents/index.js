import { agentsDetailModule } from "./agentDetailModule";
import { agentsAllModule } from "./agentsAllModule";
import { newAgentModule } from "./newAgentModule";

export const agentsModule = {
    modules: {
        agentDetail: agentsDetailModule,
        newAgent: newAgentModule,
        agentsAll: agentsAllModule
    },
    namespaced: true
}