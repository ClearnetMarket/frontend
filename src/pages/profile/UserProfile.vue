
<template>

  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />
  <div class="wrapper">
    <div class="container max-w-4xl mx-auto px-2 text-white">
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

      <div v-if="page_loaded">
        <div class=" mx-auto mt-5">
          <div class="flex justify-center">
            <div class="grid grid-cols-12 mb-5 rounded-md gap-4 w-full p-5 bg-neutral">
              <div class="col-span-12 ">
                <div >
                  <router-link v-if="user.user_id == userprofile.uuid" :to="{ name: 'editprofile' }" class="text-blue-600 hover:text-blue-700"> Edit
                    Profile
                  </router-link>
                </div>
              
              </div>
              <div class="col-span-12 md:col-span-3 flex justify-center">
                <img class="object-fit" :src="userprofile.profileimage_url_250" >
              </div>
              <div class="col-span-12 md:col-span-9">
                <div class="text-[20px] text-center">{{ userprofile.display_name }}</div>
                <div class="text-gray-500 text-center  mb-5">
                  Member Since: {{ relativeDate (userprofile.member_since) }} ago
                </div>
               

                <div v-if="userprofile.admin_role === 1" class=" ">

                  <div class=" text-white">
                    Selling From: {{ country }}
                  </div>
                  <div class=" text-white">
                    <div v-if="user_stats.total_items_bought !== null">
                      Total Items Bought: {{ user_stats.total_items_bought }}
                    </div>
                  </div>
                  <div class=" text-white">
                    <div v-if="vendor_stats !== null">
                      Total Items Sold: {{ vendor_stats.total_sales }}
                    </div>
                  </div>

                  <div class="text-white border-t border-gray-500 mt-5">{{ userprofile.bio }}</div>

                </div>
              </div>

            </div>
          </div>

          <div class="grid grid-cols-12 gap-4 text-white pb-36">

            <div class="col-span-12">
              <div v-if="userprofile.admin_role == 1">

                <div v-if="vendor_reviews_total > 0">
                  <div v-for="review in vendorreviews" :key="review.id">
                    <div class="grid grid-cols-12 bg-neutral rounded-md p-5 mb-2">
                      <div class="col-span-12 text-sm font-medium text-gray-500 dark:text-gray-400">
                        {{ review.customer_name }}
                      </div>
                      <div class="col-span-12  text-blue-600 hover:text-blue-600 hover:underline text-[14px]">
                        <router-link :to="{
                          name: 'MarketItem',
                          params: { id: review.item_uuid },
                        }">
                          {{ review.title_of_item }}
                        </router-link>
                      </div>
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
              </div>
              <div v-else>
                <div v-if="userreviews.length > 0">
                  <div class="flex font-semibold text-white">User Reviews</div>
                  <div v-for="review in userreviews" :key="review.id" class="pb-5">
                    <div class="grid grid-cols-12 px-5 rounded bg-neutral mb-2">
                      <div class="col-span-12 text-sm font-medium text-gray-500 dark:text-gray-400">
                        Vendor: {{ review.vendor_name }}
                      </div>
                      <div class="col-span-12">
                        <router-link :to="{ name: 'item', params: { id: review.item_uuid } }">
                          {{ review.item_title }}
                        </router-link>
                      </div>
                      <div class="col-span-12 text-sm font-medium text-gray-500 dark:text-gray-400">
                        Date Purchased: {{ relativeDate (review.timestamp) }}
                      </div>
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
        </div>
      </div>
    </div>
  </div>
  <MainFooter />
