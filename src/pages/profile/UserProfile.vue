<template>
  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />
  <div class="max-w-7xl mx-auto mb-5 mt-5 px-10">
   
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

  <div v-if="page_loaded">
    <div class="max-w-4xl mx-auto px-10 mb-20">
      <div class="flex justify-center">
        <div
          class="grid grid-cols-12 mb-20  border border-1 rounded gap-4 w-full max-w-4xl p-5"
        >
          <div class="col-span-3">{{ user.profileimage }}</div>
          <div class="col-span-6">
            <div class="text-[20px]">{{ user.display_name }}</div>
            <div class="text-gray-500">
              Member Since: {{ relativeDate(user.member_since) }} ago
            </div>
            <div class="text-gray-600">{{ user.bio }}</div>
          </div>
          <div class="col-span-3">
            <router-link
              :to="{ name: 'userprofile', params: { uuid: user.uuid } }"
            >
              <div class="text-blue-600 hover:text-blue-500 hover:underline">
                Message Seller
              </div>
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

      <div class="grid grid-cols-12">
        <div class="col-span-4 gap-4">
          <div class="flex">All User Reviews</div>
          <div v-if="user_reviews_total == 0">
            User does not have any reviews right now ...
          </div>
          <div v-else>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
              {{ user_reviews_total }} total ratings
            </p>
            <div class="flex items-center mt-4">
              <span class="text-sm font-medium text-blue-600 dark:text-blue-500"
                >10 star</span
              >
              <div class="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700">
                <div
                  class="h-5 bg-yellow-400 rounded"
                  :style="{ width: user_reviews_percent_ten }"
                ></div>
              </div>
              <span class="text-sm font-medium text-blue-600 dark:text-blue-500"
                >{{ user_reviews_percent_ten }}%</span
              >
            </div>
            <div class="flex items-center mt-4">
              <span
                class="text-sm font-medium text-blue-600 dark:text-blue-500 pr-2"
                >9 star</span
              >
              <div class="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700">
                <div
                  class="h-5 bg-yellow-400 rounded"
                  :style="{ width: user_reviews_percent_nine }"
                ></div>
              </div>
              <span class="text-sm font-medium text-blue-600 dark:text-blue-500"
                >{{ user_reviews_percent_nine }}%</span
              >
            </div>
            <div class="flex items-center mt-4">
              <span
                class="text-sm font-medium text-blue-600 dark:text-blue-500 pr-2"
                >8 star</span
              >
              <div class="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700">
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
              <div class="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700">
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
              <div class="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700">
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
              <div class="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700">
                <div
                  class="h-5 bg-yellow-400 rounded"
                  :style="{ width: user_reviews_percent_five }"
                ></div>
              </div>
              <span class="text-sm font-medium text-blue-600 dark:text-blue-500"
                >{{ user_reviews_percent_five }}%</span
              >
            </div>
            <div class="flex items-center mt-4">
              <span
                class="text-sm font-medium text-blue-600 dark:text-blue-500 pr-2"
                >4 star</span
              >
              <div class="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700">
                <div
                  class="h-5 bg-yellow-400 rounded"
                  :style="{ width: user_reviews_percent_four }"
                ></div>
              </div>
              <span class="text-sm font-medium text-blue-600 dark:text-blue-500"
                >{{ user_reviews_percent_four }}%</span
              >
            </div>
            <div class="flex items-center mt-4">
              <span
                class="text-sm font-medium text-blue-600 dark:text-blue-500 pr-2"
                >3 star</span
              >
              <div class="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700">
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
              <div class="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700">
                <div
                  class="h-5 bg-yellow-400 rounded"
                  :style="{ width: user_reviews_percent_two }"
                ></div>
              </div>
              <span class="text-sm font-medium text-blue-600 dark:text-blue-500"
                >{{ user_reviews_percent_two }}%</span
              >
            </div>
            <div class="flex items-center mt-4">
              <span
                class="text-sm font-medium text-blue-600 dark:text-blue-500 pr-2"
                >1 star</span
              >
              <div class="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700">
                <div
                  class="h-5 bg-yellow-400 rounded"
                  :style="{ width: user_reviews_percent_one }"
                ></div>
              </div>
              <span class="text-sm font-medium text-blue-600 dark:text-blue-500"
                >{{ user_reviews_percent_one }}%</span
              >
            </div>
          </div>
        </div>
        <div class="col-span-8 ">
          <div v-for="review in userreviews" :key="review.id">
            <div class="grid grid-cols-12">
              <div
                class="col-span-12 text-sm font-medium text-gray-500 dark:text-gray-400"
              >
                {{ review.vendor_name }}
              </div>
              <div class="col-span-12">
                <router-link :to="{name: 'item', params: {id: review.item_uuid }}">
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
                <StarRating v-bind:rating="review.customer_rating" />
              </div>

              <div class="col-span-12 mt-2">{{ review.review }}</div>
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
import StarRating from "../../components/star_rating/Star.vue";
import { useRouter, useRoute } from "vue-router";
import authHeader from "../../services/auth.header";
import MainHeaderTop from "../../layouts/headers/MainHeaderTop.vue";
import MainHeaderMid from "../../layouts/headers/MainHeaderMid.vue";
import MainHeaderBottom from "../../layouts/headers/MainHeaderBottom.vue";
import MainHeaderVendor from "../../layouts/headers/MainHeaderVendor.vue";
import MainFooter from "../../layouts/footers/FooterMain.vue";

export default defineComponent({
  name: "UserProfile",
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
      page_loaded: false,
      date: Date.now(),
      tab: [],
      orders: [],
      user: [],
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

 
 
},
  methods: {
    relativeDate(value) {
      var d = value;
      var e = new Date(d).valueOf();
      return formatDistance(e, new Date());
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
        url: "/info/user-feedback/" + this.user_uuid,
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
          return this.item_title

        }
      });
    },
  },
});
</script>
