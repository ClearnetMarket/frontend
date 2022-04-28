<template>
  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />

  <div class="max-w-4xl mx-auto wrapper px-10">
    <div class="grid grid-cols-1 w-full gap-4">
      <div class="mb-10 mt-5 px-5">
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
    <div class="flex">
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
      <h1 class="col-span-1 font-semibold text-2xl">Finalized Orders</h1>

      <div v-for="order in orders" :key="order.uuid">
        <div v-if="order.uuid">
          <div
            class="grid grid-cols-12 rounded border border-1 border-gray-300 bg-gray-100 p-5"
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
         
            <div v-if="order.vendor_feedback == 0" class="col-span-12 mt-10">
              <div class="grid grid-cols-12">
                <div class="col-span-12">
                  <form @submit.prevent="onSubmitFeedback(order.uuid)">
                    <div class="grid grid-cols-12 mb-5 p-5">
                      <div class="col-span-12 text-[18px] mb-5">
                        Leave Feedback for {{ order.customer_user_name }}
                      </div>

                      <div class="col-span-12">
                        <div class="col-span-12">Customer Rating</div>
                        <div class="col-span-12">
                          <fieldset class="rating">
                            <input
                              type="radio"
                              id="vendorstar10"
                              name="vendorrating"
                              value="10"
                              v-model="VendorRating.vendorrating10"
                            /><label class="full" for="vendorstar10"></label>
                            <input
                              type="radio"
                              id="vendorstar9"
                              name="vendorrating"
                              value="9"
                              v-model="VendorRating.vendorrating9"
                            /><label class="full" for="vendorstar9"></label>
                            <input
                              type="radio"
                              id="vendorstar8"
                              name="vendorrating"
                              value="8"
                              v-model="VendorRating.vendorrating8"
                            /><label class="full" for="vendorstar8"></label>
                            <input
                              type="radio"
                              id="vendorstar7"
                              name="vendorrating"
                              value="7"
                              v-model="VendorRating.vendorrating7"
                            /><label class="full" for="vendorstar7"></label>
                            <input
                              type="radio"
                              id="vendorstar6"
                              name="vendorrating"
                              value="6"
                              v-model="VendorRating.vendorrating6"
                            /><label class="full" for="vendorstar6"></label>
                            <input
                              type="radio"
                              id="vendorstar5"
                              name="vendorrating"
                              value="5"
                              v-model="VendorRating.vendorrating5"
                            /><label class="full" for="vendorstar5"></label>
                            <input
                              type="radio"
                              id="vendorstar4"
                              name="vendorrating"
                              value="4"
                              v-model="VendorRating.vendorrating4"
                            /><label class="full" for="vendorstar4"></label>
                            <input
                              type="radio"
                              id="vendorstar3"
                              name="vendorrating"
                              value="3"
                              v-model="VendorRating.vendorrating3"
                            /><label class="full" for="vendorstar3"></label>
                            <input
                              type="radio"
                              id="vendorstar2"
                              name="vendorrating"
                              value="2"
                              v-model="VendorRating.vendorrating2"
                            /><label class="full" for="vendorstar2"></label>
                            <input
                              type="radio"
                              id="vendorstar1"
                              name="vendorrating"
                              value="1"
                              v-model="VendorRating.vendorrating1"
                            /><label class="full" for="vendorstar1"></label>
                          </fieldset>
                        </div>
                      </div>
                      <div class="col-span-12 mt-5 mb-1">Leave a review:</div>
                      <div class="col-span-12">
                        <textarea
                          v-model="review"
                          class="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="message"
                          type="textfield"
                          placeholder="Customer Review .."
                        />
                      </div>
                      <div class="col-span-12 text-center mt-5">
                        <button
                          class="bg-yellow-600 hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          type="submit"
                        >
                          Add Feedback
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div v-else class="col-span-12 mt-5">
            Feedback Added
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
  name: "vendorordersfinalized",

  components: {
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainFooter,
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

      VendorRating: {
        vendorrating1: "",
        vendorrating2: "",
        vendorrating3: "",
        vendorrating4: "",
        vendorrating5: "",
        vendorrating6: "",
        vendorrating7: "",
        vendorrating8: "",
        vendorrating9: "",
        vendorrating10: "",
      },
    };
  },

  mounted() {
    this.getuserorders();
    this.getuserneworderscount();
  },

  methods: {
    onSubmitFeedback(uuid) {
      if (this.VendorRating.vendorrating1 == 1) {
        this.rating_vendor = 1;
      } else if (this.VendorRating.vendorrating2 == 2) {
        this.rating_vendor = 2;
      } else if (this.VendorRating.vendorrating3 == 3) {
        this.rating_vendor = 3;
      } else if (this.VendorRating.vendorrating4 == 4) {
        this.rating_vendor = 4;
      } else if (this.VendorRating.vendorrating5 == 5) {
        this.rating_vendor = 5;
      } else if (this.VendorRating.vendorrating6 == 6) {
        this.rating_vendor = 6;
      } else if (this.VendorRating.vendorrating7 == 7) {
        this.rating_vendor = 7;
      } else if (this.VendorRating.vendorrating8 == 8) {
        this.rating_vendor = 8;
      } else if (this.VendorRating.vendorrating9 == 9) {
        this.rating_vendor = 9;
      } else if (this.VendorRating.vendorrating10 == 10) {
        this.rating_vendor = 10;
      }

      const payLoad = {
        customerrating: this.rating_vendor,
        review: this.review,
      };
      this.sendFeedback(uuid, payLoad);
      this.getuserorders();
    },
    async sendFeedback(uuid, payLoad: { customerrating: string; review: string }) {
      console.log(payLoad)
      await axios({
        method: "post",
        url: "/orders/feedback/vendor/" + uuid,
        data: payLoad,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          console.log(response)
          this.getuserorders();
        })
        .catch((error) => {
         console.log(error)
        });
    },
    async getuserorders() {
      await axios({
        method: "get",
        url: "/vendororders/finalized",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
          this.orders = response.data;
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
  font-family: FontAwesome;
  display: inline-block;
  content: "\f005";
}
.rating > .half:before {
  content: "\f089";
  position: absolute;
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
