<template>
  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />
  <div v-if="user">
    <div v-if="user.confirmed == false">
      <Confirmed />
    </div>
  </div>
  <div v-if="user">
    <MainHeaderVendor v-show="user.user_admin === 1" />
  </div>
  <div class="max-w-7xl mx-auto flex mb-0 wrapper">
    <TodayFeatured />
  </div>

  <MainFooter />
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import { defineComponent } from "vue";
import axios from "axios";
import authHeader from "../services/auth.header";
import MainHeaderTop from "../layouts/headers/MainHeaderTop.vue";
import MainHeaderMid from "../layouts/headers/MainHeaderMid.vue";
import MainHeaderBottom from "../layouts/headers/MainHeaderBottom.vue";
import MainHeaderVendor from "../layouts/headers/MainHeaderVendor.vue";
import Confirmed from "../layouts/headers/NotConfirmed.vue";
import TodayFeatured from "../components/item_slides/today_featured.vue";
import MainFooter from "../layouts/footers/FooterMain.vue";

export default defineComponent({
  name: "Home",

  components: {
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainHeaderVendor,
    TodayFeatured,
    MainFooter,
    Confirmed,
  },

  data() {
    return {
      token: null,
      confirmed: "",
      current_user: "",
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  mounted() {
    this.userstatus();
    this.userstatusconfirmed();
  },

  methods: {
    async userstatus() {
      await axios({
        method: "get",
        url: "/auth/whoami",
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if ((response.status = 200)) {
              current_user = response.data.user
            this.$store.dispatch("user", response.data.user);
          }
        })
        .catch((error) => {current_user = null});
    },
    async userstatusconfirmed() {
      await axios({
        method: "get",
        url: "/auth/amiconfirmed",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
          if (response.data.confirmed == true) {
            this.confirmed = true;
          } else if (response.data.confirmed == false) {
            this.confirmed = false;
          }
        }
      }).catch((error) => {
        
      });
    },
  },
});
</script>

<style type="ts" scoped>

</style>
