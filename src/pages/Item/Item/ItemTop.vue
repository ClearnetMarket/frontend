<template>
  <div class="max-w-7xl mx-auto px-10">
    <div class="grid sm:grid-cols-1 md:grid-cols-3 mt-5 gap-5">
      <div class="col-span-1">Images</div>
      <div class="col-span-1 px-5">
        <div class="text-[20px] mb-1 font-bold">{{ title }}</div>
        <div class="flex pt-4 mb-2">
          <div v-if="digitalcurrencyone == true">
            <span
              class="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-orange-500 mr-2 mb-2"
              >Bitcoin</span
            >
          </div>
          <div v-if="digitalcurrencytwo == true">
            <span
              class="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-orange-700 mr-2 mb-2"
              >Monero</span
            >
          </div>
          <div v-if="digitalcurrencythree == true">
            <span
              class="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-green-600 mr-2 mb-2"
              >Bitcoin Cash</span
            >
          </div>
        </div>
        <div class="text-[16px] font-weight-bold">Conditon</div>
        <div class="text-[14px] font-weight-bold mb-5">
          {{ condition }}
        </div>
        <div class="text-[16px] font-weight-bold">Price</div>
        <div class="text-[20px] font-weight-bold mb-10">
          {{ price }} {{ currency }}
        </div>

        <div class="flex justify-center mb-10">
          <div class=" ">
            <button
              class="bg-yellow-600 hover:bg-zinc-400 rounded-lg text-white font-bold py-2 px-10 focus:outline-none focus:shadow-outline content-center justify-center"
              type="submit"
              @click="addtocart()"
            >
              Add to Cart
            </button>
          </div>
        </div>

        <div class="text-[16px] font-weight-bold">Shipping</div>
        <div class="text-[14px] font-weight-bold mb-5">
          <div v-if="(shippingfree = true)">
            <div class="">Free Shipping</div>
            <div class="">
              Estimated in {{ freeshippingdays }} days after purchase
            </div>
          </div>
          <div v-else></div>
        </div>
      </div>
      <div class="col-span-1">
        <div class="flex flex-col">
          <div class="px-5 border border-rounded-md mb-10 text-gray-600">
            <div class="px-5 text-[16px]">Moderator Supported</div>
            <div class="px-10 mb-10">
              All Items are backed by moderator support.
            </div>
          </div>
          <div class="px-5 border border-rounded flex flex-col pb-5">
            <div class="mb-5 text-[18px]">Vendor info</div>
            <div class="text-[12px] flex">
              <div v-if="vendoruuid">
                <div class="flex">
                  <div class="">Sold by:</div>
                  <router-link
                    :to="{
                      name: 'userprofile',
                      params: { uuid: vendoruuid },
                    }"
                  >
                    <div
                      class="text-blue-500 hover:text-blue-300 hover:underline pl-3"
                    >
                      {{ vendorname }} ({{ vendortotalsales }})
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
            <div v-if="vendortotalsales > 0">
              <div class="text-[12px] flex">
                ({{ vendorrating }} Feedback rating
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="star"
                  class="w-4 text-yellow-500 mr-1"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path
                    fill="currentColor"
                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 
                  103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5
                  105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                  ></path></svg
                >)
              </div>
            </div>
            <div v-else>
              <div class="text-[12px]">Newbie Seller</div>
            </div>
               <div v-if="vendoruuid">
            <div class="mt-5 text-[14px] text-blue-500 hover:text-blue-300 hover:underline pl-3">
              <router-link :to="{ name: 'MsgCreateItem',  params: { uuid: vendoruuid, itemuuid: uuid }, }"> Contact Seller </router-link>
            </div>
                 </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import authHeader from "../../../services/auth.header";
export default defineComponent({
  name: "ItemTop",
  props: [
    "uuid",
    "condition",
    "itemcount",
    "origincountry",
    "totalsold",
    "title",
    "currency",
    "vendorname",
    "vendortotalsales",
    "vendorrating",
    "vendoruuid",

    "imageoneserver",
    "imagetwoserver",
    "imagethreeserver",
    "imagefourserver",

    "digitalcurrencyone",
    "digitalcurrencytwo",
    "digitalcurrencythree",

    "freeshipping",
    "freeshippingdays",
    "shippingtwo",
    "shippingtwodays",
    "shippingthree",
    "shippingthreedays",

    "price",
    "pricebtc",
    "pricebch",
    "pricexmr",
  ],

  data() {
    return {
      shopping_cart_count: "",
      vendor_reviews_total: "",
    };
  },
  computed() {},

  mounted() {
    const item_id_route = useRoute();
    this.item_id = item_id_route.params.id;
  },

  methods: {
    addtocart() {
      const path = "/checkout/add/" + this.item_id;
      axios({
        method: "post",
        url: path,
        headers: authHeader(),
      }).then((response) => {
        this.get_shopping_cart_count();
      });
    },

    // Get How many items in shopping cart
    async get_shopping_cart_count() {
      await axios({
        method: "get",
        url: "/info/user-cart-count",
        headers: authHeader(),
      }).then((response) => {
        this.shopping_cart_count = response.data.status;
        this.$emit("UpdateCart", this.shopping_cart_count);
      });
    },
  },
});
</script>
