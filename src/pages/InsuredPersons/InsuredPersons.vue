<template>
  <div class="row">
    <div class="col-12">
      <card :title="'Insured persons'" :subTitle="''">
        <div slot="raw-content" class="table-responsive">
          <paper-table
            url="insured-persons"
            :columns="tableColumns"
            :data="insuredPersons"
          ></paper-table>
        </div>
        <p-button @click="$router.push('/insured-persons/new')"
          >Create insured person</p-button
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
  "insuredPersons/insuredPersonsAll"
);

export default {
  components: {
    PaperTable,
    Button,
  },
  data() {
    return {
      tableColumns: [
        "insurance_company",
        "agent",
        "first_name",
        "second_name",
        "passport_id",
        "phone",
        "email",
        "region",
        "address",
        "login_id",
      ],
    };
  },
  methods: {
    ...mapActions(["fetchInsuredPersons"]),
  },
  computed: {
    ...mapState({
        insuredPersons: (state) => state.persons,
    })
  },
  async created() {
    await this.fetchInsuredPersons();
    console.log(this.insuredPersons)
  },
};
</script>
