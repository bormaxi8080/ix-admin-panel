<template>
  <div class="row">
    <div class="col-12">
      <card :title="'Insured events'" :subTitle="''">
        <div slot="raw-content" class="table-responsive">
          <paper-table
            url="insured-events"
            :data="insuredEvents"
            :columns="tableColumns"
          >
          </paper-table>
        </div>
        <p-button @click="$router.push('/insured-events/new')"
          >Create insured event</p-button
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
  "insuredEvents/insuredEventsAll"
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
        "insured_event_number",
        "insured_person",
        "event_type",
        "region",
        "address",
        "date",
        "agent",
        "appraisal_company",
        "appraiser",
        "garage_name",
      ],
    };
  },
  computed: {
    ...mapState({
      insuredEvents: (state) => state.insuredEvents,
    }),
  },
  methods: {
    ...mapActions(["fetchInsuredEvents"]),
  },
  created() {
    this.fetchInsuredEvents();
  },
};
</script>
