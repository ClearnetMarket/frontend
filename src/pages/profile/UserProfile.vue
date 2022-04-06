<template>
  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />
  <div v-if="user">
    <MainHeaderVendor v-show="user.user_admin == 1" />
  </div>
  <div class="max-w-7xl mx-auto wrapper">
    <div class="grid grid-cols-12">
      <div
        class="col-span-12 mx-10 my-10 border border-gray-300 bg-gray-200 text-[20px]"
      >
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-2 text-[14px]">{{ user.profileimage }}</div>
          <div class="col-span-3 text-[14px]">
            <div class="text-[20px]">{{ user.display_name }}</div>
            <div class="">
              Selling Since: {{ relativeDate(user.member_since) }}
            </div>
          </div>
          <div class="col-span-7 text-[14px]">
            {{ user.bio }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <MainFooter />
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
import { formatDistance } from "date-fns";

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
      user: [],
      transactions: [],
      date: Date.now(),
      tab: [],
    };
  },

  computed: {
    ...mapGetters(["user"]),
  },

  mounted() {
    this.getuserinfo();
  },
  filters: {
    relativeDate(value) {
      let d = value;
      let e = new Date(d).valueOf();
      return formatDistance(e, new Date());
    },
  },
  methods: {
    async getuserinfo() {
      await axios({
        method: "get",
        url: "/info/user-info",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if ((response.status = 200)) {
          this.user = response.data;
       
        }
      });
    },
    relativeDate(value) {
      var d = value;
      var e = new Date(d).valueOf();
      return formatDistance(e, new Date());
    },
  },
});
</script>

<style type="ts" scoped></style>
