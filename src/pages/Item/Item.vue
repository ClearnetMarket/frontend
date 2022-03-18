<template>
  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />

  <div v-if="user">
    <MainHeaderVendor v-show="user.admin_role > 1"/>
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
    v-bind:title="title"
    v-bind:price="price"
    v-bind:pricebtc="pricebtc"
    v-bind:pricebch="pricebch"
    v-bind:pricexmr="pricexmr"
    v-bind:itemcount="itemcount"
    v-bind:origincountry="origincountry"
    v-bind:freeshipping="freeshipping"
    v-bind:freeshippingdays="freeshippingdays"
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
  <ItemDescription />
  <ItemSimiliarItems />
  <ItemShipping />
  <ItemUserReviews />

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
            this.digitalcurrency1 = response.data.digital_currency_1;
            this.digitalcurrency2 = response.data.digital_currency_2;
            this.digitalcurrency3 = response.data.digital_currency_3;

            this.imageoneserver = response.data.image_one_server;
            this.imagetwoserver = response.data.image_two_server;
            this.imagethreeserver = response.data.image_three_server;
            this.imagefourserver = response.data.image_four_server;

            this.totalsold = response.data.total_sold;
            this.freeshipping = response.data.shipping_free;
            this.freeshippingdays = response.data.shipping_day_0;

            this.itemcondition();
            this.itemprice();
            this.vendorinfo();
          }
        })
        .catch((error) => {});
    },
    async itemcondition() {
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
    async itemprice() {
      this.price = this.item.price;
      this.currency = this.item.currency;
    },

    async vendorinfo() {
      this.vendoruuid = this.item.vendor_uuid
      ;
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
  },
});
</script>

<style type="ts" scoped></style>
