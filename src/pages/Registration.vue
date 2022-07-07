<template>
  <div class="registration">
    <fg-input color="gray" placeholder="login" />
    <fg-input placeholder="password" />
    <p-button>Registration</p-button>
  </div>
</template>
<script>
import { FormGroupInput, Button } from "@/components";

export default {
  components: { Button, FormGroupInput },
};
</script>
<style>
.registration {
  background-color: #f4f3ef;
  width: 500px;
  margin: 50px auto;
  padding: 50px;
}
</style>