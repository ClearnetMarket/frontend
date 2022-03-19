<template>
  <div class="bg-zinc-700 py-1 text-white">
    <div
      class="container flex justify-between max-w-7xl mx-auto text-bold text-center"
    >
      <div class="flex ml-5 ">
      <div class="pb-2">
        <select
          class="form-select mt-2 appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-gray-200 bg-clip-padding bg-no-repeat rounded transition ease-in-out "
          aria-label="Default select example"
        >
          <option selected>All Categories</option>
          <option
            class="shadow form-select appearance-none block w-full px-3 py-1.5 text-base font-normal focus:shadow-outline text-gray-500 bg-white bg-clip-padding bg-no-repeat border rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            v-for="(item, index) in categoriesList"
            :key="index"
            :value="item.id"
          >
            {{ item.name }}
          </option>
        </select>
        </div>
      </div>

      <div class="flex mr-5">
        <div class="mx-3 pt-3 text-[13px] font-bold">
          <router-link :to="{ name: 'wallet' }" class="px-3">
            <button
              class="bg-yellow-600 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
            >
              Wallets
            </button>
          </router-link>
        </div>
        <div class="mx-3 pt-2 text-[13px] font-bold">
          <div class="text-white">Bitcoin</div>
          <div class="pl-1">{{ btcprice }} USD</div>
        </div>
        <div class="mx-3 pt-2 text-[13px] font-bold">
          <div class="text-white">Bitcoin Cash</div>
          <div class="pl-1">{{ bchprice }} USD</div>
        </div>
        <div class="mx-3 pt-2 text-[13px] font-bold">
          <div class="text-white">Monero</div>
          <div class="pl-1 font-bold">{{ xmrprice }} USD</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import axios from "axios";
import { MenuIcon } from "@heroicons/vue/solid";

export default defineComponent({
  name: "MainHeaderBottom",
  components: { MenuIcon },
  data() {
    return {
      btcprice: null,
      xmrprice: null,
      bchprice: null,


      categoriesList: {},
    };
  },

  mounted() {
    this.getbtcprice();
    this.getbchprice();
    this.getxmrprice();


    this.getCategoryList();
  },

  methods: {
    gotoxmrwallet() {
      this.$router.push({ name: "xmrwallet" });
    },
    gotobtcwallet() {
      this.$router.push({ name: "btcwallet" });
    },

    gotobchwallet() {
      this.$router.push({ name: "bchwallet" });
    },

    //  Get prices of current coins
    async getxmrprice() {
      await axios({
        method: "get",
        url: "/xmr/price",
      }).then((response) => {
        if (response.data) {
          this.xmrprice = response.data.price_xmr_usd;
        }
      });
    },
    async getbchprice() {
      await axios({
        method: "get",
        url: "/bch/price",
      }).then((response) => {
        if (response.data) {
          this.bchprice = response.data.bch_price_usd;
        }
      });
    },
    async getbtcprice() {
      await axios({
        method: "get",
        url: "/btc/price",
      }).then((response) => {
        if (response.data) {
          this.btcprice = response.data.btc_price_usd;
        }
      });
    },

  
    async getCategoryList() {
      const path = "/category/sidebar";
      await axios
        .get(path, { withCredentials: true })
        .then((response) => {
          this.categoriesList = response.data;
        })
        .catch((error) => {});
    },
  },
});
</script>
