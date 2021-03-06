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
          <div
            class="grid grid-cols-12 border border-1 p-2 rounded bg-gray-400"
          >
            <div class="col-span-12">Order id: {{ dispute.uuid }}</div>
            <div class="col-span-6">Vendor: {{ dispute.vendor_user_name }}</div>
            <div class="col-span-6">
              Customer: {{ dispute.customer_user_name }}
            </div>
            <div class="col-span-12">
              <div class="my-2 flex">
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
                <div v-if="dispute.moderator_uuid == null">
                  <button
                    class="bg-yellow-400 hover:bg-yellow-600 text-white font-bold py-1 px-3 ml-5 mr-5 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    @click="becomemod(dispute.uuid)"
                  >
                    Become Moderator
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-12 mt-5 text-[16px]">Disputes being moderatored</div>
      <div class="col-span-12 mt-5">
        <div v-for="dispute in hadmodorders">
          <div
            class="grid grid-cols-12 border border-1 p-2 rounded bg-gray-400"
          >
            <div class="col-span-12">Order id: {{ dispute.uuid }}</div>
            <div class="col-span-6">Vendor: {{ dispute.vendor_user_name }}</div>
            <div class="col-span-6">
              Customer: {{ dispute.customer_user_name }}
            </div>
            <div class="col-span-12">
              Modded by: {{ dispute.moderator_uuid }}
            </div>
            <div class="col-span-12">
              <div class="my-2 flex">
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
              </div>
            </div>
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
import { useRoute } from "vue-router";
import { notify } from "@kyvg/vue3-notification";
import authHeader from "../../services/auth.header";
import MainHeaderTop from "../../layouts/headers/MainHeaderTop.vue";
import MainHeaderMid from "../../layouts/headers/MainHeaderMid.vue";
import MainHeaderBottom from "../../layouts/headers/MainHeaderBottom.vue";
import MainHeaderVendor from "../../layouts/headers/MainHeaderVendor.vue";
import MainFooter from "../../layouts/footers/FooterMain.vue";

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
    this.userstatus();
    this.getdisputesneedmod();
    this.getdisputeshasmod();
  },

  methods: {
    // get user status
    async userstatus() {
      await axios({
        method: "get",
        url: "/auth/whoami",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
          if (response.data.user.user_admin < 2) {
            this.$router.push({ name: "home" });
          }
        }
      });
    },
    // date conversion
    relativeDate(value) {
      var d = value;
      var e = new Date(d).valueOf();
      return formatDistance(e, new Date());
    },
    // become the moderator of the order
    async becomemod(uuid) {
      await axios({
        method: "get",
        url: "/mod/takeonmod/" + uuid,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
          this.getdisputesneedmod();
          this.getdisputeshasmod();
        }
      });
    },
    // get the disputes that need mods
    async getdisputesneedmod() {
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
    // get disputes that has mods
    async getdisputeshasmod() {
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