</template>
.
<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { formatDistance } from "date-fns";
import { useRoute } from "vue-router";
import StarRating from "../../components/star_rating/Star.vue";
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
  created () {
    const user_uuid_route = useRoute();
    this.user_uuid = user_uuid_route.params.uuid;
    this.getuserstats();
  },
  data () {
    return {
      page_loaded: false,
      date: Date.now(),
      orders: [],
      user_uuid: null,

      user: null,
      userprofile: null,
      user_stats: null,
      vendor_stats: null,
      item_title: null,

      currencydefault: null,
      countrydefault: null,

      user_reviews_percent_one: null,
      user_reviews_percent_two: null,
      user_reviews_percent_three: null,
      user_reviews_percent_four: null,
      user_reviews_percent_five: null,
      user_reviews_percent_six: null,
      user_reviews_percent_seven: null,
      user_reviews_percent_eight: null,
      user_reviews_percent_nine: null,
      user_reviews_percent_ten: null,
      country: "",
      currency: "",
      user_reviews_total: 0,
      vendor_reviews_total: 0,
      userreviews: [],
      vendorreviews: [],
    };
  },
  mounted () {
    this.userstatus();
    this.getratingsvendor();
    this.getratingscustomer();
    this.getreviews();
    this.getvendorreviews();
    this.getuser();
    this.getuserstats();
    this.getvendorstats();
    this.getusercountryandcurrency();
  },
  methods: {
    relativeDate (value: any) {
      let e = new Date(value).valueOf();
      return formatDistance(e, new Date());
    },
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
          this.user = null;
        });
    },
    getuser () {
      axios({
        method: "get",
        url: "/info/user-info/" + this.user_uuid,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
          this.userprofile = response.data;
          this.userprofile.profileimage = response.data.profileimage;
          this.userprofile.display_name = response.data.display_name;
          this.userprofile.member_since = response.data.member_since;
          this.userprofile.bio = response.data.bio;
          this.userprofile.admin_role = response.data.admin_role;
          this.userprofile.vendor_name = response.data.vendor_name;
          this.userprofile.customer_rating = response.data.customer_rating;
          this.userprofile.profileimage_url_250 = response.data.profileimage_url_250;

      })
    },
    getuserstats () {
      axios({
        method: "get",
        url: "/info/user-stats/" + this.user_uuid,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {

          this.user_stats = response.data;
          this.user_stats.total_items_bought = response.data.total_items_bought;

      });
    },
    getvendorstats () {
      axios({
        method: "get",
        url: "/info/vendor-stats/" + this.user_uuid,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
          this.vendor_stats = response.data
      });
    },
    getusercountryandcurrency () {
      axios({
        method: "get",
        url: "/info/country-currency",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if ((response.data.success)) {
          this.currencydefault = response.data.currency;
          this.countrydefault = response.data.country;
          this.country = this.countrydefault;
          this.currency = this.currencydefault;
          this.page_loaded = true;
        }
      });
    },
    getreviews () {
      axios({
        method: "get",
        url: "/info/user-feedback/" + this.user_uuid,
        withCredentials: true,
      })
        .then((response) => {
            this.userreviews = response.data;
            if (this.userreviews == undefined)
            {this.userreviews = null}
        })
        .catch(() => { });
    },
    getratingsvendor () {
      axios({
        method: "get",
        url: "/vendor/all-feedback/" + this.user_uuid,
        withCredentials: true,
      })
        .then((response) => {
          {this.vendor_reviews_total = response.data.total_feedback}
        })
        .catch((error) => {
          console.log(error)
        });
    },
    // gets the vendor reviews
    getvendorreviews () {
      axios({
        method: "get",
        url: "/vendor/vendor-feedback/" + this.user_uuid,
        withCredentials: true,
      })
        .then((response) => {


            this.vendorreviews = response.data;
            if (this.vendorreviews == undefined) {
              this.vendorreviews = null;
            }

        })
        .catch((error) => {
          console.log(error)
        });
    },
    getratingscustomer () {
      axios({
        method: "get",
        url: "/info/user-feedback-stats/" + this.user_uuid,
        withCredentials: true,
      })
        .then((response) => {
          if ((response.data.success)) {
            this.user_reviews_total = response.data.total_feedback;

          }
        })
        .catch(() => { });
    },

  },
});
</script>
