
<template>
  <div class="max-w-7xl mx-auto pb-36 mt-5 rounded-md text-white">

    <div class="grid grid-cols-12 gap-5">
      <div class="col-span-12 md:col-span-4 p-5 bg-neutral rounded-md">
        <div class="flex font-semibold text-white">All Vendor Reviews</div>
        <p class="text-sm font-medium text-white border-b">
          {{ vendor_reviews_total }} total ratings
        </p>


       
                <div class="flex items-center mt-4">
                  <span class="text-sm font-medium pr-2 flex">10</span>
                  <div class="mx-4 w-2/4 h-5 rounded ">
                    <div class="h-5 bg-yellow-400 rounded" :style="{ width: vendor_reviews_percent_ten + '%' }"></div>
                  </div>
                  <span class="text-sm font-medium pr-2">{{ vendor_reviews_percent_ten }}%</span>
                </div>

              <div class="flex items-center mt-4">
                <span class="text-sm font-medium  pr-2">9 </span>
                <div class="mx-4 w-2/4 h-5  rounded ">
                  <div class="h-5 bg-yellow-400 rounded" :style="{ width: vendor_reviews_percent_nine + '%' }"></div>
                </div>
                <span class="text-sm font-medium pl-2">{{ vendor_reviews_percent_nine }}%</span>
              </div>

              <div class="flex items-center mt-4">
                <span class="text-sm font-medium pr-2">8 </span>
                <div class="mx-4 w-2/4 h-5 rounded ">
                  <div class="h-5 bg-yellow-400 rounded" :style="{ width: vendor_reviews_percent_eight + '%' }"></div>
                </div>
                <span class="text-sm font-medium pl-2">
                  {{ vendor_reviews_percent_eight }}%</span>
              </div>

              <div class="flex items-center mt-4">
                <span class="text-sm font-medium pr-2 flex">7 </span>
                <div class="mx-4 w-2/4 h-5 rounded ">
                  <div class="h-5 bg-yellow-400 rounded" :style="{ width: vendor_reviews_percent_seven + '%' }"></div>
                </div>
                <span class="text-sm font-medium pl-2">{{ vendor_reviews_percent_seven }}%</span>
              </div>

              <div class="flex items-center mt-4">
                <span class="text-sm font-medium pr-2">6 </span>
                <div class="mx-4 w-2/4 h-5  rounded ">
                  <div class="h-5 bg-yellow-400 rounded" :style="{ width: vendor_reviews_percent_six + '%' }"></div>
                </div>
                <span class="text-sm font-medium pl-2">{{ vendor_reviews_percent_six }}%</span>
              </div>

              <div class="flex items-center mt-4">
                <span class="text-sm font-medium pr-2 ">5 </span>
                <div class="mx-4 w-2/4 h-5  rounded ">
                  <div class="h-5 bg-yellow-400 rounded" :style="{ width: vendor_reviews_percent_five + '%' }"></div>
                </div>
                <span class="text-sm font-medium pl-2">{{ vendor_reviews_percent_five }}%</span>
              </div>

              <div class="flex items-center mt-4">
                <span class="text-sm font-medium pr-2">4 </span>
                <div class="mx-4 w-2/4 h-5  rounded ">
                  <div class="h-5 bg-yellow-400 rounded" :style="{ width: vendor_reviews_percent_four + '%' }"></div>
                </div>
                <span class="text-sm font-medium pl-2">{{ vendor_reviews_percent_four }}%</span>
              </div>

              <div class="flex items-center mt-4">
                <span class="text-sm font-medium pr-2">3 </span>
                <div class="mx-4 w-2/4 h-5  rounded ">
                  <div class="h-5 bg-yellow-400 rounded" :style="{ width: vendor_reviews_percent_three + '%' }"></div>
                </div>
                <span class="text-sm font-medium pl-2">{{ vendor_reviews_percent_three }}%</span>
              </div>

              <div class="flex items-center mt-4">
                <span class="text-sm font-medium pr-2">2 </span>
                <div class="mx-4 w-2/4 h-5  rounded ">
                  <div class="h-5 bg-yellow-400 rounded" :style="{ width: vendor_reviews_percent_two + '%' }"></div>
                </div>
                <span class="text-sm font-medium pl-2">{{ vendor_reviews_percent_two }}%</span>
              </div>
              <div class="flex items-center mt-4">
                <span class="text-sm font-medium pr-2">1 </span>
                <div class="mx-4 w-2/4 h-5  rounded ">
                  <div class="h-5 bg-yellow-400 rounded" :style="{ width: vendor_reviews_percent_one + '%' }"></div>
                </div>
                <span class="text-sm font-medium pl-2">{{ vendor_reviews_percent_one }}%</span>
              </div>
            </div>

      

      <div class="col-span-12 md:col-span-8">
        <div class="" v-if="vendor_reviews_total > 0">
          <div v-for="review in vendorreviews" :key="review.id">
            <div class="grid grid-cols-12 bg-neutral rounded-md p-5 mb-5">
              <div class="col-span-12 text-sm font-medium ">
                {{ review.customer_name }}
              </div>
              <div class="col-span-12  text-[14px]">
                {{ review.title_of_item }}
              </div>
              <div class="col-span-12 mb-2">
                <StarRating v-bind:rating="review.vendor_rating" />
              </div>
              <div class="col-span-12 text-sm font-medium ">
                Date Purchased: {{ relativeDate(review.timestamp) }} ago
              </div>
              <div class="col-span-12 mt-2">{{ review.review_of_vendor }}</div>
            </div>
          </div>
        </div>
        <div v-else class="text-[17px] font-semibold">
          No reviews for the vendor yet!
        </div>
      </div>
    </div>
     
  </div>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { formatDistance } from "date-fns";
import StarRating from "../../../components/star_rating/Star.vue";


export default defineComponent({
  name: "ItemUserReviews",
  props: ["vendorreviews", "vendoruuid"],
  components: {
    StarRating,
  },

  data () {
    return {
      date: Date.now(),
      tab: [],
      orders: [],
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
  mounted () {
    this.getratings();
 
  },

  methods: {
    relativeDate (value: any) {
      let e = new Date(value).valueOf();
      return formatDistance(e, new Date());
    },

    getratings () {
      axios({
        method: "get",
        url: "/vendor/all-feedback/" + this.vendoruuid,
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
          }
        })
        .catch(() => {

        });
    },
  },
});
</script>
