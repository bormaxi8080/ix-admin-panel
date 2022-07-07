<template>
  <div class="row">
    <div class="col-12">
      <card :title="'Insurance companies'" :subTitle="''">
        <div slot="raw-content" class="table-responsive">
          <paper-table url="/insurance-companies" :data="companies" :columns="tableColumns"> </paper-table>
        </div>
        <p-button @click="$router.push('insurance-companies/new')"
          >Create insurance company</p-button
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
  "insuranceCompanies/insuranceCompaniesAll"
);

export default {
  components: {
    PaperTable,
    Button,
  },
  data() {
    return {
      tableColumns: ["title", "ie_number", "email", "phone", "address"],
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
