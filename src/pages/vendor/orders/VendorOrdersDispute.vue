<template>

  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />
  <MainHeaderVendor />

<div class="max-w-4xl mx-auto wrapper px-10">
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
              </ol>
            </nav>
          </div>

    <div class="grid grid-cols-1 w-full gap-4 mt-5">
      <h1 class="col-span-1 font-semibold text-2xl">Disputed Orders</h1>
      <div class="" v-if="dispute_count > 0">
        <div v-for="order in orders" :key="order.id">
          <div v-if="order.uuid">
            <div
              class="grid grid-cols-12 rounded border border-1 border-gray-300 bg-gray-200 p-5"
            >
              <div class="col-span-2">{{ relativeDate(order.created) }}</div>
              <router-link
                class="col-span-4 text-blue-600 hover:underline hover:text-blue-400"
                :to="{ name: 'MarketItem', params: { id: order.item_uuid } }"
              >
                <div>{{ order.title_of_item }}</div>
              </router-link>
              <div class="col-span-2">{{ order.customer_user_name }}</div>
              <div class="col-span-2"></div>
              <div class="col-span-2">
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
      <div v-else>You Currently have no disputes :)</div>
    </div>
  </div>

  <MainFooter />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { mapGetters } from "vuex";
import { formatDistance } from "date-fns";
import authHeader from "../../../services/auth.header";

import MainHeaderTop from "../../../layouts/headers/MainHeaderTop.vue";
import MainHeaderMid from "../../../layouts/headers/MainHeaderMid.vue";
import MainHeaderBottom from "../../../layouts/headers/MainHeaderBottom.vue";
import MainHeaderVendor from "../../../layouts/headers/MainHeaderVendor.vue";
import MainFooter from "../../../layouts/footers/FooterMain.vue";


export default defineComponent({
  name: "userordersdisputed",

  components: {
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainFooter,
    MainHeaderVendor
  },

  data() {
    return {
      orders: [],
      dispute: null,
      dispute_count: 0,
    };
  },

  mounted() {
    this.getdisputedorders();
    this.deleteordernotice();
    this.getdisputescount();
  },

  methods: {
    // gets the count of how many disputes
     getdisputescount() {
       axios({
        method: "get",
        url: "/vendor/new-disputes-count",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
          this.dispute_count = response.data.count;
        }
      });
    },
    // gets the disputed orders
     getdisputedorders() {
      axios({
        method: "get",
        url: "/vendororders/disputed",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
          this.orders = response.data;
        }
      });
    },
     deleteordernotice() {
       axios({
        method: "delete",
        url: "/vendor/new-orders-count/markasread",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
       
        }
      });
    },
    // date conversion
    relativeDate(value: any) {

      let e = new Date(value).valueOf();
      return formatDistance(e, new Date());
    },
  },
});
</script>
