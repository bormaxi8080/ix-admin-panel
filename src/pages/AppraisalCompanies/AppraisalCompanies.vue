<template>
  <div class="row">
    <div class="col-12">
      <card :title="'Appraisal companies'" :subTitle="''">
        <div slot="raw-content" class="table-responsive">
          <paper-table
            url="/appraisal-companies"
            :data="companies"
            :columns="tableColumns"
          >
          </paper-table>
        </div>
        <p-button @click="$router.push('/appraisal-companies/new')"
          >Create appraisal company</p-button
        >
      </card>
    </div>
  </div>
</template>
<script>
import { PaperTable } from "@/components";
import { Button } from "@/components";
import { createNamespacedHelpers } from "vuex";

const { mapActions, mapState } = createNamespacedHelpers(
  "appraisalCompanies/appraisalCompaniesAll"
);

export default {
  components: {
    PaperTable,
    Button,
  },
  data() {
    return {
      tableColumns: [
        "insurance_companies",
        "appraisal_company_name",
        "OAO_IE_number",
        "phone",
        "email",
        "office_address",
      ],
    };
  },
  methods: {
    ...mapActions(["fetchCompanies"]),

  },
  computed: {
    ...mapState({
      companies: (state) => state.companies,
    }),
  },
  created() {
    this.fetchCompanies();
  },
};
</script>
<style>
</style>
