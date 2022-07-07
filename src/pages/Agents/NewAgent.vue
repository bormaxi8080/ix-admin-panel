<template>
  <div class="row">
    <div class="col-12">
      <fg-input :value="agent.email" @input="setEmail($event)" label="email" />
      <fg-input
        :value="agent.phone"
        @input="setPhone($event)"
        type="text"
        label="phone"
      />
      <label>region</label>
      <select
        class="form-control mb-3"
        aria-describedby="addon-right addon-left"
        @change="setRegionId($event.target.value)"
        :value="agent.region_id"
      >
        <option value="" hidden>Choose region</option>
        <option :value="region.id" v-for="region of regions" :key="region.id">
          {{ region.region_name }}
        </option>
      </select>
      <fg-input
        :value="agent.address"
        @input="setAddress($event)"
        label="address"
      />
      <fg-input
        :value="agent.first_name"
        @input="setFirstName($event)"
        label="first name"
      />
      <fg-input
        :value="agent.second_name"
        @input="setSecondName($event)"
        label="second name"
      />
      <template v-if="user.role !== 'insurance_company'">
        <label>insurance company</label>
        <multiselect
          :multiple="true"
          @input="setInsuranceCompanyId"
          :allowEmpty="false"
          class="mb-3"
          :options="insuranceCompanies"
          track-by="id"
          label="title"
          :close-on-select="false"
          :clear-on-select="false"
          :value="agent.insurance_company_ids"
          placeholder="Pick some"
        />
      </template>
      <fg-input
        :value="agent.employee_number"
        @input="setEmployeeNumber($event)"
        label="employee number"
      />
      <fg-input
        :value="agent.login_id"
        @input="setLoginId($event)"
        label="login id"
      />
      <div class="d-flex justify-content-start">
        <fg-input type="checkbox" label="checked" />
      </div>

      <p-button @click="createHandler()">Create</p-button>
    </div>
  </div>
</template>
<script>
import { FormGroupInput, Button } from "@/components";
import { createNamespacedHelpers } from "vuex";
import Multiselect from "vue-multiselect";

const {
  mapState: mapStateNewAgent,
  mapActions: mapActionsNewAgent,
  mapMutations: mapMutationsNewAgent,
} = createNamespacedHelpers("agents/newAgent");

const { mapState: mapStateCommon } = createNamespacedHelpers("common");
const { mapState: mapStateAccount } = createNamespacedHelpers("account");

export default {
  components: { FormGroupInput, Button, Multiselect },
  methods: {
    ...mapActionsNewAgent(["createAgent"]),
    ...mapMutationsNewAgent([
      "setFirstName",
      "setSecondName",
      "setPhone",
      "setAddress",
      "setInsuranceCompanyId",
      "setRegionId",
      "setEmployeeNumber",
      "setLoginId",
      "setEmail",
    ]),
    async createHandler() {
      await this.createAgent();
      this.$router.push("/agents");
    },
  },
  computed: {
    ...mapStateNewAgent({
      agent: (state) => state.newAgent,
    }),
    ...mapStateAccount({
      user: (state) => state.user,
    }),
    ...mapStateCommon({
      insuranceCompanies: (state) => state.insuranceCompanies,
      regions: (state) => state.regions,
    }),
  },
  created() {
    if (this.user.role === "insurance_company") {
      this.setInsuranceCompanyId([{ id: this.user.insurance_company_id }]);
    }
  },
};
</script>