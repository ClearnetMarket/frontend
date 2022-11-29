
<template>
  <div class="">
    <MainHeaderTop />
    <MainHeaderMid />
    <MainHeaderBottom />
    <MainHeaderVendor />
    <div class="max-w-4xl mx-auto wrapper px-10 mb-24">


      <div class="grid grid-cols-1 w-full gap-4 mt-5">
        <h1 class="col-span-1 font-semibold text-[48px]">Leave Feedback </h1>

          <div v-if="uuid && order">
            <div class="grid grid-rows-3 grid-flow-col gap-4">
              <div class="row-span-3 ">Picture</div>
              <div class="col-span-2 text-[18px]">{{ order.title_of_item }}</div>
              <div class="row-span-2 col-span-2 text-[18px]">Customer: {{ order.customer_user_name }}</div>
            </div>

          </div>
        </div>

    <div v-if="order && uuid">

      <div class="grid grid-cols-12 mt-5">
        <div class="col-span-12">
          <div class="grid grid-cols-12">

            <div class="col-span-12">
              <div class="col-span-12 text-[28px]">Rate this customer:</div>
              <div class="col-span-12">
                <fieldset class="rating" v-if="rated === false">
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
                <div v-if="rated===true">
                  {{rating_number}} out of 10
                </div>
              </div>
            </div>
            <div class="col-span-12 mb-1 text-[28px] pt-5">Leave a review:</div>
            <form
                class="col-span-12"
                @submit.prevent="sendreview(order.uuid)"
            >
                        <textarea
                            v-model="review"
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
    </div>
  </div>
  <MainFooter />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import {useRoute} from "vue-router";
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
 @typedef {Object} order.review_of_customer
 @typedef {Object} order.customer_rating
 @typedef {Object} order.vendor_feedback
 @typedef {Object} order.review_of_user
 *
 */


export default defineComponent({
  name: "vendorordersfeedback",

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
      order: null,
      selectedrating: true,
      rated: false,
      review: null,
      uuid: null,
      rating_number: ""
    };
  },

  mounted() {
    let order_uuid_route = useRoute();
    this.uuid = order_uuid_route.params.uuid;
    if (this.uuid){
      this.getuserorder();
    }

  },

  methods: {
    // gets the user orders
    getuserorder() {


      axios({
        method: "get",
        url: "/orders/" + this.uuid,
        withCredentials: true,
        headers: authHeader(),
      })
          .then((response) => {
            if (response.status == 200) {
              this.order = response.data;

            }
          });
    },

    //payload for the score
    sendscore(uuid: string, rating: string) {
      let payLoad = { rating: rating };
      this.sendFeedbackScore(uuid, payLoad);
      this.rating_number = rating
    },
    // send the score for a feedback
    sendFeedbackScore(uuid: any, payLoad: any) {
      axios({
        method: "post",
        url: "/orders/vendor/feedback/score/" + uuid,
        data: payLoad,
        withCredentials: true,
        headers: authHeader(),
      })
          .then((response) => {
            if ((response.status = 200)) {
              // hide rating div
              this.selectedrating = false;
              this.rated = true


            }
          })
          .catch(() => {

            notify({
              title: "Freeport Error",
              text: "Error Posting Review.",
              type: "error",
            });
          });
    },
    // payload for sending feedback
    sendreview(uuid: any) {
      let user_review = this.review;

      this.sendFeedbackReview(uuid, user_review);
    },
    // send the feedback
    sendFeedbackReview(uuid: string, user_review: string) {
      axios({
        method: "post",
        url: "/orders/vendor/feedback/review/" + uuid,
        data: user_review,
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
              this.getuserorder();
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

    // get the date conversion
    relativeDate(value: any) {
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
