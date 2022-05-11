<template>
  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />

  <div class="max-w-4xl mx-auto wrapper px-10 pb-20">
    <div class="grid grid-cols-1 w-full gap-4">
      <div class="mb-10 mt-5">
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
    <div class="grid grid-cols-1 w-full gap-4">
      <h1 class="col-span-1 font-semibold text-2xl">Your Orders</h1>
      <div class="" v-if="orderscount > 0">
        <div v-for="order in orders" :key="order.id" class="pb-5">
          <div class="grid grid-cols-12 rounded-md border border-gray-300 mb-5">
            <div class="col-span-12 bg-gray-200 px-5 py-5">
              <div class="grid grid-cols-12 text-[12px]">
                <div class="col-span-3">
                  <div class="">Order Placed</div>
                  <div class="">{{ order.created }}</div>
                </div>
                <div class="col-span-3">
                  <div class="">Total</div>
                  <div v-if="order.digital_currency == 1">
                    {{ order.price_total_btc }} BTC
                  </div>
                  <div v-if="order.digital_currency == 2">
                    {{ order.price_total_bch }} BCH
                  </div>
                  <div v-if="order.digital_currency == 3">
                    {{ order.price_total_xmr }} XMR
                  </div>
                </div>
                <div class="col-span-2"></div>
                <div class="col-span-4">
                  <div class="">Order #{{ order.uuid }}</div>
                  <div class=""></div>
                </div>
              </div>
            </div>
            <div class="col-span-12 bg-white px-5 py-5">
              <div class="grid grid-cols-12">
                <div class="col-span-9">
                  <div class="grid grid-cols-12">
                    <div class="col-span-12 text-[20px]">
                      <div v-if="order.overall_status == 1">
                        Waiting to be accepted
                      </div>
                      <div v-if="order.overall_status == 2">
                        Waiting on Shipment
                      </div>
                      <div v-if="order.overall_status == 3">Shipped</div>
                      <div v-if="order.overall_status == 4">Delivered</div>
                      <div v-if="order.overall_status == 5">
                        Finalized Order
                      </div>
                      <div v-if="order.overall_status == 6">
                        Requested cancel from vendor
                      </div>
                      <div v-if="order.overall_status == 7">Cancelled</div>
                      <div
                        class="text-red-600"
                        v-if="order.overall_status == 8"
                      >
                        Disputed
                      </div>
                    </div>
                    <div class="col-span-12 text-[14px]">
                      <div class="grid grid-cols-12 pt-5">
                        <div class="col-span-2">Image</div>
                        <div class="col-span-10">
                          <div
                            class="text-blue-500 hover:text-blue-300 hover:underline text-[18px]"
                          >
                            <router-link
                              :to="{
                                name: 'item',
                                params: { id: order.item_uuid },
                              }"
                            >
                              {{ order.title_of_item }}
                            </router-link>
                          </div>
                          <div class="">
                            <div v-if="order.vendor_uuid">
                              <div class="flex">
                                <div class="">Sold by:</div>
                                <router-link
                                  :to="{
                                    name: 'userprofile',
                                    params: { uuid: order.vendor_uuid },
                                  }"
                                >
                                  <div
                                    class="text-blue-500 hover:text-blue-300 hover:underline pl-3"
                                  >
                                    {{ order.vendor_user_name }}
                                  </div>
                                </router-link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-span-3">
                  <div
                    v-if="
                      order.overall_status == 3 ||
                      order.overall_status == 2 ||
                      order.overall_status == 4 ||
                      order.overall_status == 8
                    "
                  >
                    <div class="my-2">
                      <router-link
                        :to="{
                          name: 'vendorordersview',
                          params: { uuid: order.uuid },
                        }"
                      >
                        <button
                          class="bg-zinc-600 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full"
                          type="button"
                        >
                          Tracking Info
                        </button>
                      </router-link>
                    </div>
                  </div>
                  <!-- waiting on vendor acceptance order -->
                  <div v-if="order.overall_status == 1">
                    <div class="my-2">
                      <button
                        class="bg-red-600 hover:bg-red-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full"
                        type="button"
                        @click="requestcancel(order.uuid)"
                      >
                        Request Cancel
                      </button>
                    </div>
                  </div>
                  <!-- Accepted order -->
                  <div v-if="order.overall_status == 2">
                    <div class="my-2">
                      <button
                        class="bg-red-600 hover:bg-red-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full"
                        type="button"
                        @click="requestcancel(order.uuid)"
                      >
                        Request Cancel
                      </button>
                    </div>
                    <div class="my-2">
                      <button
                        class="bg-zinc-600 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full"
                        type="button"
                        @click="finalize(order.uuid)"
                      >
                        Finalize Order
                      </button>
                    </div>

                    <div class="my-2">
                      <button
                        class="bg-zinc-600 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full"
                        type="button"
                        @click="disputeorder(order.uuid)"
                      >
                        Dispute Order
                      </button>
                    </div>
                  </div>
                  <!-- Shipped order -->
                  <div v-if="order.overall_status == 3">
                    <div class="my-2">
                      <button
                        class="bg-zinc-600 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full"
                        type="button"
                        @click="delivered(order.uuid)"
                      >
                        Mark as Delivered
                      </button>
                    </div>
                    <div class="my-2">
                      <button
                        class="bg-zinc-600 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full"
                        type="button"
                        @click="finalize(order.uuid)"
                      >
                        Finalize Order
                      </button>
                    </div>
                    <div class="my-2">
                      <button
                        class="bg-zinc-600 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full"
                        type="button"
                        @click="disputeorder(order.uuid)"
                      >
                        Dispute Order
                      </button>
                    </div>
                  </div>
                  <!-- Delivered order -->
                  <div v-if="order.overall_status == 4">
                    <div class="my-2">
                      <button
                        class="bg-zinc-600 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full"
                        type="button"
                        @click="finalize(order.uuid)"
                      >
                        Finalize Order
                      </button>
                    </div>
                    <div class="my-2">
                      <button
                        class="bg-zinc-600 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full"
                        type="button"
                        @click="disputeorder(order.uuid)"
                      >
                        Dispute Order
                      </button>
                    </div>
                  </div>
                  <!-- Requested Cancel from vendor -->
                  <div v-if="order.overall_status == 6"></div>
                  <!-- Disputed order -->
                  <div v-if="order.overall_status == 8">
                    <router-link
                      :to="{
                        name: 'Dispute',
                        params: { uuid: order.uuid },
                      }"
                    >
                      <button
                        class="bg-red-600 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full"
                        type="button"
                      >
                        View Dispute
                      </button>
                    </router-link>
                  </div>
                  <!-- Finalized order -->
                  <div v-if="order.overall_status == 10">
                    <div class="my-2">
                      <router-link
                        :to="{
                          name: 'vendorordersview',
                          params: { uuid: order.uuid },
                        }"
                      >
                        <button
                          class="bg-zinc-600 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full"
                          type="button"
                        >
                          Leave A Review
                        </button>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-gray-700">
        You have no orders currently. Try buying something..or just HODL :)
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

