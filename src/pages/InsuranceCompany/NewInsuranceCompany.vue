<template>
  <div class="row">
    <div class="col-12">
      <fg-input label="name" />
      <fg-input label="IP number" />
      <fg-input label="email" />
      <fg-input label="phone" />
      <fg-input label="address" />
      <p-button>Create</p-button>
    </div>
  </div>
</template>
<script>
import { FormGroupInput, Button } from "@/components";

export default {
  components: { FormGroupInput, Button },
};
</script>