<template>
  <div class="row">
    <div class="col-12">
      <fg-input
        :value="agent && agent.email"
        @input="setEmail($event)"
        label="email"
      />
      <fg-input
        :value="agent && agent.phone"
        @input="setPhone($event)"
        type="text"
        label="phone"
      />
      <label>region</label>
      <select
        :value="agent && agent.region_id"
        class="form-control mb-3"
        aria-describedby="addon-right addon-left"
        @change="setRegionId($event.target.value)"
      >
        <option value="" hidden>Choose region</option>
        <option :value="region.id" v-for="region of regions" :key="region.id">
          {{ region.region_name }}
        </option>
      </select>
      <fg-input
        :value="agent && agent.address"
        @input="setAddress($event)"
        label="address"
      />
      <fg-input
        :value="agent && agent.first_name"
        @input="setFirstName($event)"
        label="first name"
      />
      <fg-input
        :value="agent && agent.second_name"
        @input="setSecondName($event)"
        label="second name"
      />
      <template v-if="user.role !== 'insurance_company'">
        <label>insurance companies</label>
        <multiselect
          :multiple="true"
          @input="setInsuranceCompanyIds"
          :allowEmpty="false"
          class="mb-3"
          :options="insuranceCompanies"
          track-by="id"
          label="title"
          :close-on-select="false"
          :clear-on-select="false"
          :value="agent && agent.insurance_companies"
          placeholder="Pick some"
        />
      </template>
      <fg-input
        :value="agent && agent.employee_number"
        @input="setEmployeeNumber($event)"
        label="employee number"
      />
      <fg-input
        :value="agent && agent.login_id"
        @input="setLoginId($event)"
        label="login id"
      />
      <div class="d-flex justify-content-start">
        <fg-input type="checkbox" label="checked" />
      </div>

      <p-button @click="updateHandler()" class="mr-5">Update</p-button>
      <p-button @click="deleteHandler()">Delete</p-button>
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
} = createNamespacedHelpers("agents/agentDetail");

const { mapState: mapStateCommon } = createNamespacedHelpers("common");
const { mapState: mapStateAccount } = createNamespacedHelpers("account");

export default {
  components: { FormGroupInput, Button, Multiselect },
  methods: {
    ...mapActionsNewAgent(["fetchAgent", "updateAgent", "deleteAgent"]),
    ...mapMutationsNewAgent([
      "setAgentId",
      "setFirstName",
      "setSecondName",
      "setPhone",
      "setAddress",
      "setInsuranceCompanyIds",
      "setRegionId",
      "setEmployeeNumber",
      "setLoginId",
      "setEmail",
    ]),
    async deleteHandler() {
      await this.deleteAgent();
      this.$router.push("/agents");
    },
    async updateHandler() {
      await this.updateAgent();
      this.$router.push("/agents");
    },
  },
  computed: {
    ...mapStateNewAgent({
      agent: (state) => state.agent,
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
    this.setAgentId(this.$route.params.agentId);
    this.fetchAgent();
  },
};
</script>