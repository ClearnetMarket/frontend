<template>
  <div class="max-w-7xl mx-auto px-10">
    <div class="grid sm:grid-cols-1 md:grid-cols-3 mt-5 gap-5">
      <div class="col-span-1">Images</div>
      <div class="col-span-1 px-5">
        <div class="text-[20px] mb-10 font-bold">{{ title }}</div>
        <div class="text-[16px] font-weight-bold">Conditon</div>
        <div class="text-[14px] font-weight-bold mb-5">
          {{ condition }}
        </div>
        <div class="text-[16px] font-weight-bold">Price</div>
        <div class="text-[20px] font-weight-bold mb-10 ">
          {{ price }} {{ currency }}
        </div>

        <div class="flex justify-center mb-10">
          <div class=" ">
            <button
              class="bg-yellow-600 hover:bg-zinc-400 rounded-lg text-white font-bold py-2 px-10 focus:outline-none focus:shadow-outline content-center justify-center"
              type="submit"
            >
              Add to Cart
            </button>
          </div>
        </div>

        <div class="text-[16px] font-weight-bold">Shipping</div>
        <div class="text-[14px] font-weight-bold mb-5">
          <div v-if="(shipping_free = true)">
            <div class="">Free Shipping</div>
            <div class="">
              Estimated in {{ freeshippingdays }} days after purchase
            </div>
          </div>
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
          <div class="px-5 border border-rounded flex flex-col">
            <div class="px-5 text-[18px]">Vendor info</div>
            <div class="text-[12px] flex">{{vendorname}}</div>
            <div class="text-[12px] flex">{{vendortotalsales}}</div>
            <div class="text-[12px] flex">({{vendorrating}}    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" class="w-4 text-yellow-500 mr-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
      <path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
    </svg>)</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "ItemTop",
  props: [
    "condition",
    "freeshippingdays",
    "price",
    "pricebtc",
    "pricebch",
    "pricexmr",
    "itemcount",
    "origincountry",
    "freeshipping",
    "totalsold",
    "title",
    "currency",
    "vendorname",
    "vendortotalsales",
    "vendorrating",

    "imageoneserver",
    "imagetwoserver",
    "imagethreeserver",
    "imagefourserver",

    "vendorname",
    "vendortotalsales",
    "vendorrating",



  ],

  data() {
    return {};
  },
  computed() {},

  mounted() {},

  methods: {},
});
</script>
