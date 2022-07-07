<template>
  <div class="row">
    <div class="col-12">
      <fg-input
        :value="appraiser && appraiser.ie_number"
        @input="setIENumber($event)"
        type="number"
        label="IE number"
      />
      <fg-input
        :value="appraiser && appraiser.email"
        @input="setEmail($event)"
        label="email"
      />
      <fg-input
        :value="appraiser && appraiser.phone"
        @input="setPhone($event)"
        type="text"
        label="phone"
      />
      <fg-input
        :value="appraiser && appraiser.address"
        @input="setAddress($event)"
        label="address"
      />
      <fg-input
        :value="appraiser && appraiser.ooo_number"
        @input="setOAONumber($event)"
        label="OOO number"
      />
      <fg-input
        :value="appraiser && appraiser.first_name"
        @input="setFirstName($event)"
        label="first name"
      />
      <fg-input
        :value="appraiser && appraiser.second_name"
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
        :value="appraiser && appraiser.login_id"
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
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "appraisers/appraiserDetail"
);
const { mapState: mapStateCommon } = createNamespacedHelpers("common");
const { mapState: mapStateAccount } = createNamespacedHelpers("account");

export default {
  name: "insurance-company-detail",
  computed: {
    ...mapState({
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
  methods: {
    ...mapActions(["fetchAppraiser", "updateAppraiser", "deleteAppraiser"]),
    ...mapMutations([
      "setAppraiserId",
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
    ]),
    async deleteHandler() {
      await this.deleteAppraiser();
      this.$router.push("/appraisers");
    },
    async updateHandler() {
      await this.updateAppraiser();
      this.$router.push("/appraisers");
    },
  },
  created() {
    this.setAppraiserId(this.$route.params.appraiserId);
    this.fetchAppraiser();
    
  },
};
</script>