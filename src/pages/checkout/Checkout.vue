<template>
  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />
  <div v-if="user">
    <MainHeaderVendor v-show="user.user_admin == 1" />
  </div>
  <div class="max-w-7xl mx-auto flex mb-0 wrapper">
    <div class="grid grid-cols-12 w-full gap-4">
      <div class="col-span-9 px-10 py-10"></div>

        <div class="col-span-9 px-10 py-10">
        
         <div class="grid grid-cols-1">
        <div class="col-span-1">
          <h1 class="font-semibold text-2xl border-b pb-8">Order Summary</h1>
        </div>
        <div class="mb-5">
          <div class="col-span-1">
            <span class="font-semibold text-sm uppercase"
              >Items {{ order_summary_count }}</span
            >
          </div>
        </div>
        <div>
          <div class="col-span-12">
            <label class="font-medium inline-block mb-3 text-sm uppercase"
              >Item Cost: {{ order_summary_cost }}</label
            >
          </div>
          <div class="col-span-12">
            <div v-if="order_summary_shipping_cost == 0">
              <Div class="text-orange-500">Free Shipping</Div>
            </div>
            <div v-else>
              <label class="font-medium inline-block mb-3 text-sm uppercase"
                >Shipping: {{ order_summary_shipping_cost }}</label
              >
            </div>
          </div>
        </div>
        <div class="col-span-1">
          <div class="border-t mt-8">
            <div class="font-semibold py-6 text-sm uppercase">
              <span
                >Total cost {{ order_summary_shipping_and_price_cost }}</span
              >
            </div>
               <router-link :to="{ name: 'checkout' }">
            <button

              class="bg-yellow-500 font-semibold hover:bg-yellow-600 py-3 text-sm text-white uppercase w-full"
            >
              Checkout
            </button>
            </router-link>
          </div>
        </div>
      </div>
      </div>
    </div>
    <MainFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import authHeader from "../../services/auth.header";
import MainHeaderTop from "../../layouts/headers/MainHeaderTop.vue";
import MainHeaderMid from "../../layouts/headers/MainHeaderMid.vue";
import MainHeaderBottom from "../../layouts/headers/MainHeaderBottom.vue";
import MainHeaderVendor from "../../layouts/headers/MainHeaderVendor.vue";
import MainFooter from "../../layouts/footers/FooterMain.vue";

export default defineComponent({
  name: "Checkout",

  components: {
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainHeaderVendor,
  },

  data() {
    return {};
  },

  mounted() {},

  methods: {},
});
</script>
