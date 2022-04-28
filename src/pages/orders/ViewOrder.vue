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
      </div>
    </div>
    <div class="grid grid-cols-1 w-full gap-4">
      <h1 class="col-span-1 font-semibold text-2xl">{{ order.uuid }}</h1>
      <div class="grid grid-cols-12 rounded-md border border-gray-300 mb-5">
        <div class="col-span-12 bg-gray-200 px-5 py-5">
          <div class="grid grid-cols-12 text-[12px]">
            <div class="col-span-3">
              <div class="">Order Placed</div>
              <div class="">{{ order.created }}</div>
            </div>
            <div class="col-span-3">
              <div class="">Total</div>
              <div v-if="order.digital_currency == 1">
                {{ order.price_total_btc }} BTC
              </div>
              <div v-if="order.digital_currency == 2">
                {{ order.price_total_bch }} BCH
              </div>
              <div v-if="order.digital_currency == 3">
                {{ order.price_total_xmr }} XMR
              </div>
            </div>
            <div class="col-span-2"></div>
            <div class="col-span-4">
              <div class="">Order #{{ order.uuid }}</div>
              <div class=""></div>
            </div>
          </div>
        </div>
        <div class="col-span-12 bg-white px-5 py-5">
          <div class="grid grid-cols-12">
            <div class="col-span-9">
              <div class="grid grid-cols-12">
                <div class="col-span-12 text-[20px]">
                  <div v-if="order.overall_status == 1">
                    Waiting to be accepted
                  </div>
                  <div v-if="order.overall_status == 2">
                    Waiting on Shipment
                  </div>
                  <div v-if="order.overall_status == 3">Shipped</div>
                  <div v-if="order.overall_status == 4">Delivered</div>
                  <div v-if="order.overall_status == 5">Finalized Early</div>
                  <div v-if="order.overall_status == 6">Request to Cancel</div>
                  <div v-if="order.overall_status == 7">Cancelled</div>
                  <div v-if="order.overall_status == 8">Disputed</div>
                </div>
                <div class="col-span-12 text-[14px]">
                  <div class="grid grid-cols-12 pt-5">
                    <div class="col-span-2">Image</div>
                    <div class="col-span-10">
                      <div
                        class="text-blue-500 hover:text-blue-300 hover:underline"
                      >
                        <div v-if="order.item_uuid">
                          <router-link
                            :to="{
                              name: 'item',
                              params: { id: order.item_uuid },
                            }"
                          >
                            {{ order.title_of_item }}
                          </router-link>
                        </div>
                        <div v-else>{{ order.title_of_item }}</div>
                      </div>
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
                              class="text-blue-500 hover:text-blue-300 hover:underline pl-3"
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
            <div class="col-span-3">
              <div class="my-2">
                <button
                  class="bg-zinc-600 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full"
                  type="button"
                >
                  Finalize Early
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="tracking_number">
        <div
          class="grid grid-cols-12 rounded-md border border-gray-300 mb-5 p-5"
        >
          <div class="col-span-12 text-[20px]">Tracking</div>
          <div class="col-span-12">Carrier: {{ carrier_name }}</div>
          <div class="col-span-12">Tracking Number: {{ tracking_number }}</div>
        </div>
      </div>

      <div v-if="order.overall_status == 4">
        <div v-if="order.user_feedback == 0">
          <form @submit.prevent="onSubmitFeedback">
            <div
              class="grid grid-cols-12 rounded-md border border-gray-300 mb-5 p-5"
            >
              <div class="col-span-12 text-[20px] mb-5">Leave Feedback</div>
              <div class="col-span-6">
                <div class="col-span-12">Item Rating</div>
                <div class="col-span-12 mb-5">
                  <fieldset class="rating">
                    <input
                      type="radio"
                      id="itemstar10"
                      name="itemrating"
                      value="10"
                      v-model="ItemRating.itemrating10"
                    />
                    <label class="full" for="itemstar10"></label>
                    <input
                      type="radio"
                      id="itemstar9"
                      name="itemrating"
                      value="9"
                      v-model="ItemRating.itemrating9"
                    />
                    <label class="full" for="itemstar9"></label>
                    <input
                      type="radio"
                      id="itemstar8"
                      name="itemrating"
                      value="8"
                      v-model="ItemRating.itemrating8"
                    />
                    <label class="full" for="itemstar8"></label>
                    <input
                      type="radio"
                      id="itemstar7"
                      name="itemrating"
                      value="7"
                      v-model="ItemRating.itemrating7"
                    />
                    <label class="full" for="itemstar7"></label>
                    <input
                      type="radio"
                      id="itemstar6"
                      name="itemrating"
                      value="6"
                      v-model="ItemRating.itemrating6"
                    />
                    <label class="full" for="itemstar6"></label>
                    <input
                      type="radio"
                      id="itemstar5"
                      name="itemrating"
                      value="5"
                      v-model="ItemRating.itemrating5"
                    />
                    <label class="full" for="itemstar5"></label>
                    <input
                      type="radio"
                      id="itemstar4"
                      name="itemrating"
                      value="4"
                      v-model="ItemRating.itemrating4"
                    />
                    <label class="full" for="itemstar4"></label>
                    <input
                      type="radio"
                      id="itemstar3"
                      name="itemrating"
                      value="3"
                      v-model="ItemRating.itemrating3"
                    />
                    <label class="full" for="itemstar3"></label>
                    <input
                      type="radio"
                      id="itemstar2"
                      name="itemrating"
                      value="2"
                      v-model="ItemRating.itemrating2"
                    /><label class="full" for="itemstar2"></label>
                    <input
                      type="radio"
                      id="itemstar1"
                      name="itemrating"
                      value="1"
                      v-model="ItemRating.itemrating1"
                    /><label class="full" for="itemstar1"></label>
                  </fieldset>
                </div>
              </div>
              <div class="col-span-6">
                <div class="col-span-12">Vendor Rating</div>
                <div class="col-span-12 mb-5">
                  <fieldset class="rating1">
                    <input
                      type="radio"
                      id="vendorstar10"
                      name="vendorrating"
                      value="10"
                      v-model="VendorRating.itemravendorrating1ting10"
                    /><label class="full" for="vendorstar10"></label>
                    <input
                      type="radio"
                      id="vendorstar9"
                      name="vendorrating"
                      value="9"
                      v-model="VendorRating.itemravendorrating1ting9"
                    /><label class="full" for="vendorstar9"></label>
                    <input
                      type="radio"
                      id="vendorstar8"
                      name="vendorrating"
                      value="8"
                      v-model="VendorRating.itemravendorrating1ting8"
                    /><label class="full" for="vendorstar8"></label>
                    <input
                      type="radio"
                      id="vendorstar7"
                      name="vendorrating"
                      value="7"
                      v-model="VendorRating.itemravendorrating1ting7"
                    /><label class="full" for="vendorstar7"></label>
                    <input
                      type="radio"
                      id="vendorstar6"
                      name="vendorrating"
                      value="6"
                      v-model="VendorRating.itemravendorrating1ting6"
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
                      v-model="VendorRating.itemravendorrating1ting1"
                    /><label class="full" for="vendorstar1"></label>
                  </fieldset>
                </div>
              </div>
              <div class="col-span-12 mt-5 mb-1">
                Leave a review for the item:
              </div>
              <div class="col-span-12">
                <textarea
                  v-model="review"
                  class="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="message"
                  type="textfield"
                  placeholder="Review Rating"
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
        <div v-else>
          <div
            class="grid grid-cols-12 rounded-md border border-gray-300 mb-5 p-5"
          >
            <div class="col-span-12 text-[20px] mb-5">Feedback</div>
            <div class="col-span-12">
              <div class="col-span-12">Vendor Rating</div>
              <div v-if="loaded_feedback">
                <StarRating v-bind:rating="rating_vendor" />
              </div>
              <div class="col-span-12 mt-5">Item Rating</div>
              <div v-if="loaded_feedback">
                <StarRating v-bind:rating="rating_item" />
              </div>
              <div class="col-span-12 mt-5">Review</div>
              <div v-if="loaded_feedback">
              {{review}}
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
import { useRoute } from "vue-router";

