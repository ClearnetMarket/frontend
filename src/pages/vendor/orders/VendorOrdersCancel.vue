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
        <div class="col-span-1 font-semibold text-2xl">Request Cancel</div>
        <div class="col-span-1 text-[14px]">
          The orders below have requested to cancel. You can deny them the
          cancel and accept, but they can dispute this in the future.
        </div>
        <div class="">Improve cancellation rate</div>
        <ul style="list-style-type: disc">
          <li>Your Accepting / Shipping actions are too slow</li>
          <li>Prices are too high</li>
          <li>Slow or poor communications</li>
        </ul>
        <div v-for="order in orders" :key="order.id" class="pb-5">
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
                  @click="acceptorder(order.uuid)"
                >
                  Accept
                </button>
                <button
                  class="bg-red-600 m-2 hover:bg-red-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full"
                  type="button"
                  @click="rejectorder(order.uuid)"
                >
                  Reject
                </button>
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
import authHeader from "../../../services/auth.header";
import MainHeaderTop from "../../../layouts/headers/MainHeaderTop.vue";
import MainHeaderMid from "../../../layouts/headers/MainHeaderMid.vue";
import MainHeaderBottom from "../../../layouts/headers/MainHeaderBottom.vue";
import MainHeaderVendor from "../../../layouts/headers/MainHeaderVendor.vue";
import MainFooter from "../../../layouts/footers/FooterMain.vue";
import { formatDistance } from "date-fns";

export default defineComponent({
  name: "vendororderscancel",

  components: {
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainFooter,
    MainHeaderVendor,
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
    async getuserorders() {
      await axios({
        method: "get",
        url: "/vendororders/requestcancel",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
          this.orders = response.data;
        }
      });
    },
    async rejectorder(uuid) {
      await axios({
        method: "post",
        url: "/vendororders/new/reject/" + uuid,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
          this.getuserorders();
              this.getuserneworderscount();
        }
      });
    },
    async acceptorder(uuid) {
      await axios({
        method: "put",
        url: "/vendororders/new/accept/" + uuid,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
          this.getuserorders();
              this.getuserneworderscount();
        }
      });
    },
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
