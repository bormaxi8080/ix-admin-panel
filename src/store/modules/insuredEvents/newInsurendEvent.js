import { InsuredEventsAPIInstance } from "@/API/insuredEvents"
import _ from "lodash"
import { objectToFormData } from "object-to-formdata"

export const newInsuredEventModule = {
    state() {
        return {
            newInsuredEvent: {
                insurance_company_id: "",
                insured_person_id: "",
                event_type: "",
                region_id: "",
                address: "",
                date: "",
                agent_id: "",
                appraisal_company_id: "",
                appraiser_id: "",
                garage_name: "",
                insured_event_number: "",
                files: []
            }
        }
    },
    mutations: {
        setInsuranceCompanyId(state, insurance_company_id) {
            state.newInsuredEvent = {
                ...state.newInsuredEvent,
                insurance_company_id
            }
        },
        setInsuredPersonId(state, insured_person_id) {
            state.newInsuredEvent = {
                ...state.newInsuredEvent,
                insured_person_id
            }
        },
        setEventType(state, event_type) {
            state.newInsuredEvent = {
                ...state.newInsuredEvent,
                event_type
            }
        },
        setRegionId(state, region_id) {
            state.newInsuredEvent = {
                ...state.newInsuredEvent,
                region_id
            }
        },
        setDate(state, date) {
            state.newInsuredEvent = {
                ...state.newInsuredEvent,
                date
            }
        },
        setAgentId(state, agent_id) {
            state.newInsuredEvent = {
                ...state.newInsuredEvent,
                agent_id
            }
        },
        setAppraisalCompanyId(state, appraisal_company_id) {
            state.newInsuredEvent = {
                ...state.newInsuredEvent,
                appraisal_company_id
            }
        },
        setAppraiserId(state, appraiser_id) {
            state.newInsuredEvent = {
                ...state.newInsuredEvent,
                appraiser_id
            }
        },
        setGarageName(state, garage_name) {
            state.newInsuredEvent = {
                ...state.newInsuredEvent,
                garage_name
            }
        },
        setInsuredEventNumber(state, insured_event_number) {
            state.newInsuredEvent = {
                ...state.newInsuredEvent,
                insured_event_number
            }
        },
        setAddress(state, address) {
            state.newInsuredEvent = {
                ...state.newInsuredEvent,
                address
            }
        },
        setFile(state, file) {
            const currentFiles = state.newInsuredEvent.files
            console.log(currentFiles)
            const maxElement = _.maxBy(currentFiles, "id")

            const id = maxElement ? maxElement.id + 1 : 1

            const fileObj = {
                body: file,
                id
            }

            console.log(fileObj)

            state.newInsuredEvent = {
                ...state.newInsuredEvent,
                files: [...currentFiles, fileObj]
            }
        },
        deleteFile(state, fileId) {
            state.newInsuredEvent = {
                ...state.newInsuredEvent,
                files: state.newInsuredEvent.files.filter(file => file.id != fileId)
            }
        }
    },
    actions: {
        async createInsuredEvent({ state }) {
            const newInsuredEvent = { ...state.newInsuredEvent, files: state.newInsuredEvent.files.map((file) => file.body) }
            const formData = new FormData()
            for (let key of Object.keys(newInsuredEvent)) {
                if (newInsuredEvent[key] instanceof Array) {
                    console.log(key)
                    for (let i = 0; i < newInsuredEvent[key].length; i++) {
                        formData.append(key + `[${i}]`, newInsuredEvent[key][i])
                    }
                    continue
                }

                formData.append(key, newInsuredEvent[key])
            }

            console.log(formData)

            const data = await InsuredEventsAPIInstance.createInsuredEvent(
                formData
            )
            console.log(data)
            alert("Created")
        }
    },
    namespaced: true
}