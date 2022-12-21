
<template>
  <MainHeaderTop />
  <MainHeaderMid :key="shoppingcartcount" />
  <MainHeaderBottom />

  <div v-if="user">
    <MainHeaderVendor v-show="user.user_admin === 1" />
  </div>
  <div class="container max-w-7xl mx-auto">
    <div class="mx-auto flex mb-5 px-10">
      <div class="mb-10 mt-5">
        <nav class="rounded-md">
          <ol class="list-reset flex bg-red">
            <li>
              <router-link :to="{ name: 'home' }">
                <a class="text-blue-600 hover:text-blue-700 ">Home</a>
              </router-link>
            </li>
            <li>
              <span class="text-gray-500 mx-2">/</span>
            </li>
          </ol>
        </nav>
      </div>
    </div>
  </div>

  <ItemTop
    @UpdateCart="UpdateCart"
    v-bind:uuid="item_id"
    v-bind:condition="condition"
    v-bind:digitalcurrencyone="digitalcurrencyone"
    v-bind:digitalcurrencytwo="digitalcurrencytwo"
    v-bind:digitalcurrencythree="digitalcurrencythree"
    v-bind:title="title"
    v-bind:price="price"
    v-bind:pricebtc="pricebtc"
    v-bind:pricebch="pricebch"
    v-bind:pricexmr="pricexmr"
    v-bind:itemcount="itemcount"
    v-bind:origincountry="origincountry"
    v-bind:freeshipping="freeshipping"
    v-bind:freeshippingdays="freeshippingdays"
    v-bind:shippingtwo="shippingtwo"
    v-bind:shippingtwodays="shippingdaytwo"
    v-bind:shippingthree="shippingthree"
    v-bind:shippingthreedays="shippingdaythree"
    v-bind:totalsold="totalsold"
    v-bind:currency="currency"
    v-bind:vendorname="vendorname"
    v-bind:vendoruuid="vendoruuid"
    v-bind:vendortotalsales="vendortotalsales"
    v-bind:vendorrating="vendorrating"
    v-bind:imageoneserver="imageoneserver"
    v-bind:imagetwoserver="imagetwoserver"
    v-bind:imagethreeserver="imagethreeserver"
    v-bind:imagefourserver="imagefourserver"
    v-bind:exactcity="exactcity"
    v-bind:exactstateorprovence="exactstateorprovence"
    v-bind:exactzipcode="exactzipcode"
  />
  <ItemDescription v-bind:description="description" />

  <ItemShipping
    v-bind:origincountry="origincountry"
    v-bind:destinationcountryone="destinationcountryone"
    v-bind:destinationcountrytwo="destinationcountrytwo"
    v-bind:destinationcountrythree="destinationcountrythree"
    v-bind:destinationcountryfour="destinationcountryfour"
    v-bind:shippingfree="shippingfree"
    v-bind:shippingtwo="shippingtwo"
    v-bind:shippingthree="shippingthree"
    v-bind:shippingpricetwo="shippingpricetwo"
    v-bind:shippingdayfree="shippingdayfree"
    v-bind:shippingdaytwo="shippingdaytwo"
    v-bind:shippingpricethree="shippingpricethree"
    v-bind:shippingdaythree="shippingdaythree"
    v-bind:currency="currency"
  />
  <div v-if="loaded_feedback">
    <ItemUserReviews
      v-bind:vendorreviews="vendorreviews"
      v-bind:vendoruuid="vendoruuid"
    />
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
import ItemDescription from "./Item/ItemDescription.vue";
import ItemImages from "./Item/ItemImages.vue";
import ItemUserReviews from "./Item/ItemUserReviews.vue";
import ItemTop from "./Item/ItemTop.vue";
import ItemShipping from "./Item/ItemShipping.vue";
import ItemSimiliarItems from "./Item/ItemSimiliarItems.vue";


/**
 *
 @typedef {Object} user.user_admin

 *
 */


