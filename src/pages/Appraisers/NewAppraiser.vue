<template>
  <div class="row">
    <div class="col-12">
      <fg-input
        :value="appraiser.ie_number"
        @input="setIENumber($event)"
        type="number"
        label="IE number"
      />
      <fg-input
        :value="appraiser.email"
        @input="setEmail($event)"
        label="email"
      />
      <fg-input
        :value="appraiser.phone"
        @input="setPhone($event)"
        type="text"
        label="phone"
      />
      <fg-input
        @input="setEmployeeNumber($event)"
        label="employee number"
        type="number"
        :value="appraiser.employee_number"
      />
      <fg-input
        :value="appraiser.address"
        @input="setAddress($event)"
        label="address"
      />
      <fg-input
        :value="appraiser.ooo_number"
        @input="setOAONumber($event)"
        label="OOO number"
      />
      <fg-input
        :value="appraiser.first_name"
        @input="setFirstName($event)"
        label="first name"
      />
      <fg-input
        :value="appraiser.second_name"
        @input="setSecondName($event)"
        label="second name"
      />
      <label>region</label>
      <select
        class="form-control mb-3"
        :value="appraiser && appraiser.region_id"
        aria-describedby="addon-right addon-left"
        @change="setRegionId($event.target.value)"
      >
        <option value="" hidden>Choose region</option>
        <option :value="region.id" v-for="region of regions" :key="region.id">
          {{ region.region_name }}
        </option>
      </select>
      <label>appraisal company</label>
      <select
        class="form-control mb-3"
        :value="appraiser && appraiser.appraisal_company_id"
        aria-describedby="addon-right addon-left"
        @change="setAppraisalCompanyId($event.target.value)"
      >
        <option value="" hidden>Choose appraisal company</option>
        <option
          :value="appraisalCompany.id"
          v-for="appraisalCompany of appraisalCompanies"
          :key="appraisalCompany.id"
        >
          {{ appraisalCompany.appraisal_company_name }}
        </option>
      </select>
      <template v-if="user.role !== 'insurance_company'">
        <label>insurance company</label>

        <select
          class="form-control mb-3"
          :value="appraiser && appraiser.insurance_company_id"
          aria-describedby="addon-right addon-left"
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
        :value="appraiser.login_id"
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

const {
  mapState: mapStateAppraiser,
  mapActions,
  mapMutations,
} = createNamespacedHelpers("appraisers/newAppraiser");

const { mapState: mapStateCommon } = createNamespacedHelpers("common");
const { mapState: mapStateAccount } = createNamespacedHelpers("account");

export default {
  components: { FormGroupInput, Button },
  methods: {
    ...mapActions(["createAppraiser"]),
    ...mapMutations([
      "setEmail",
      "setPhone",
      "setAddress",
      "setIENumber",
      "setOAONumber",
      "setFirstName",
      "setSecondName",
      "setRegionId",
      "setAppraisalCompanyId",
      "setInsuranceCompanyId",
      "setLoginId",
      "setEmployeeNumber",
    ]),
    async createHandler() {
      await this.createAppraiser();
      this.$router.push("/appraisers");
    },
  },
  computed: {
    ...mapStateAppraiser({
      appraiser: (state) => state.appraiser,
    }),
    ...mapStateAccount({
      user: (state) => state.user,
    }),
    ...mapStateCommon({
      insuranceCompanies: (state) => state.insuranceCompanies,
      regions: (state) => state.regions,
      appraisalCompanies: (state) => state.appraisalCompanies,
    }),
  },
  created() {
    if (this.user.role === "insurance_company") {
      this.setInsuranceCompanyId(this.user.insurance_company_id);
    }
  },
};
</script>