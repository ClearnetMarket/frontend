<template>
  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />

  <div v-if="user">
    <MainHeaderVendor />
  </div>
  <!-- Top Stuff-->
  <div class="container h-screen max-w-7xl mx-auto px-10">
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

    <div class="grid grid-cols-4 mt-14">
      <div class="sm:col-span-4 md:col-span-1">
        <div class="text-[20px] text-gray-700 mb-10">Account Balances</div>
        <div class="text-[20px] text-gray-700 mt-7">100.00$</div>

        <div class="text-[20px] text-orange-400 mt-7">Bitcoin</div>
        <div class="text-[14px] text-gray-700">
        <div v-if="btcbalance == 0.00000000">0.00000000</div>
           <div v-else>{{btcbalance}}</div>
        
        </div>
        <div class="text-[20px] text-green-600 mt-7">Bitcoin Cash</div>
        <div class="text-[14px] text-gray-700">
             <div v-if="bchbalance == 0.00000000">0.00000000</div>
           <div v-else>{{bchbalance}}</div>
        </div>
        <div class="text-[20px] text-orange-600 mt-7">Monero</div>
        <div class="text-[14px] text-gray-700">
             <div v-if="xmrbalance == 0.00000000">0.00000000</div>
           <div v-else>{{xmrbalance}}</div>
        </div>
      </div>
      <div
        class="sm:col-span-4 md:col-span-3 border border-1 bg-gray-100 rounded-md p-5"
      >
        <div class="text-[20px] mb-10 text-center">Coins</div>
        <div class="flex mb-8">
          <div class="flex-1">
            <div>Bitcoin</div>
            <button
              style="cursor: default"
              class="bg-orange-400 text-white font-bold py-1 px-8 rounded"
            >
              <div>${{ btcprice }}</div>
            </button>
          </div>
          <div class="flex-1 pt-6">
            <router-link :to="{ name: 'btcwalletsend' }" class="px-3">
              <button
                class="bg-gray-700 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
              >
                Send
              </button>
            </router-link>
          </div>
          <div class="flex-1 pt-6">
            <router-link :to="{ name: 'btcwalletrecieve' }" class="px-3">
              <button
                class="bg-gray-700 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
              >
                Recieve
              </button>
            </router-link>
          </div>
          <div class="flex-1 pt-6">
            <router-link :to="{ name: 'btcwallet' }" class="px-3">
              <button
                class="bg-gray-700 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
              >
                Transactions
              </button>
            </router-link>
          </div>
        </div>

        <div class="flex mb-8">
          <div class="flex-1">
            <div class="">Bitcoin Cash</div>
            <button
              style="cursor: default"
              class="bg-green-600 text-white font-bold py-1 px-8 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              <div>${{ bchprice }}</div>
            </button>
          </div>
          <div class="flex-1 pt-6">
            <router-link :to="{ name: 'bchwalletsend' }" class="px-3">
              <button
                class="bg-gray-700 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
              >
                Send
              </button>
            </router-link>
          </div>
          <div class="flex-1 pt-6">
            <router-link :to="{ name: 'bchwalletrecieve' }" class="px-3">
              <button
                class="bg-gray-700 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
              >
                Recieve
              </button>
            </router-link>
          </div>
          <div class="flex-1 pt-6">
            <router-link :to="{ name: 'bchwallet' }" class="px-3">
              <button
                class="bg-gray-700 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
              >
                Transactions
              </button>
            </router-link>
          </div>
        </div>

        <div class="flex mb-8">
          <div class="flex-1">
            <div class="">Monero</div>
            <button
              style="cursor: default"
              class="bg-orange-600 text-white font-bold py-1 px-8 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              <div>${{ xmrprice }}</div>
            </button>
          </div>
          <div class="flex-1 pt-6">
            <router-link :to="{ name: 'xmrwalletsend' }" class="px-3">
              <button
                class="bg-gray-700 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
              >
                Send
              </button>
            </router-link>
          </div>
          <div class="flex-1 pt-6">
            <router-link :to="{ name: 'xmrwalletrecieve' }" class="px-3">
              <button
                class="bg-gray-700 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
              >
                Recieve
              </button>
            </router-link>
          </div>
          <div class="flex-1 pt-6">
            <router-link :to="{ name: 'xmrwallet' }" class="px-3">
              <button
                class="bg-gray-700 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
              >
                Transactions
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- END Top Stuff-->
  </div>
  <!-- END container-->
  <MainFooter />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { ref } from "vue";
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

  data() {
    return {
      user:'',
      btcprice: '',
      xmrprice: '',
      bchprice: '',

      xmrbalance: '',
      bchbalance: '',
      btcbalance: '',
    };
  },
  mounted() {
    this.getbtcprice();
    this.getbchprice();
    this.getxmrprice();

    this.getxmrbalance();
    this.getbchbalance();
    this.getbtcbalance();

  },
  methods: {
    async userstatus() {
      await axios({
        method: "get",
        url: "/auth/whoami",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if ((response.status = 200)) {
          this.user = response.data.user;
         
        }
      });
    },

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


  //  Get balances for dropdowns
  async getxmrbalance() {
    await axios({
      method: "get",
      url: "/xmr/balance",
      headers: authHeader(),
    }).then((response) => {
      if (response.data) {
        this.xmrbalance = response.data.xmr_balance;
      }
    });
  },

  async getbchbalance() {
    await axios({
      method: "get",
      url: "/bch/balance",
      headers: authHeader(),
    }).then((response) => {
      if (response.data) {
        this.bchbalance = response.data.bch_balance;
      }
    });
  },
  async getbtcbalance() {
    await axios({
      method: "get",
      url: "/btc/balance",
      headers: authHeader(),
    }).then((response) => {
      if (response.data) {
        this.btcbalance = response.data.btc_balance;
      
      }
    });
  },
    },
});
</script>

<style type="ts" scoped></style>
