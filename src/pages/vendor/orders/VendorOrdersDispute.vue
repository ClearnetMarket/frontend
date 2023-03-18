<template>
  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />
  <MainHeaderVendor />

  <div class="max-w-4xl mx-auto wrapper px-10" v-if="loaded = true">
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

    <div class="grid grid-cols-1 w-full gap-4 mt-5 mb-20">
      <h1 class="col-span-1 font-semibold text-2xl">Disputed Orders</h1>

      <div v-for="order in orders" :key="order.id">
        <div v-if="order.uuid">

          <div class="grid grid-cols-12 rounded-md border border-gray-300 ">
            <div class="col-span-12 bg-gray-100 px-5 py-5 rounded-t-md">
              <div class="grid grid-cols-12 text-[12px]">
                <div class="col-span-12 md:col-span-4  gap-2 text-[15px]">
                  <div class="md:text-center font-bold">Order Placed</div>
                  <div class="md:text-center">{{ order.created }}</div>
                </div>
                <div class="col-span-12 md:col-span-3  gap-5 text-[15px]">
                  <div class="md:text-center font-bold">Total</div>
                  <div class="md:text-center ">
                    <div v-if="order.digital_currency === 1">
                      {{ order.price_total_btc }} BTC
                    </div>
                    <div v-if="order.digital_currency === 2">
                      {{ order.price_total_bch }} BCH
                    </div>
                    <div v-if="order.digital_currency === 3">
                      {{ order.price_total_xmr }} XMR
                    </div>
                  </div>
                </div>

                <div class="col-span-12 md:col-span-4 gap-2 text-[15px]">
                  <div class="md:text-center font-bold">Order #</div>
                  <div class="md:text-center">
                    <router-link class="text-blue-600 hover:text-blue-500 hover:underline" :to="{
                      name: 'ordersview',
                      params: { uuid: order.uuid },
                    }">
                      {{ order.uuid }}
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-span-12 bg-white px-5  rounded-b-md">
              <div class="grid grid-cols-12 ">
                <div class="col-span-12 md:col-span-9 ">
                  <div class="grid grid-cols-12">
                    <div class="col-span-12 text-[20px] text-center md:text-left">
                      <div v-if="order.overall_status === 1" class="col-span-3">
                        Waiting to be accepted
                      </div>
                      <div v-if="order.overall_status === 2" class="col-span-3">
                        Waiting on Shipment
                      </div>
                      <div v-if="order.overall_status === 3" class="col-span-3">Shipped</div>
                      <div v-if="order.overall_status === 4" class="col-span-3">Delivered</div>
                      <div v-if="order.overall_status === 5" class="col-span-3">
                        Finalized Order
                      </div>
                      <div v-if="order.overall_status === 6" class="col-span-3">
                        Requested cancel from vendor
                      </div>
                      <div v-if="order.overall_status === 7" class="col-span-3">Cancelled</div>
                      <div class="text-red-600 col-span-2" v-if="order.overall_status === 8">
                        Disputed
                      </div>
                      <div v-if="order.overall_status === 10" class="col-span-3">Finalized</div>
                    </div>
                    <div class="col-span-12 text-[14px]">
                      <div class="grid grid-cols-12 md:pt-5 md:gap-5">
                        <div class="col-span-12 md:col-span-3 flex justify-center pb-5">
                          <img class="object-contain" :src="order.image_one" alt="" />
                        </div>
                        <div class="col-span-12 md:col-span-9">
                          <div class="text-blue-600 hover:text-blue-600 hover:underline text-[18px] text-center">
                            <router-link :to="{
                              name: 'MarketItem',
                              params: { id: order.item_uuid },
                            }">
                              {{ order.title_of_item }}
                            </router-link>
                          </div>
                      
                            <div v-if="order.vendor_uuid">
                              <div class="flex justify-center md:justify-start">
                                <div class="">Sold by:</div>
                                <router-link :to="{
                                  name: 'userprofile',
                                  params: { uuid: order.vendor_uuid },
                                }">
                                  <div class="text-blue-600 hover:text-blue-500 hover:underline pl-3">
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

                <!-- Requested Cancel from vendor -->
                <div v-if="order.overall_status === 6" class="col-span-3"></div>
                <!-- Disputed order -->
                <div v-if="order.overall_status === 8" class="col-span-3">
                  <router-link :to="{
                    name: 'Dispute',
                    params: { uuid: order.uuid },
                  }">
                    <button class="bg-red-600 hover:bg-zinc-400 text-white font-bold 
                      py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full" type="button">
                      View Dispute
                    </button>
                  </router-link>
                </div>
                <!-- Finalized order -->
                <div v-if="order.overall_status === 10" class="col-span-3">
                  <div v-if="order.vendor_feedback === 0">
                    <router-link :to="{
                      name: 'Dispute',
                      params: { uuid: order.uuid },
                    }">
                    </router-link>

                    <router-link class="text-blue-600 hover:text-blue-500 hover:underline" :to="{
                      name: 'ordersview',
                      params: { uuid: order.uuid },
                    }">
                      <button
                        class="bg-yellow-600 hover:bg-zinc-400 text-white font-bold py-1
                                  px-3 rounded focus:outline-none focus:shadow-outline w-full"
                        type="button">
                        Leave Feedback
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
  </div>
  <MainFooter />
</template>

<script lang="ts">

import { defineComponent } from "vue";
import axios from "axios";
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

  data () {
    return {
      orders: [],
      dispute: null,
      dispute_count: 0,
      loaded: false,
    };
  },

  mounted () {
    this.getdisputedorders();

    this.getdisputescount();
    this.deleteordernotice();
  },

  methods: {
    // gets the count of how many disputes
    getdisputescount () {
      axios({
        method: "get",
        url: "/vendor/new-disputes-count",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.data.success) {
          this.dispute_count = response.data.count;
    
        }
      });
    },
    // gets the disputed orders
    getdisputedorders () {
      axios({
        method: "get",
        url: "/vendororders/disputed",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.data.success) {

          this.orders = response.data;
          this.loaded = true

        }
      });
    },
    deleteordernotice () {
      axios({
        method: "delete",
        url: "/vendor/new-disputes-count/markasread",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.data.success) {

        }
      });
    },
    // date conversion
    relativeDate (value: any) {

      let e = new Date(value).valueOf();
      return formatDistance(e, new Date());
    },
  },
});
</script>
