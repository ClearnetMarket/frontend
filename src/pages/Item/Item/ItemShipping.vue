
<template>
  <div class="max-w-7xl mx-auto mt-5 bg-neutral rounded-md ">
    <div class="grid grid-cols-1 text-[20px] font-semibold text-white px-5">
      Shipping
    </div>
    <div class="rounded-md p-5">
      <div class="grid grid-cols-12 gap-4 mb-5">
        <div class="col-span-12 md:col-span-6">
          <div class="grid grid-cols-12 gap-4">
            <div class="col-span-6 font-bold">Shipping From:</div>
            <div class="col-span-6 ">{{ origin_country_name }}</div>
          </div>
          <div class="grid grid-cols-12 gap-4 ">
            <div class="col-span-12 font-bold text-center md:text-left">
              <div v-if="international === true">
                Ships Internationally
              </div>
              <div v-else>
                Domestic Shipping ONLY
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 md:col-span-12">Options:</div>
        <div class="col-span-12 md:col-span-12">
          <div class="md:flex gap-4 ">

            <div v-if="shippingfree === true">
              <div class="border border-1 rounded-md p-5 bg-neutral text-white mb-5 md:mb-0">
                <div class="grid grid-cols-12 grid-rows-2 md:grid-cols-4 md:grid-rows-2">
                  <div class="col-span-12 md:col-span-3 row-span-1 text-[20px]">
                    FREE SHIPPING
                  </div>
                  <div class="col-span-12 row-span-1 text-[14px] text-white">
                    Estimated in {{ shippingdayfree }} days
                  </div>
                </div>
              </div>
            </div>
            <div v-if="shippingtwo === true">
              <div class="border border-1 rounded-md p-5 bg-neutral text-white mb-5 md:mb-0 ">
                <div class="grid grid-cols-4 grid-rows-2">

                  <div class="col-span-3 row-span-1 text-[20px]">
                    {{ shippingpricetwo }} {{ returncurrencysymbol (currency) }}
                  </div>
                  <div class="col-span-3 row-span-1 text-[14px] ">
                    Estimated in {{ shippingdayfree }} days
                  </div>
                </div>
              </div>
            </div>
            <div v-if="shippingthree === true">
              <div class="border border-1 rounded-md p-5 bg-neutral mb-5 md:mb-0">
                <div class="grid grid-cols-4 grid-rows-2">

                  <div class="col-span-3 row-span-1 text-[20px]">
                    {{ shippingpricethree }} {{ returncurrencysymbol (currency) }}
                  </div>
                  <div class="col-span-3 row-span-1 text-[14px] ">
                    Estimated in {{ shippingdayfree }} days
                  </div>
                </div>
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

export default defineComponent({
  name: "ItemShipping",
  props: [
    "origin_country_name",
    "international",
    "shippingfree",
    "shippingtwo",
    "shippingthree",
    "shippingpricetwo",
    "shippingdayfree",
    "shippingdaytwo",
    "shippingpricethree",
    "shippingdaythree",
    "currency",
  ],
  data () {
    return {};
  },

  mounted () { },

  methods: {
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
  },
});
</script>
