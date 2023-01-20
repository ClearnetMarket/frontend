
<template>

  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />
  <MainHeaderVendor />
  <!-- Top Stuff-->
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


    <div class="text-[20px] pt-5 pb-5 text-center">
      My Feedback
    </div>
    <div class="grid grid-cols-12 p-5 gap-5">
      <div class="col-span-4 bg-white rounded-md p-5">
        <div class="flex">All Vendor Reviews</div>

        <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
          {{ vendor_reviews_total }} total ratings
        </p>
        <div class="flex items-center mt-4">
          <span class="text-sm font-medium text-blue-600 dark:text-blue-500">10 star</span>
          <div class="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700">
            <div class="h-5 bg-yellow-400 rounded" :style="{ width: vendor_reviews_percent_ten }"></div>
          </div>
          <span class="text-sm font-medium text-blue-600 dark:text-blue-500">{{ vendor_reviews_percent_ten }}%</span>
        </div>
        <div class="flex items-center mt-4">
          <span class="text-sm font-medium text-blue-600 dark:text-blue-500 pr-2">9 star</span>
          <div class="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700">
            <div class="h-5 bg-yellow-400 rounded" :style="{ width: vendor_reviews_percent_nine }"></div>
          </div>
          <span class="text-sm font-medium text-blue-600 dark:text-blue-500">{{ vendor_reviews_percent_nine }}%</span>
        </div>
        <div class="flex items-center mt-4">
          <span class="text-sm font-medium text-blue-600 dark:text-blue-500 pr-2">8 star</span>
          <div class="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700">
            <div class="h-5 bg-yellow-400 rounded" :style="{ width: vendor_reviews_percent_eight }"></div>
          </div>
          <span class="text-sm font-medium text-blue-600 dark:text-blue-500">
            {{ vendor_reviews_percent_eight }}%</span>
        </div>
        <div class="flex items-center mt-4">
          <span class="text-sm font-medium text-blue-600 dark:text-blue-500 pr-2">7 star</span>
          <div class="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700">
            <div class="h-5 bg-yellow-400 rounded" :style="{ width: vendor_reviews_percent_seven }"></div>
          </div>
          <span class="text-sm font-medium text-blue-600 dark:text-blue-500">
            {{ vendor_reviews_percent_seven }}%</span>
        </div>
        <div class="flex items-center mt-4">
          <span class="text-sm font-medium text-blue-600 dark:text-blue-500 pr-2">6 star</span>
          <div class="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700">
            <div class="h-5 bg-yellow-400 rounded" :style="{ width: vendor_reviews_percent_six }"></div>
          </div>
          <span class="text-sm font-medium text-blue-600 dark:text-blue-500 pr-2">{{
            vendor_reviews_percent_six
          }}%</span>
        </div>
        <div class="flex items-center mt-4">
          <span class="text-sm font-medium text-blue-600 dark:text-blue-500 pr-2">5 star</span>
          <div class="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700">
            <div class="h-5 bg-yellow-400 rounded" :style="{ width: vendor_reviews_percent_five }"></div>
          </div>
          <span class="text-sm font-medium text-blue-600 dark:text-blue-500">{{ vendor_reviews_percent_five }}%</span>
        </div>
        <div class="flex items-center mt-4">
          <span class="text-sm font-medium text-blue-600 dark:text-blue-500 pr-2">4 star</span>
          <div class="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700">
            <div class="h-5 bg-yellow-400 rounded" :style="{ width: vendor_reviews_percent_four }"></div>
          </div>
          <span class="text-sm font-medium text-blue-600 dark:text-blue-500">{{ vendor_reviews_percent_four }}%</span>
        </div>
        <div class="flex items-center mt-4">
          <span class="text-sm font-medium text-blue-600 dark:text-blue-500 pr-2">3 star</span>
          <div class="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700">
            <div class="h-5 bg-yellow-400 rounded" :style="{ width: vendor_reviews_percent_three }"></div>
          </div>
          <span class="text-sm font-medium text-blue-600 dark:text-blue-500 pr-2">{{
            vendor_reviews_percent_three
          }}%</span>
        </div>
        <div class="flex items-center mt-4">
          <span class="text-sm font-medium text-blue-600 dark:text-blue-500 pr-2">2 star</span>
          <div class="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700">
            <div class="h-5 bg-yellow-400 rounded" :style="{ width: vendor_reviews_percent_two }"></div>
          </div>
          <span class="text-sm font-medium text-blue-600 dark:text-blue-500">{{ vendor_reviews_percent_two }}%</span>
        </div>
        <div class="flex items-center mt-4">
          <span class="text-sm font-medium text-blue-600 dark:text-blue-500 pr-2">1 star</span>
          <div class="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700">
            <div class="h-5 bg-yellow-400 rounded" :style="{ width: vendor_reviews_percent_one }"></div>
          </div>
          <span class="text-sm font-medium text-blue-600 dark:text-blue-500">{{ vendor_reviews_percent_one }}%</span>
        </div>
      </div>
      <div class="col-span-8">
        <div class="" v-if="vendor_reviews_total > 0">
          <div v-for="review in vendorreviews" :key="review.id">
            <div class="grid grid-cols-12 bg-white rounded-md p-5">
              <div class="col-span-12 text-sm font-medium text-gray-500 dark:text-gray-400">
                {{ review.customer_name }}
              </div>
              <div class="col-span-12  text-blue-600 hover:text-blue-600 hover:underline text-[14px]"><router-link :to="{
                name: 'MarketItem',
                params: { id: review.item_uuid },
              }">
                  {{ review.title_of_item }}
                </router-link></div>
              <div class="col-span-12 text-sm font-medium text-gray-500 dark:text-gray-400">
                Date Purchased: {{ relativeDate (review.timestamp) }}
              </div>
              <div class="col-span-12 mb-2">
                <StarRating v-bind:rating="review.vendor_rating" />
              </div>
              <div class="col-span-12 mt-2">{{ review.review_of_vendor }}</div>

            </div>
          </div>
        </div>
        <div v-else class="text-gray-700 text-[18px] text-center">
          You have no Feedback yet ...
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
import { useRoute } from "vue-router";
import MainHeaderTop from "../../layouts/headers/MainHeaderTop.vue";
import MainHeaderMid from "../../layouts/headers/MainHeaderMid.vue";
import MainHeaderBottom from "../../layouts/headers/MainHeaderBottom.vue";
import MainHeaderVendor from "../../layouts/headers/MainHeaderVendor.vue";
import MainFooter from "../../layouts/footers/FooterMain.vue";
import authHeader from "../../services/auth.header";
import StarRating from "../../components/star_rating/Star.vue";

