<template>
  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />
  <div class="container max-w-7xl mx-auto px-10 min-h-screen flex flex-col">
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

          <li>
            <router-link :to="{ name: 'wallet' }">
              <a class="text-blue-600 hover:text-blue-700">Wallet Home</a>
            </router-link>
          </li>
          <li>
            <span class="text-gray-500 mx-2">/</span>
          </li>
        </ol>
      </nav>
    </div>
    <div class="flex">
      <div class="flex-1 mb-5 text-[24px]">Bitcoin Transactions</div>
    </div>
    <div class="grid grid-cols-1">
      <div class="">
        *Transactions are processed in the order received and can take a bit of
        time to show depending on volume.
      </div>
    </div>
    <div class="grid grid-cols-1">
      <div class="">Confirmed at 6 Confirmations</div>
    </div>
    <div
      class="grid sm:grid-cols-1 md:grid-cols-5 justify-center mt-5 bg-grey-3"
    >
      <div class="flex-1">Green: Deposit</div>
      <div class="">Red: Withdrawl</div>
      <div class="">Blue: Recieved BTC</div>
      <div class="">Orange: Sent BTC</div>
      <div class="">White: Pending</div>
    </div>

    <div v-if="transactions" class="mx-20">
      <!--#1 = Wallet created -->
      <!--#2 = Withdrawl -->
      <!--#3 = Deposit -->
      <!--#4 = send coin to escrow -->
      <!--#5 = send coin to user -->
      <!--#6 = clearnet_webapp profit -->
      <!--#7 = sent coin to holdings -->
      <!--#8 = sent coin from holdings -->
      <div class="grid grid-cols-12 p-5">
        <div class="col-span-2">Time</div>
        <div class="col-span-6">Description</div>
        <div class="col-span-2">Amount</div>
        <div class="col-span-2">Balance</div>
      </div>

      <div v-for="t in transactions">
        <!-- Wallet Created -->
        <div
          v-if="t.category === 1"
          class="grid grid-cols-12 grid-rows-1 bordered rounded-md bg-gray-200 m-1 p-1"
          :key="t.id"
          :name="t.id"
        >
          <div class="col-span-2">{{ relativeDate(t.created) }}</div>
          <div class="col-span-6">Wallet Created</div>
          <div class="col-span-2">--</div>
          <div class="col-span-2">Balance: 0</div>
        </div>
        <!-- WithDrawl -->
        <div
          v-if="t.category === 2"
          class="grid grid-cols-12 grid-rows-3 bg-red-500 text-white bordered rounded-md m-1 p-1"
          :key="t.id"
          :name="t.id"
        >
          <div class="col-span-2 row-span-1">{{ relativeDate(t.created) }}</div>
          <div class="col-span-6 row-span-3">
            <div class="col-span-6 row-span-1">Withdrawl</div>
            <div class="col-span-6 row-span-1">Fee: {{ t.fee }}</div>
            <div class="col-span-6 row-span-1">TXID: {{ t.txid }}</div>
            <div class="col-span-6 row-span-1">Comment: {{ t.commentbtc }}</div>
          </div>
          <div class="col-span-2 row-span-1">-{{ t.amount }}</div>
          <div class="col-span-2 row-span-1">Balance: {{ t.balance }}</div>
        </div>

        <!--#3 = Deposit -->
        <div
          v-if="t.category === 3"
          class="grid grid-cols-12 grid-rows-3 bg-green-600 text-white bordered rounded-md m-1 p-1"
          :key="t.id"
          :name="t.id"
        >
          <div class="col-span-2 row-span-1">{{ relativeDate(t.created) }}</div>
          <div class="col-span-6 row-span-3">
            Deposit
            <div v-if="t.confirmations >= 6">
              <div class="col-span-6 row-span-1">Confirmed</div>
            </div>
            <div v-else>
              <div class="col-span-6 row-span-1">
                Unconfirmed: {{ t.confirmations }}
              </div>
            </div>
            <div class="col-span-6 row-span-1">TXID: {{ t.txid }}</div>
          </div>

          <div class="col-span-2 row-span-1">{{ t.amount }}</div>
          <div class="col-span-2 row-span-1">
            <div v-if="t.confirmed === 0">
              <div v-if="t.balance - t.amount === 0">0 + {{ t.amount }}</div>
              <div v-else>{{ t.balance - t.amount }} + {{ t.amount }}</div>
              <div v-else>{{ t.balance }}</div>
            </div>
          </div>
        </div>
        <!--#4 = send coin to escrow -->
        <div
          v-if="t.category === 4"
          class="grid grid-cols-12 grid-rows-2 bg-orange-500 bordered rounded-md m-1 p-1"
          :key="t.id"
          :name="t.id"
        >
          <div class="col-span-2 row-span-1">{{ relativeDate(t.created) }}</div>
          <div class="col-span-6 row-span-1">
            <div class="col-span-6 row-span-2">Transaction</div>
            <div v-if="t.orderid">
              <router-link
                class="linkcolor_shopping"
                :to="{ name: 'item', params: { id: t.orderid } }"
                >Transaction Order # {{ t.orderid }}</router-link
              >
            </div>
          </div>
          <div class="col-span-2 row-span-1">-{{ t.amount }}</div>
          <div class="col-span-2 row-span-1">{{ t.balance }}</div>
        </div>
        <!--#5 = sent coin to user -->
        <div
          v-if="t.category === 5"
          class="grid grid-cols-12 grid-rows-2 bg-orange-500 bordered rounded-md m-1 p-1"
          :key="t.id"
          :name="t.id"
        >
          <div class="col-span-2 row-span-1">{{ relativeDate(t.created) }}</div>
          <div class="col-span-6 row-span-2">
            Transaction
            <div v-if="t.orderid">
              <router-link
                class="linkcolor_shopping"
                :to="{ name: 'item', params: { id: t.orderid } }"
                >Transaction Order # {{ t.orderid }}</router-link
              >
            </div>
          </div>
          <div class="col-span-2 row-span-1">{{ t.amount }}</div>
          <div class="col-span-2 row-span-1">{{ t.balance }}</div>
        </div>
        <!--#6 = clearnet_webapp profit -->
        <div
          v-if="t.category === 6"
          class="grid grid-cols-12 grid-rows-2 bg-blue-500 bordered rounded-md m-1 p-1"
          :key="t.id"
          :name="t.id"
        >
          <div class="col-span-2 row-span-1">{{ relativeDate(t.created) }}</div>
          <div class="col-span-6 row-span-2">
            Transaction
            <div v-if="t.orderid">
              <router-link
                class="linkcolor_shopping"
                :to="{ name: 'item', params: { id: t.orderid } }"
                >Transaction Order # {{ t.orderid }}</router-link
              >
            </div>
          </div>
          <div class="col-span-2 row-span-1">{{ t.amount }}</div>
          <div class="col-span-2 row-span-1">{{ t.balance }}</div>
        </div>
        <!--#7 = sent coin to holdings -->
        <div
          v-if="t.category === 7"
          class="grid grid-cols-4 grid-rows-2 bg-blue-500 bordered rounded-md m-1 p-1"
          :key="t.id"
          :name="t.id"
        >
          <div class="col-span-2 row-span-1">{{ relativeDate(t.created) }}</div>
          <div class="col-span-6 row-span-2">
            Transaction
            <div v-if="t.orderid">
              <router-link
                class="linkcolor_shopping"
                :to="{ name: 'item', params: { id: t.orderid } }"
                >Transaction Order # {{ t.orderid }}</router-link
              >
            </div>
          </div>
          <div class="col-span-2 row-span-1">{{ t.amount }}</div>
          <div class="col-span-2 row-span-1">{{ t.balance }}</div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="pt-5 text-center">
        You have no transactions at this time ....
      </div>
    </div>
  </div>

  <MainFooter />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { ref } from "vue";
