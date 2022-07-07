<template>
  <div class="row">
    <div class="col-12">
      <fg-input
        @input="setAppraisalCompanyName($event)"
        label="appraisal company name"
        :value="appraisalCompany && appraisalCompany.appraisal_company_name"
      />
      <fg-input
        :value="appraisalCompany && appraisalCompany.oao_ie_number"
        @input="setOAOIENumber($event)"
        label="OAO IE number"
      />
      <fg-input
        :value="appraisalCompany && appraisalCompany.email"
        @input="setEmail($event)"
        label="email"
      />
      <fg-input
        :value="appraisalCompany && appraisalCompany.phone"
        @input="setPhone($event)"
        type="text"
        label="phone"
      />
      <fg-input
        :value="appraisalCompany && appraisalCompany.office_address"
        @input="setOfficeAddress($event)"
        label="office address"
      />
      <template v-if="user.role !== 'insurance_company'">
        <label>insurance company</label>
        <select
          class="form-control mb-3"
          :value="appraisalCompany && appraisalCompany.insurance_company_id"
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
      <p-button class="mr-5" @click="updateHandler()">Update</p-button>
      <p-button @click="deleteHandler()">Delete</p-button>
    </div>
  </div>
</template>
<script>
import { FormGroupInput, Button } from "@/components";
import { createNamespacedHelpers } from "vuex";

const {
  mapState: mapStateAppraisalCompanyDetail,
  mapActions: mapActionsAppraisalCompanyDetail,
  mapMutations: mapMutationsAppraisalCompanyDetail,
} = createNamespacedHelpers("appraisalCompanies/appraisalCompanyDetail");

const { mapState: mapStateCommon } = createNamespacedHelpers("common");
const { mapState: mapStateAccount } = createNamespacedHelpers("account");

export default {
  components: { FormGroupInput, Button },
  methods: {
    ...mapActionsAppraisalCompanyDetail([
      "updateAppraisalCompany",
      "deleteAppraisalCompany",
      "fetchAppraisalCompany",
    ]),
    ...mapMutationsAppraisalCompanyDetail([
      "setAppraisalCompanyId",
      "setPhone",
      "setOfficeAddress",
      "setOAOIENumber",
      "setAppraisalCompanyName",
      "setInsuranceCompanyId",
      "setEmail",
    ]),
    async deleteHandler() {
      await this.deleteAppraisalCompany();
      this.$router.push("/appraisal-companies");
    },
    async updateHandler() {
      await this.updateAppraisalCompany();
      this.$router.push("/appraisal-companies");
    },
  },
  computed: {
    ...mapStateAppraisalCompanyDetail({
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
    this.setAppraisalCompanyId(this.$route.params.appraisalCompanyId);
    this.fetchAppraisalCompany();
  },
};
</script>