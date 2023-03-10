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
              <div v-if="user">
                <div class="mx-3 pt-2 text-[14px] font-bold">
                  <div class="text-white">BTC</div>
                  <div class="break-normal">{{ btcprice }} {{ returncurrency(user.currency) }}</div>
                </div>
              </div>
              <div v-else>
                <div class="mx-3 pt-2 text-[14px] font-bold">
                  <div class="text-white">BTC</div>
                  <div class="break-normal">{{ btcprice }} USD</div>
                </div>
              </div>
            </div>
            <div class="col-span-3">
              <div v-if="user">
                <div class="mx-3 pt-2 text-[14px] font-bold">
                  <div class="text-white">BCH</div>
                  <div class="break-normal">{{ bchprice }} {{ returncurrency(user.currency) }}</div>
                </div>
              </div>
              <div v-else>
                <div class="mx-3 pt-2 text-[14px] font-bold">
                  <div class="text-white">BCH</div>
                  <div class="break-normal">{{ bchprice }} USD</div>
                </div>
              </div>
            </div>
            <div class="col-span-3">
              <div v-if="user">
                <div class="mx-3 pt-2 text-[14px] font-bold">
                  <div class="text-white">XMR</div>
                  <div class="">{{ xmrprice }} {{ returncurrency(user.currency) }}</div>
                </div>
              </div>
              <div v-else>
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

import authHeader from "../../services/auth.header";


export default defineComponent({
  name: "MainHeaderBottom",

  data () {
    return {
      user: null,
      btcprice: null,
      xmrprice: null,
      interval: null,
      bchprice: null,
      categoriesList: {},
    };
  },

  mounted () {
    this.userstatus();

    this.getCategoryList();

    this.interval = setInterval(() => {
      this.getbtcprice_anon();
      this.getbchprice_anon();
      this.getxmrprice_anon();
    }, 100000);
  },
  destroyed () {
    clearInterval(this.interval)
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
          this.user = response.data.user
          this.getbtcprice();
          this.getbchprice();
          this.getxmrprice();
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
    returncurrency (currencydigit: number) {
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
