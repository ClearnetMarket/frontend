
<template>

  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />

  <div class="container  max-w-7xl mx-auto px-10 pb-60 bg-gray-300"><!-- Container-->
    <div class="mt-5 mb-5">
      <nav class="rounded-md w-full">
        <ol class="list-reset flex">
          <li>
            <router-link :to="{ name: 'home' }">
              <a class="text-blue-600 hover:text-blue-700">Home</a>
            </router-link>
          </li>
          <li>
            <span class="text-gray-500 mx-2">/</span>
          </li>

          <li>
            <router-link :to="{ name: 'wallet' }">
              <a class="text-blue-600 hover:text-blue-700">Wallet Home</a>
            </router-link>
          </li>
          <li>
            <span class="text-gray-500 mx-2">/</span>
          </li>
        </ol>
      </nav>
    </div>

    <div class="flex gap-4">
      <div class="flex text-[22px] ">Deposit Bitcoin Cash</div>
      <div class=" mx-10 justify-center mt-20 text-[20px]">
        Address:
      </div>
      <div class=" mx-10 justify-center mt-20 text-[20px]">
        {{ bch_address }}
      </div>
    </div>
  </div>

  <MainFooter />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { mapGetters } from "vuex";
import MainHeaderTop from "../../../layouts/headers/MainHeaderTop.vue";
import MainHeaderMid from "../../../layouts/headers/MainHeaderMid.vue";
import MainHeaderBottom from "../../../layouts/headers/MainHeaderBottom.vue";
import MainHeaderVendor from "../../../layouts/headers/MainHeaderVendor.vue";
import MainFooter from "../../../layouts/footers/FooterMain.vue";
import authHeader from "../../../services/auth.header";

export default defineComponent({
  name: "bchrecieve",
  components: {
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainHeaderVendor,
    MainFooter,
  },
  mounted () {
    // this.userstatus();
    this.getbchaddress();
  },
  data () {
    return {
      bch_address: '',
    };
  },


  methods: {
    userstatus () {
      axios({
        method: "get",
        url: "/auth/whoami",
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if ((response.status = 200)) {
          }
        })
        .catch((error) => {
          console.log(error)
        });
    },
    getbchaddress () {
      axios({
        method: "get",
        url: "/bch/receive",
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if ((response.status = 200)) {
            this.bch_address = response.data.bch_address;
          }
        })
        .catch((error) => {
          console.log(error)
        });
    },
  },
});
</script>

<style type="ts" scoped>

</style>
