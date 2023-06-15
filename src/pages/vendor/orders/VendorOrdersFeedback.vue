
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
              <a class="text-primary hover:text-primary ">Home</a>
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
        <div class="rounded-md bg-neutral p-5">
          <div class="grid grid-cols-12 ">
            <div class="col-span-12 text-[20px]  mb-5">
              <router-link class="text-primary hover:underline hover:text-primary text-center"
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
                <div class="px-2">{{ relativeDate(order.created) }}</div>
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
      <div class="grid grid-cols-12 mt-5  p-5 bg-neutral rounded-md mb-5">
        <div class="col-span-12 bg-neutral rounded-md">
          <form @submit.prevent="onSubmitFeedback">
            <div class="grid grid-cols-12">
              <div class="col-span-12">Customer Rating:</div>
              <div class="col-span-12">
                <div class="rating">
                  <input type="radio" id="customerstar1" name="rating-2" value="1"
                    v-model="CustomerRating.customerrating1" class="mask mask-star-2 bg-orange-400" />
                  <input type="radio" id="customerstar2" name="rating-2" value="2"
                    v-model="CustomerRating.customerrating2" class="mask mask-star-2 bg-orange-400" />
                  <input type="radio" id="customerstar3" name="rating-2" value="3"
                    v-model="CustomerRating.customerrating3" class="mask mask-star-2 bg-orange-400" />
                  <input type="radio" id="customerstar4" name="rating-2" value="4"
                    v-model="CustomerRating.customerrating4" class="mask mask-star-2 bg-orange-400" />
                  <input type="radio" id="customerstar5" name="rating-2" value="5"
                    v-model="CustomerRating.customerrating5" class="mask mask-star-2 bg-orange-400" />
                  <input type="radio" id="customerstar6" name="rating-2" value="6"
                    v-model="CustomerRating.customerrating6" class="mask mask-star-2 bg-orange-400" />
                  <input type="radio" id="customerstar7" name="rating-2" value="7"
                    v-model="CustomerRating.customerrating7" class="mask mask-star-2 bg-orange-400" />
                  <input type="radio" id="customerstar8" name="rating-2" value="8"
                    v-model="CustomerRating.customerrating8" class="mask mask-star-2 bg-orange-400" />
                  <input type="radio" id="customerstar9" name="rating-2" value="9"
                    v-model="CustomerRating.customerrating9" class="mask mask-star-2 bg-orange-400" />
                  <input type="radio" id="customerstar10" name="rating-2" value="10"
                    v-model="CustomerRating.customerrating10" class="mask mask-star-2 bg-orange-400" />
                </div>
                <div v-if="rated === true">
                  {{ rating_customer }} out of 10 Feedback Given
                </div>
              </div>
            </div>
            <div v-if="rated === false">
              <div class="grid grid-cols-12">
                <div class="col-span-12 mb-1 text-[14px] pt-5">Leave a review:</div>

                <div class="col-span-12">
                  <textarea v-model="review" class="text-black shadow appearance-none border border-gray-500 rounded w-full py-2 px-3
                      leading-tight focus:outline-none focus:shadow-outline" id="message" type="textfield"
                    placeholder="Review Rating" />
                </div>
                <div class="col-span-12 ">
                  <div class="flex justify-end">
                    <button class="bg-primary hover:bg-accent text-white font-bold py-2 px-4 rounded
                     focus:outline-none focus:shadow-outline" type="submit">
                      Add Feedback
                    </button>
                  </div>

                </div>

              </div>
            </div>
            <div v-if="rated === true">
              <div class="col-span-12 mt-5">{{ review }}</div>
            </div>
          </form>
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
      rating_customer: 0,
      customerrating: 0,
      CustomerRating: {
        customerrating1: '',
        customerrating2: '',
        customerrating3: '',
        customerrating4: '',
        customerrating5: '',
        customerrating6: '',
        customerrating7: '',
        customerrating8: '',
        customerrating9: '',
        customerrating10: '',
      },

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
          this.order = response.data;
        });
    },
    //see if score already present
    getFeedback (uuid: any) {
      axios({
        method: "get",
        url: "/orders/feedback/vendor/" + uuid,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if (response.data.success) {
            // hide rating div
            this.rating_customer = response.data.customer_rating;
            this.review = response.data.review;
            this.rated = response.data.rated;
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

    // set variables for ratings
    onSubmitFeedback () {
      if (this.CustomerRating.customerrating1 == '1') {
        this.rating_customer = 1;
      } else if (this.CustomerRating.customerrating2 == '2') {
        this.rating_customer = 2;
      } else if (this.CustomerRating.customerrating3 == '3') {
        this.rating_customer = 3;
      } else if (this.CustomerRating.customerrating4 == '4') {
        this.rating_customer = 4;
      } else if (this.CustomerRating.customerrating5 == '5') {
        this.rating_customer = 5;
      } else if (this.CustomerRating.customerrating6 == '6') {
        this.rating_customer = 6;
      } else if (this.CustomerRating.customerrating7 == '7') {
        this.rating_customer = 7;
      } else if (this.CustomerRating.customerrating8 == '8') {
        this.rating_customer = 8;
      } else if (this.CustomerRating.customerrating9 == '9') {
        this.rating_customer = 9;
      } else if (this.CustomerRating.customerrating10 == '10') {
        this.rating_customer = 10;
      }
      else{
         this.rating_customer = 10;
      }
  
      let payLoadReview = { review: this.review };
      let payLoadScore = { customerrating: this.rating_customer };

      this.sendFeedbackReview(payLoadReview);
      this.sendFeedbackScore(payLoadScore);
    },
    // send the feedback rating
    sendFeedbackReview (payLoad: {
      review: string;
    }) {
      axios({
        method: "post",
        url: "/orders/vendor/feedback/review/" + this.order.uuid,
        data: payLoad,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if (response.data.success) {
            notify({
              title: "Message Center",
              text: "Successfully sent feedback Review!",
              type: "success",
            });
            this.$router.push({
              name: "vendorordersfinalized",
            });
          }
          else {
            notify({
              title: "Message Center",
              text: "Failure to send review Message",
              type: "error",
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
    sendFeedbackScore (payLoad: { customerrating: number }) {
      axios({
        method: "post",
        url: "/orders/vendor/feedback/score/" + this.order.uuid,
        data: payLoad,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if (response.data.success) {
            notify({
              title: "Message Center",
              text: "Successfully sent feedback Score!",
              type: "success",
            });
            this.$router.push({
              name: "vendorordersfinalized",
            });
          }
          else {
            notify({
              title: "Message Center",
              text: "Failure to Send Feedback Score",
              type: "error",
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











    // get the date conversion
    relativeDate (value: any) {
      let e = new Date(value).valueOf();
      return formatDistance(e, new Date());
    },
  },
});
</script>
<style></style>
