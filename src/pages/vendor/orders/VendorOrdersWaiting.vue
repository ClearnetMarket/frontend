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

    <div class="sm:flex sm:justify-evenly">
      <div v-if="vendor_orders_new">
        <router-link :to="{ name: 'vendorordersnew' }">
          <button
            class="mb-2 flex py-2 px-4 shadow-md no-underline rounded-full text-white font-sans hover:text-white text-sm bg-zinc-600 hover:bg-zinc-400 focus:outline-none active:shadow-none mr-2">
            <span class="px-2">{{ vendor_orders_new }}</span>
            <span class>New </span>
          </button>
        </router-link>
      </div>
      <div v-else>
        <router-link :to="{ name: 'vendorordersnew' }">
          <button
            class="mb-2 py-2 px-4 shadow-md no-underline rounded-full text-white font-sans text-sm hover:text-white bg-zinc-600 hover:bg-zinc-400 focus:outline-none active:shadow-none mr-2">
            New
          </button>
        </router-link>
      </div>

      <div v-if="vendor_orders_accepted" class="q-mt-none">
        <router-link :to="{ name: 'vendororderswaiting' }">
          <button
            class="mb-2 flex py-2 px-4 shadow-md text-sm no-underline rounded-full bg-zinc-600 hover:bg-zinc-400 text-white font-sans hover:text-white focus:outline-none active:shadow-none mr-2">
            <span class="px-2">{{ vendor_orders_accepted }}</span>
            <span class>Waiting</span>
          </button>
        </router-link>
      </div>
      <div v-else>
        <router-link :to="{ name: 'vendororderswaiting' }">
          <button
            class="mb-2 py-2 px-4 shadow-md no-underline rounded-full text-white font-sans text-sm hover:text-white bg-zinc-600 hover:bg-zinc-400 focus:outline-none active:shadow-none mr-2">
            Waiting
          </button>
        </router-link>
      </div>

      <div v-if="vendor_orders_shipped">
        <router-link :to="{ name: 'vendorordersshipped' }">
          <button
            class="mb-2 flex py-2 px-4 shadow-md no-underline rounded-full bg-zinc-600 hover:bg-zinc-400 hover:text-white text-white font-sans text-sm btn-primary focus:outline-none active:shadow-none mr-2">
            <span class="px-2">{{ vendor_orders_shipped }}</span>
            <span class>Shipped</span>
          </button>
        </router-link>
      </div>
      <div v-else>
        <router-link :to="{ name: 'vendorordersshipped' }">
          <button
            class="mb-2 py-2 px-4 shadow-md no-underline rounded-full text-white font-sans text-sm hover:text-white bg-zinc-600 hover:bg-zinc-400 focus:outline-none active:shadow-none mr-2">
            Shipped
          </button>
        </router-link>
      </div>

      <div v-if="vendor_orders_finalized">
        <router-link :to="{ name: 'vendorordersfinalized' }">
          <button
            class="mb-2 flex py-2 px-4 shadow-md no-underline rounded-full bg-zinc-600 hover:bg-zinc-400 hover:text-white text-white font-sans text-sm btn-primary focus:outline-none active:shadow-none mr-2">
            <span class="px-2">{{ vendor_orders_finalized }}</span>
            <span class>Finalized</span>
          </button>
        </router-link>
      </div>
      <div v-else>
        <router-link :to="{ name: 'vendorordersfinalized' }">
          <button
            class="mb-2 py-2 px-4 shadow-md no-underline rounded-full text-white font-sans text-sm hover:text-white bg-zinc-600 hover:bg-zinc-400 focus:outline-none active:shadow-none mr-2">
            Finalized
          </button>
        </router-link>
      </div>

      <div v-if="vendor_orders_request_cancel">
        <router-link :to="{ name: 'vendororderscancel' }">
          <button
            class="mb-2 flex py-2 px-4 shadow-md no-underline rounded-full bg-zinc-600 hover:bg-zinc-400 hover:text-white text-white font-sans text-sm btn-primary focus:outline-none active:shadow-none mr-2">
            <span class="px-2">{{ vendor_orders_request_cancel }}</span>
            <span class>Request Cancel</span>
          </button>
        </router-link>
      </div>
      <div v-else>
        <router-link :to="{ name: 'vendororderscancel' }">
          <button
            class="mb-2 py-2 px-4 shadow-md no-underline rounded-full text-white font-sans text-sm hover:text-white bg-zinc-600 hover:bg-zinc-400 focus:outline-none active:shadow-none mr-2">
            Cancel
          </button>
        </router-link>
      </div>
    </div>

    <div class="grid grid-cols-1 w-full gap-4 mt-5">
      <h1 class="col-span-1 font-semibold text-2xl">Waiting</h1>
      <div v-for="order in orders" :key="order.id">
        <div v-if="order.uuid">
          <div class="grid grid-cols-12 rounded gap-5 p-5 bg-white ">
            <div class="col-span-12 sm:col-span-3 flex justify-center">
              <img class="object-contain" :src="order.image_one" alt="" />
            </div>
            <div class="col-span-12 sm:col-span-7 ">
              <div class="grid grid-cols-12">

                <div class="col-span-12 mb-5">
                  <router-link class="col-span-12 text-blue-600 hover:underline hover:text-blue-400 text-[18px] "
                    :to="{ name: 'MarketItem', params: { id: order.item_uuid } }">
                    {{ order.title_of_item }}
                  </router-link>
                </div>

                <div class="col-span-12 sm:col-span-4">
                  <div class="font-bold">Order Date</div>
                  {{ relativeDate (order.created) }}
                </div>
                <div class="col-span-12 sm:col-span-4">
                  <div class="font-bold">Item Quantity:</div>
                  {{ order.quantity }}
                </div>
                <div class="col-span-12 sm:col-span-4">
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

                    <div class="col-span-12">
                      <span class=" pr-5">BTC with shipping:</span>
                      <span class="text-sm font-semibold text-orange-500">
                        {{ order.price_total_btc }} BTC
                      </span>
                    </div>
                    <div class="col-span-12">
                      <span class="pr-5">Price per Item:</span>
                      <span class="text-sm font-semibold text-orange-500">
                        {{ order.price_per_item_btc }} BTC<br>
                      </span>
                    </div>
                    <div class="col-span-12">
                      <span class="pr-5">Total Shipping:</span>
                      <span class="text-sm font-semibold text-orange-500">
                        {{ order.shipping_price_btc }} BTC
                      </span>
                    </div>

                  </div>
                  <div v-if="order.digital_currency === 2">
                    <div class="col-span-12">
                      <span class=" pr-5">BCH with shipping:</span>
                      <span class="text-sm font-semibold text-greenh-500">
                        {{ order.price_total_bch }} BCH
                      </span>
                    </div>
                    <div class="col-span-12">
                      <span class="pr-5">Price per Item:</span>
                      <span class="text-sm font-semibold text-green-500">
                        {{ order.price_per_item_bch }} BCH
                      </span>
                    </div>
                    <div class="col-span-12">
                      <span class="pr-5">Total Shipping:</span>
                      <span class="text-sm font-semibold text-green-500">
                        {{ order.shipping_price_bch }} BCH
                      </span>
                    </div>
                  </div>
                  <div v-if="order.digital_currency === 3">
                    <div class="col-span-12">
                      <span class=" pr-5">XMR with shipping:</span>
                      <span class="text-sm font-semibold text-orange-700">
                        {{ order.price_total_xmr }} XMR
                      </span>
                    </div>
                    <div class="col-span-12">
                      <span class="pr-5">Price per Item:</span>
                      <span class="text-sm font-semibold text-orange-700">
                        {{ order.price_per_item_xmr }} XMR
                      </span>
                    </div>
                    <div class="col-span-12">
                      <span class="pr-5">Total Shipping:</span>
                      <span class="text-sm font-semibold text-orange-700">
                        {{ order.shipping_price_xmr }} XMR
                      </span>
                    </div>
                  </div>


                </div>


                <div class="col-span-12 mb-2">
                  <div class="font-bold">Shipping Description:</div>
                  {{ order.shipping_description }}
                </div>
                <div class="col-span-12">
                  <div class="grid grid-cols-12">
                    <div class="col-span-12">
                      <div class="font-bold">Shipping Destination:</div>
                    </div>
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
            <div class="col-span-12 sm:col-span-2">

              <button
                class="bg-green-600 m-1 hover:bg-green-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full"
                type="button" @click.prevent="shiporder(order.uuid)">
                Mark as Shipped
              </button>
              <button
                class="bg-red-600 m-1 hover:bg-red-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full"
                type="button" @click.prevent="rejectorder(order.uuid)">
                Reject
              </button>

              <!-- Modal toggle -->
              <button
                class="bg-gray-600 m-1 hover:bg-gray-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full"
                type="button" @click="openModal('modal')">
                Add/Edit Shipping Info
              </button>



              <!-- Main modal -->
              <div id="modal" tabindex="-1" aria-hidden="true"
                class="hidden overflow-y-auto overflow-x-hidden fixed grid place-items-center h-screen w-full inset-0 h-modal h-full mb-36">
                <div class="relative p-4 w-full max-w-md h-full md:h-auto">
                  <!-- Modal content -->
                  <div class="relative text-gray-600 rounded-lg shadow bg-white">
                    <div class="flex justify-end p-2">
                      <button type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-300 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-400 dark:hover:text-white"
                        data-modal-toggle="authentication-modal" @click="closeModal()">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"></path>
                        </svg>
                      </button>
                    </div>
                    <form class="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8">
                      <h3 class="text-xl font-medium text-gray-900">
                        Add Tracking for " {{ order.title_of_item }} "
                      </h3>
                      <h5>{{ order.shipping_description }}</h5>
                      <div>
                        <label for="carrier_name" class="block mb-2 text-sm font-medium text-gray-900">Carrier
                          Name</label>
                        <input v-model="trackingForm.carrier" type="text" name="carrier_name" id="carrier_name"
                          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-400"
                          placeholder="Enter name of shipping carrier" required />
                      </div>
                      <div>
                        <label for="tracking_number" class="block mb-2 text-sm font-medium text-gray-900">Tracking
                          Number</label>
                        <input v-model="trackingForm.tracking" type="text" name="tracking_number" id="tracking_number"
                          placeholder="Tracking Number"
                          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-400"
                          required />
                      </div>

                      <!-- Modal footer -->

                      <div class="px-4 py-2 border-t flex justify-end items-center space-x-4">
                        <button class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
                          @click="closeModal()" @click.prevent="onSendTracking(order.uuid)">
                          Add Tracking
                        </button>
                      </div>
                    </form>
                  </div>
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


