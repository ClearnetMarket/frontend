
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


    <div class="grid grid-cols-1 w-full gap-4 mt-5 mb-5 ">
      <div class="col-span-1 font-semibold text-2xl">Leave Feedback </div>
      <div v-if="uuid && order">
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
            <div class="col-span-12 flex justify-center sm:col-span-3">
              <img class="object-contain" alt="" :src="order.image_one" />
            </div>
            <div class="col-span-6 ">
              <div class="col-span-12 flex">
                <div class="font-bold px-2">Order UUID:</div>
                <div class="px-2">{{ order.uuid }}</div>
              </div>
              <div class="col-span-1 flex">
                <div class="font-bold px-2">
                  Ordered:
                </div>
                <div class="px-2">{{ relativeDate (order.created) }}</div>
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

          </div>

        </div>

      </div>
    </div>

    <div v-if="order && uuid">
      <div class="col-span-12 font-semibold text-2xl">Rate customer</div>
      <div class="grid grid-cols-12 mt-5  p-5 bg-white rounded-md mb-5">

        <div class="col-span-12 bg-white rounded-md">
          <div class="grid grid-cols-12">
            <div class="col-span-12">Customer Rating:</div>
            <div class="col-span-12">
              <fieldset class="rating" v-if="rated === false">
                <input type="radio" id="vendorstar10" name="vendorrating"
                  @click.prevent="sendscore(order.uuid, 10)" /><label class="full" for="vendorstar10"></label>
                <input type="radio" id="vendorstar9" name="vendorrating" value="9"
                  @click.prevent="sendscore(order.uuid, 9)" /><label class="full" for="vendorstar9"></label>
                <input type="radio" id="vendorstar8" name="vendorrating" value="8"
                  @click.prevent="sendscore(order.uuid, 8)" /><label class="full" for="vendorstar8"></label>
                <input type="radio" id="vendorstar7" name="vendorrating" value="7"
                  @click.prevent="sendscore(order.uuid, 7)" /><label class="full" for="vendorstar7"></label>
                <input type="radio" id="vendorstar6" name="vendorrating" value="6"
                  @click.prevent="sendscore(order.uuid, 6)" /><label class="full" for="vendorstar6"></label>
                <input type="radio" id="vendorstar5" name="vendorrating" value="5"
                  @click.prevent="sendscore(order.uuid, 5)" /><label class="full" for="vendorstar5"></label>
                <input type="radio" id="vendorstar4" name="vendorrating" value="4"
                  @click.prevent="sendscore(order.uuid, 4)" /><label class="full" for="vendorstar4"></label>
                <input type="radio" id="vendorstar3" name="vendorrating" value="3"
                  @click.prevent="sendscore(order.uuid, 3)" /><label class="full" for="vendorstar3"></label>
                <input type="radio" id="vendorstar2" name="vendorrating" value="2"
                  @click.prevent="sendscore(order.uuid, 2)" /><label class="full" for="vendorstar2"></label>
                <input type="radio" id="vendorstar1" name="vendorrating" value="1"
                  @click.prevent="sendscore(order.uuid, 1)" /><label class="full" for="vendorstar1"></label>
              </fieldset>
              <div v-if="rated === true">
                {{ rating_number }} out of 10 Feedback Given
              </div>
            </div>
          </div>
          <div v-if="rated === false">
            <div class="grid grid-cols-12">
              <div class="col-span-12 mb-1 text-[14px] pt-5">Leave a review:</div>

              <form class="col-span-12" @submit.prevent="sendreview(order.uuid)">
                <div class="col-span-12">
                  <textarea v-model="review"
                    class="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="message" type="textfield" placeholder="Review Rating" />
                </div>
                <div class="col-span-12  col-start-4">
                  <button
                    class="bg-yellow-600 hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  "
                    type="submit">
                    Add Feedback
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div v-if="rated === true">
            <div class="col-span-12 mt-5">{{ review }}</div>
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
import { useRoute } from "vue-router";
import { notify } from "@kyvg/vue3-notification";
import { formatDistance } from "date-fns";
import authHeader from "../../../services/auth.header";
import MainHeaderTop from "../../../layouts/headers/MainHeaderTop.vue";
import MainHeaderMid from "../../../layouts/headers/MainHeaderMid.vue";
import MainHeaderBottom from "../../../layouts/headers/MainHeaderBottom.vue";
import MainHeaderVendor from "../../../layouts/headers/MainHeaderVendor.vue";
import MainFooter from "../../../layouts/footers/FooterMain.vue";




export default defineComponent({
  name: "vendorordersfeedback",

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
      order: null,
      selectedrating: true,
      rated: false,
      review: null,
      uuid: null,
      rating_number: 0
    };
  },

  mounted () {
    let order_uuid_route = useRoute();
    this.uuid = order_uuid_route.params.uuid;
    if (this.uuid) {
      this.getuserorder();
      this.getFeedback(this.uuid);
    }

  },

  methods: {
    // gets the user orders
    getuserorder () {
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
    //see if score already present
    getFeedback (uuid: any) {
      axios({
        method: "get",
        url: "/orders/feedback/get/vendor/" + uuid,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if ((response.status = 200)) {

            if (response.data.status == "success") {
              // hide rating div
              this.rating_number = response.data.customer_rating;
              this.review = response.data.review;
              this.rated = true
            }
            else {
              this.rating_number = 0;
              this.review = "";
              this.rated = false
            }
          }
        })
        .catch(() => {

          notify({
            title: "Freeport Error",
            text: "Error Getting Review.",
            type: "error",
          });
        });
    },

    //payload for the score
    sendscore (uuid: string, rating: number) {
      let payLoad = { rating: rating };
      this.sendFeedbackScore(uuid, payLoad);
      this.rating_number = rating
    },
    // send the score for a feedback
    sendFeedbackScore (uuid: any, payLoad: any) {
      axios({
        method: "post",
        url: "/orders/vendor/feedback/score/" + uuid,
        data: payLoad,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if ((response.status = 200)) {
            if (response.data.status == "success") {

              // hide rating div
              this.selectedrating = false;

            }
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
    sendreview (uuid: any) {
      let review = this.review;
      let payLoad = { review: review };
      this.sendFeedbackReview(uuid, payLoad);
    },
    // send the feedback
    sendFeedbackReview (uuid: string, payLoad: any) {

      axios({
        method: "post",
        url: "/orders/vendor/feedback/review/" + uuid,
        data: payLoad,
        withCredentials: true,
        headers: authHeader(),
      })

        .then((response) => {
          if (response.status == 200) {

            if (response.data.status == "success") {

              notify({
                title: "Message Center",
                text: "Successfully sent feedback",
                type: "success",
              });
              this.rated = true
              this.getuserorder();

            }
            else {
              notify({
                title: "Freeport Error",
                text: "Error posting information.",
                type: "error",
              })
            }
          }
        })
        .catch((error) => {

          notify({
            title: "Freeport Error",
            text: "Error posting information.",
            type: "error",
          });
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
