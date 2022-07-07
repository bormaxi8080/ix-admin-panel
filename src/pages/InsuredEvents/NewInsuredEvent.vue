<template>
  <div class="row">
    <div class="col-12">
      <fg-input
        :value="newInsuredEvent.address"
        @input="setAddress($event)"
        type="text"
        label="address"
      />
      <label>event</label>
      <select
        class="form-control mb-3"
        :value="newInsuredEvent && newInsuredEvent.event_type"
        aria-describedby="addon-right addon-left"
        @change="setEventType($event.target.value)"
      >
        <option value="" hidden>Choose event</option>
        <option value="crash">crash</option>
        <option value="fire">fire</option>
      </select>
      <fg-input
        :value="newInsuredEvent.date"
        @input="setDate($event)"
        type="date"
        label="date"
      />
      <fg-input
        :value="newInsuredEvent.garage_name"
        @input="setGarageName($event)"
        label="garage name"
      />
      <fg-input
        :value="newInsuredEvent.insured_event_number"
        @input="setInsuredEventNumber($event)"
        label="insured event number"
      />
      <label>region</label>
      <select
        class="form-control mb-3"
        :value="newInsuredEvent && newInsuredEvent.region_id"
        aria-describedby="addon-right addon-left"
        @change="setRegionId($event.target.value)"
      >
        <option value="" hidden>Choose region</option>
        <option :value="region.id" v-for="region of regions" :key="region.id">
          {{ region.region_name }}
        </option>
      </select>
      <label>appraisal company</label>
      <select
        class="form-control mb-3"
        :value="newInsuredEvent && newInsuredEvent.appraisal_company_id"
        aria-describedby="addon-right addon-left"
        @change="setAppraisalCompanyId($event.target.value)"
      >
        <option value="" hidden>Choose appraisal company</option>
        <option
          :value="appraisalCompany.id"
          v-for="appraisalCompany of appraisalCompanies"
          :key="appraisalCompany.id"
        >
          {{ appraisalCompany.appraisal_company_name }}
        </option>
      </select>
      <template v-if="user.role !== 'insurance_company'">
        <label>insurance company</label>
        <select
          class="form-control mb-3"
          :value="newInsuredEvent && newInsuredEvent.insurance_company_id"
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
      <label>insured person</label>
      <select
        class="form-control mb-3"
        :value="newInsuredEvent && newInsuredEvent.insured_person_id"
        aria-describedby="addon-right addon-left"
        @change="setInsuredPersonId($event.target.value)"
      >
        <option value="" hidden>Choose insured person</option>
        <option
          :value="insuredPerson.id"
          v-for="insuredPerson of insuredPersons"
          :key="insuredPerson.id"
        >
          {{ insuredPerson.first_name }} {{ insuredPerson.second_name }}
        </option>
      </select>
      <label>agent</label>
      <select
        class="form-control mb-3"
        :value="newInsuredEvent && newInsuredEvent.agent_id"
        aria-describedby="addon-right addon-left"
        @change="setAgentId($event.target.value)"
      >
        <option value="" hidden>Choose agent</option>
        <option :value="agent.id" v-for="agent of agents" :key="agent.id">
          {{ agent.first_name }} {{ agent.second_name }}
        </option>
      </select>
      <label>appraiser</label>
      <select
        class="form-control mb-3"
        :value="newInsuredEvent && newInsuredEvent.appraiser_id"
        aria-describedby="addon-right addon-left"
        @change="setAppraiserId($event.target.value)"
      >
        <option value="" hidden>Choose appraiser</option>
        <option
          :value="appraiser.id"
          v-for="appraiser of appraisers"
          :key="appraiser.id"
        >
          {{ appraiser.first_name }} {{ appraiser.second_name }}
        </option>
      </select>
      <label>Media</label>
      <!-- <template v-if="newInsuredEvent.files.length">
        <video :src="getVideoBlob(newInsuredEvent.files)" controls></video>
      </template> -->
      <div class="mb-3">
        <label class="fileLoader btn" for="fileLoader">Upload file</label>
      </div>
      <input
        hidden
        id="fileLoader"
        type="file"
        @change="setFileHandler($event.target.files[0])"
      />
      <div class="media-container">
        <div
          class="mr-5 mb-5"
          :key="file.id"
          v-for="file of newInsuredEvent.files"
        >
          <p-button @click="deleteFile(file.id)" class="d-block mb-2 mx-auto"
            >Delete</p-button
          >
          <img
            :src="getBlob(file.body)"
            v-if="file.body.type.split('/')[0] === 'image'"
            class="media"
          />
          <video
            :src="getBlob(file.body)"
            v-if="file.body.type.split('/')[0] === 'video'"
            class="media"
            controls
          ></video>
        </div>
      </div>
      <div class="d-flex justify-content-start">
        <fg-input type="checkbox" label="appraiser" />
      </div>
      <p-button @click="createHandler()">Create</p-button>
    </div>
  </div>
</template>
<script>
import { FormGroupInput, Button } from "@/components";
import { createNamespacedHelpers } from "vuex";

const {
  mapState: mapStateNewInsuredEvent,
  mapActions,
  mapMutations,
} = createNamespacedHelpers("insuredEvents/newInsuredEvent");

const { mapState: mapStateCommon } = createNamespacedHelpers("common");
const { mapState: mapStateAccount } = createNamespacedHelpers("account");

export default {
  components: { FormGroupInput, Button },
  methods: {
    ...mapActions(["createInsuredEvent"]),
    ...mapMutations([
      "setAddress",
      "setGarageName",
      "setInsuranceCompanyId",
      "setInsuredPersonId",
      "setAppraisalCompanyId",
      "setAgentId",
      "setEventType",
      "setAppraiserId",
      "setDate",
      "setInsuredEventNumber",
      "setRegionId",
      "setFile",
      "deleteFile",
    ]),
    async createHandler() {
      await this.createInsuredEvent();
      this.$router.push("/insured-events");
    },
    getBlob(blob) {
      return URL.createObjectURL(blob);
    },
    setFileHandler(file) {
      const type = file.type.split("/")[0];
      console.log(type);
      if (type !== "image" && type !== "video") {
        alert("Only images and videos are supported");
        return;
      }

      this.setFile(file);
    },
  },
  computed: {
    ...mapStateNewInsuredEvent({
      newInsuredEvent: (state) => state.newInsuredEvent,
    }),
    ...mapStateAccount({
      user: (state) => state.user,
    }),
    ...mapStateCommon({
      insuranceCompanies: (state) => state.insuranceCompanies,
      regions: (state) => state.regions,
      appraisalCompanies: (state) => state.appraisalCompanies,
      insuredPersons: (state) => state.insuredPersons,
      agents: (state) => state.agents,
      appraisers: (state) => state.appraisers,
    }),
  },
  created() {
    if (this.user.role === "insurance_company") {
      this.setInsuranceCompanyId(this.user.insurance_company_id);
    }
  },
};
</script>