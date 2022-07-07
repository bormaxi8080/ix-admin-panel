<template>
  <div class="row">
    <div class="col-12">
      <fg-input :value="newSDP.email" @input="setEmail($event)" label="email" />
      <fg-input
        :value="newSDP.phone"
        @input="setPhone($event)"
        type="text"
        label="phone"
      />
      <fg-input
        :value="newSDP.address"
        @input="setAddress($event)"
        label="address"
      />
      <fg-input :value="newSDP.name" @input="setName($event)" label="name" />

      <label>region</label>
      <select
        class="form-control mb-3"
        :value="newSDP && newSDP.region_id"
        aria-describedby="addon-right addon-left"
        @change="setRegionId($event.target.value)"
      >
        <option value="" hidden>Choose region</option>
        <option :value="region.id" v-for="region of regions" :key="region.id">
          {{ region.region_name }}
        </option>
      </select>
      <template v-if="user.role !== 'insurance_company'">
        <label>insurance companies</label>
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
          :value="newSDP.insurance_company_id"
          placeholder="Pick some"
        />
      </template>
      <fg-input
        :value="newSDP.login_id"
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
import Multiselect from "vue-multiselect";

const {
  mapState: mapStateNewSDP,
  mapActions,
  mapMutations,
} = createNamespacedHelpers("SDP/newSDP");

const { mapState: mapStateCommon } = createNamespacedHelpers("common");
const { mapState: mapStateAccount } = createNamespacedHelpers("account");

export default {
  components: { FormGroupInput, Button, Multiselect },
  methods: {
    ...mapActions(["createSDP"]),
    ...mapMutations([
      "setEmail",
      "setPhone",
      "setAddress",
      "setRegionId",
      "setInsuranceCompanyId",
      "setLoginId",
      "setName",
    ]),
    async createHandler() {
      await this.createSDP();
      this.$router.push("/sdp");
    },
  },
  computed: {
    ...mapStateNewSDP({
      newSDP: (state) => state.newSDP,
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
      this.setInsuranceCompanyId([{ id: this.user.insurance_company_id }]);
    }
  },
};
</script>