/**
 *
 @typedef {Object} review.customer_name
 @typedef {Object} review.item_rating
 @typedef {Object} review.vendor_rating
 @typedef {Object} user.user_name

 *
 */

export default defineComponent({
  name: "vendorfeedback",

  components: {
    StarRating,
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainHeaderVendor,
    MainFooter,
  },

  data () {
    return {
      date: Date.now(),
      user: null,
      tab: [],
      user_id: null,
      orders: [],
      vendorreviews: [],
      vendor_reviews_total: 0,
      vendor_reviews_percent_one: null,
      vendor_reviews_percent_two: null,
      vendor_reviews_percent_three: null,
      vendor_reviews_percent_four: null,
      vendor_reviews_percent_five: null,
      vendor_reviews_percent_six: null,
      vendor_reviews_percent_seven: null,
      vendor_reviews_percent_eight: null,
      vendor_reviews_percent_nine: null,
      vendor_reviews_percent_ten: null,
    };
  },
  created () {
    this.userstatus();
  },
  mounted () {

    const user_uuid_route = useRoute();
    this.user_id = user_uuid_route.params.uuid;

    this.getratings();
    this.deleteordernotice();
    this.getvendorreviews();
  },

  methods: {
    userstatus () {
      axios({
        method: "get",
        url: "/auth/whoami",
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if ((response.status = 200)) {
            this.user = response.data.user;
          }
        })
        .catch(() => {
          this.$router.push({ name: "login" });
        });
    },
    // converts the time
    relativeDate (value: any) {
      let e = new Date(value).valueOf();
      return formatDistance(e, new Date());
    },
    // deletes feeeback notification
    deleteordernotice () {
      axios({
        method: "delete",
        url: "/vendor/new-feedback-count/markasread",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {

        }
      });
    },
    // gets the vendor reviews
    getvendorreviews () {
      axios({
        method: "get",
        url: "/vendor/vendor-feedback/" + this.user_id,
        withCredentials: true,
      })
        .then((response) => {
          if ((response.status = 200)) {

            this.vendorreviews = response.data;
            if (this.vendorreviews == undefined) {
              this.vendorreviews = null;
            }
          }
        })
        .catch((error) => {
          console.log(error)
        });
    },
    // gets the overall ratings on sidebar
    getratings () {
      axios({
        method: "get",
        url: "/vendor/all-feedback/" + this.user_id,
        withCredentials: true,
      })
        .then((response) => {
          if ((response.status = 200)) {
            this.vendor_reviews_total = response.data.total_feedback;
            this.vendor_reviews_percent_one = response.data.feedback_one;
            this.vendor_reviews_percent_two = response.data.feedback_two;
            this.vendor_reviews_percent_three = response.data.feedback_three;
            this.vendor_reviews_percent_four = response.data.feedback_four;
            this.vendor_reviews_percent_five = response.data.feedback_five;
            this.vendor_reviews_percent_six = response.data.feedback_six;
            this.vendor_reviews_percent_seven = response.data.feedback_seven;
            this.vendor_reviews_percent_eight = response.data.feedback_eight;
            this.vendor_reviews_percent_nine = response.data.feedback_nine;
            this.vendor_reviews_percent_ten = response.data.feedback_ten;
          }
        })
        .catch((error) => {
          console.log(error)
        });
    },
  },
});
</script>
