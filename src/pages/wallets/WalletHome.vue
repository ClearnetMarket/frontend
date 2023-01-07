
<template>
 
  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />

  <div v-if="user">
    <MainHeaderVendor v-show="user.user_admin === 1" />
  </div>
  <!-- Top Stuff-->
  <div class="container max-w-7xl mx-auto px-10">
    <!-- Container-->
    <div class="mt-5 mb-5">
      <nav class="rounded-md w-full">
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
    <div class="sm:col-span-4 md:col-span-3 bg-white rounded-md p-5">
      <div class="text-[18px] mb-10 text-left">Account Balances</div>
      <div class="overflow-x-auto relative">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-blue-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="py-3 px-6">
                Assets
              </th>
              <th scope="col" class="py-3 px-6">
                Market Price
              </th>
              <th scope="col" class="py-3 px-6">
                Amount
              </th>
              <th scope="col" class="py-3 px-6">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class=" font-large font-bold">
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" class="py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white">
                <div class="flex gap-3">
                  <img class="object-contain" src="../../assets/coin/btc/btc_small.png" alt="No Image Found .." />
                  Bitcoin
                </div>
              </th>
              <td class="py-4 px-6">
                ${{ btcprice }}
              </td>
              <td class="py-4 px-6">
                {{ btcbalance }}
              </td>
              <td class="py-4 px-6">
                <div class="flex-1 ">
                  <router-link :to="{ name: 'btcwalletsend' }" class="px-3">
                    <button
                      class="bg-gray-700 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline">
                      Withdraw
                    </button>
                  </router-link>


                  <router-link :to="{ name: 'btcwalletrecieve' }" class="px-3">
                    <button
                      class="bg-gray-700 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline">
                      Deposit
                    </button>
                  </router-link>


                  <router-link :to="{ name: 'btcwallet' }" class="px-3">
                    <button
                      class="bg-gray-700 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline">
                      Transactions
                    </button>
                  </router-link>
                </div>
              </td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" class="py-4 px-6  text-gray-900 whitespace-nowrap dark:text-white">
                  <div class="flex gap-3">
                    <img class="object-contain" src="../../assets/coin/bch/bch_small.png" alt="No Image Found .." />
                      Bitcoin Cash
                  </div>
              </th>
              <td class="py-4 px-6">
                ${{ bchprice }}
              </td>
              <td class="py-4 px-6">
              {{ bchbalance }}
              </td>
              <td class="py-4 px-6">
                <div class="flex-1 ">
                  <router-link :to="{ name: 'bchwalletsend' }" class="px-3">
                    <button
                      class="bg-gray-700 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline">
                      Withdraw
                    </button>
                  </router-link>


                  <router-link :to="{ name: 'bchwalletrecieve' }" class="px-3">
                    <button
                      class="bg-gray-700 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline">
                      Deposit
                    </button>
                  </router-link>


                  <router-link :to="{ name: 'btcwallet' }" class="px-3">
                    <button
                      class="bg-gray-700 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline">
                      Transactions
                    </button>
                  </router-link>
                </div>
              </td>
            </tr>
            <tr class="bg-white dark:bg-gray-800">
              <th scope="row" class="py-4 px-6  text-gray-900 whitespace-nowrap dark:text-white">
                <div class="flex gap-3">
                <img class="object-contain" src="../../assets/coin/xmr/xmr_small.png" alt="No Image Found .." />   Monero
                </div>
              </th>
              <td class="py-4 px-6">
                ${{ xmrprice }}
              </td>
              <td class="py-4 px-6">
                {{ xmrbalance }}
              </td>
              <td class="py-4 px-6">
                <div class="flex-1 ">
                  <router-link :to="{ name: 'xmrwalletsend' }" class="px-3">
                    <button
                      class="bg-gray-700 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline">
                      Withdraw
                    </button>
                  </router-link>


                  <router-link :to="{ name: 'xmrwalletrecieve' }" class="px-3">
                    <button
                      class="bg-gray-700 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline">
                      Deposit
                    </button>
                  </router-link>


                  <router-link :to="{ name: 'xmrwallet' }" class="px-3">
                    <button
                      class="bg-gray-700 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline">
                      Transactions
                    </button>
                  </router-link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- END container-->
  <MainFooter />


</template>
<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import MainHeaderTop from "../../layouts/headers/MainHeaderTop.vue";
import MainHeaderMid from "../../layouts/headers/MainHeaderMid.vue";
import MainHeaderBottom from "../../layouts/headers/MainHeaderBottom.vue";
import MainHeaderVendor from "../../layouts/headers/MainHeaderVendor.vue";
import MainFooter from "../../layouts/footers/FooterMain.vue";
import authHeader from "../../services/auth.header";

export default defineComponent({
  name: "Login",
  components: {
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainHeaderVendor,
    MainFooter,
  },

  data () {
    return {
      user: null,
      usercurrency: null,
      btcprice: "",
      xmrprice: "",
      bchprice: "",
      xmrbalance: 0,
      bchbalance: 0,
      btcbalance: 0,
      wallettotal: 0,
    };
  },
  mounted () {
    this.userstatus();

    this.getbtcprice();
    this.getbchprice();
    this.getxmrprice();

    this.getxmrbalance();
    this.getbchbalance();
    this.getbtcbalance();
  },
  methods: {
    userstatus () {
      axios({
        method: "get",
        url: "/auth/whoami",
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if ((response.status = 200)) {
            this.user = response.data.user;
            this.userinfo();
            this.getwallettotals();
          }
        })
        .catch(() => {
          this.$router.push({ name: "login" });

        });
    },

    userinfo () {
      axios({
        method: "get",
        url: "/info/country-currency",
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if ((response.status = 200)) {
            this.usercurrency = response.data.currency;
          }
        });
    },

    getwallettotals () {
      axios({
        method: "get",
        url: "/price/wallets/total/" + this.user.currency,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if (response.data) {
            this.wallettotal = response.data.coin;
          }
        });
    },

    getxmrprice () {
      axios({
        method: "get",
        url: "/xmr/price",
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if (response.data) {
            this.xmrprice = response.data.price_xmr;
          }
        });
    },

    getbchprice () {
      axios({
        method: "get",
        url: "/bch/price",
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if (response.data) {
            this.bchprice = response.data.bch_price;
          }
        });
    },

    getbtcprice () {
      axios({
        method: "get",
        url: "/btc/price",
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if (response.data) {
            this.btcprice = response.data.btc_price;
          }
        });
    },

    //  Get balances for dropdowns
    getxmrbalance () {
      axios({
        method: "get",
        url: "/xmr/balance",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.data) {
          this.xmrbalance = response.data.xmr_balance;
        }
      });
    },

    getbchbalance () {
      axios({
        method: "get",
        url: "/bch/balance",
        headers: authHeader(),
      })
        .then((response) => {
          if (response.data) {
            this.bchbalance = response.data.bch_balance;
          }
        });
    },

    getbtcbalance () {
      axios({
        method: "get",
        url: "/btc/balance",
        headers: authHeader(),
      })
        .then((response) => {
          if (response.data) {
            this.btcbalance = response.data.btc_balance;
          }
        });
    },
  },
});
</script>

<style type="ts" scoped>

</style>
