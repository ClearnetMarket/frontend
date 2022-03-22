<template>
  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />

  <div v-if="user">
    <MainHeaderVendor v-show="user.user_admin == 1" />
  </div>
  <div class="container max-w-7xl mx-auto">
    <div class="mx-auto flex mb-5 px-10">
      <div class="mb-10 mt-5">
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
          </ol>
        </nav>
      </div>
    </div>
  </div>

  <ItemTop
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
    v-bind:shippingtwodays="shippingtwodays"
    v-bind:shippingthree="shippingthree"
    v-bind:shippingthreedays="shippingthreedays"
    v-bind:totalsold="totalsold"
    v-bind:currency="currency"
    v-bind:vendorname="vendorname"
    v-bind:vendortotalsales="vendortotalsales"
    v-bind:vendorrating="vendorrating"
    v-bind:imageoneserver="imageoneserver"
    v-bind:imagetwoserver="imagetwoserver"
    v-bind:imagethreeserver="imagethreeserver"
    v-bind:imagefourserver="imagefourserver"
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
    v-bind:shippingdaytwo="shippingdaytwo"
    v-bind:shippingpricethree="shippingpricethree"
    v-bind:shippingdaythree="shippingdaythree"
  />
  <ItemUserReviews v-bind:vendorreviews="vendorreviews" />

  <MainFooter />
</template>

<script lang="ts">
import { mapGetters } from "vuex";
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

export default defineComponent({
  name: "Home",

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
      title: "",
      condition: "",

      price: "",
      pricebtc: "",
      pricebch: "",
      pricexmr: "",
      digitalcurrencyone: "",
      digitalcurrencytwo: "",
      digitalcurrencythree: "",
      itemcount: "",
      freeshipping: "",
      freeshippingdays: "",
      totalsold: "",
      origincountry: "",
      currency: "",

      vendorname: "",
      vendortotalsales: "",
      vendorrating: "",
      imageoneserver: "",
      imagetwoserver: "",
      imagethreeserver: "",
      imagefourserver: "",

      description: "",

      origincountry: "",
      destinationcountryone: "",
      destinationcountrytwo: "",
      destinationcountrythree: "",
      destinationcountryfour: "",
      shippingfree: "",
      shippingtwo: "",
      shippingthree: "",
      shippingpricetwo: "",
      shippingdaytwo: "",
      shippingpricethree: "",
      shippingdaythree: "",
      vendorreviews: "",
    };
  },

  mounted() {
    this.getitem();
  },

  methods: {
    async getitem() {
      const item_id_route = useRoute();
      const item_id = item_id_route.params.id;
      this.item_id = item_id;
      await axios({
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
            this.shippingdaytwo = response.data.shipping_day_2;

            this.shippingpricethree = response.data.shipping_price_3;
            this.shippingdaythree = response.data.shipping_day_3;

            this.getitemcondition();

            this.getitemprice();
            this.getvendorinfo();
            this.getvendorreviews();
          }
        })
        .catch((error) => {});
    },
    async getitemcondition() {
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
      this.currency = this.item.currency_symbol;
    },

    async getvendorinfo() {
      await axios({
        method: "get",
        url: "/vendor/vendoriteminfo/" + this.item.vendor_uuid,
        withCredentials: true,
      })
        .then((response) => {
          if ((response.status = 200)) {
            this.vendorname = response.data.vendorname;
            this.vendorrating = response.data.vendorrating;
            this.vendortotalsales = response.data.vendortotalsales;
          }
        })
        .catch((error) => {});
    },

    async getvendorreviews() {
      await axios({
        method: "get",
        url: "/vendor/vendor-feedback/" + this.item.vendor_uuid,
        withCredentials: true,
      })
        .then((response) => {
          if ((response.status = 200)) {
            this.vendorreviews = response.data.vendorname;

            if (this.vendorreviews == undefined) {
              this.vendorreviews = "No Reviews Yet";
            }
          }
        })
        .catch((error) => {});
    },
  },
});
</script>

<style type="ts" scoped></style>
