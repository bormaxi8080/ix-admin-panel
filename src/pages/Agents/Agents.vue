<template>
  <div class="row">
    <div class="col-12">
      <card :title="'Agents'" :subTitle="''">
        <div slot="raw-content" class="table-responsive">
          <paper-table url="/agents" :data="agents" :columns="tableColumns"> </paper-table>
        </div>
        <p-button @click="$router.push('/agents/new')">Create agent</p-button>
      </card>
    </div>
  </div>
</template>
<script>
import { PaperTable } from "@/components";
import { Button } from "@/components";
import { createNamespacedHelpers } from "vuex";

const { mapActions, mapState } = createNamespacedHelpers("agents/agentsAll");

export default {
  components: {
    PaperTable,
    Button,
  },
  data() {
    return {
      tableColumns: [
        "insurance_companies",
        "first_name",
        "second_name",
        "employee_number",
        "phone",
        "email",
        "region",
        "address",
        "login_id",
      ],
    };
  },
  methods: {
    ...mapActions(["fetchAgents"]),
  },
  computed: {
    ...mapState({
      agents: (state) => state.agents,
    }),
  },
  created() {
    this.fetchAgents()
  }
};
</script>
