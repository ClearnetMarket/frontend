<template>
  <div class="bg-zinc-700 text-white">
    <div class="container max-w-7xl mx-auto text-bold text-center">
      <div class="grid grid-cols-12">

        <div class="col-span-12 md:col-span-6 lg:col-span-3 invisible md:visible h-1">
          <div class="flex ml-5">
            <div class="pb-2">
              <select class="form-select mt-2 appearance-none block w-full 
            px-3 py-1.5 text-base  text-black bg-white bg-clip-padding
             bg-no-repeat rounded transition ease-in-out" aria-label="Default select example">
                <option selected @click="gotourl('categoryhome')">
                  Categories
                </option>
                <option @click="gotourl('categoryelectronics')">
                  Electronics
                </option>
                <option @click="gotourl('categorycomputers')">
                  Computers and Parts
                </option>
                <option @click="gotourl('categorysmartphones')">
                  Smart Phones and Accessories
                </option>name
                <option @click="gotourl('categoryautomotive')">
                  Automotive
                </option>
                <option @click="gotourl('categoryhobbies')">
                  Hobbies and Collectibles
                </option>
                <option @click="gotourl('categoryjewelrygold')">
                  Jewelry Previous Metals and Coins
                </option>
                <option @click="gotourl('categoryapparel')">
                  Apparel
                </option>
                <option @click="gotourl('categoryhomeandgarden')">
                  Home and Garden
                </option>
                <option @click="gotourl('categoryart')">
                  Arts and Crafts
                </option>
                <option @click="gotourl('categorybooksandmovies')">
                  Books and Movies
                </option>
                <option @click="gotourl('categorydigital')">
                  Digital Items
                </option>
              </select>
            </div>
          </div>
        </div>

        <div class="col-span-12 md:col-span-6 lg:col-start-7 lg:col-span-6 ">
          <div class="grid grid-cols-12 ">
            <div class="col-span-2 sm:mx-3 pt-3 text-[13px] font-bold">
              <router-link :to="{ name: 'wallet' }" class="px-3 ">
                <button
                  class="bg-yellow-500 hover:bg-zinc-400 text-black font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline">
                  Wallets
                </button>
              </router-link>
            </div>
         
              <div class="col-span-4 ">
                <div class="mx-3 pt-2 text-[14px] font-bold">
                  <div class="text-white">BTC</div>
                  <div class="break-normal">{{ btcprice }} USD</div>
                </div>
              </div>
              <div class="col-span-3">
                <div class="mx-3 pt-2 text-[14px] font-bold">
                  <div class="text-white">BCH</div>
                  <div class="break-normal">{{ bchprice }} USD</div>
                </div>
              </div>
              <div class="col-span-3">
                <div class="mx-3 pt-2 text-[14px] font-bold">
                  <div class="text-white">XMR</div>
                  <div class="">{{ xmrprice }} USD</div>
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
import { MenuIcon } from "@heroicons/vue/solid";
import authHeader from "../../services/auth.header";


export default defineComponent({
  name: "MainHeaderBottom",
  components: { MenuIcon },
  data () {
    return {
      btcprice: null,
      xmrprice: null,
      bchprice: null,
      categoriesList: {},
    };
  },

  mounted () {
    this.userstatus();

    this.getCategoryList();
  },

  methods: {
    //  change url in dropdown
    gotourl (nameofurl: string) {
     
      this.$router.replace({ name: nameofurl })
      this.$router.push({ name: nameofurl });
    },
    userstatus () {
      axios({
        method: "get",
        url: "/auth/whoami",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if ((response.status = 200)) {
          this.getbtcprice_anon();
          this.getbchprice_anon();
          this.getxmrprice_anon();
        }
        else {

          this.getbtcprice_anon();
          this.getbchprice_anon();
          this.getxmrprice_anon();
        }
      }).catch((error) => {

        this.getbtcprice_anon();
        this.getbchprice_anon();
        this.getxmrprice_anon();
      });
    },
    //  Get prices of current coins
    getxmrprice () {
      axios({
        method: "get",
        url: "/xmr/price",
        headers: authHeader(),
      }).then((response) => {
        if (response.data) {
          this.xmrprice = response.data.price_xmr;
        }
      });
    },
    getbchprice () {
      axios({
        method: "get",
        url: "/bch/price",
        headers: authHeader(),
      }).then((response) => {
        if (response.data) {
          this.bchprice = response.data.bch_price;

        }
      });
    },
    getbtcprice () {
      axios({
        method: "get",
        url: "/btc/price",
        headers: authHeader(),
      }).then((response) => {
        if (response.data) {
          this.btcprice = response.data.btc_price;
        }
      });
    },
    //  Get prices of current coins
    getxmrprice_anon () {
      axios({
        method: "get",
        url: "/xmr/price/usd",
      }).then((response) => {
        if (response.data) {
          this.xmrprice = response.data.price_xmr;


        }
      });
    },
    getbchprice_anon () {
      axios({
        method: "get",
        url: "/bch/price/usd",
      }).then((response) => {
        if (response.data) {
          this.bchprice = response.data.bch_price;
        }
      });
    },
    getbtcprice_anon () {
      axios({
        method: "get",
        url: "/btc/price/usd",
      }).then((response) => {
        if (response.data) {
          this.btcprice = response.data.btc_price;
        }
      });
    },

    getCategoryList () {
      let path = "/category/sidebar";
      axios
        .get(path)
        .then((response) => {
          this.categoriesList = response.data;
        })
    },
  },
});
</script>
