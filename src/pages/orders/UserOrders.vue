
<template>
  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />
  <div class="wrapper">
    <div class="max-w-4xl mx-auto  px-2 text-white">
      <div class="grid grid-cols-1 w-full ">
        <div class="mb-10 mt-5">
          <nav class="rounded-md">
            <ol class="list-reset flex">
              <li>
                <router-link :to="{ name: 'home' }">
                  <a class="text-blue-600 hover:text-blue-500">Home</a>
                </router-link>
              </li>
              <li>
                <span class="text-gray-500 mx-2">/</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div class="grid grid-cols-1 w-full">
        <h1 class="col-span-1 font-semibold text-2xl text-center text-white">Your Orders</h1>
        <div v-if="recordsLength > 0">
          <div v-for="(order, i) in orders" :key="i" class="pb-5">
            <div class="grid grid-cols-12 rounded-md border border-gray-300 ">
              <div class="col-span-12 bg-info px-5 py-5 rounded-t-md">
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
              <div class="col-span-12 bg-neutral px-5  rounded-b-md">
                <div class="grid grid-cols-12 ">
                  <div class="col-span-12 md:col-span-9 ">
                    <div class="grid grid-cols-12">
                      <div class="col-span-12 text-[20px] text-center md:text-left">
                        <div v-if="order.overall_status === 1">
                          Waiting to be accepted
                        </div>
                        <div v-if="order.overall_status === 2">
                          Waiting on Shipment
                        </div>
                        <div v-if="order.overall_status === 3">Shipped</div>
                        <div v-if="order.overall_status === 4">Delivered</div>
                        <div v-if="order.overall_status === 5">
                          Finalized Order
                        </div>
                        <div v-if="order.overall_status === 6">
                          Requested cancel from vendor
                        </div>
                        <div v-if="order.overall_status === 7">Cancelled</div>
                        <div class="text-red-600" v-if="order.overall_status === 8">
                          Disputed
                        </div>
                        <div v-if="order.overall_status === 10">Finalized</div>
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
                            <div class="">
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
                  </div>
                  <div class="col-span-12 sm:col-span-3">
                    <div v-if="
                      order.overall_status === 3 ||
                      order.overall_status === 2 ||
                      order.overall_status === 4 ||
                      order.overall_status === 8
                    ">
                      <div class="my-2">
                        <router-link :to="{
                          name: 'ordersview',
                          params: { uuid: order.uuid },
                        }">
                          <button
                            class="bg-zinc-600 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full"
                            type="button">
                            Tracking Info
                          </button>
                        </router-link>
                      </div>
                    </div>
                    <!-- waiting on vendor acceptance order -->
                    <div v-if="order.overall_status === 1">
                      <div class="my-2">
                        <button
                          class="bg-red-600 hover:bg-red-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full"
                          type="button" @click="requestcancel(order.uuid)">
                          Request Cancel
                        </button>
                      </div>
                    </div>
                    <!-- Accepted order -->
                    <div v-if="order.overall_status === 2">
                      <div class="my-2">
                        <button
                          class="bg-red-600 hover:bg-red-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full"
                          type="button" @click="requestcancel(order.uuid)">
                          Request Cancel
                        </button>
                      </div>
                      <div class="my-2">
                        <button
                          class="bg-zinc-600 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full"
                          type="button" @click="finalize(order.uuid)">
                          Finalize Order
                        </button>
                      </div>

                      <div class="my-2">
                        <button
                          class="bg-zinc-600 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full"
                          type="button" @click="disputeorder(order.uuid)">
                          Dispute Order
                        </button>
                      </div>
                    </div>
                    <!-- Shipped order -->
                    <div v-if="order.overall_status === 3">
                      <div class="my-2">
                        <button
                          class="bg-zinc-600 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full"
                          type="button" @click="delivered(order.uuid)">
                          Mark as Delivered
                        </button>
                      </div>
                      <div class="my-2">
                        <button
                          class="bg-zinc-600 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full"
                          type="button" @click="finalize(order.uuid)">
                          Finalize Order
                        </button>
                      </div>
                      <div class="my-2">
                        <button
                          class="bg-zinc-600 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full"
                          type="button" @click="disputeorder(order.uuid)">
                          Dispute Order
                        </button>
                      </div>
                    </div>
                    <!-- Delivered order -->
                    <div v-if="order.overall_status === 4">
                      <div class="my-2">
                        <button
                          class="bg-green-600 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full"
                          type="button" @click="finalize(order.uuid)">
                          Finalize Order
                        </button>
                      </div>
                      <div class="my-2">
                        <button
                          class="bg-zinc-600 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full"
                          type="button" @click="disputeorder(order.uuid)">
                          Dispute Order
                        </button>
                      </div>
                    </div>
                    <!-- Requested Cancel from vendor -->
                    <div v-if="order.overall_status === 6"></div>
                    <!-- Disputed order -->
                    <div v-if="order.overall_status === 8">
                      <router-link :to="{
                        name: 'Dispute',
                        params: { uuid: order.uuid },
                      }">
                        <button
                          class="bg-red-600 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full"
                          type="button">
                          View Dispute
                        </button>
                      </router-link>
                    </div>
                    <!-- Finalized order -->
                    <div v-if="order.overall_status === 10">
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
                            class="bg-yellow-600 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full"
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
          <div class="col-span-12 mb-20" v-if="recordsLength > 9">
            <pagination @paginate="getPage" :records="recordsLength" v-model="page" :per-page="perPage"
              :options="options"> </pagination>
            <div class="flex justify-center"> {{ recordsLength }} items Found</div>
          </div>
          <div class="col-span-12 mb-20 flex justify-center" v-else>{{ recordsLength }} items</div>
        </div>
        <div v-else class="text-white text-center text-[20px] mt-10">
          You have no orders currently. Try buying something..or just HODL :)
        </div>
      </div>
    </div>
  </div>
  <MainFooter />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import { notify } from '@kyvg/vue3-notification'
