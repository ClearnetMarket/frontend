
<template>

  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />
  <div class="max-w-4xl mx-auto wrapper ">

    <nav class="rounded-md px-5">
      <ol class="list-reset flex">
        <li>
          <router-link :to="{ name: 'home' }">
            <a class="text-blue-600 hover:text-blue-700">Home</a>
          </router-link>
        </li>
        <li>
          <span class="text-gray-500 mx-2">/</span>
        </li>
        <li>
          <router-link :to="{ name: 'userorders' }">
            <a class="text-blue-600 hover:text-blue-700">Orders</a>
          </router-link>
        </li>
        <li>
          <span class="text-gray-500 mx-2">/</span>
        </li>
      </ol>
      <ol class="list-reset flex"></ol>
    </nav>

    <div v-if="order_found">
      <div class="grid grid-cols-1 w-full px-5">
        <h1 class="col-span-1 font-semibold text-[14px] md:text-2xl text-center">Order# {{ order.uuid }}</h1>
        <div class="grid grid-cols-12 rounded-md border border-gray-300 mb-5">
          <div class="col-span-12 bg-gray-300  ">
            <div class="grid grid-cols-12 text-[14px]">
              <div class="col-span-12 sm:col-span-3">
                <div class="font-bold">Order Placed</div>
                <div class="">{{ order.created }}</div>
              </div>
              <div class="col-span-12 sm:col-span-3">
                <div class="font-bold">Total</div>
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

              <div class="col-span-12 sm:col-span-6 mb-5 sm:mb-0 ">
                <div class="font-bold">Order #</div>
                <div class="">{{ order.uuid }}</div>
              </div>
            </div>
          </div>
          <div class="col-span-12 bg-white ">
            <div class="grid grid-cols-12">
              <div class="col-span-12 sm:col-span-9">
                <div class="grid grid-cols-12 p-2">
                  <div class="col-span-12 text-center sm:text-left text-[20px]">
                    <div v-if="order.overall_status === 1">
                      Waiting to be accepted
                    </div>
                    <div v-if="order.overall_status === 2">
                      Waiting on Shipment
                    </div>
                    <div v-if="order.overall_status === 3">Shipped</div>
                    <div v-if="order.overall_status === 4">Delivered</div>
                    <div v-if="order.overall_status === 5">Finalized Early</div>
                    <div v-if="order.overall_status === 6">Request to Cancel</div>
                    <div v-if="order.overall_status === 7">Cancelled</div>
                    <div v-if="order.overall_status === 8">Disputed</div>
                  </div>
                  <div class="col-span-12 text-[14px]">
                    <div class="grid grid-cols-12 pt-5">
                      <div class="col-span-12 md:col-span-3 flex justify-center mb-3">
                        <img class="object-contain" :src="order.image_one" alt="" />
                      </div>
                      <div class="col-span-12 sm:col-span-9 mb-3">
                        <div class="text-blue-500 hover:text-blue-300 hover:underline text-center text-[20px] mb-5">
                          <div v-if="order.item_uuid">
                            <router-link :to="{
                              name: 'MarketItem',
                              params: { id: order.item_uuid }
                            }">
                              {{ order.title_of_item }}
                            </router-link>
                          </div>
                          <div v-else>{{ order.title_of_item }}</div>
                        </div>
                        <div v-if="order.vendor_uuid">
                          <div class="flex px-3">
                            <div class="">Sold by:</div>
                            <router-link :to="{
                              name: 'userprofile',
                              params: { uuid: order.vendor_uuid }
                            }">
                              <div class="text-blue-500 hover:text-blue-300 hover:underline pl-3 flex">
                                {{ order.vendor_user_name }}

                                <div class="text-[12px] flex">
                                  ({{ vendorrating }} Feedback rating
                                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star"
                                    class="w-4 text-yellow-500 mr-1" role="img" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 576 512">
                                    <path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 
                                          103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5
                                          105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z">
                                    </path>
                                  </svg>)
                                </div>
                              </div>
                            </router-link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-span-12 sm:col-span-3 px-3">
                <div v-if="
                  order.overall_status === 3 ||
                  order.overall_status === 2 ||
                  order.overall_status === 4 ||
                  order.overall_status === 8
                ">
                 
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
                <!-- Requested Cancel from vendor -->
                <div v-if="order.overall_status === 6"></div>
                <!-- Disputed order -->
                <div v-if="order.overall_status === 8">
                  <router-link :to="{
                    name: 'Dispute',
                    params: { uuid: order.uuid }
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
                    <div class="my-2">
                      <router-link :to="{
                        name: 'vendorordersview',
                        params: { uuid: order.uuid }
                      }">
                        <button
                          class="bg-zinc-600 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full"
                          type="button">
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
        <div v-if="tracking_number">
          <div class="grid grid-cols-12 rounded-md border bg-white  mb-5 p-5">
            <div class="col-span-12 text-[20px]">Tracking</div>
            <div class="col-span-12">Carrier: {{ carrier_name }}</div>
            <div class="col-span-12">Tracking Number: {{ tracking_number }}</div>
          </div>
        </div>
        <div v-else>
          <div class="grid grid-cols-12 rounded-md border bg-white  mb-5 p-5">
            <div class="col-span-12 text-center font-bold">
          Tracking Info not Provided
          </div>
          </div>
        </div>

        <div v-if="order.overall_status === 10" class="pb-40">
          <div v-if="order.vendor_feedback === 0">
            <form @submit.prevent="onSubmitFeedback">
              <div class="grid grid-cols-12 rounded-md border bg-white mb-5 p-5">
                <div class="col-span-12 text-[14px] mb-5">Leave Feedback</div>

                <div class="col-span-12">
                  <div class="col-span-12">Vendor Rating</div>
                  <div class="col-span-12 mb-5">
                    <fieldset class="rating1">
                      <input type="radio" id="vendorstar10" name="vendorrating" value="10"
                        v-model="VendorRating.vendorrating10" /><label class="full" for="vendorstar10"></label>
                      <input type="radio" id="vendorstar9" name="vendorrating" value="9"
                        v-model="VendorRating.vendorrating9" /><label class="full" for="vendorstar9"></label>
                      <input type="radio" id="vendorstar8" name="vendorrating" value="8"
                        v-model="VendorRating.vendorrating8" /><label class="full" for="vendorstar8"></label>
                      <input type="radio" id="vendorstar7" name="vendorrating" value="7"
                        v-model="VendorRating.vendorrating7" /><label class="full" for="vendorstar7"></label>
                      <input type="radio" id="vendorstar6" name="vendorrating" value="6"
                        v-model="VendorRating.vendorrating6" /><label class="full" for="vendorstar6"></label>
                      <input type="radio" id="vendorstar5" name="vendorrating" value="5"
                        v-model="VendorRating.vendorrating5" /><label class="full" for="vendorstar5"></label>
                      <input type="radio" id="vendorstar4" name="vendorrating" value="4"
                        v-model="VendorRating.vendorrating4" /><label class="full" for="vendorstar4"></label>
                      <input type="radio" id="vendorstar3" name="vendorrating" value="3"
                        v-model="VendorRating.vendorrating3" /><label class="full" for="vendorstar3"></label>
                      <input type="radio" id="vendorstar2" name="vendorrating" value="2"
                        v-model="VendorRating.vendorrating2" /><label class="full" for="vendorstar2"></label>
                      <input type="radio" id="vendorstar1" name="vendorrating" value="1"
                        v-model="VendorRating.vendorrating1" /><label class="full" for="vendorstar1"></label>
                    </fieldset>
                  </div>
                </div>
                <div class="col-span-12 mt-5 mb-1">
                  Leave a review for the vendor:
                </div>
                <div class="col-span-12">
                  <textarea v-model="review"
                    class="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="message" type="textfield" placeholder="Review Rating" />
                </div>
                <div class="col-span-12 text-center mt-5">
                  <button
                    class="bg-yellow-600 hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit">
                    Add Feedback
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div v-else>
            <div class="grid grid-cols-12 rounded-md border border-gray-300 p-5">
              <div class="col-span-12 text-[20px] mb-5">Feedback</div>
              <div class="col-span-12">
                <div class="col-span-12">Vendor Rating</div>
                <div v-if="loaded_feedback">
                  <StarRating v-bind:rating="rating_vendor" />
                </div>

                <div class="col-span-12 mt-5">Review</div>
                <div v-if="loaded_feedback">
                  {{ review }}
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
import axios from 'axios';
import { notify } from "@kyvg/vue3-notification";
import { useRoute } from "vue-router";
import authHeader from "../../services/auth.header";
import MainHeaderTop from "../../layouts/headers/MainHeaderTop.vue";
import MainHeaderMid from "../../layouts/headers/MainHeaderMid.vue";
import MainHeaderBottom from "../../layouts/headers/MainHeaderBottom.vue";
import MainHeaderVendor from "../../layouts/headers/MainHeaderVendor.vue";
import MainFooter from "../../layouts/footers/FooterMain.vue";
import StarRating from "../../components/star_rating/Star.vue";

