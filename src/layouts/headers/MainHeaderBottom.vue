<template>
  <div class="bg-zinc-700 py-1 text-white">
    <div
      class="container flex justify-between max-w-7xl mx-auto text-bold text-center"
    >
      <div class="flex ml-5">
        <div class="pb-2">
          <select
            class="form-select mt-2 appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-gray-200 bg-clip-padding bg-no-repeat rounded transition ease-in-out"
            aria-label="Default select example"
          >
            <option selected @click="$router.replace({ name: 'categoryhome' })">
              All Categories
            </option>

            <option @click="$router.replace({ name: 'categoryelectronics' })">
              Electronics
            </option>
            <option @click="$router.replace({ name: 'categorycomputers' })">
              Computers and Parts
            </option>
            <option @click="$router.replace({ name: 'categoryelectronics' })">
              Smart Phones and Accessories
            </option>name
            <option @click="$router.replace({ name: 'categoryautomotive' })">
              Automotive
            </option>
            <option @click="$router.replace({ name: 'categoryhobbies' })">
              Hobbies and Collectibles
            </option>
            <option
              @click="$router.replace({ name: 'categoryjewelrygoldcoins' })"
            >
              Jewelry Previous Metals and Coins
            </option>
            <option @click="$router.replace({ name: 'categoryapparel' })">
              Apparel
            </option>
            <option @click="$router.replace({ name: 'categoryhomeandgarden' })">
              Home and Garden
            </option>
            <option @click="$router.replace({ name: 'categoryartsandcrafts' })">
              Arts and Crafts
            </option>
            <option
              @click="$router.replace({ name: 'categorybooksmovies' })"
            >
              Books and Movies
            </option>
            <option @click="$router.replace({ name: 'categorydigitalitems' })">
              Digital Items
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