import authHeader from '../../services/auth.header'
import MainHeaderTop from '../../layouts/headers/MainHeaderTop.vue'
import MainHeaderMid from '../../layouts/headers/MainHeaderMid.vue'
import MainHeaderBottom from '../../layouts/headers/MainHeaderBottom.vue'
import MainHeaderVendor from '../../layouts/headers/MainHeaderVendor.vue'
import MainFooter from '../../layouts/footers/FooterMain.vue'
import PaginationComp from '../../components/MyPagination.vue'


export default defineComponent({
  name: "userorders",

  components: {
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainHeaderVendor,
    MainFooter,
  },

  data () {
    return {
      orders: [],
      review: [],
      user: null,
      page: 1,
      perPage: 20,
      recordsLength: 0,
      options: {
        edgeNavigation: false,
        format: false,
        template: PaginationComp
      }

    };
  },
  created(){
    this.userstatus();
  },
  mounted(){
 
    this.getuserorderscount();
    this.getPage(this.page);
  },

  methods: {
    userstatus () {
      axios({
        method: "get",
        url: "/auth/whoami",
        withCredentials: true,
        headers: authHeader(),
      })
      .then((response) => {
      if (response.data.login == true) 
        { this.user = response.data.user }
      else 
        { this.$router.push("/login") }
      })
      .catch(() => {
        this.$router.push("/login")
      })
    },


    getPage: function (page: any) {
      // we simulate an api call that fetch the records from a backend
      this.orders = [];
      const startIndex = this.perPage * (page - 1) + 1;
      const endIndex = startIndex + this.perPage - 1;
      this.getuserorders(page)
     
    },
    // gets the user orders
    getuserorders (page: any) {
      axios({
        method: "get",
        url: "/orders/" + page,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => { this.orders = response.data });
    },
    // gets how many orders
    getuserorderscount () {
      axios({
        method: "get",
        url: "/orders/count",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        this.recordsLength = response.data.count;

      });
    },

    // mark as delivered
    delivered (uuid: any) {
      axios({
        method: "get",
        url: "/orders/mark/delivered/" + uuid,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.data.success) {
          this.getPage(this.page);
          notify({
            title: "Message Center",
            text: "Successfully marked as delivered!",
            type: "success",
          });
        }
      });
    },
    // marks as finalized
    finalize (uuid: any) {
      axios({
        method: "get",
        url: "/orders/mark/finalized/" + uuid,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.data.success) {
          this.getPage(this.page);
          notify({
            title: "Message Center",
            text: "Successfully finalized order!",
            type: "success",
          });
        }
      });
    },
    // mark as requested to cancel
    requestcancel (uuid: any) {
      axios({
        method: "get",
        url: "/orders/request/cancel/" + uuid,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.data.success) {
          notify({
            title: "Message Center",
            text: "Successfully sent cancel request to vendor!",
            type: "success",
          });
          this.getuserorderscount();
          this.getPage(this.page);
        }
      });
    },
    // mark as disputed
    disputeorder (uuid: any) {
      axios({
        method: "get",
        url: "/orders/mark/disputed/" + uuid,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.data.success) {
          notify({
            title: "Message Center",
            text: "Successfully request a dispute.",
            type: "success",
          });
          this.createdisputechat(uuid);
          this.createdisputenotificationchat(uuid);
          this.getPage(this.page);
        }
      });
    },
    // creates dispute chat (background call)
    createdisputechat (uuid: any) {
      axios({
        method: "post",
        url: "/msg/create/dispute/" + uuid,
        withCredentials: true,
        headers: authHeader(),
      }).then(() => {

      });
    },
    // creates dispute vendor notification
    createdisputenotificationchat (uuid: any) {
      axios({
        method: "post",
        url: "/vendororders/notification/dispute/" + uuid,
        withCredentials: true,
        headers: authHeader(),
      }).then(() => {

      });
    },
    // creates dispute chat (background call)
    createdisputenotification (uuid: any) {
      axios({
        method: "post",
        url: "/msg/create/dispute/" + uuid,
        withCredentials: true,
        headers: authHeader(),
      }).then(() => {

      });
    },
  },
});
</script>
<style></style>
