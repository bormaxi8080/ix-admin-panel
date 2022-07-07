<template>
  <div class="row">
    <div class="col-12">
      <card :title="'SDP'" :subTitle="''">
        <div slot="raw-content" class="table-responsive">
          <paper-table url="/sdp" :data="SDP" :columns="tableColumns"> </paper-table>
        </div>
        <p-button @click="$router.push('sdp/new')">Create SDP</p-button>
      </card>
    </div>
  </div>
</template>
<script>
import { PaperTable } from "@/components";
import { Button } from "@/components";
import { createNamespacedHelpers } from "vuex";

const { mapActions, mapState } = createNamespacedHelpers("SDP/SDPAll");

export default {
  components: {
    PaperTable,
    Button,
  },
  data() {
    return {
      tableColumns: [
        "insurance_companies",
        "name",
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
      SDP: (state) => state.SDP,
    }),
  },
  methods: {
    ...mapActions(["fetchSDP"]),
  },
  created() {
    this.fetchSDP();
  },
};
</script>
<style>
</style>