import { mapGetters } from "vuex";
import { formatDistance } from "date-fns";

import MainHeaderTop from "../../../layouts/headers/MainHeaderTop.vue";
import MainHeaderMid from "../../../layouts/headers/MainHeaderMid.vue";
import MainHeaderBottom from "../../../layouts/headers/MainHeaderBottom.vue";
import MainHeaderVendor from "../../../layouts/headers/MainHeaderVendor.vue";
import MainFooter from "../../../layouts/footers/FooterMain.vue";
import authHeader from "../../../services/auth.header.ts";

export default defineComponent({
  name: "btctransactions",
  components: {
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainHeaderVendor,
    MainFooter,
  },
  mounted() {
    this.userstatus();
  },
  data() {
    return {
      transactions: [],
      date: Date.now(),
      tab: [],
    };
  },

  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    async userstatus() {
      await axios({
        method: "get",
        url: "/auth/whoami",
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if ((response.status = 200)) {
            this.btctransactions();
          }
        })
        .catch((error) => {
          this.$router.push("/login");
        });
    },

    async btctransactions() {
      await axios({
        method: "get",
        url: "/btc/transactions",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if ((response.status = 200)) {
          if (response.data.length > 1) {
            this.transactions = response.data;
          }
        }
      });
    },
    relativeDate(value) {
      let d = value;
      let e = new Date(d).valueOf();
      return formatDistance(e, new Date());
    },
  },
});
</script>

<style type="ts" scoped>

</style>
