<template>
  <div class="row">
    <div class="col-12">
      <fg-input
        :value="insuranceCompany && insuranceCompany.title"
        @input="setTitle($event)"
        label="title"
      />
      <fg-input
        :value="insuranceCompany && insuranceCompany.ie_number"
        @input="setIENumber($event)"
        type="number"
        label="IE number"
      />
      <fg-input
        :value="insuranceCompany && insuranceCompany.email"
        @input="setEmail($event)"
        label="email"
      />
      <fg-input
        :value="insuranceCompany && insuranceCompany.phone"
        @input="setPhone($event)"
        type="text"
        label="phone"
      />
      <fg-input
        :value="insuranceCompany && insuranceCompany.address"
        @input="setAddress($event)"
        label="address"
      />
      <fg-input
        :value="insuranceCompany && insuranceCompany.password"
        @input="setPassword($event)"
        label="password"
      />
      <p-button @click="updateHandler()" class="mr-5">Update</p-button>
      <p-button @click="deleteHandler()">Delete</p-button>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "insuranceCompanies/insuranceCompanyDetail"
);

export default {
  name: "insurance-company-detail",
  computed: {
    ...mapState({
      insuranceCompany: (state) => state.insuranceCompany,
    }),
  },
  methods: {
    ...mapActions([
      "fetchInsuranceCompany",
      "updateInsuranceCompany",
      "deleteInsuranceCompany",
    ]),
    ...mapMutations([
      "setInsuranceCompanyId",
      "setTitle",
      "setEmail",
      "setPhone",
      "setAddress",
      "setIENumber",
      "setPassword",
    ]),
    async deleteHandler() {
      await this.deleteInsuranceCompany();
      this.$router.push("/insurance-companies");
    },
    async updateHandler() {
      await this.updateInsuranceCompany();
      this.$router.push("/insurance-companies");
    },
  },
  created() {
    this.setInsuranceCompanyId(this.$route.params.insuranceCompanyId);
    this.fetchInsuranceCompany();
  },
};
</script>