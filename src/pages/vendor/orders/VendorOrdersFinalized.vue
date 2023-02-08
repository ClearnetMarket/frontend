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
            <span class>New</span>
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
            class="py-2 px-4 shadow-md no-underline rounded-full text-white font-sans text-sm hover:text-white bg-zinc-600 hover:bg-zinc-400 focus:outline-none active:shadow-none mr-2">
            Cancel
          </button>
        </router-link>
      </div>
    </div>


    <div class="grid grid-cols-1 w-full gap-4 mt-5">
      <h1 class="col-span-1 font-semibold text-2xl">Finalized Orders</h1>
      <!--Loops through orders -->
      <div v-for="(order, i) in orders" :key="i" class="pb-5">
        <div v-if="order.uuid">

          <div class="rounded-md bg-white p-5">
            <div class="grid grid-cols-12 ">
              <div class="col-span-12 text-[20px]  mb-5">
                <router-link class="text-blue-600 hover:underline hover:text-blue-400 text-center"
                  :to="{ name: 'MarketItem', params: { id: order.item_uuid } }">
                  <div>{{ order.title_of_item }}</div>
                </router-link>
              </div>
            </div>
            <div class="grid grid-cols-12 gap-4 text-[14px]">
              <div class="col-span-12 sm:col-span-3 flex justify-center">
                <img class="object-contain" alt="" :src="order.image_one" />
              </div>
              <div class="col-span-12 sm:-span-6 ">
                <div class="col-span-12 flex">
                  <div class="font-bold px-2">Order UUID:</div>
                  <div class="px-2">{{ order.uuid }}</div>
                </div>
                <div class="col-span-4 flex">
                  <div class="font-bold px-2">
                    Ordered:
                  </div>
                  <div class="px-2 flex ">{{ relativeDate (order.created) }}</div>
                </div>
                <div class="col-span-1 flex">
                  <div class="font-bold px-2">
                    Quantity:
                  </div>
                  <div class="px-2">{{ order.quantity }}</div>
                </div>
                <div class="col-span-2 flex">
                  <div class="font-bold px-2">Customer: </div>
                  <div class="px-2">{{ order.customer_user_name }}</div>

                </div>
                <div class="col-span-4 flex">
                  <div class="font-bold px-2">Payment Info: </div>

                  <div class="" v-if="order.digital_currency === 1">
                    <div v-if="order.shipping_price_btc === 0">Free Shipping</div>
                    <div v-else>{{ order.shipping_price_btc }}</div>
                    <div class="">{{ order.price_total_btc }} BTC</div>
                  </div>
                  <div class="" v-if="order.digital_currency === 2">
                    <div v-if="order.shipping_price_bch === 0">Free Shipping</div>
                    <div v-else>{{ order.shipping_price_bch }}</div>
                    <div class="">{{ order.price_total_bch }} BCH</div>
                  </div>
                  <div class="" v-if="order.digital_currency === 3">
                    <div class="">
                      <div v-if="order.shipping_price_xmr === 0">
                        Free Shipping
                      </div>
                      <div v-else>{{ order.shipping_price_xmr }}</div>
                    </div>

                    <div class="flex">{{ order.price_total_xmr }} XMR</div>
                  </div>
                </div>
              </div>
              <div class="col-span-12 sm:col-span-3">
                <div class=" text-[14px] font-bold flex justify-center">
                  <router-link :to="{ name: 'vendorordersfeedback', params: { uuid: order.uuid }, }" class="px-3">
                    <button
                      class="bg-blue-600 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline ">
                      View Order
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
 @typedef {Object} order.review_of_customer
 @typedef {Object} order.customer_rating
 @typedef {Object} order.vendor_feedback
 @typedef {Object} order.review_of_user
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

  data () {
    return {
      date: Date.now(),
      tab: [],
      orders: null,

      vendor_orders_new: 0,
      vendor_orders_accepted: 0,
      vendor_orders_shipped: 0,
      vendor_orders_finalized: 0,
      vendor_orders_finalized_early: 0,
      vendor_orders_request_cancel: 0,
      vendor_orders_cancelled: 0,
      vendor_orders_dispute: 0,
      selectedrating: true,
      rated: false,

    };
  },

  mounted () {
    this.getuserorders();
    this.getuserneworderscount();
  },

  methods: {

    // gets the user orders
    getuserorders () {
      axios({
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
    getuserneworderscount () {
      axios({
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
            this.vendor_orders_finalized_early = response.data.vendor_orders_finalized_early;
            this.vendor_orders_request_cancel = response.data.vendor_orders_request_cancel;
            this.vendor_orders_cancelled = response.data.vendor_orders_cancelled;
            this.vendor_orders_dispute = response.data.vendor_orders_dispute;
          }
        });
    },
    // get the date conversion
    relativeDate (value: any) {
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

.rating>input {
  display: none;
}

.rating>label:before {
  margin: 5px;
  font-size: 1.25em;
  font-family: 'FontAwesome', sans-serif;
  display: inline-block;
  content: "\f005";
}

.rating>label {
  color: #ddd;
  float: right;
}

/***** CSS Magic to Highlight Stars on Hover *****/
.rating>input:checked~label,
/* show gold star when clicked */
.rating:not(:checked)>label:hover,
/* hover current star */
.rating:not(:checked)>label:hover~label {
  color: #ffd700;
}

/* hover previous stars in list */
.rating>input:checked+label:hover,
/* hover current star when changing rating */
.rating>input:checked~label:hover,
.rating>label:hover~input:checked~label,
/* lighten current selection */
.rating>input:checked~label:hover~label {
  color: #ffed85;
}
</style>