import authHeader from "../../services/auth.header";
import MainHeaderTop from "../../layouts/headers/MainHeaderTop.vue";
import MainHeaderMid from "../../layouts/headers/MainHeaderMid.vue";
import MainHeaderBottom from "../../layouts/headers/MainHeaderBottom.vue";
import MainHeaderVendor from "../../layouts/headers/MainHeaderVendor.vue";
import MainFooter from "../../layouts/footers/FooterMain.vue";
import StarRating from "../../components/star_rating/Star.vue";

export default defineComponent({
  name: "vendorordersview",

  components: {
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainHeaderVendor,
    MainFooter,
    StarRating,
  },

  data() {
    return {
      loaded_feedback: false,
      order: [],
      tracking_number: "",
      carrier_name: "",
      ItemRating: {
        itemrating1: "",
        itemrating2: "",
        itemrating3: "",
        itemrating4: "",
        itemrating5: "",
        itemrating6: "",
        itemrating7: "",
        itemrating8: "",
        itemrating9: "",
        itemrating10: "",
      },
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
      review: "",
      rating_vendor: "",
      rating_item: "",
    };
  },

  mounted() {
    this.getuserorder();
    this.getordertracking();
  },

  methods: {
    async getorderfeedback() {
      await axios({
        method: "get",
        url: "/orders/feedback/get/" + this.order.uuid,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
          this.review = response.data.review;
          this.rating_vendor = response.data.vendor_rating;
          this.rating_item = response.data.item_rating;
          this.loaded_feedback = true;
        }
      });
    },

    onSubmitFeedback() {
      if (this.ItemRating.itemrating1 == 1) {
        this.rating_item = 1;
      } else if (this.ItemRating.itemrating2 == 2) {
        this.rating_item = 2;
      } else if (this.ItemRating.itemrating3 == 3) {
        this.rating_item = 3;
      } else if (this.ItemRating.itemrating4 == 4) {
        this.rating_item = 4;
      } else if (this.ItemRating.itemrating5 == 5) {
        this.rating_item = 5;
      } else if (this.ItemRating.itemrating5 == 6) {
        this.rating_item = 6;
      } else if (this.ItemRating.itemrating5 == 7) {
        this.rating_item = 7;
      } else if (this.ItemRating.itemrating5 == 8) {
        this.rating_item = 8;
      } else if (this.ItemRating.itemrating5 == 9) {
        this.rating_item = 9;
      } else if (this.ItemRating.itemrating5 == 10) {
        this.rating_item = 10;
      }

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
      } else if (this.VendorRating.vendorrating5 == 6) {
        this.rating_vendor = 6;
      } else if (this.VendorRating.vendorrating5 == 7) {
        this.rating_vendor = 7;
      } else if (this.VendorRating.vendorrating5 == 8) {
        this.rating_vendor = 8;
      } else if (this.VendorRating.vendorrating5 == 9) {
        this.rating_vendor = 9;
      } else if (this.VendorRating.vendorrating5 == 10) {
        this.rating_vendor = 10;
      }

      const payLoad = {
        itemrating: this.rating_item,
        vendorrating: this.rating_vendor,
        review: this.review,
      };
      this.sendFeedback(payLoad);
    },
    async sendFeedback(payLoad: {
      itemrating: string;
      vendorrating: string;
      review: string;
    }) {
      await axios({
        method: "post",
        url: "/orders/feedback/" + this.order.uuid,
        data: payLoad,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {})
        .catch((error) => {
          if (error.response) {
          }
        });
    },

    async getuserorder() {
      const order_id_route = useRoute();
      const order_id = order_id_route.params.uuid;
      this.order_id = order_id;

      await axios({
        method: "get",
        url: "/orders/" + this.order_id,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
          this.order = response.data;
          if (this.order.user_feedback == 1) {
            this.getorderfeedback();
          }
        }
      });
    },
    async getordertracking() {
      const order_id_route = useRoute();
      const order_id = order_id_route.params.uuid;
      this.order_id = order_id;

      await axios({
        method: "get",
        url: "/vendororders/tracking/get/" + this.order_id,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
          this.tracking_number = response.data.tracking_number;
          this.carrier_name = response.data.carrier_name;
        }
      });
    },

    async getorderreview() {
      const order_id_route = useRoute();
      const order_id = order_id_route.params.uuid;
      this.order_id = order_id;

      await axios({
        method: "get",
        url: "/vendororders/tracking/get/" + this.order_id,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
          this.tracking_number = response.data.tracking_number;
          this.carrier_name = response.data.carrier_name;
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

/* */

.rating1 {
  border: none;
  float: left;
}
.rating1 > input {
  display: none;
}
.rating1 > label:before {
  margin: 5px;
  font-size: 1.25em;
  font-family: FontAwesome;
  display: inline-block;
  content: "\f005";
}
.rating1 > .half:before {
  content: "\f089";
  position: absolute;
}
.rating1 > label {
  color: #ddd;
  float: right;
}
/***** CSS Magic to Highlight Stars on Hover *****/
.rating1 > input:checked ~ label, /* show gold star when clicked */
.rating1:not(:checked) > label:hover, /* hover current star */
.rating1:not(:checked) > label:hover ~ label {
  color: #ffd700;
}
/* hover previous stars in list */
.rating1 > input:checked + label:hover, /* hover current star when changing rating */
.rating1 > input:checked ~ label:hover,
.rating1 > label:hover ~ input:checked ~ label, /* lighten current selection */
.rating1 > input:checked ~ label:hover ~ label {
  color: #ffed85;
}
</style>
