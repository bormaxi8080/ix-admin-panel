import { InsuredEventsAPIInstance } from "@/API/insuredEvents"

export const insuredEventDetailModule = {
    state() {
        return {
            insuredEvent: null,
            insuredEventId: null
        }
    },
    mutations: {
        setInsuredEvent(state, insuredEvent) {
            state.insuredEvent = insuredEvent
        },
        setInsuredEventId(state, insuredEventId) {
            state.insuredEventId = insuredEventId
        },
        setInsuranceCompanyId(state, insurance_company_id) {
            state.insuredEvent = {
                ...state.insuredEvent,
                insurance_company_id
            }
        },
        setInsuredPersonId(state, insured_person_id) {
            state.insuredEvent = {
                ...state.insuredEvent,
                insured_person_id
            }
        },
        setEventType(state, event_type) {
            state.insuredEvent = {
                ...state.insuredEvent,
                event_type
            }
        },
        setRegionId(state, region_id) {
            state.insuredEvent = {
                ...state.insuredEvent,
                region_id
            }
        },
        setDate(state, date) {
            state.insuredEvent = {
                ...state.insuredEvent,
                date
            }
        },
        setAgentId(state, agent_id) {
            state.insuredEvent = {
                ...state.insuredEvent,
                agent_id
            }
        },
        setAppraisalCompanyId(state, appraisal_company_id) {
            state.insuredEvent = {
                ...state.insuredEvent,
                appraisal_company_id
            }
        },
        setAppraiserId(state, appraiser_id) {
            state.insuredEvent = {
                ...state.insuredEvent,
                appraiser_id
            }
        },
        setGarageName(state, garage_name) {
            state.insuredEvent = {
                ...state.insuredEvent,
                garage_name
            }
        },
        setInsuredEventNumber(state, insured_event_number) {
            state.insuredEvent = {
                ...state.insuredEvent,
                insured_event_number
            }
        },
        setAddress(state, address) {
            state.insuredEvent = {
                ...state.insuredEvent,
                address
            }
        },
        setNewFile(state, file) {
            const currentNewFiles = state.insuredEvent.new_files
            const maxElement = _.maxBy(currentNewFiles, "id")

            const id = maxElement ? maxElement.id + 1 : 1

            const fileObj = {
                body: file,
                id
            }

            console.log(fileObj)

            state.insuredEvent = {
                ...state.insuredEvent,
                new_files: [...currentNewFiles, fileObj]
            }
        },
        deleteFile(state, fileId) {
            const file = state.insuredEvent.files.find(file => file.id === fileId)

            state.insuredEvent = {
                ...state.insuredEvent,
                files: state.insuredEvent.files.filter(file => file.id != fileId)
            }

            state.insuredEvent = {
                ...state.insuredEvent,
                deleted_files: [...state.insuredEvent.deleted_files, file]
            }
        },
        deleteNewFile(state, fileId) {
            state.insuredEvent = {
                ...state.insuredEvent,
                new_files: state.insuredEvent.new_files.filter(file => file.id != fileId)
            }
        }
    },
    actions: {
        async fetchInsuredEvent({ state, commit, rootState }) {
            if (!state.insuredEventId) {
                return
            }

            const { data: { insuredEvent } } = await InsuredEventsAPIInstance.fetchInsuredEventById(state.insuredEventId)
            commit("setInsuredEvent", { ...insuredEvent, deleted_files: [], new_files: [] })
        },
        async updateInsuredEvent({ state, commit }) {
            const insuredEvent = { ...state.insuredEvent, new_files: state.insuredEvent.new_files.map((file) => file.body) }
            const formData = new FormData()
            for (let key of Object.keys(insuredEvent)) {
                if (insuredEvent[key] instanceof Array) {
                    if (key !== "new_files") {
                        formData.append(key, JSON.stringify(insuredEvent[key]))
                        continue
                    }

                    for (let i = 0; i < insuredEvent[key].length; i++) {
                        formData.append(key + `[${i}]`, insuredEvent[key][i])
                    }
                    continue
                }

                formData.append(key, insuredEvent[key])
            }

            console.log(formData)

            const data = await InsuredEventsAPIInstance.updateInsuredEvent(
                state.insuredEventId,
                formData
            )
            console.log(data)
            alert("Updated")
        },
        async deleteInsuredEvent({ state, commit }) {
            await InsuredEventsAPIInstance.deleteInsuredEvent(state.insuredEventId)
            alert("Deleted")
        }
    },
    namespaced: true
}