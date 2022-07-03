<template>
  <div class="bg-gray-300">
    <MainHeaderTop />
    <MainHeaderMid />
    <MainHeaderBottom />
    <div class="container max-w-7xl mx-auto px-10 wrapper">
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

      <div v-if="page_loaded" class="pb-36">
        <div class="max-w-4xl mx-auto px-10">
          <div class="flex justify-center">
            <div
              class="grid grid-cols-12 mb-5 border border-1 rounded gap-4 w-full max-w-4xl p-5 bg-white shadow-md"
            >
              <div class="col-span-3">{{ user.profileimage }}</div>
              <div class="col-span-6">
                <div class="text-[20px]">{{ user.display_name }}</div>
                <div class="text-gray-500">
                  Member Since: {{ relativeDate(user.member_since) }} ago
                </div>
                <div class="text-gray-600">{{ user.bio }}</div>
              </div>
              <div
                class="col-span-3 text-blue-500 hover:text-blue-300 hover:underline"
              >
                <router-link
                  v-if="current_user != null"
                  :to="{
                    name: 'MsgCreateUser',
                    params: { uuid: user.uuid },
                  }"
                >
                  Contact Seller
                </router-link>
              </div>

              <div v-if="user.admin_role == 1" class="col-span-12">
                <div class="grid grid-cols-12">
                  <div class="col-span-6 text-gray-500">
                    Selling From: {{ country }}
                  </div>
                  <div class="col-span-6 text-gray-500">
                    Total Items Bought: {{ user_stats.total_items_bought }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="max-w-5xl mx-auto mb-10">
          <div class="grid grid-cols-12">
            <GetVendorItems v-bind:vendoruuid="user.uuid" />
          </div>
        </div>

        <div class="max-w-4xl mx-auto px-10 text-gray-700">
          <div class="grid grid-cols-12 gap-4">
            <div class="col-span-4 p-4 rounded bg-white shadow-md">
              <div class="flex text-[18px]">All User Reviews:</div>
              <div v-if="user_reviews_total == 0">
                No Reviews for {{ user.display_name }}
              </div>
              <div v-else>
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {{ user_reviews_total }} total ratings
                </p>
                <div class="flex items-center mt-4">
                  <span
                    class="text-sm font-medium text-blue-600 dark:text-blue-500"
                    >10 star</span
                  >
                  <div
                    class="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700"
                  >
                    <div
                      class="h-5 bg-yellow-400 rounded"
                      :style="{ width: user_reviews_percent_ten }"
                    ></div>
                  </div>
                  <span
                    class="text-sm font-medium text-blue-600 dark:text-blue-500"
                    >{{ user_reviews_percent_ten }}%</span
                  >
                </div>
                <div class="flex items-center mt-4">
                  <span
                    class="text-sm font-medium text-blue-600 dark:text-blue-500 pr-2"
                    >9 star</span
                  >
                  <div
                    class="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700"
                  >
                    <div
                      class="h-5 bg-yellow-400 rounded"
                      :style="{ width: user_reviews_percent_nine }"
                    ></div>
                  </div>
                  <span
                    class="text-sm font-medium text-blue-600 dark:text-blue-500"
                    >{{ user_reviews_percent_nine }}%</span
                  >
                </div>
                <div class="flex items-center mt-4">
                  <span
                    class="text-sm font-medium text-blue-600 dark:text-blue-500 pr-2"
                    >8 star</span
                  >
                  <div
                    class="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700"
                  >
                    <div
                      class="h-5 bg-yellow-400 rounded"
                      :style="{ width: user_reviews_percent_eight }"
                    ></div>
                  </div>
                  <span
                    class="text-sm font-medium text-blue-600 dark:text-blue-500"
                  >
                    {{ user_reviews_percent_eight }}%</span
                  >
                </div>
                <div class="flex items-center mt-4">
                  <span
                    class="text-sm font-medium text-blue-600 dark:text-blue-500 pr-2"
                    >7 star</span
                  >
                  <div
                    class="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700"
                  >
                    <div
                      class="h-5 bg-yellow-400 rounded"
                      :style="{ width: user_reviews_percent_seven }"
                    ></div>
                  </div>
                  <span
                    class="text-sm font-medium text-blue-600 dark:text-blue-500"
                  >
                    {{ user_reviews_percent_seven }}%</span
                  >
                </div>
                <div class="flex items-center mt-4">
                  <span
                    class="text-sm font-medium text-blue-600 dark:text-blue-500 pr-2"
                    >6 star</span
                  >
                  <div
                    class="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700"
                  >
                    <div
                      class="h-5 bg-yellow-400 rounded"
                      :style="{ width: user_reviews_percent_six }"
                    ></div>
                  </div>
                  <span
                    class="text-sm font-medium text-blue-600 dark:text-blue-500 pr-2"
                    >{{ user_reviews_percent_six }}%</span
                  >
                </div>
                <div class="flex items-center mt-4">
                  <span
                    class="text-sm font-medium text-blue-600 dark:text-blue-500 pr-2"
                    >5 star</span
                  >
                  <div
                    class="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700"
                  >
                    <div
                      class="h-5 bg-yellow-400 rounded"
                      :style="{ width: user_reviews_percent_five }"
                    ></div>
                  </div>
                  <span
                    class="text-sm font-medium text-blue-600 dark:text-blue-500"
                    >{{ user_reviews_percent_five }}%</span
                  >
                </div>
                <div class="flex items-center mt-4">
                  <span
                    class="text-sm font-medium text-blue-600 dark:text-blue-500 pr-2"
                    >4 star</span
                  >
                  <div
                    class="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700"
                  >
                    <div
                      class="h-5 bg-yellow-400 rounded"
                      :style="{ width: user_reviews_percent_four }"
                    ></div>
                  </div>
                  <span
                    class="text-sm font-medium text-blue-600 dark:text-blue-500"
                    >{{ user_reviews_percent_four }}%</span
                  >
                </div>
                <div class="flex items-center mt-4">
                  <span
                    class="text-sm font-medium text-blue-600 dark:text-blue-500 pr-2"
                    >3 star</span
                  >
                  <div
                    class="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700"
                  >
                    <div
                      class="h-5 bg-yellow-400 rounded"
                      :style="{ width: user_reviews_percent_three }"
                    ></div>
                  </div>
                  <span
                    class="text-sm font-medium text-blue-600 dark:text-blue-500 pr-2"
                    >{{ user_reviews_percent_three }}%</span
                  >
                </div>
                <div class="flex items-center mt-4">
                  <span
                    class="text-sm font-medium text-blue-600 dark:text-blue-500 pr-2"
                    >2 star</span
                  >
                  <div
                    class="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700"
                  >
                    <div
                      class="h-5 bg-yellow-400 rounded"
                      :style="{ width: user_reviews_percent_two }"
                    ></div>
                  </div>
                  <span
                    class="text-sm font-medium text-blue-600 dark:text-blue-500"
                    >{{ user_reviews_percent_two }}%</span
                  >
                </div>
                <div class="flex items-center mt-4">
                  <span
                    class="text-sm font-medium text-blue-600 dark:text-blue-500 pr-2"
                    >1 star</span
                  >
                  <div
                    class="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700"
                  >
                    <div
                      class="h-5 bg-yellow-400 rounded"
                      :style="{ width: user_reviews_percent_one }"
                    ></div>
                  </div>
                  <span
                    class="text-sm font-medium text-blue-600 dark:text-blue-500"
                    >{{ user_reviews_percent_one }}%</span
                  >
                </div>
              </div>
            </div>
            <div class="col-span-8">
              <div v-for="review in userreviews" :key="review.id">
                <div class="grid grid-cols-12 rounded bg-white shadow-md p-5">
                  <div
                    class="col-span-12 text-sm font-medium text-gray-800 dark:text-gray-800"
                  >
                    {{ review.vendor_name }}
                  </div>
                  <div class="col-span-12">
                    <router-link
                      :to="{ name: 'item', params: { id: review.item_uuid } }"
                    >
                      {{ getitemname(review.item_uuid) }}
                    </router-link>
                  </div>
                  <div
                    class="col-span-12 text-sm font-medium text-gray-500 dark:text-gray-400"
                  >
                    Date Purchased: {{ relativeDate(review.timestamp) }}
                  </div>
                  <div class="col-span-12">User Rating</div>
                  <div class="col-span-12 mb-2">
                    <StarRating v-bind:rating="review.vendor_rating" />
                  </div>
                  <div
                    class="col-span-12 mt-2 text-gray-600 dark:text-gray-800"
                  >
                    {{ review.review }}
                  </div>
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
import { useRouter, useRoute } from "vue-router";
import { notify } from "@kyvg/vue3-notification";
import StarRating from "../../components/star_rating/Star.vue";
import authHeader from "../../services/auth.header";
import MainHeaderTop from "../../layouts/headers/MainHeaderTop.vue";
import MainHeaderMid from "../../layouts/headers/MainHeaderMid.vue";
import MainHeaderBottom from "../../layouts/headers/MainHeaderBottom.vue";
import MainHeaderVendor from "../../layouts/headers/MainHeaderVendor.vue";
import MainFooter from "../../layouts/footers/FooterMain.vue";
import GetVendorItems from "./items/VendorItemsForSale.vue";

export default defineComponent({
  name: "UserProfile",
  components: {
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainHeaderVendor,
    MainFooter,
    StarRating,
    GetVendorItems,
  },

  data() {
    return {
      page_loaded: false,
      date: Date.now(),
      tab: [],
      orders: [],
      user: "",
      current_user: "",
      user_stats: [],
      country: "",
      currency: "",
      user_reviews_total: "",
      user_reviews_percent_one: "",
      user_reviews_percent_two: "",
      user_reviews_percent_three: "",
      user_reviews_percent_four: "",
      user_reviews_percent_five: "",
      user_reviews_percent_six: "",
      user_reviews_percent_seven: "",
      user_reviews_percent_eight: "",
      user_reviews_percent_nine: "",
      use_reviews_percent_ten: "",
    };
  },
  mounted() {
    const user_uuid_route = useRoute();
    this.user_uuid = user_uuid_route.params.uuid;
    this.getratings();
    this.getreviews();
    this.getuser();
    this.getuserstats();
    this.getusercountryandcurrency();
    this.userstatus();
  },
  methods: {
    relativeDate(value) {
      var d = value;
      var e = new Date(d).valueOf();
      return formatDistance(e, new Date());
    },
        async userstatus() {
      await axios({
        method: "get",
        url: "/auth/whoami",
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if ((response.status = 200)) {
            this.current_user = response.data.user;

          }
        })
         .catch((error) => {
           current_user = null

    },
    async getuser() {
      await axios({
        method: "get",
        url: "/info/user-info/" + this.user_uuid,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if ((response.status = 200)) {
          this.user = response.data;
          this.page_loaded = true;
        }
      });
    },
    async getuserstats() {
      await axios({
        method: "get",
        url: "/info/user-stats/" + this.user_uuid,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if ((response.status = 200)) {
          this.user_stats = response.data;
        }
      });
    },
    async getusercountryandcurrency() {
      await axios({
        method: "get",
        url: "/info/country-currency",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if ((response.status = 200)) {
          this.currencydefault = response.data.currency;
          this.countrydefault = response.data.country;
          this.country = this.countrydefault;
          this.currency = this.currencydefault;
        }
      });
    },
    async getreviews() {
      await axios({
        method: "get",
        url: "/vendor/vendor-feedback/" + this.user_uuid,
        withCredentials: true,
      })
        .then((response) => {
          if ((response.status = 200)) {
            this.userreviews = response.data;
            if (this.userreviews == undefined) {
              this.userreviews = "No Reviews Yet";
            }
          }
        })
        .catch((error) => {});
    },
    async getratings() {
      await axios({
        method: "get",
        url: "/info/user-feedback-stats/" + this.user_uuid,
        withCredentials: true,
      })
        .then((response) => {
          if ((response.status = 200)) {
            this.user_reviews_total = response.data.total_feedback;
            this.user_reviews_percent_one = response.data.feedback_one;
            this.user_reviews_percent_two = response.data.feedback_two;
            this.user_reviews_percent_three = response.data.feedback_three;
            this.user_reviews_percent_four = response.data.feedback_four;
            this.user_reviews_percent_five = response.data.feedback_five;
            this.user_reviews_percent_six = response.data.feedback_six;
            this.user_reviews_percent_seven = response.data.feedback_seven;
            this.user_reviews_percent_eight = response.data.feedback_eight;
            this.user_reviews_percent_nine = response.data.feedback_nine;
            this.user_reviews_percent_ten = response.data.feedback_ten;
          }
        })
        .catch((error) => {});
    },
    getitemname(order_uuid) {
      axios({
        method: "get",
        url: "/item/info/" + order_uuid,
      }).then((response) => {
        if ((response.status = 200)) {
          this.item_title = response.data.item_title;
          return this.item_title;
        }
      });
    },
  },
});
</script>
