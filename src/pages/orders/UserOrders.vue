
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
    <div class="grid grid-cols-1 w-full gap-4">
      <h1 class="col-span-1 font-semibold text-2xl">Your Orders</h1>
      <div class="" v-if="orderscount > 0">
        <div v-for="(order, i) in orders" :key="i" class="pb-5">
          <div class="grid grid-cols-12 rounded-md border border-gray-300 mb-5">
            <div class="col-span-12 bg-gray-200 px-5 py-5">
              <div class="grid grid-cols-12 text-[12px]">
                <div class="col-span-3">
                  <div class="">Order Placed</div>
                  <div class="">{{ order.created }}</div>
                </div>
                <div class="col-span-3">
                  <div class="">Total</div>
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
                <div class="col-span-2"></div>
                <div class="col-span-4">
                  Order #
                  <router-link
                    class="text-blue-600 hover:text-blue-500 hover:underline"
                    :to="{
                      name: 'vendorordersview',
                      params: { uuid: order.uuid },
                    }"
                  >
                    {{ order.uuid }}
                  </router-link>
                </div>
              </div>
            </div>
            <div class="col-span-12 bg-white px-5 py-5">
              <div class="grid grid-cols-12">
                <div class="col-span-9">
                  <div class="grid grid-cols-12">
                    <div class="col-span-12 text-[20px]">
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
                      <div
                        class="text-red-600"
                        v-if="order.overall_status === 8"
                      >
                        Disputed
                      </div>
                      <div v-if="order.overall_status === 10">Finalized</div>
                    </div>
                    <div class="col-span-12 text-[14px]">
                      <div class="grid grid-cols-12 pt-5">
                        <div class="col-span-2">Image</div>
                        <div class="col-span-10">
                          <div
                            class="text-blue-600 hover:text-blue-600 hover:underline text-[18px]"
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
                                    class="text-blue-600 hover:text-blue-500 hover:underline pl-3"
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
                      order.overall_status === 3 ||
                      order.overall_status === 2 ||
                      order.overall_status === 4 ||
                      order.overall_status === 8
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
                  <div v-if="order.overall_status === 1">
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
                  <div v-if="order.overall_status === 2">
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
                  <div v-if="order.overall_status === 3">
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
                  <div v-if="order.overall_status === 4">
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
                  <div v-if="order.overall_status === 6"></div>
                  <!-- Disputed order -->
                  <div v-if="order.overall_status === 8">
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
                  <div v-if="order.overall_status === 10"></div>
                </div>
              </div>
            </div>

            <div v-if="order.vendor_feedback === 0" class="col-span-12">
              <div class="grid grid-cols-12">
                <div class="col-span-12">
                  <div class="grid grid-cols-12 p-5">
                    <div class="col-span-12">
                      <div class="col-span-12">Rate this vendor:</div>
                      <div class="col-span-12">
                        <fieldset class="rating">
                          <input
                            type="radio"
                            id="vendorstar10"
                            name="vendorrating"
                            value="10"
                            @click.prevent="sendscore(order.uuid, '10')"
                            v-model="order.vendor_rating"
                          /><label class="full" for="vendorstar10"></label>
                          <input
                            type="radio"
                            id="vendorstar9"
                            name="vendorrating"
                            value="9"
                            @click.prevent="sendscore(order.uuid, '9')"
                          /><label class="full" for="vendorstar9"></label>
                          <input
                            type="radio"
                            id="vendorstar8"
                            name="vendorrating"
                            value="8"
                            @click.prevent="sendscore(order.uuid, '8')"
                          /><label class="full" for="vendorstar8"></label>
                          <input
                            type="radio"
                            id="vendorstar7"
                            name="vendorrating"
                            value="7"
                            @click.prevent="sendscore(order.uuid, '7')"
                          /><label class="full" for="vendorstar7"></label>
                          <input
                            type="radio"
                            id="vendorstar6"
                            name="vendorrating"
                            value="6"
                            @click.prevent="sendscore(order.uuid, '6')"
                          /><label class="full" for="vendorstar6"></label>
                          <input
                            type="radio"
                            id="vendorstar5"
                            name="vendorrating"
                            value="5"
                            @click.prevent="sendscore(order.uuid, '5')"
                          /><label class="full" for="vendorstar5"></label>
                          <input
                            type="radio"
                            id="vendorstar4"
                            name="vendorrating"
                            value="4"
                            @click.prevent="sendscore(order.uuid, '4')"
                          /><label class="full" for="vendorstar4"></label>
                          <input
                            type="radio"
                            id="vendorstar3"
                            name="vendorrating"
                            value="3"
                            @click.prevent="sendscore(order.uuid, '3')"
                          /><label class="full" for="vendorstar3"></label>
                          <input
                            type="radio"
                            id="vendorstar2"
                            name="vendorrating"
                            value="2"
                            @click.prevent="sendscore(order.uuid, '2')"
                          /><label class="full" for="vendorstar2"></label>
                          <input
                            type="radio"
                            id="vendorstar1"
                            name="vendorrating"
                            value="1"
                            @click.prevent="sendscore(order.uuid, '1')"
                          /><label class="full" for="vendorstar1"></label>
                        </fieldset>
                      </div>
                    </div>
                    <div class="col-span-12">Leave a review:</div>
                    <form
                      class="col-span-12"
                      @submit.prevent="sendreview(order.uuid, i)"
                    >
                      <textarea
                        class="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="message"
                        type="textfield"
                        placeholder="Customer Review .."
                        name="order_review"
                        v-model="review[i]"
                      />

                      <div class="col-span-12 text-center">
                        <button
                          class="bg-yellow-600 hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          type="submit"
                        >
                          Add Feedback
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="col-span-12 mt-5"></div>
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
import { notify } from "@kyvg/vue3-notification";
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
      orderscount: 0,
      review: [],
    };
  },

  mounted() {
    this.getuserorderscount();
    this.getuserorders();
  },

  methods: {
    // sends the score
    sendscore(uuid: string, rating: string) {
      let payLoad = { rating: rating };
      this.sendFeedbackScore(uuid, payLoad);
    },
     sendFeedbackScore(uuid: string, rating: string) {
       let payLoad = { rating: rating };

      return axios({
        method: "post",
        url: "/orders/feedback/score/" + uuid,
        data: payLoad,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if ((response.status = 200)) {
            notify({
              title: "Message Center",
              text: "Successfully sent feedback!",
              type: "success",
            });
            this.getuserorders();
          }
        })
        .catch((error) => {
          console.log(error)
          notify({
            title: "Freeport Error",
            text: "Error posting information.",
            type: "error",
          });
        });
    },
    // sends the text review feedback
    sendreview(uuid, i) {
      let user_review = this.review[i];
      let payLoad = { review: user_review };
      this.sendFeedbackReview(uuid, payLoad);
    },
     sendFeedbackReview(uuid: string, review) {
     let payLoad = { review: review };
      return axios({
        method: "post",
        url: "/orders/feedback/review/" + uuid,
        data: payLoad,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if ((response.status = 200)) {
            notify({
              title: "Message Center",
              text: "Successfully sent feedback!",
              type: "success",
            });
            this.getuserorders();
          }
        })
        .catch((error) => {
          console.log(error)
          notify({
            title: "Freeport Error",
            text: "Error posting information.",
            type: "error",
          });
        });
    },
    // gets the user orders
     getuserorders() {
      return axios({
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
    // gets how many orders
     getuserorderscount() {
      return axios({
        method: "get",
        url: "/orders/count",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
          this.orderscount = response.data;
        }
      });
    },
    // mark as delivered
     delivered(uuid) {
      return axios({
        method: "get",
        url: "/orders/mark/delivered/" + uuid,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
          this.getuserorders();
          notify({
            title: "Message Center",
            text: "Successfully marked as delivered!",
            type: "success",
          });
        }
      });
    },
    // marks as finalized
     finalize(uuid) {
      return axios({
        method: "get",
        url: "/orders/mark/finalized/" + uuid,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
          this.getuserorders();
          notify({
            title: "Message Center",
            text: "Successfully finalized order!",
            type: "success",
          });
        }
      });
    },
    // mark as requested to cancel
     requestcancel(uuid) {
      return axios({
        method: "get",
        url: "/orders/request/cancel/" + uuid,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
          notify({
            title: "Message Center",
            text: "Successfully sent cancel request to vendor!",
            type: "success",
          });
          this.getuserorderscount();
          this.getuserorders();
        }
      });
    },
    // mark as disputed
     disputeorder(uuid) {
      return axios({
        method: "get",
        url: "/orders/mark/disputed/" + uuid,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
          notify({
            title: "Message Center",
            text: "Successfully request a dispute.",
            type: "success",
          });
          this.createdisputechat(uuid);
          this.getuserorders();
        }
      });
    },
    // creates dispute chat (background call)
     createdisputechat(uuid) {
      return axios({
        method: "post",
        url: "/msg/create/dispute/" + uuid,
        withCredentials: true,
        headers: authHeader(),
      }).then(() => {
        console.log("dispute created")
      });
    },
  },
});
</script>
<style>
@import url(//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css);

fieldset,
label {
  margin: 0;
  padding: 0;
}
h1 {
  font-size: 1.5em;
  margin: 10px;
}
/****** Style Star Rating Widget *****/
.rating {
  border: none;
  float: left;
}
.rating > input {
  display: none;
}
.rating > label:before {
  margin: 5px;
  font-size: 1.25em;
  font-family: 'FontAwesome', sans-serif;
  display: inline-block;
  content: "\f005";
}
/*.rating > .half:before {
  content: "\f089";
  position: absolute;
}*/
.rating > label {
  color: #ddd;
  float: right;
}
/***** CSS Magic to Highlight Stars on Hover *****/
.rating > input:checked ~ label, /* show gold star when clicked */
.rating:not(:checked) > label:hover, /* hover current star */
.rating:not(:checked) > label:hover ~ label {
  color: #ffd700;
}
/* hover previous stars in list */
.rating > input:checked + label:hover, /* hover current star when changing rating */
.rating > input:checked ~ label:hover,
.rating > label:hover ~ input:checked ~ label, /* lighten current selection */
.rating > input:checked ~ label:hover ~ label {
  color: #ffed85;
}
</style>
