import { AccountAPIInstance } from "@/API/account"
import { InsuranceCompaniesAPIInstance } from "@/API/insuranceCompanies"
import Cookies from "js-cookie"

export const accountModule = {
    state() {
        return {
            loginForm: { username: "", password: "" },
            initialized: false,
            user: null
        }
    },
    mutations: {
        setUsername(state, username) {
            state.loginForm = { ...state.loginForm, username }
        },
        setPassword(state, password) {
            state.loginForm = {
                ...state.loginForm,
                password
            }
        },
        setUser(state, user) {
            state.user = user
        },
        setInitialized(state, initialized) {
            state.initialized = initialized
        }
    },
    actions: {
        async login({ state, commit, dispatch }) {
            try {
                const user = await AccountAPIInstance.login(state.loginForm)

                commit("setUser", user)
                dispatch("common/fetchAppraisers", {}, { root: true })
                dispatch("common/fetchInsuredPersons", {}, { root: true })
                dispatch("common/fetchAgents", {}, { root: true });
                dispatch("common/fetchRegions", {}, { root: true });
                dispatch("common/fetchInsuranceCompanies", {}, { root: true });
                dispatch("common/fetchAppraisalCompanies", {}, { root: true });
            } catch (e) {
                alert("Ошибка")
            }
        },
        async fetchUser({ commit }) {
            try {
                const { data: { user } } = await AccountAPIInstance.fetchUser()

                commit("setUser", user)
            } catch (e) {
                Cookies.remove("jwt", { path: "/" })
            }
            commit("setInitialized", true)

        },
        logout({ commit }) {
            commit("setUser", null)
            Cookies.remove("jwt", { path: "/" })
            AccountAPIInstance.deleteAuthorizationHeader()
        }
    },
    namespaced: true
}