
<template>

  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />

    <div class="container max-w-7xl mx-auto px-10 wrapper">
      <div class="mt-5">
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
    <div class="flex justify-evenly">
      <div v-if="vendor_orders_new">
        <router-link :to="{ name: 'vendorordersnew' }">
          <button
            class="flex py-2 px-4 shadow-md no-underline rounded-full text-white font-sans hover:text-white text-sm bg-orange-600 hover:bg-zinc-400 focus:outline-none active:shadow-none mr-2"
          >
            <span class="px-2">{{ vendor_orders_new }}</span>
            <span class>New Orders</span>
          </button>
        </router-link>
      </div>
      <div v-else>
        <router-link :to="{ name: 'vendorordersnew' }">
          <button
            class="py-2 px-4 shadow-md no-underline rounded-full text-white font-sans text-sm hover:text-white bg-zinc-600 hover:bg-zinc-400 focus:outline-none active:shadow-none mr-2"
          >
            New Orders
          </button>
        </router-link>
      </div>

      <div v-if="vendor_orders_accepted" class="q-mt-none">
        <router-link :to="{ name: 'vendororderswaiting' }">
          <button
            class="flex py-2 px-4 shadow-md text-sm no-underline rounded-full bg-orange-600 hover:bg-zinc-400 text-white font-sans hover:text-white focus:outline-none active:shadow-none mr-2"
          >
            <span class="px-2">{{ vendor_orders_accepted }}</span>
            <span class>Waiting on Shipment</span>
          </button>
        </router-link>
      </div>
      <div v-else>
        <router-link :to="{ name: 'vendororderswaiting' }">
          <button
            class="py-2 px-4 shadow-md no-underline rounded-full text-white font-sans text-sm hover:text-white bg-zinc-600 hover:bg-zinc-400 focus:outline-none active:shadow-none mr-2"
          >
            Waiting on Shipment
          </button>
        </router-link>
      </div>

      <div v-if="vendor_orders_shipped">
        <router-link :to="{ name: 'vendorordersshipped' }">
          <button
            class="flex py-2 px-4 shadow-md no-underline rounded-full bg-orange-600 hover:bg-zinc-400 hover:text-white text-white font-sans text-sm btn-primary focus:outline-none active:shadow-none mr-2"
          >
            <span class="px-2">{{ vendor_orders_shipped }}</span>
            <span class>Shipped</span>
          </button>
        </router-link>
      </div>
      <div v-else>
        <router-link :to="{ name: 'vendorordersshipped' }">
          <button
            class="py-2 px-4 shadow-md no-underline rounded-full text-white font-sans text-sm hover:text-white bg-zinc-600 hover:bg-zinc-400 focus:outline-none active:shadow-none mr-2"
          >
            Shipped
          </button>
        </router-link>
      </div>

      <div v-if="vendor_orders_finalized">
        <router-link :to="{ name: 'vendorordersfinalized' }">
          <button
            class="flex py-2 px-4 shadow-md no-underline rounded-full bg-orange-600 hover:bg-zinc-400 hover:text-white text-white font-sans text-sm btn-primary focus:outline-none active:shadow-none mr-2"
          >
            <span class="px-2">{{ vendor_orders_finalized }}</span>
            <span class>Finalized</span>
          </button>
        </router-link>
      </div>
      <div v-else>
        <router-link :to="{ name: 'vendorordersfinalized' }">
          <button
            class="py-2 px-4 shadow-md no-underline rounded-full text-white font-sans text-sm hover:text-white bg-zinc-600 hover:bg-zinc-400 focus:outline-none active:shadow-none mr-2"
          >
            Finalized
          </button>
        </router-link>
      </div>

      <div v-if="vendor_orders_request_cancel">
        <router-link :to="{ name: 'vendororderscancel' }">
          <button
            class="flex py-2 px-4 shadow-md no-underline rounded-full bg-orange-600 hover:bg-zinc-400 hover:text-white text-white font-sans text-sm btn-primary focus:outline-none active:shadow-none mr-2"
          >
            <span class="px-2">{{ vendor_orders_request_cancel }}</span>
            <span class>Request Cancel</span>
          </button>
        </router-link>
      </div>
      <div v-else>
        <router-link :to="{ name: 'vendororderscancel' }">
          <button
            class="py-2 px-4 shadow-md no-underline rounded-full text-white font-sans text-sm hover:text-white bg-zinc-600 hover:bg-zinc-400 focus:outline-none active:shadow-none mr-2"
          >
            Cancel
          </button>
        </router-link>
      </div>
    </div>


    <div class="grid grid-cols-1 w-full gap-4 mt-5">
      <h1 class="col-span-1 font-semibold text-2xl">New Orders</h1>
      <div v-for="order in orders" :key="order.id">
         <div v-if="order.uuid">
        <div
          class="grid grid-cols-12 rounded border border-1 border-gray-300 bg-gray-200 p-5"
        >
          <div class="col-span-2">{{ relativeDate(order.created) }}</div>
          <router-link
            class="col-span-4 text-blue-600 hover:underline hover:text-blue-400"
            :to="{ name: 'item', params: { id: order.item_uuid } }"
          >
            <div>{{ order.title_of_item }}</div>
          </router-link>
          <div class="col-span-2">{{ order.customer_user_name }}</div>
          <div class="col-span-2"></div>
          <div class="col-span-2">
            <button
              class="bg-green-600 m-2 hover:bg-green-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full"
              type="button"
              @click="getuserneworderscount()"
            >
              Accept
            </button>
            <button
              class="bg-red-600 m-2 hover:bg-red-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full"
              type="button"
              @click="getuserneworderscount()"
            >
              Reject
            </button>
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
import authHeader from "../../../services/auth.header";
import MainHeaderTop from "../../../layouts/headers/MainHeaderTop.vue";
import MainHeaderMid from "../../../layouts/headers/MainHeaderMid.vue";
import MainHeaderBottom from "../../../layouts/headers/MainHeaderBottom.vue";
import MainHeaderVendor from "../../../layouts/headers/MainHeaderVendor.vue";
import MainFooter from "../../../layouts/footers/FooterMain.vue";
import {formatDistance} from "date-fns";
/**
 *

 @typedef {Object} order.item_uuid


 *
 */
