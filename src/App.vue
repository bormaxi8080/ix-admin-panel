<template>
  <router-view v-if="initialized" />
</template>
<script lang="js">
import Vue from "vue";
import { createNamespacedHelpers } from "vuex";
import Cookies from "js-cookie";
const { mapActions: mapActionsCommon } = createNamespacedHelpers("common");
const { mapActions: mapActionsAccount, mapMutations: mapMutationsAccount, mapState: mapStateAccount } =
  createNamespacedHelpers("account");

export default {
  methods: {
    ...mapActionsCommon([
      "fetchRegions",
      "fetchAgents",
      "fetchInsuranceCompanies",
      "fetchAppraisalCompanies",
      "fetchInsuredPersons",
      "fetchAppraisers",
    ]),
    ...mapActionsAccount(["fetchUser"]),
    ...mapMutationsAccount(["setInitialized"]),
  },
  computed: {
    ...mapStateAccount({
      initialized: (state) => state.initialized,
    }),
  },
  created() {
    if (Cookies.get("jwt")) {
      this.fetchUser();
      this.fetchAppraisers();
      this.fetchInsuredPersons();
      this.fetchAgents();
      this.fetchRegions();
      this.fetchInsuranceCompanies();
      this.fetchAppraisalCompanies();
    } else {
      this.setInitialized(true);
    }
  },
};
</script>
