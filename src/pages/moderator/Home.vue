<template>
  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />

  <div class="max-w-4xl mx-auto wrapper px-10">
    <div class="grid grid-cols-1 w-full gap-4">
      <div class="mb-10 mt-5 px-5">
        <nav class="rounded-md">
          <ol class="list-reset flex">
            <li>
              <router-link :to="{ name: 'home' }">
                <a class="text-blue-600 hover:text-blue-700">Home</a>
              </router-link>
            </li>
            <li>
              <span class="text-gray-500 mx-2">/</span>
            </li>
          </ol>
        </nav>
      </div>
    </div>
    <div class="grid grid-cols-12">
      <div class="col-span-12 mt-5 text-[20px]">Moderator Home</div>
      <div class="col-span-12 mt-5 text-[16px]">Disputes Need Mod Support</div>
      <div class="col-span-12 mt-5">
        <div v-for="dispute in needmodorders">
          <div class="grid grid-cols-12 border border-1 p-2 rounded bg-gray-400">
            <div class="col-span-12">{{ dispute.uuid }}</div>
            <div class="col-span-6">{{ dispute.vendor_user_name }}</div>
            <div class="col-span-6">{{ dispute.customer_user_name }}</div>
            <div class="col-span-12">
              <div class="my-2">
                <router-link
                  :to="{
                    name: 'ModDispute',
                    params: { uuid: dispute.uuid },
                  }"
                >
                  <button
                    class="bg-zinc-600 hover:bg-zinc-400 text-white font-bold py-1 px-3 ml-5 mr-5 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    View Dispute
                  </button>
                </router-link>
                <router-link
                  :to="{
                    name: 'ModDispute',
                    params: { uuid: dispute.uuid },
                  }"
                >
                  <button
                    class="bg-yellow-400 hover:bg-yellow-600 text-white font-bold py-1 px-3 ml-5 mr-5 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Become Moderator
                  </button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-12 mt-5 text-[16px]">Disputes being moderatored</div>
      <div class="col-span-12 mt-5">
        <div v-for="dispute in hadmodorders"></div>
      </div>
    </div>
  </div>
  <MainFooter />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import authHeader from "../../services/auth.header";
import MainHeaderTop from "../../layouts/headers/MainHeaderTop.vue";
import MainHeaderMid from "../../layouts/headers/MainHeaderMid.vue";
import MainHeaderBottom from "../../layouts/headers/MainHeaderBottom.vue";
import MainHeaderVendor from "../../layouts/headers/MainHeaderVendor.vue";
import MainFooter from "../../layouts/footers/FooterMain.vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "ModHome",

  components: {
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainHeaderVendor,
    MainFooter,
  },

  data() {
    return {
      needmodorders: [],
      hadmodorders: [],
    };
  },

  mounted() {
    this.getdisputesneedmod();
    this.getdisputeshasmod();
  },

  methods: {
    relativeDate(value) {
      var d = value;
      var e = new Date(d).valueOf();
      return formatDistance(e, new Date());
    },
    // get the user order
    getdisputesneedmod: async function () {
      await axios({
        method: "get",
        url: "/mod/disputes/available",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
          this.needmodorders = response.data;
        }
      });
    },
    getdisputeshasmod: async function () {
      await axios({
        method: "get",
        url: "/mod/disputes/modded",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
          this.hadmodorders = response.data;
        }
      });
    },
  },
});
</script>
