
<template>
  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />
  <MainHeaderVendor />
  <div class="wrapper">
    <!-- Top Stuff-->
    <div class="max-w-4xl mx-auto  ">
      <div class="mt-5 mb-5 px-10">
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

      <div v-if="loaded">
        <div class="text-[20px] text-center">
          My Feedback
        </div>
        <div class="grid grid-cols-12 p-5 gap-5 text-white">
          <div class="col-span-12 md:col-span-4 bg-neutral rounded-md p-5">
            <div class="flex">All Vendor Reviews</div>

            <p class="text-sm font-medium ">
              {{ vendor_reviews_total }} total ratings
            </p>

            <div class="flex items-center mt-4">
              <span class="text-sm font-medium pr-2 flex">10</span>
              <div class="mx-4 w-2/4 h-5 rounded ">
                <div class="h-5 bg-yellow-400 rounded" :style="{ width: vendor_reviews_percent_ten + '%' }"></div>
              </div>
              <span class="text-sm font-medium ">{{ vendor_reviews_percent_ten }}%</span>
            </div>

            <div class="flex items-center mt-4">
              <span class="text-sm font-medium  pr-2">9 </span>
              <div class="mx-4 w-2/4 h-5  rounded ">
                <div class="h-5 bg-yellow-400 rounded" :style="{ width: vendor_reviews_percent_nine + '%' }"></div>
              </div>
              <span class="text-sm font-medium ">{{ vendor_reviews_percent_nine }}%</span>
            </div>

            <div class="flex items-center mt-4">
              <span class="text-sm font-medium pr-2">8 </span>
              <div class="mx-4 w-2/4 h-5 rounded ">
                <div class="h-5 bg-yellow-400 rounded" :style="{ width: vendor_reviews_percent_eight + '%' }"></div>
              </div>
              <span class="text-sm font-medium ">
                {{ vendor_reviews_percent_eight }}%</span>
            </div>

            <div class="flex items-center mt-4">
              <span class="text-sm font-medium pr-2 flex">7 </span>
              <div class="mx-4 w-2/4 h-5 rounded ">
                <div class="h-5 bg-yellow-400 rounded" :style="{ width: vendor_reviews_percent_seven + '%' }"></div>
              </div>
              <span class="text-sm font-medium ">{{ vendor_reviews_percent_seven }}%</span>
            </div>

            <div class="flex items-center mt-4">
              <span class="text-sm font-medium pr-2">6 </span>
              <div class="mx-4 w-2/4 h-5  rounded ">
                <div class="h-5 bg-yellow-400 rounded" :style="{ width: vendor_reviews_percent_six + '%' }"></div>
              </div>
              <span class="text-sm font-medium  pr-2">{{ vendor_reviews_percent_six }}%</span>
            </div>

            <div class="flex items-center mt-4">
              <span class="text-sm font-medium pr-2 ">5 </span>
              <div class="mx-4 w-2/4 h-5  rounded ">
                <div class="h-5 bg-yellow-400 rounded" :style="{ width: vendor_reviews_percent_five + '%' }"></div>
              </div>
              <span class="text-sm font-medium ">{{ vendor_reviews_percent_five }}%</span>
            </div>

            <div class="flex items-center mt-4">
              <span class="text-sm font-medium pr-2">4 </span>
              <div class="mx-4 w-2/4 h-5  rounded ">
                <div class="h-5 bg-yellow-400 rounded" :style="{ width: vendor_reviews_percent_four + '%' }"></div>
              </div>
              <span class="text-sm font-medium ">{{ vendor_reviews_percent_four }}%</span>
            </div>

            <div class="flex items-center mt-4">
              <span class="text-sm font-medium pr-2">3 </span>
              <div class="mx-4 w-2/4 h-5  rounded ">
                <div class="h-5 bg-yellow-400 rounded" :style="{ width: vendor_reviews_percent_three + '%' }"></div>
              </div>
              <span class="text-sm font-medium  pr-2">{{ vendor_reviews_percent_three }}%</span>
            </div>

            <div class="flex items-center mt-4">
              <span class="text-sm font-medium pr-2">2 </span>
              <div class="mx-4 w-2/4 h-5  rounded ">
                <div class="h-5 bg-yellow-400 rounded" :style="{ width: vendor_reviews_percent_two + '%' }"></div>
              </div>
              <span class="text-sm font-medium ">{{ vendor_reviews_percent_two }}%</span>
            </div>
            <div class="flex items-center mt-4">
              <span class="text-sm font-medium pr-2">1 </span>
              <div class="mx-4 w-2/4 h-5  rounded ">
                <div class="h-5 bg-yellow-400 rounded" :style="{ width: vendor_reviews_percent_one + '%' }"></div>
              </div>
              <span class="text-sm font-medium ">{{ vendor_reviews_percent_one }}%</span>
            </div>
          </div>



          <div class="col-span-12 md:col-span-8">
            <div class="text-white" v-if="recordsLength > 0">
              <div v-for="(review, index) in vendorreviews" :key="review.id">
                <div class="grid grid-cols-12 bg-neutral rounded-md p-5 mb-5">
                  <div class="col-span-12 text-sm font-medium ">
                    {{ review.customer_name }}
                  </div>
                  <div class="col-span-12   hover:underline text-[14px]"><router-link :to="{
                    name: 'MarketItem',
                    params: { id: review.item_uuid },
                  }">
                      {{ review.title_of_item }}
                    </router-link></div>
                  <div class="col-span-12 text-sm font-medium ">
                    Date Purchased: {{ relativeDate(review.timestamp) }}
                  </div>
                  <div class="col-span-12 mb-2">
                    <StarRating v-bind:rating="review.vendor_rating" />
                  </div>
                  <div class="col-span-12 mt-2">{{ review.review_of_vendor }}</div>

                </div>
              </div>
              <div class="col-span-12 mb-10" v-if="recordsLength > 9">
                <pagination @paginate="getPage" :records="recordsLength" v-model="page" :per-page="perPage"
                  :options="options"> </pagination>
                <div class="flex justify-center mb-10"> {{ recordsLength }} items Found</div>
              </div>
              <div class="col-span-12 flex justify-center" v-else>{{ recordsLength }} items</div>
            </div>

            <div v-else class="text-white text-[18px] text-center">
              You have no Feedback yet ...
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <MainFooter />
</template>

