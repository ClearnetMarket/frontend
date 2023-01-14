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
    <div class="flex justify-evenly">
      <div v-if="vendor_orders_new">
        <button
          class="flex py-2 px-4 shadow-md no-underline rounded-full text-white font-sans hover:text-white text-sm bg-zinc-600 hover:bg-zinc-400 focus:outline-none active:shadow-none mr-2">
          <span class="px-2">{{ vendor_orders_new }}</span>
          <span class>New</span>
        </button>
      </div>
      <div v-else>
        <button
          class="py-2 px-4 shadow-md no-underline rounded-full text-white font-sans text-sm hover:text-white bg-zinc-600 hover:bg-zinc-400 focus:outline-none active:shadow-none mr-2">
          New
        </button>
      </div>

      <div v-if="vendor_orders_accepted" class="q-mt-none">
        <router-link :to="{ name: 'vendororderswaiting' }">
          <button
            class="flex py-2 px-4 shadow-md text-sm no-underline rounded-full bg-zinc-600 hover:bg-zinc-400 text-white font-sans hover:text-white focus:outline-none active:shadow-none mr-2">
            <span class="px-2">{{ vendor_orders_accepted }}</span>
            <span class>Waiting</span>
          </button>
        </router-link>
      </div>
      <div v-else>
        <router-link :to="{ name: 'vendororderswaiting' }">
          <button
            class="py-2 px-4 shadow-md no-underline rounded-full text-white font-sans text-sm hover:text-white bg-zinc-600 hover:bg-zinc-400 focus:outline-none active:shadow-none mr-2">
            Waiting on Shipment
          </button>
        </router-link>
      </div>

      <div v-if="vendor_orders_shipped">
        <router-link :to="{ name: 'vendorordersshipped' }">
          <button
            class="flex py-2 px-4 shadow-md no-underline rounded-full bg-zinc-600 hover:bg-zinc-400 hover:text-white text-white font-sans text-sm btn-primary focus:outline-none active:shadow-none mr-2">
            <span class="px-2">{{ vendor_orders_shipped }}</span>
            <span class>Shipped</span>
          </button>
        </router-link>
      </div>
      <div v-else>
        <router-link :to="{ name: 'vendorordersshipped' }">
          <button
            class="py-2 px-4 shadow-md no-underline rounded-full text-white font-sans text-sm hover:text-white bg-zinc-600 hover:bg-zinc-400 focus:outline-none active:shadow-none mr-2">
            Shipped
          </button>
        </router-link>
      </div>

      <div v-if="vendor_orders_finalized">
        <router-link :to="{ name: 'vendorordersfinalized' }">
          <button
            class="flex py-2 px-4 shadow-md no-underline rounded-full bg-zinc-600 hover:bg-zinc-400 hover:text-white text-white font-sans text-sm btn-primary focus:outline-none active:shadow-none mr-2">
            <span class="px-2">{{ vendor_orders_finalized }}</span>
            <span class>Finalized</span>
          </button>
        </router-link>
      </div>
      <div v-else>
        <router-link :to="{ name: 'vendorordersfinalized' }">
          <button
            class="py-2 px-4 shadow-md no-underline rounded-full text-white font-sans text-sm hover:text-white bg-zinc-600 hover:bg-zinc-400 focus:outline-none active:shadow-none mr-2">
            Finalized
          </button>
        </router-link>
      </div>

      <div v-if="vendor_orders_request_cancel">
        <router-link :to="{ name: 'vendororderscancel' }">
          <button
            class="flex py-2 px-4 shadow-md no-underline rounded-full bg-zinc-600 hover:bg-zinc-400 hover:text-white text-white font-sans text-sm btn-primary focus:outline-none active:shadow-none mr-2">
            <span class="px-2">{{ vendor_orders_request_cancel }}</span>
            <span class>Request Cancel</span>
          </button>
        </router-link>
      </div>
      <div v-else>
        <router-link :to="{ name: 'vendororderscancel' }">
          <button
            class="py-2 px-4 shadow-md no-underline rounded-full text-white font-sans text-sm hover:text-white bg-zinc-600 hover:bg-zinc-400 focus:outline-none active:shadow-none mr-2">
            Cancel
          </button>
        </router-link>
      </div>
    </div>

    <div class="grid grid-cols-1 w-full gap-4 mt-5">
      <h1 class="col-span-1 font-semibold text-2xl">New Orders</h1>
      <div v-for="order in orders" :key="order.id">
        <div v-if="order">
                  
          <div class="grid grid-cols-12 gap-5 rounded  bg-white p-5">

            <div class="col-span-3 ">
              <img class="object-contain" :src="order.image_one" alt="" />
            </div>
            <div class="col-span-7 ">
              <div class="grid grid-cols-12">

                <div class="col-span-12 mb-5">
                  <router-link class="col-span-12 text-blue-600 hover:underline hover:text-blue-400 text-[18px] "
                    :to="{ name: 'MarketItem', params: { id: order.item_uuid } }">
                    {{ order.title_of_item }}
                  </router-link>
                </div>
                <div class="col-span-12 font-bold ">
                  Order# {{ order.uuid }}
                </div>
                <div class="col-span-4">
                  <div class="font-bold">Order Date</div>
                  {{ relativeDate (order.created) }}
                </div>
                <div class="col-span-4">
                  <div class="font-bold">Item Quantity:</div>
                  {{ order.quantity }}
                </div>
                <div class="col-span-4">
                    <div class="font-bold">Customer</div>
                  <router-link :to="{
                    name: 'userprofile',
                    params: { uuid: order.customer_uuid },
                  }">
                    <div class="text-blue-700 hover:underline hover:text-blue-500">
                      {{ order.customer_user_name }}
                    </div>
                  </router-link>
                </div>
                <div class="col-span-12 font-bold">Coin:</div>
                <div class="col-span-12 mb-2 text-[16px]">
                  <div v-if="order.digital_currency === 1">
                    <span class="text-sm font-semibold text-orange-500">Bitcoin with shipping:</span>
                    {{ order.price_total_btc }}
                  </div>
                  <div v-if="order.digital_currency === 2">
                    <div class="">
                      <span class="text-sm font-semibold text-green-600">Bitcoin Cash with shipping:</span>
                    </div>
                    <div class="">
                      {{ order.price_total_bch }} 
                    </div>
                  </div>
                  <div v-if="order.digital_currency === 3">
                    <span class="text-sm font-semibold text-orange-700">Monero with shipping:</span>
                    {{ order.price_total_xmr }} 
                  </div>
                </div>


                <div class="col-span-12 mb-2">
                  <div class="font-bold">Shipping Description:</div>
                   {{ order.shipping_description }}
                </div>
                <div class="col-span-12">
                  <div class="grid grid-cols-12">
                    <div class="col-span-12">
                      <div class="font-bold">Shipping Destination:</div></div>
                    <div class="col-span-12">{{ order.address_name }}</div>
                    <div class="col-span-12">{{ order.address }}</div>
                    <div class="col-span-12">{{ order.apt }}</div>
                    <div class="col-span-12 flex">
                      <div class="pr-1">{{ order.city }}</div>
                      <div class="px-1">{{ order.stateorprovence }}</div>
                      <div class="px-1">{{ order.zip }}</div>
                      <div class="px-1">{{ order.country }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-span-2">
              <button
                class="bg-green-600 m-2 hover:bg-green-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full"
                type="button" @click="acceptorder(order.uuid)">
                Accept
              </button>
              <button
                class="bg-red-600 m-2 hover:bg-red-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full"
                type="button" @click="rejectorder(order.uuid)">
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
import { notify } from "@kyvg/vue3-notification";
import { formatDistance } from "date-fns";
import authHeader from "../../../services/auth.header";
import MainHeaderTop from "../../../layouts/headers/MainHeaderTop.vue";
import MainHeaderMid from "../../../layouts/headers/MainHeaderMid.vue";
import MainHeaderBottom from "../../../layouts/headers/MainHeaderBottom.vue";
import MainHeaderVendor from "../../../layouts/headers/MainHeaderVendor.vue";
import MainFooter from "../../../layouts/footers/FooterMain.vue";

/**
 *
 @typedef {Object} order.price_total_xmr
 @typedef {Object} order.digital_currency
 @typedef {Object} order.shipping_price_btc
 @typedef {Object} order.shipping_price_xmr
 @typedef {Object} order.shipping_price_btc
 @typedef {Object} order.price_total_bch
 @typedef {Object} order.shipping_price_bch
 @typedef {Object} order.quantity
 @typedef {Object} order.customer_uuid
 @typedef {Object} order.price_total_btc
 @typedef {Object} order.price_total_btc
 *
 */

export default defineComponent({
  name: "vendorordersnew",

  components: {
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainFooter,
    MainHeaderVendor
  },

  data () {
    return {
      date: Date.now(),
      tab: [],
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

  mounted () {
    this.getuserneworders();
    this.getuserneworderscount();
    this.deleteordernotice();
  },

  methods: {
    // marks the orders as read
    deleteordernotice () {
      axios({
        method: "delete",
        url: "/vendor/new-orders-count/markasread",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
          this.getuserneworderscount();
        }
      });
    },
    // gets the new user orders
    getuserneworders () {
      axios({
        method: "get",
        url: "/vendororders/new",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
          this.orders = response.data;
        }
      });
    },
    // accepts the new order
    acceptorder (uuid: any) {
      axios({
        method: "put",
        url: "/vendororders/new/accept/" + uuid,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
          notify({
            title: "Order #" + uuid,
            text: "Order Accepted",
            type: "success",
          });
          this.getuserneworders();
          this.getuserneworderscount();
        }
      });
    },
    // rejects the orders
    rejectorder (uuid: any) {
      axios({
        method: "post",
        url: "/vendororders/new/reject/" + uuid,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
          this.getuserneworders();
          notify({
            title: "Order #" + uuid,
            text: "Order Rejected",
            type: "error",
          });
        }
      });
    },
    // gets the count for the top bar
    getuserneworderscount () {
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
          this.vendor_orders_finalized_early =
            response.data.vendor_orders_finalized_early;
          this.vendor_orders_request_cancel =
            response.data.vendor_orders_request_cancel;
          this.vendor_orders_cancelled = response.data.vendor_orders_cancelled;
          this.vendor_orders_dispute = response.data.vendor_orders_dispute;
        }
      });
    },
    relativeDate (value: any) {
      let e = new Date(value).valueOf();
      return formatDistance(e, new Date());
    },
  },
});
</script>