export default defineComponent({
  name: "MarketItem",

  components: {
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainHeaderVendor,
    MainFooter,
    ItemDescription,
    ItemImages,
    ItemUserReviews,
    ItemTop,
    ItemShipping,
    ItemSimiliarItems,
  },

  data() {
    return {
      item_id: null,
      item: null,
      shoppingcartcount: 0,
      loaded_feedback: false,
      title: "",
      condition: "",
      price: "",
      currency: 0,
      pricebtc: "",
      pricebch: "",
      pricexmr: "",
      digitalcurrencyone: false,
      digitalcurrencytwo: true,
      digitalcurrencythree: false,
      itemcount: "",
      freeshipping: false,
      freeshippingdays: 0,
      totalsold: 0,
      origincountry: "",
      vendorname: "",
      vendoruuid: "",
      vendortotalsales: 0,
      vendorrating: "",
      imageoneserver: "",
      imagetwoserver: "",
      imagethreeserver: "",
      imagefourserver: "",
      description: "",
      destinationcountryone: "",
      destinationcountrytwo: "",
      destinationcountrythree: "",
      destinationcountryfour: "",
      shippingfree: false,
      shippingtwo: false,
      shippingthree: false,
      shippingpricethree: "",
      shippingpricetwo: "",
      shippingdayfree: 0,
      shippingdaytwo: 0,
      shippingdaythree: 0,
      vendorreviews: [],
      shopping_cart_count: 0,
      vendor_reviews_total: 0,
      exactcity: "",
      exactstateorprovence: "",
      exactzipcode: "",
      user: null,
    };
  },

  mounted() {
    this.userstatus();
    this.getitem();
  },

  methods: {
    userstatus() {
      axios({
        method: "get",
        url: "/auth/whoami",
        withCredentials: true,
        headers: authHeader(),
      })
          .then((response) => {
            if ((response.status = 200)) {
              this.user = response.data.user

            }
          })
          .catch(() => {this.user = null});

    },
     getitem() {
      let item_id_route = useRoute();
      this.item_id = item_id_route.params.id;
       axios({
        method: "get",
        url: "/item/" + this.item_id,
        withCredentials: true,
      })
        .then((response) => {
          if ((response.status = 200)) {
            this.item = response.data;
            this.title = response.data.item_title;
            this.itemcount = response.data.item_count;
            this.digitalcurrencyone = response.data.digital_currency_1;
            this.digitalcurrencytwo = response.data.digital_currency_2;
            this.digitalcurrencythree = response.data.digital_currency_3;
            this.imageoneserver = response.data.image_one_server;
            this.imagetwoserver = response.data.image_two_server;
            this.imagethreeserver = response.data.image_three_server;
            this.imagefourserver = response.data.image_four_server;
            this.totalsold = response.data.total_sold;
            this.freeshipping = response.data.shipping_free;
            this.freeshippingdays = response.data.shipping_day_0;
            this.description = response.data.item_description;
            this.origincountry = response.data.origin_country_name;
            this.destinationcountryone =
              response.data.destination_country_one_name;
            this.destinationcountrytwo =
              response.data.destination_country_two_name;
            this.destinationcountrythree =
              response.data.destination_country_three_name;
            this.destinationcountryfour =
              response.data.destination_country_four_name;
            this.shippingfree = response.data.shipping_free;
            this.shippingtwo = response.data.shipping_two;
            this.shippingthree = response.data.shipping_three;
            this.shippingpricetwo = response.data.shipping_price_2;
            this.shippingdayfree = response.data.shipping_day_0;
            this.shippingdaytwo = response.data.shipping_day_2;
            this.shippingpricethree = response.data.shipping_price_3;
            this.shippingdaythree = response.data.shipping_day_3;
            this.vendorname = response.data.vendor_display_name;

            this.getitemcondition();
            this.getvendorinfo();
            this.getvendorreviews();
            this.getpricebch();
            this.getpricebtc();
            this.getpricexmr();
            this.getitemprice();
            this.add_view();
            this.seeifuserhasdefaultaddress();
          }
        })
        .catch((error) => {
       
        });
    },
     seeifuserhasdefaultaddress() {
       axios({
        method: "get",
        url: "/vendor/get/defaultaddress/" + this.item.vendor_uuid,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if ((response.status = 200)) {
            this.exactcity = response.data.city;
            this.exactstateorprovence = response.data.stateorprovence;
            this.exactzipcode = response.data.zipcode;
          }
        })
        .catch((error) => {
      
        });
    },
    UpdateCart() {
      this.shoppingcartcount += 1;
    },

     getitemcondition() {
      if (this.item.item_condition === 1) {
        this.condition = "New";
      } else if (this.item.item_condition === 2) {
        this.condition = "Manufacturer Refurbished";
      } else if (this.item.item_condition === 3) {
        this.condition = "Seller Refurbished";
      } else if (this.item.item_condition === 4) {
        this.condition = "Used";
      } else if (this.item.item_condition === 5) {
        this.condition = "For parts";
      } else if (this.item.item_condition === 6) {
        this.condition = "Not Specified";
      }
    },
    getitemprice() {
      this.price = this.item.price;
      this.currency = this.item.currency;
    },
     getpricebtc() {
       axios({
        method: "get",
        url: "/price/btcprice/" + this.item.currency + "/" + this.item.price,
        withCredentials: true,
      })
      .then((response) => {
        if ((response.status = 200)) {
          this.pricebtc = response.data.coin;
        }
      })
      .catch((error) => {
   
      });
    },
     getpricebch() {
       axios({
        method: "get",
        url: "/price/bchprice/" + this.item.currency + "/" + this.item.price,
        withCredentials: true,
      })
      .then((response) => {
        if ((response.status = 200)) {
          this.pricebch = response.data.coin;
        }
      })
      .catch((error) => {
      
      });
    },
     getpricexmr() {
       axios({
        method: "get",
        url: "/price/xmrprice/" + this.item.currency + "/" + this.item.price,
        withCredentials: true,
      })
      .then((response) => {
        if ((response.status = 200)) {
          this.pricexmr = response.data.coin;
        }
      })
      .catch((error) => {
     
      });
    },
     getvendorinfo() {
       axios({
        method: "get",
        url: "/vendor/vendor-info/" + this.item.vendor_uuid,
        withCredentials: true,
      })
      .then((response) => {
        if ((response.status = 200)) {
          this.vendoruuid = response.data.vendoruuid;
          this.vendorrating = response.data.vendorrating;
          this.vendortotalsales = response.data.vendortotalsales;
          this.loaded_feedback = true;
        }
      })
      .catch((error) => {
    
      });
    },

     getvendorreviews() {
       axios({
        method: "get",
        url: "/vendor/vendor-feedback/" + this.item.vendor_uuid,
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
      
      });
    },
     add_view() {
       axios({
        method: "get",
        url: "/item/count/" + this.item.uuid,
        withCredentials: true,
        headers: authHeader(),
      })
      .then(() => {

      });
    },
    returncurrencysymbol(currencydigit: number) {
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
    returncurrency(currencydigit: any) {
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

<style type="ts" scoped></style>