/**
 *
 @typedef {Object} order.shipping_description
 @typedef {Object} order.title_of_item
 @typedef {Object} order.customer_user_name
 *
 */

export default defineComponent({
  name: "vendororderswaiting",

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
      trackingcarrier: null,
      trackingnumber: null,
      trackingForm: {
        carrier: "",
        tracking: "",
      },
    };
  },
  created () {
    this.getuserorders();

  },
  mounted () {

    this.getuserneworderscount();
  },

  methods: {
    openModal (modalId: any) {
      let modal = document.getElementById(modalId);
      modal.classList.remove("hidden");
    },

    closeModal () {
      let modal = document.getElementById("modal");
      modal.classList.add("hidden");
    },
    // gets the new user orders
    getuserorders () {
      axios({
        method: "get",
        url: "/vendororders/waiting",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
          this.orders = response.data;
        }
      });
    },
    //accepted orders
    shiporder (uuid: any) {
      axios({
        method: "put",
        url: "/vendororders/waiting/markasshipped/" + uuid,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
          notify({
            title: "Vendor Order",
            text: "Order Shipped.",
            type: "success",
          });
          this.getuserorders();
          this.getuserneworderscount();
        }
      });
    },
    // rejects orders
    rejectorder (uuid: any) {
      axios({
        method: "delete",
        url: "/vendororders/new/reject/" + uuid,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
          notify({
            title: "Vendor Order",
            text: "Order Rejected",
            type: "error",
          });
          this.getuserorders();
          this.getuserneworderscount();
        }
      });
    },


    // send the tracking info on a popup modal
    sendtrackinginfo (payLoad: {
      order_uuid: string;
      carrier_name: string;
      tracking_number: string;
    }) {
      axios({
        method: "post",
        url: "/vendororders/tracking/add",
        withCredentials: true,
        headers: authHeader(),
        data: payLoad,
      }).then((response) => {

        if (response.status == 200) {
          notify({
            title: "Freeport",
            text: "Tracking Added",
            type: "success",
          });
        }
      });
    },
    // creates the payload for gettrackingdata
    onSendTracking (uuid: any) {
      const payLoad = {
        order_uuid: uuid,
        carrier_name: this.trackingForm.carrier,
        tracking_number: this.trackingForm.tracking,
      };
      this.sendtrackinginfo(payLoad);
    },

    // gets the user order count
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

    // converts time
    relativeDate (value: any) {
      let e = new Date(value).valueOf();
      return formatDistance(e, new Date());
    },
  },
});
</script>
