<template>
  <template>
    <MainHeaderTop />
    <MainHeaderMid />
    <MainHeaderBottom />
    <div v-if="user">
      <MainHeaderVendor v-show="user.user_admin == 1" />
    </div>
    <div class="max-w-7xl mx-auto wrapper">asdasd</div>
    <MainFooter />
  </template>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { ref } from "vue";
import { mapGetters } from "vuex";
import authHeader from "../../services/auth.header";
import MainHeaderTop from "../../layouts/headers/MainHeaderTop.vue";
import MainHeaderMid from "../../layouts/headers/MainHeaderMid.vue";
import MainHeaderBottom from "../../layouts/headers/MainHeaderBottom.vue";
import MainHeaderVendor from "../../layouts/headers/MainHeaderVendor.vue";
import MainFooter from "../../layouts/footers/FooterMain.vue";
import { notify } from "@kyvg/vue3-notification";


export default defineComponent({
  name: "UserProfile",
  components: {
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainHeaderVendor,
  },
  data() {
    return {
      currencyList: [],
      countryList: [],
      currencydefault: "",
      countrydefault: "",
      currency: "",
      country: "",
      user_email: "",
      user_name: "",
    };
  },

  computed: {
    ...mapGetters(["user"]),
  },

  mounted() {
    this.userstatus();
    this.getCountryList();
    this.getCurrencyList();
    this.getuserinfo();
  },

  methods: {
    async userstatus() {
      await axios({
        method: "get",
        url: "/auth/whoami",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if ((response.status = 200)) {
          this.user_email = response.data.user.user_email;
          this.user_name = response.data.user.user_name;
        } else {
        }
      });
    },
    async updateuser(payLoad: { country: string; currency: string }) {
      await axios({
        method: "put",
        url: "/info/user-info-update",
        data: payLoad,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if ((response.status = 200)) {
            notify({
              title: "Authorization",
              text: "Successfully updated your profile!",
              type: "success",
            });
          }
        })
        .catch((error) => {
          notify({
            title: "Authorization",
            text: "Invalid Credentials.",
            type: "error",
          });
        });
    },
    async getuserinfo() {
      await axios({
        method: "get",
        url: "/info/country-currency",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if ((response.status = 200)) {
          this.currencydefault = response.data.currency;
          this.countrydefault = response.data.country;
          this.country = this.countrydefault;
          this.currency = this.currencydefault;
        }
      });
    },
    async getCurrencyList() {
      const path = "/auth/query/currency";

      await axios({
        method: "get", //you can set what request you want to be
        url: path,
        withCredentials: true,

      })
        .then((response) => {
          this.currencyList = response.data;
        })
        .catch((error) => {});
    },
    async getCountryList() {
      const path = "/auth/query/country";
      await axios
        .get(path, { withCredentials: true })
        .then((response) => {
          this.countryList = response.data;
        })
        .catch((error) => {});
    },
    async onSubmit() {
      const payLoad = {
        currency: this.currency,
        country: this.country,
      };
      await this.updateuser(payLoad);
    },
  },
});
</script>

<style type="ts" scoped>
.bordered {
  border-style: solid;
  border-width: 1px;
  border-color: #eeeeee;
}
.bordered {
  border-style: solid;
  border-width: 1px;
  border-color: #a7a0a0;
}
.rcorners1 {
  border-radius: 15px;
}
.greyhover:hover {
  background-color: #eeeeee;
}
.wordcolor {
  color: #6b6565;
}
</style>