export default defineComponent({
  name: "userorders",

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
      vendor_orders_new: 0,
      vendor_orders_accepted: 0,
      vendor_orders_shipped: 0,
      vendor_orders_finalized: 0,
      vendor_orders_finalized_early: 0,
      vendor_orders_request_cancel: 0,
      vendor_orders_cancelled: 0,
      vendor_orders_dispute: 0,
    };
  },

  mounted() {
    this.getuserneworderscount();
    this.deleteordernotice();
  },

  methods: {

    // gets the count of orders for top bars
     getuserneworderscount() {
      axios({
        method: "get",
        url: "/vendororders/count",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
          this.vendor_orders_new = response.data.vendor_orders_new;
          this.vendor_orders_accepted = response.data.vendor_orders_accepted;
          this.vendor_orders_shipped = response.data.vendor_orders_shipped;
          this.vendor_orders_finalized = response.data.vendor_orders_finalized;
          this.vendor_orders_finalized_early = response.data.vendor_orders_finalized_early;
          this.vendor_orders_request_cancel = response.data.vendor_orders_request_cancel;
          this.vendor_orders_cancelled = response.data.vendor_orders_cancelled;
          this.vendor_orders_dispute = response.data.vendor_orders_dispute;
        }
      });
    },
    // delete the order notices
     deleteordernotice() {
       axios({
        method: "delete",
        url: "/vendor/new-orders-count/markasread" ,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
          this.getuserneworderscount();
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