<script lang="ts">
import { defineComponent } from "vue"
import axios from "axios"
import { formatDistance } from "date-fns"
import { useRoute } from "vue-router"
import MainHeaderTop from "../../layouts/headers/MainHeaderTop.vue"
import MainHeaderMid from "../../layouts/headers/MainHeaderMid.vue"
import MainHeaderBottom from "../../layouts/headers/MainHeaderBottom.vue"
import MainHeaderVendor from "../../layouts/headers/MainHeaderVendor.vue"
import MainFooter from "../../layouts/footers/FooterMain.vue"
import authHeader from "../../services/auth.header"
import StarRating from "../../components/star_rating/Star.vue"
import PaginationComp from '../../components/MyPagination.vue'



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
      loaded: false,
      vendorreviews: [],
      vendor_reviews_total: 0,
      vendor_reviews_percent_one: 0,
      vendor_reviews_percent_two: 0,
      vendor_reviews_percent_three: 0,
      vendor_reviews_percent_four: 0,
      vendor_reviews_percent_five: 0,
      vendor_reviews_percent_six: 0,
      vendor_reviews_percent_seven: 0,
      vendor_reviews_percent_eight: 0,
      vendor_reviews_percent_nine: 0,
      vendor_reviews_percent_ten: 0,
      page: 1,
      perPage: 10,
      recordsLength: 0,
      options: {
        edgeNavigation: false,
        format: false,
        template: PaginationComp
      }
    };
  },
  created () {
    this.userstatus();
  },
  mounted () {
    const user_uuid_route = useRoute();
    this.user_id = user_uuid_route.params.uuid;
    this.getPage(this.page);
    this.getratings();
    this.deleteordernotice();
    this.getvendorreviewscount();
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
          if ((response.data.login == true)) {
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
    getPage: function (page: any) {
      // we simulate an api call that fetch the records from a backend
      this.vendorreviews = [];
      const startIndex = this.perPage * (page - 1) + 1;
      const endIndex = startIndex + this.perPage - 1;

      // gets the vendor items
      this.getvendorreviews(page)

    },

    // deletes feeeback notification
    deleteordernotice () {
      axios({
        method: "delete",
        url: "/vendor/new-feedback-count/markasread",
        withCredentials: true,
        headers: authHeader(),
      }).then(() => {

      });
    },
    // gets the vendor reviews
    getvendorreviews (page: any) {
      axios({
        method: "get",
        url: "/vendor/vendor-feedback/" + this.user_id + "/" + this.page,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          this.vendorreviews = response.data;

        })
        .catch(() => { });
    },
    // gets the vendor reviews
    getvendorreviewscount () {
      axios({
        method: "get",
        url: "/vendor/vendor-feedback/count/" + this.user_id,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          this.recordsLength = response.data.count;
        })
        .catch(() => { });
    },

    // gets the overall ratings on sidebar
    getratings () {
      axios({
        method: "get",
        url: "/vendor/all-feedback/" + this.user_id,
        withCredentials: true,
      })
        .then((response) => {
          if (response.data.success) {
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
            this.loaded = true;
          }
        })
        .catch(() => { });
    },
  },
});
</script>
