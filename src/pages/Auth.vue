<template>
  <div class="auth">
    <fg-input
      :value="loginForm.username"
      @input="setUsername($event)"
      placeholder="username"
    />
    <fg-input
      :value="loginForm.password"
      @input="setPassword($event)"
      type="password"
      placeholder="password"
    />
    <p-button @click="login">Login</p-button>
  </div>
</template>
<script>
import { FormGroupInput, Button } from "@/components";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapActions } =
  createNamespacedHelpers("account");

export default {
  components: { Button, FormGroupInput },
  methods: {
    ...mapMutations(["setUsername", "setPassword"]),
    ...mapActions(["login"]),
  },
  computed: {
    ...mapState({
      loginForm: (state) => state.loginForm,
      isLogin: (state) => state.isLogin,
      user: (state) => state.user,
    }),
  },
  watch: {
    user: {
      handler() {
        if (this.user) {
          this.$router.push("/insured-persons");
        }
      },
      immediate: true,
    },
  },
};
</script>
<style>
.auth {
  background-color: #f4f3ef;
  width: 500px;
  margin: 50px auto;
  padding: 50px;
}
</style>