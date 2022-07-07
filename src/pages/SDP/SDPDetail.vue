<template>
  <div class="row">
    <div class="col-12">
      <fg-input
        :value="SDP && SDP.email"
        @input="setEmail($event)"
        label="email"
      />
      <fg-input
        :value="SDP && SDP.phone"
        @input="setPhone($event)"
        type="text"
        label="phone"
      />
      <fg-input
        :value="SDP && SDP.address"
        @input="setAddress($event)"
        label="address"
      />
      <fg-input
        :value="SDP && SDP.name"
        @input="setName($event)"
        label="name"
      />

      <label>region</label>
      <select
        class="form-control mb-3"
        :value="SDP && SDP.region_id"
        aria-describedby="addon-right addon-left"
        @change="setRegionId($event.target.value)"
      >
        <option value="" hidden>Choose region</option>
        <option :value="region.id" v-for="region of regions" :key="region.id">
          {{ region.region_name }}
        </option>
      </select>
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
          :value="SDP && SDP.insurance_companies"
          placeholder="Pick some"
        />
      </template>
      <fg-input
        :value="SDP && SDP.login_id"
        @input="setLoginId($event)"
        label="login id"
      />
      <p-button @click="updateHandler()" class="mr-5">Update</p-button>
      <p-button @click="deleteHandler()">Delete</p-button>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } =
  createNamespacedHelpers("SDP/SDPDetail");
const { mapState: mapStateCommon } = createNamespacedHelpers("common");
const { mapState: mapStateAccount } = createNamespacedHelpers("account");

import Multiselect from "vue-multiselect";

export default {
  name: "insurance-company-detail",
  components: { Multiselect },
  computed: {
    ...mapState({
      SDP: (state) => state.SDP,
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
    ...mapActions(["fetchSDP", "updateSDP", "deleteSDP"]),
    ...mapMutations([
      "setSDPId",
      "setEmail",
      "setPhone",
      "setAddress",
      "setRegionId",
      "setInsuranceCompanyId",
      "setLoginId",
      "setName",
    ]),
    async deleteHandler() {
      await this.deleteSDP();
      this.$router.push("/sdp");
    },
    async updateHandler() {
      await this.updateSDP();
      this.$router.push("/sdp");
    },
  },
  created() {
    console.log(this.$route.params);
    console.log(this.setSDPId);
    this.setSDPId(this.$route.params.SDPId);
    this.fetchSDP();
  },
};
</script>