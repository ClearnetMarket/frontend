
<template>

  <MainHeaderTop />
  <MainHeaderMid :key="shoppingcartcount" />
  <MainHeaderBottom />

  <div v-if="user">
    <MainHeaderVendor v-show="user.user_admin === 1" />
  </div>
  <div class="wrapper">
    <div class="container max-w-7xl mx-auto px-10 text-white ">
      <div class="mx-auto flex justify-between mb-1 px-5">
        <div class="mt-1">
          <nav class="rounded-md">
            <ol class="list-reset flex">
              <li>
                <router-link :to="{ name: 'home' }">
                  <a class="text-blue-600 hover:text-blue-700 ">Home</a>
                </router-link>
              </li>
              <li>
                <span class="text-gray-500 mx-2">/</span>
              </li>
              <li>
                <router-link :to="{ name: 'categoryhome' }">
                  <a class="text-blue-600 hover:text-blue-700">Categories</a>
                </router-link>
              </li>
              <li>
                <span class="text-gray-500 mx-2">/</span>
              </li>
            </ol>
          </nav>
        </div>

        <div class="text-red-600" v-if="reported_item"> 
            Item Reported
          </div>
          <div v-else>
               <button
                  class="bg-red-600 hover:bg-zinc-400 text-black font-bold py-1 px-3
                  rounded focus:outline-none focus:shadow-outline"  @click.prevent="reportitem()">
                  Report
              </button>
          </div>
      </div>
      <ItemTop @UpdateCart="UpdateCart"  />
      <ItemDescription v-bind:description="description" />
      <ItemShipping v-bind:origin_country_name="origin_country_name" v-bind:shippingfree="shippingfree"
        v-bind:shippingtwo="shippingtwo" v-bind:shippingthree="shippingthree" v-bind:shippingpricetwo="shippingpricetwo"
        v-bind:shippingdayfree="shippingdayfree" v-bind:shippingdaytwo="shippingdaytwo"
        v-bind:shippingpricethree="shippingpricethree" v-bind:shippingdaythree="shippingdaythree"
        v-bind:currency="currency" />
      <div v-if="loaded_feedback">
        <ItemUserReviews v-bind:vendorreviews="vendorreviews" v-bind:vendoruuid="vendoruuid" />
      </div>
    </div>
  </div>
<MainFooter />
</template>

<script lang="ts">
import { defineComponent } from "vue"
import axios from "axios"
import authHeader from "../../services/auth.header"
import MainHeaderTop from "../../layouts/headers/MainHeaderTop.vue"
import MainHeaderMid from "../../layouts/headers/MainHeaderMid.vue"
import MainHeaderBottom from "../../layouts/headers/MainHeaderBottom.vue"
import MainHeaderVendor from "../../layouts/headers/MainHeaderVendor.vue"
import MainFooter from "../../layouts/footers/FooterMain.vue"
import ItemDescription from "./Item/ItemDescription.vue"
import ItemUserReviews from "./Item/ItemUserReviews.vue"
import ItemTop from "./Item/ItemTop.vue"
import ItemShipping from "./Item/ItemShipping.vue"
import ItemSimiliarItems from "./Item/ItemSimiliarItems.vue"
import { notify } from "@kyvg/vue3-notification"


