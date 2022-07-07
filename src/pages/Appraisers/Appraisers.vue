<template>
  <div class="row">
    <div class="col-12">
      <card :title="'Appraisers'" :subTitle="''">
        <div slot="raw-content" class="table-responsive">
          <paper-table
            url="/appraisers"
            :data="appraisers"
            :columns="tableColumns"
          >
          </paper-table>
        </div>
        <p-button @click="$router.push('/appraisers/new')"
          >Create appraiser</p-button
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
  "appraisers/appraisersAll"
);

const { mapState: mapStateCommon } = createNamespacedHelpers("common");

export default {
  components: {
    PaperTable,
    Button,
  },
  methods: {
    ...mapActions(["fetchAppraisers"]),
  },
  data() {
    return {
      tableColumns: [
        "insurance_company",
        "appraisal_company",
        "first_name",
        "second_name",
        "ooo_number",
        "ie_number",
        "employee_number",
        "phone",
        "email",
        "region",
        "address",
        "login_id",
      ],
    };
  },
  computed: {
    ...mapState({
      appraisers: (state) => state.appraisers,
    }),
  },
  created() {
    this.fetchAppraisers();
  },
};
</script>
<style>
</style>
