<template>
  <div class="row">
    <div class="col-12">
      <fg-input
        @input="setAppraisalCompanyName($event)"
        label="appraisal company name"
      />
      <fg-input @input="setOAOIENumber($event)" label="OAO IE number" />
      <fg-input @input="setEmail($event)" label="email" />
      <fg-input @input="setPhone($event)" type="text" label="phone" />
      <fg-input @input="setOfficeAddress($event)" label="office address" />
      <template v-if="user.role !== 'insurance_company'">
        <label>insurance company</label>
        <select
          class="form-control mb-3"
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
      <label>region</label>
      <select
        class="form-control mb-3"
        aria-describedby="addon-right addon-left"
        @change="setRegionId($event.target.value)"
      >
        <option value="" hidden>Choose region</option>
        <option :value="region.id" v-for="region of regions" :key="region.id">
          {{ region.region_name }}
        </option>
      </select>
      <p-button @click="createHandler()">Create</p-button>
    </div>
  </div>
</template>
<script>
import { FormGroupInput, Button } from "@/components";
import { createNamespacedHelpers } from "vuex";

const {
  mapState: mapStateNewAppraisalCompany,
  mapActions: mapActionsNewAppraisalCompany,
  mapMutations: mapMutationsNewAppraisalCompany,
} = createNamespacedHelpers("appraisalCompanies/newAppraisalCompany");

const { mapState: mapStateCommon } = createNamespacedHelpers("common");
const { mapState: mapStateAccount } = createNamespacedHelpers("account");

export default {
  components: { FormGroupInput, Button },
  methods: {
    ...mapActionsNewAppraisalCompany(["createAppraisalCompany"]),
    ...mapMutationsNewAppraisalCompany([
      "setPhone",
      "setOfficeAddress",
      "setOAOIENumber",
      "setAppraisalCompanyName",
      "setInsuranceCompanyId",
      "setEmail",
      "setRegionId",
    ]),
    async createHandler() {
      await this.createAppraisalCompany();
      this.$router.push("/appraisal-companies");
    },
  },
  computed: {
    ...mapStateNewAppraisalCompany({
      appraisalCompany: (state) => state.appraisalCompany,
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
      this.setInsuranceCompanyId(this.user.insurance_company_id);
    }
  },
};
</script>