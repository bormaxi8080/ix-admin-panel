<template>
  <div class="row">
    <div class="col-12">
      <fg-input
        :value="insuredPerson && insuredPerson.email"
        @input="setEmail($event)"
        label="email"
      />
      <fg-input
        :value="insuredPerson && insuredPerson.phone"
        @input="setPhone($event)"
        type="text"
        label="phone"
      />
      <label>region</label>
      <select
        :value="insuredPerson && insuredPerson.region_id"
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
        :value="insuredPerson && insuredPerson.address"
        @input="setAddress($event)"
        label="address"
      />
      <fg-input
        :value="insuredPerson && insuredPerson.first_name"
        @input="setFirstName($event)"
        label="first name"
      />
      <fg-input
        :value="insuredPerson && insuredPerson.second_name"
        @input="setSecondName($event)"
        label="second name"
      />
      <template v-if="user.role !== 'insurance_company'">
        <label>insurance company</label>
        <select
          class="form-control mb-3"
          aria-describedby="addon-right addon-left"
          @change="setInsuranceCompanyId($event.target.value)"
          :value="insuredPerson && insuredPerson.insurance_company_id"
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
        :value="insuredPerson && insuredPerson.passport_id"
        @input="setPassportId($event)"
        label="passport id"
      />
      <label>agent</label>
      <select
        class="form-control mb-3"
        :value="insuredPerson && insuredPerson.agent_id"
        aria-describedby="addon-right addon-left"
        @change="setAgentId($event.target.value)"
      >
        <option value="" hidden>Choose agent</option>
        <option :value="agent.id" v-for="agent of agents" :key="agent.id">
          {{ agent.first_name }} {{ agent.second_name }}
        </option>
      </select>
      <fg-input
        :value="insuredPerson && insuredPerson.login_id"
        @input="setLoginId($event)"
        label="login id"
      />

      <p-button @click="updateHandler()" class="mr-5">Update</p-button>
      <p-button @click="deleteHandler()">Delete</p-button>
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
} = createNamespacedHelpers("insuredPersons/insuredPersonDetail");

const { mapState: mapStateCommon } = createNamespacedHelpers("common");
const { mapState: mapStateAccount } = createNamespacedHelpers("account");

export default {
  components: { FormGroupInput, Button },
  methods: {
    ...mapActionsNewInsuredPerson([
      "fetchInsuredPerson",
      "updateInsuredPerson",
      "deleteInsuredPerson",
    ]),
    ...mapMutationsNewInsuredPerson([
      "setInsuredPersonId",
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
    async deleteHandler() {
      await this.deleteInsuredPerson();
      this.$router.push("/insured-persons");
    },
    async updateHandler() {
      await this.updateInsuredPerson();
      this.$router.push("/insured-persons");
    },
  },
  computed: {
    ...mapStateAccount({
      user: (state) => state.user,
    }),
    ...mapStateNewInsuredPerson({
      insuredPerson: (state) => state.insuredPerson,
    }),
    ...mapStateCommon({
      insuranceCompanies: (state) => state.insuranceCompanies,
      regions: (state) => state.regions,
      agents: (state) => state.agents,
    }),
  },
  created() {
    this.setInsuredPersonId(this.$route.params.insuredPersonId);
    this.fetchInsuredPerson();
  },
};
</script>