/**
 *
 @typedef {Object} order.overall_status
 @typedef {Object} order.vendor_uuid
 @typedef {Object} order.vendor_user_name
 @typedef {Object} order.vendor_feedback
 @typedef {Object} VendorRating.vendorrating10
 @typedef {Object} VendorRating.vendorrating9
 @typedef {Object} VendorRating.vendorrating8
 @typedef {Object} VendorRating.vendorrating7
 @typedef {Object} VendorRating.vendorrating6
 @typedef {Object} VendorRating.vendorrating5
 @typedef {Object} VendorRating.vendorrating4
 @typedef {Object} VendorRating.vendorrating3
 @typedef {Object} VendorRating.vendorrating2
 @typedef {Object} VendorRating.vendorrating1
 *
 */

export default defineComponent({
  name: "ordersview",

  components: {
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainHeaderVendor,
    MainFooter,
    StarRating,
  },

  data () {
    return {
      loaded_feedback: false,
      order_found: false,
      order: null,
      order_id: null,
      tracking_number: null,
      carrier_name: "",
      review: "",
      rating_vendor: 0,
      rating_item: 0,
      vendoruuid: null,
      vendortotalsales: 0,
      vendorrating: 0,

      VendorRating: {
        vendorrating1: '',
        vendorrating2: '',
        vendorrating3: '',
        vendorrating4: '',
        vendorrating5: '',
        vendorrating6: '',
        vendorrating7: '',
        vendorrating8: '',
        vendorrating9: '',
        vendorrating10: '',
      },

    };
  },

  mounted () {

    let order_id_route = useRoute();

    this.order_id = order_id_route.params.uuid;


    this.getuserorder();

    this.getordertracking();

    this.getorderfeedback();

  },

  methods: {
    //  get the order from the params
    getuserorder () {
      axios({
        method: "get",
        url: "/orders/" + this.order_id,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
          this.order = response.data;
          this.order_found = true;
          this.getvendorinfo();
         
          if (this.order) {
            this.getvendorinfo();
          }
          if (this.order.user_feedback == 1) {
            this.getorderfeedback();
          }

        }
      })
        .catch(() => {
          this.$router.push({ name: "home" });
          notify({
            title: "Error",
            text: "Order doesnt exist",
            type: "error",
          });
        });
    },
    //  get vendor info for stats
    getvendorinfo () {
      axios({
        method: "get",
        url: "/vendor/vendor-info/" + "6ad833fd4b214b48beef0944c1931b14",
        withCredentials: true,
        headers: authHeader(),

      })
        .then((response) => {
          if ((response.status = 200)) {
            this.vendoruuid = response.data.vendoruuid;
            this.vendorrating = response.data.vendorrating;
            this.vendortotalsales = response.data.vendortotalsales;
            this.loaded_feedback = true;
          }
        })
    },

    // get the feedback on vendor
    getorderfeedback () {
      axios({
        method: "get",
        url: "/orders/feedback/get/" + this.order_id,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
          this.review = response.data.review;
          this.rating_vendor = response.data.vendor_rating;
          this.loaded_feedback = true;

        }
      });
    },
    // set variables for ratings
    onSubmitFeedback () {

      if (this.VendorRating.vendorrating1 == '1') {
        this.rating_vendor = 1;
      } else if (this.VendorRating.vendorrating2 == '2') {
        this.rating_vendor = 2;
      } else if (this.VendorRating.vendorrating3 == '3') {
        this.rating_vendor = 3;
      } else if (this.VendorRating.vendorrating4 == '4') {
        this.rating_vendor = 4;
      } else if (this.VendorRating.vendorrating5 == '5') {
        this.rating_vendor = 5;
      } else if (this.VendorRating.vendorrating6 == '6') {
        this.rating_vendor = 6;
      } else if (this.VendorRating.vendorrating7 == '7') {
        this.rating_vendor = 7;
      } else if (this.VendorRating.vendorrating8 == '8') {
        this.rating_vendor = 8;
      } else if (this.VendorRating.vendorrating9 == '9') {
        this.rating_vendor = 9;
      } else if (this.VendorRating.vendorrating10 == '10') {
        this.rating_vendor = 10;
      }

      let payLoadReview = { review: this.review };
      let payLoadScore = { vendorrating: this.rating_vendor };

      this.sendFeedbackReview(payLoadReview);
      this.sendFeedbackScore(payLoadScore);
    },
    // send the feedback rating
    sendFeedbackReview (payLoad: {
      review: string;
    }) {
      axios({
        method: "post",
        url: "/orders/feedback/review/" + this.order.uuid,
        data: payLoad,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if ((response.status = 200)) {
            notify({
              title: "Message Center",
              text: "Successfully sent feedback Review!",
              type: "success",
            });
            this.$router.push({
              name: "userorders",
            });
          }
        })
        .catch(() => {
          notify({
            title: "Freeport Error",
            text: "Error posting information.",
            type: "error",
          });
        });
    },
    // send the feedback rating
    sendFeedbackScore (payLoad: { vendorrating: number }) {
      axios({
        method: "post",
        url: "/orders/feedback/score/" + this.order.uuid,
        data: payLoad,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {

          if ((response.status = 200)) {
            notify({
              title: "Message Center",
              text: "Successfully sent feedback Score!",
              type: "success",
            });
            this.$router.push({
              name: "userorders",
            });
          }
        })
        .catch(() => {

          notify({
            title: "Freeport Error",
            text: "Error posting information.",
            type: "error",
          });
        });
    },
    // get the tracking info
    getordertracking () {
      const order_id_route = useRoute();
      this.order_id = order_id_route.params.uuid;
      axios({
        method: "get",
        url: "/vendororders/tracking/get/" + this.order_id,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if (response.status == 200) {

            this.tracking_number = response.data.tracking_number;
            this.carrier_name = response.data.carrier_name;
           
          }
        });
    },
    // request to cancel an order
    delivered (uuid: any) {
      axios({
        method: "get",
        url: "/orders/mark/delivered/" + uuid,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if (response.status == 200) {
            window.location.reload();
          }
        });
    },
    // request to cancel an order
    disputeorder (uuid: any) {
      axios({
        method: "get",
        url: "/orders/mark/disputed/" + uuid,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if (response.status == 200) {
            window.location.reload();
          }
        });
    },
    // request to cancel an order
    finalize (uuid: any) {
      axios({
        method: "get",
        url: "/orders/mark/finalized/" + uuid,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if (response.status == 200) {
            window.location.reload();
          }
        });
    },
    // request to cancel an order
    requestcancel (uuid: any) {
      axios({
        method: "get",
        url: "/orders/request/cancel/" + uuid,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if (response.status == 200) {
            window.location.reload();
          }
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

/*.rating > .half:before {
  content: "\f089";
  position: absolute;
}*/
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

/* */

.rating1 {
  border: none;
  float: left;
}

.rating1>input {
  display: none;
}

.rating1>label:before {
  margin: 5px;
  font-size: 1.25em;
  font-family: 'FontAwesome', sans-serif;
  display: inline-block;
  content: "\f005";
}

/*.rating1 > .half:before {
  content: "\f089";
  position: absolute;
}*/
.rating1>label {
  color: #ddd;
  float: right;
}

/***** CSS Magic to Highlight Stars on Hover *****/
.rating1>input:checked~label,
/* show gold star when clicked */
.rating1:not(:checked)>label:hover,
/* hover current star */
.rating1:not(:checked)>label:hover~label {
  color: #ffd700;
}

/* hover previous stars in list */
.rating1>input:checked+label:hover,
/* hover current star when changing rating */
.rating1>input:checked~label:hover,
.rating1>label:hover~input:checked~label,
/* lighten current selection */
.rating1>input:checked~label:hover~label {
  color: #ffed85;
}
</style>
