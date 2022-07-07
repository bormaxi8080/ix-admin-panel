<template>
  <div class="row">
    <div class="col-12">
      <fg-input
        :value="newInsuredPerson.email"
        @input="setEmail($event)"
        label="email"
      />
      <fg-input
        :value="newInsuredPerson.phone"
        @input="setPhone($event)"
        type="text"
        label="phone"
      />
      <label>region</label>
      <select
        class="form-control mb-3"
        :value="newInsuredPerson.region_id"
        aria-describedby="addon-right addon-left"
        @change="setRegionId($event.target.value)"
      >
        <option value="" hidden>Choose region</option>
        <option :value="region.id" v-for="region of regions" :key="region.id">
          {{ region.region_name }}
        </option>
      </select>
      <fg-input
        :value="newInsuredPerson.address"
        @input="setAddress($event)"
        label="address"
      />
      <fg-input
        :value="newInsuredPerson.first_name"
        @input="setFirstName($event)"
        label="first name"
      />
      <fg-input
        :value="newInsuredPerson.second_name"
        @input="setSecondName($event)"
        label="second name"
      />
      <template v-if="user.role !== 'insurance_company'">
        <label>insurance company</label>
        <select
          class="form-control mb-3"
          aria-describedby="addon-right addon-left"
          :value="newInsuredPerson.insurance_company_id"
          @change="setInsuranceCompanyId($event.target.value)"
        >
          <option value="" hidden>Choose insurance company</option>
          <option
            :value="insuranceCompany.id"
            v-for="insuranceCompany of insuranceCompanies"
            :key="insuranceCompany.id"
          >
            {{ insuranceCompany.title }}
          </option>
        </select>
      </template>
      <fg-input
        :value="newInsuredPerson.passport_id"
        @input="setPassportId($event)"
        label="passport id"
      />
      <label>agent</label>
      <select
        class="form-control mb-3"
        aria-describedby="addon-right addon-left"
        :value="newInsuredPerson.agent_id"
        @change="setAgentId($event.target.value)"
      >
        <option value="" hidden>Choose agent</option>
        <option :value="agent.id" v-for="agent of agents" :key="agent.id">
          {{ agent.first_name }} {{ agent.second_name }}
        </option>
      </select>
      <fg-input
        :value="newInsuredPerson.login_id"
        @input="setLoginId($event)"
        label="login id"
      />

      <p-button @click="createHandler()">Create</p-button>
    </div>
  </div>
</template>
<script>
import { FormGroupInput, Button } from "@/components";
import { createNamespacedHelpers } from "vuex";

const {
  mapState: mapStateNewInsuredPerson,
  mapActions: mapActionsNewInsuredPerson,
  mapMutations: mapMutationsNewInsuredPerson,
} = createNamespacedHelpers("insuredPersons/newInsuredPerson");

const { mapState: mapStateCommon } = createNamespacedHelpers("common");
const { mapState: mapStateAccount } = createNamespacedHelpers("account");

export default {
  components: { FormGroupInput, Button },
  methods: {
    ...mapActionsNewInsuredPerson(["createInsuredPerson"]),
    ...mapMutationsNewInsuredPerson([
      "setFirstName",
      "setSecondName",
      "setPhone",
      "setAddress",
      "setInsuranceCompanyId",
      "setRegionId",
      "setPassportId",
      "setAgentId",
      "setLoginId",
      "setEmail",
    ]),
    async createHandler() {
      await this.createInsuredPerson();
      this.$router.push("/insured-persons");
    },
  },
  computed: {
    ...mapStateNewInsuredPerson({
      newInsuredPerson: (state) => state.newInsuredPerson,
    }),
    ...mapStateAccount({
      user: (state) => state.user,
    }),
    ...mapStateCommon({
      insuranceCompanies: (state) => state.insuranceCompanies,
      regions: (state) => state.regions,
      agents: (state) => state.agents,
    }),
  },
  created() {
    if (this.user.role === "insurance_company") {
      this.setInsuranceCompanyId(this.user.insurance_company_id);
    }
  },
};
</script>