export default defineComponent({
  name: "userorders",

  components: {
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainHeaderVendor,
    MainFooter,
  },

  data() {
    return {
      orders: [],
      orderscount: "",
    };
  },

  mounted() {
    this.getuserorderscount();
    this.getuserorders();
  },

  methods: {
    async getuserorders() {
      await axios({
        method: "get",
        url: "/orders",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
          this.orders = response.data;
        }
      });
    },
    async getuserorderscount() {
      await axios({
        method: "get",
        url: "/orders/count",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
          this.orderscount = response.data.count;
        }
      });
    },
    async delivered(uuid) {
      await axios({
        method: "get",
        url: "/orders/mark/delivered/" + uuid,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
    
          this.getuserorders();
        }
      });
    },
    async finalize(uuid) {
      await axios({
        method: "get",
        url: "/orders/mark/finalized/" + uuid,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
   
          this.getuserorders();
        }
      });
    },
    async requestcancel(uuid) {
      await axios({
        method: "get",
        url: "/orders/request/cancel/" + uuid,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
      
        if (response.status == 200) {
        
          this.getuserorderscount();
          this.getuserorders();
        }
      });
    },
    async disputeorder(uuid) {
      await axios({
        method: "get",
        url: "/orders/mark/disputed/" + uuid,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
          this.createdisputechat(uuid);
          this.getuserorders();
        }
      });
    },
    async createdisputechat(uuid) {
      await axios({
        method: "post",
        url: "/msg/create/dispute/" + uuid,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
        }
      });
    },
  },
});
</script>