export default defineComponent({
  name: "MarketItem",

  components: {
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainHeaderVendor,
    MainFooter,
    ItemDescription,
    ItemUserReviews,
    ItemTop,
    ItemShipping,
    ItemSimiliarItems,
  },

  data () {
    return {
      item_id: null,
      item: null,
      shoppingcartcount: 0,
      loaded_feedback: false,
      condition: "",
      currency: 0,
      digitalcurrencyone: false,
      digitalcurrencytwo: false,
      digitalcurrencythree: false,
      itemcount: "",
      freeshipping: false,
      freeshippingdays: 0,
      totalsold: 0,
      origin_country_name: "",
      vendorname: "",
      vendoruuid: null,
      vendortotalsales: 0,
      vendorrating: "",
      description: "",
      shippingfree: false,
      shippingtwo: false,
      shippingthree: false,
      shippingpricethree: "",
      shippingpricetwo: "",
      shippingdayfree: 0,
      shippingdaytwo: 0,
      shippingdaythree: 0,
      shopping_cart_count: 0,
      vendorreviews: [],
      user: null,
      reported_item: false
    };
  },
  watch: {
    $route () {
      this.item = null;
      this.vendorreviews = null;
      this.item_id = this.$route.params.id;
      this.getitem();

    },
  },
  mounted () {
    this.userstatus();
    this.getitem();
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
          if (response.data.login == true) {
            this.user = response.data.user
          }
        })
        .catch(() => { this.user =null });
    },
    getitem () {
      this.item_id = this.$route.params.id;
      axios({
        method: "get",
        url: "/item/" + this.item_id,
        withCredentials: true,
      })
        .then((response) => {
            this.item = response.data;
            this.itemcount = response.data.item_count;
            this.totalsold = response.data.total_sold;
            this.description = response.data.item_description;
            this.vendoruuid = response.data.vendor_uuid
            this.origin_country_name = response.data.origin_country_name;
            this.freeshipping = response.data.shipping_free;
            this.freeshippingdays = response.data.shipping_day_0;
            this.shippingfree = response.data.shipping_free;
            this.shippingtwo = response.data.shipping_two;
            this.shippingthree = response.data.shipping_three;
            this.shippingpricetwo = response.data.shipping_price_2;
            this.shippingdayfree = response.data.shipping_day_0;
            this.shippingdaytwo = response.data.shipping_day_2;
            this.shippingpricethree = response.data.shipping_price_3;
            this.shippingdaythree = response.data.shipping_day_3;
            this.getvendorreviews();
            this.checkifreporteditem();
            this.loaded_feedback = true;
        })
        .catch(() => {
          notify({
            title: "Error",
            text: "Item has been deleted or doesnt exist",
            type: "error",
          });
        });
    },
    UpdateCart () {
      this.shoppingcartcount += 1;
    },
    getvendorreviews () {
      axios({
        method: "get",
        url: "/vendor/vendor-feedback/" + this.item.vendor_uuid + "/1",
        withCredentials: true,
      })
        .then((response) => {
            this.vendorreviews = response.data;
            if (this.vendorreviews == undefined) {
              this.vendorreviews = null;
            }
        })
        .catch(() => {this.vendorreviews = null; });
    },
    reportitem () {
      axios({
        method: "post",
        url: "/item/report/" + this.item.uuid,
        headers: authHeader(),
        withCredentials: true,
      })
        .then((response) => {
          if (response.data.success) {
            notify({
              title: "Item Reported",
              text: "Successfully reported Item to admins",
              type: "success",
            });

          }
          if (response.data.error) {
            notify({
              title: "Item Reported error",
              text: response.data.error,
              type: "error",
            });
          }
          this.checkifreporteditem();
        })
    },
    checkifreporteditem () {
      axios({
        method: "get",
        url: "/item/check-report/" + this.item.uuid,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {

          if (response.data.success) {
            this.reported_item = true
      
          }
          if (response.data.error) {
          this.reported_item = false

          }
        })
    },
    returncurrencysymbol (currencydigit: number) {
      if (currencydigit === 0) {
        return "$";
      } else if (currencydigit === 1) {
        return "₱";
      } else if (currencydigit === 2) {
        return "CHF";
      } else if (currencydigit === 3) {
        return "SAD";
      } else if (currencydigit === 4) {
        return "B/.";
      } else if (currencydigit === 5) {
        return "₽";
      } else if (currencydigit === 6) {
        return "kr";
      } else if (currencydigit === 7) {
        return "kr";
      } else if (currencydigit === 8) {
        return "kr";
      } else if (currencydigit === 9) {
        return "₪";
      } else if (currencydigit === 10) {
        return "kr";
      } else if (currencydigit === 11) {
        return "฿";
      } else if (currencydigit === 12) {
        return "R$";
      } else if (currencydigit === 13) {
        return "₹";
      } else if (currencydigit === 14) {
        return "R";
      } else if (currencydigit === 14) {
        return "$";
      } else if (currencydigit === 16) {
        return "¥";
      } else if (currencydigit === 17) {
        return "Ft";
      } else if (currencydigit === 18) {
        return "$";
      } else if (currencydigit === 19) {
        return "¥";
      } else if (currencydigit === 20) {
        return "$";
      } else if (currencydigit === 21) {
        return "zł";
      } else if (currencydigit === 22) {
        return "£";
      } else if (currencydigit === 23) {
        return "₺";
      } else if (currencydigit === 24) {
        return "₩";
      } else if (currencydigit === 25) {
        return "Rp";
      } else if (currencydigit === 26) {
        return "$";
      } else if (currencydigit === 27) {
        return "RM";
      } else if (currencydigit === 28) {
        return "лв";
      } else if (currencydigit === 29) {
        return "€";
      } else if (currencydigit === 31) {
        return "kn";
      } else if (currencydigit === 30) {
        return "Kč";
      }
    },
    returncurrency (currencydigit: any) {
      if (currencydigit === 0) {
        return "USD";
      } else if (currencydigit === 1) {
        return "PHP";
      } else if (currencydigit === 2) {
        return "CHF";
      } else if (currencydigit === 3) {
        return "SAD";
      } else if (currencydigit === 4) {
        return "SGD";
      } else if (currencydigit === 5) {
        return "RUB";
      } else if (currencydigit === 6) {
        return "DKK";
      } else if (currencydigit === 7) {
        return "RON";
      } else if (currencydigit === 8) {
        return "NOK";
      } else if (currencydigit === 9) {
        return "ILS";
      } else if (currencydigit === 10) {
        return "SEK";
      } else if (currencydigit === 11) {
        return "THB";
      } else if (currencydigit === 12) {
        return "BRL";
      } else if (currencydigit === 13) {
        return "INR";
      } else if (currencydigit === 14) {
        return "ZAR";
      } else if (currencydigit === 14) {
        return "HKD";
      } else if (currencydigit === 16) {
        return "JPY";
      } else if (currencydigit === 17) {
        return "HUF";
      } else if (currencydigit === 18) {
        return "MXN";
      } else if (currencydigit === 19) {
        return "CNY";
      } else if (currencydigit === 20) {
        return "AUD";
      } else if (currencydigit === 21) {
        return "PLN";
      } else if (currencydigit === 22) {
        return "GBP";
      } else if (currencydigit === 23) {
        return "TRY";
      } else if (currencydigit === 24) {
        return "KRW";
      } else if (currencydigit === 25) {
        return "IDR";
      } else if (currencydigit === 26) {
        return "NZD";
      } else if (currencydigit === 27) {
        return "MYR";
      } else if (currencydigit === 28) {
        return "BGN";
      } else if (currencydigit === 29) {
        return "EUR";
      } else if (currencydigit === 31) {
        return "HRK";
      } else if (currencydigit === 30) {
        return "CZK";
      }
    },
  },
});
</script>

<style type="ts" scoped>

</style>
