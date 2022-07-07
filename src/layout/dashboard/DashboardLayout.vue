<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link
          to="/insurance-companies"
          name="insurance companies"
          icon="ti-view-list-alt"
          v-if="user.role === 'superadmin'"
        />
        <sidebar-link
          to="/insured-persons"
          name="Insured persons"
          icon="ti-view-list-alt"
        />
        <sidebar-link to="/agents" name="Agents" icon="ti-view-list-alt" />
        <sidebar-link
          to="/appraisal-companies"
          name="Appraisal companies"
          icon="ti-view-list-alt"
        />
        <sidebar-link
          to="/appraisers"
          name="Appraisers"
          icon="ti-view-list-alt"
        />
        <sidebar-link to="/sdp" name="SDP" icon="ti-view-list-alt" />
        <sidebar-link
          to="/insured-events"
          name="Insured events"
          icon="ti-view-list-alt"
        />
      </template>
      <mobile-menu>
        <li class="nav-item">
          <a class="nav-link">
            <i class="ti-panel"></i>
            <p>Stats</p>
          </a>
        </li>
        <drop-down
          class="nav-item"
          title="5 Notifications"
          title-classes="nav-link"
          icon="ti-bell"
        >
          <a class="dropdown-item">Notification 1</a>
          <a class="dropdown-item">Notification 2</a>
          <a class="dropdown-item">Notification 3</a>
          <a class="dropdown-item">Notification 4</a>
          <a class="dropdown-item">Another notification</a>
        </drop-down>
        <li class="nav-item">
          <a class="nav-link">
            <i class="ti-settings"></i>
            <p>Settings</p>
          </a>
        </li>
        <li class="divider"></li>
      </mobile-menu>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar"> </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
import { createNamespacedHelpers } from "vuex";

const { mapState: mapStateAccount } = createNamespacedHelpers("account");

export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu,
  },
  computed: {
    ...mapStateAccount({
      user: (state) => state.user,
    }),
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      const store = vm.$store.state;
      if (!store.account.user) {
        vm.$router.push("/auth");
        return;
      }

      const { requiredRole } = to.meta;
      const { role } = vm.$store.state.account.user;

      if (requiredRole) {
        if (role !== requiredRole) {
          vm.$router.push("/insured-persons");
          return;
        }
      }
    });
  },
};
</script>
