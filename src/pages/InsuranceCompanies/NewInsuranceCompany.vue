<template>
  <div class="row">
    <div class="col-12">
      <fg-input @input="setTitle($event)" label="title" />
      <fg-input @input="setIENumber($event)" type="number" label="IE number" />
      <fg-input @input="setEmail($event)" label="email" />
      <fg-input @input="setPhone($event)" type="number" label="phone" />
      <fg-input @input="setAddress($event)" label="address" />
      <fg-input @input="setPassword($event)" label="password" />
      <p-button @click="createHandler()">Create</p-button>
    </div>
  </div>
</template>
<script>
import { FormGroupInput, Button } from "@/components";
import { createNamespacedHelpers } from "vuex";

const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "insuranceCompanies/newInsuranceCompany"
);

export default {
  components: { FormGroupInput, Button },
  methods: {
    ...mapActions(["createInsuranceCompany"]),
    ...mapMutations([
      "setTitle",
      "setEmail",
      "setPhone",
      "setAddress",
      "setIENumber",
      "setPassword",
    ]),
    async createHandler() {
      await this.createInsuranceCompany();
      this.$router.push("/insurance-companies");
    },
  },
  computed: {
    newOrganization: (state) => state.newOrganization,
  },
};
</script>