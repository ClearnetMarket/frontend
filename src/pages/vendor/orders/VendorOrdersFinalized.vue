
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
              class="flex py-2 px-4 shadow-md text-sm no-underline rounded-full bg-zinc-600 hover:bg-zinc-400 text-white font-sans hover:text-white focus:outline-none active:shadow-none mr-2"
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
              class="flex py-2 px-4 shadow-md no-underline rounded-full bg-zinc-600 hover:bg-zinc-400 hover:text-white text-white font-sans text-sm btn-primary focus:outline-none active:shadow-none mr-2"
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
              class="flex py-2 px-4 shadow-md no-underline rounded-full bg-zinc-600 hover:bg-zinc-400 hover:text-white text-white font-sans text-sm btn-primary focus:outline-none active:shadow-none mr-2"
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
              class="flex py-2 px-4 shadow-md no-underline rounded-full bg-zinc-600 hover:bg-zinc-400 hover:text-white text-white font-sans text-sm btn-primary focus:outline-none active:shadow-none mr-2"
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

      <!--Loops throu orders -->
      <div class="grid grid-cols-1 w-full gap-4 mt-5">
        <h1 class="col-span-1 font-semibold text-2xl">Finalized Orders</h1>

        <div v-for="(order, i) in orders" :key="i" class="pb-5">
          <div v-if="order.uuid">
            <div
              class="grid grid-cols-12 rounded border border-1 border-gray-300 bg-gray-100 p-5"
            >
              <div class="col-span-12 text-[18px]">
                <router-link
                  class="text-blue-600 hover:underline hover:text-blue-400"
                  :to="{ name: 'item', params: { id: order.item_uuid } }"
                >
                  <div>{{ order.title_of_item }}</div>
                </router-link>
              </div>
              <div class="col-span-12">{{ order.uuid }}</div>
              <div class="col-span-1">{{ relativeDate(order.created) }}</div>

              <div class="col-span-2">{{ order.customer_user_name }}</div>
              <div class="col-span-4">
                <div
                  class="flex justify-between"
                  v-if="order.digital_currency === 1"
                >
                  <div v-if="order.shipping_price_btc === 0">Free Shipping</div>
                  <div v-else>{{ order.shipping_price_btc }}</div>

                  <div class="">{{ order.price_total_btc }} BTC</div>
                </div>
                <div
                  class="flex justify-between"
                  v-if="order.digital_currency === 2"
                >
                  <div v-if="order.shipping_price_bch === 0">Free Shipping</div>
                  <div v-else>{{ order.shipping_price_bch }}</div>

                  <div class="">{{ order.price_total_bch }} BCH</div>
                </div>
                <div
                  class="flex justify-between"
                  v-if="order.digital_currency === 3"
                >
                  <div class="">
                    <div v-if="order.shipping_price_xmr === 0">
                      Free Shipping
                    </div>
                    <div v-else>{{ order.shipping_price_xmr }}</div>
                  </div>

                  <div class="flex">{{ order.price_total_xmr }} XMR</div>
                </div>
              </div>

              <div v-if="order.user_feedback === 0" class="col-span-12">
                <div class="grid grid-cols-12">
                  <div class="col-span-12">
                    <div class="grid grid-cols-12">
                      <div class="col-span-12 text-[14px]">
                        Leave Feedback for {{ order.customer_user_name }}
                      </div>
                      <div class="col-span-12">
                        <div class="col-span-12">Rate this customer:</div>
                        <div class="col-span-12">
                          <fieldset class="rating">
                            <input
                              type="radio"
                              id="vendorstar10"
                              name="vendorrating"
                              @click.prevent="sendscore(order.uuid, '10')"
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
                      <div class="col-span-12 mb-1">Leave a review:</div>
                      <form
                        class="col-span-12"
                        @submit.prevent="sendreview(order.uuid, i)"
                      >
                        <textarea
                          v-model="review[i]"
                          class="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="message"
                          type="textfield"
                          placeholder="Customer Review .."
                        />

                        <button
                          class="bg-yellow-600 hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          type="submit"
                        >
                          Add Feedback
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="col-span-12 mt-5"></div>
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
 @typedef {Object} order.user_feedback
 @typedef {Object} order.customer_uuid
 @typedef {Object} order.price_total_btc
 @typedef {Object} order.price_total_btc
 *
 */


export default defineComponent({
  name: "vendorordersfinalized",

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
      review: [],
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
    this.getuserorders();
    this.getuserneworderscount();
  },

  methods: {
    //payload for the score
    sendscore(uuid: string, rating: string) {
      let payLoad = { rating: rating };
      this.sendFeedbackScore(uuid, payLoad);
    },
    // send the score for a feedback
    // accepts payload
     sendFeedbackScore(uuid: string, payLoad = this.payLoad) {
      return axios({
        method: "post",
        url: "/orders/vendor/feedback/score/" + uuid,
        data: payLoad,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if ((response.status = 200)) {
            notify({
              title: "Message Center",
              text: "Successfully sent feedback score!",
              type: "success",
            });
            this.getuserorders();
            this.getuserneworderscount();
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
    // payload for sending feedback
    sendreview(uuid, i) {
      let user_review = this.review[i];
      const payLoad = { review: user_review };
      this.sendFeedbackReview(uuid, payLoad);
    },
    // send the feedback
     sendFeedbackReview(uuid: string, payLoad = this.payLoad) {
      return axios({
        method: "post",
        url: "/orders/vendor/feedback/review/" + uuid,
        data: payLoad,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if (response.status == 200) {
            notify({
              title: "Message Center",
              text: "Successfully sent feedback",
              type: "success",
            });
            this.getuserorders();
            this.getuserneworderscount();
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
        url: "/vendororders/finalized",
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if (response.status == 200) {
          this.orders = response.data;
        }
      });
    },
    // gets the count for the top bars count
     getuserneworderscount() {
      return axios({
        method: "get",
        url: "/vendororders/count",
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
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
    // get the date conversion
    relativeDate(value) {
      let e = new Date(value).valueOf();
      return formatDistance(e, new Date());
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
