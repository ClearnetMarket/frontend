<template>
  <div class="bg-gray-300">
  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />
  <MainHeaderVendor />
  <div class="max-w-4xl mx-auto wrapper px-10">

    <div class="flex justify-evenly">
      <div v-if="vendor_orders_new">
        <router-link :to="{ name: 'vendorordersnew' }">
          <button
            class="flex py-2 px-4 shadow-md no-underline rounded-full text-white font-sans hover:text-white text-sm bg-zinc-600 hover:bg-zinc-400 focus:outline-none active:shadow-none mr-2"
          >
            <div class="px-2">{{ vendor_orders_new }}</div>
            <div class>New Orders</div>
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
            class="flex py-2 px-4 shadow-md text-sm no-underline rounded-full bg-zinc-600 hover:bg-zinc-400 text-white font-sans hover:text-white focus:outline-none active:shadow-none mr-2"
          >
            <div class="px-2">{{ vendor_orders_accepted }}</div>
            <div class>Waiting on Shipment</div>
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
            class="flex py-2 px-4 shadow-md no-underline rounded-full bg-zinc-600 hover:bg-zinc-400 hover:text-white text-white font-sans text-sm btn-primary focus:outline-none active:shadow-none mr-2"
          >
            <div class="px-2">{{ vendor_orders_shipped }}</div>
            <div class>Shipped</div>
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
            class="flex py-2 px-4 shadow-md no-underline rounded-full bg-zinc-600 hover:bg-zinc-400 hover:text-white text-white font-sans text-sm btn-primary focus:outline-none active:shadow-none mr-2"
          >
            <div class="px-2">{{ vendor_orders_finalized }}</div>
            <div class>Finalized</div>
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
            class="flex py-2 px-4 shadow-md no-underline rounded-full bg-zinc-600 hover:bg-zinc-400 hover:text-white text-white font-sans text-sm btn-primary focus:outline-none active:shadow-none mr-2"
          >
            <div class="px-2">{{ vendor_orders_request_cancel }}</div>
            <div class>Request Cancel</div>
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
      <h1 class="col-span-1 font-semibold text-2xl">Shipped Orders</h1>

      <div v-for="order in orders" :key="order.uuid">
        <div v-if="order.uuid">
          <div
            class="grid grid-cols-12 rounded border border-1 border-gray-300 bg-gray-200 p-5"
          >
            <div class="col-span-1">{{ relativeDate(order.created) }}</div>
            <router-link
              class="col-span-4 text-blue-600 hover:underline hover:text-blue-400"
              :to="{ name: 'item', params: { id: order.item_uuid } }"
            >
              <div>{{ order.title_of_item }}</div>
            </router-link>
            <div class="col-span-2">{{ order.customer_user_name }}</div>
            <div class="col-span-4">
              <div
                class="flex justify-between"
                v-if="order.digital_currency == 1"
              >
                <div v-if="order.shipping_price_btc == 0">Free Shipping</div>
                <div v-else>{{ order.shipping_price_btc }}</div>

                <div class="">{{ order.price_total_btc }} BTC</div>
              </div>
              <div
                class="flex justify-between"
                v-if="order.digital_currency == 2"
              >
                <div v-if="order.shipping_price_bch == 0">Free Shipping</div>
                <div v-else>{{ order.shipping_price_bch }}</div>

                <div class="">{{ order.price_total_bch }} BCH</div>
              </div>
              <div
                class="flex justify-between"
                v-if="order.digital_currency == 3"
              >
                <div class="">
                  <div v-if="order.shipping_price_xmr == 0">Free Shipping</div>
                  <div v-else>{{ order.shipping_price_xmr }}</div>
                </div>

                <div class="flex">{{ order.price_total_xmr }} XMR</div>
              </div>
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
import { notify } from "@kyvg/vue3-notification";
import { formatDistance } from "date-fns";
import authHeader from "../../../services/auth.header";
import MainHeaderTop from "../../../layouts/headers/MainHeaderTop.vue";
import MainHeaderMid from "../../../layouts/headers/MainHeaderMid.vue";
import MainHeaderBottom from "../../../layouts/headers/MainHeaderBottom.vue";
import MainHeaderVendor from "../../../layouts/headers/MainHeaderVendor.vue";
import MainFooter from "../../../layouts/footers/FooterMain.vue";

export default defineComponent({
  name: "vendorordersshipped",

  components: {
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainFooter,
    MainHeaderVendor
  },

  data() {
    return {
      date: Date.now(),
      tab: [],
      orders: [],
      vendor_orders_new: "",
      vendor_orders_accepted: "",
      vendor_orders_shipped: "",
      vendor_orders_finalized: "",
      vendor_orders_finalized_early: "",
      vendor_orders_request_cancel: "",
      vendor_orders_cancelled: "",
      vendor_orders_dispute: "",
    };
  },

  mounted() {
    this.getuserorders();
    this.getuserneworderscount();
  },

  methods: {
    // gets the user new orders
    async getuserorders() {
      await axios({
        method: "get",
        url: "/vendororders/shipped",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
          this.orders = response.data;
        }
      });
    },
  // gets the user counts
    async getuserneworderscount() {
      await axios({
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
          this.vendor_orders_finalized_early =
            response.data.vendor_orders_finalized_early;
          this.vendor_orders_request_cancel =
            response.data.vendor_orders_request_cancel;
          this.vendor_orders_cancelled = response.data.vendor_orders_cancelled;
          this.vendor_orders_dispute = response.data.vendor_orders_dispute;
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
