
<template>
   
  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />
  <div class="container max-w-7xl mx-auto px-10 wrapper">
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

    <div v-if="transactions" class="mx-20 pb-20">
      <!--#1 = Wallet created -->
      <!--#2 = Withdrawl -->
      <!--#3 = Deposit -->
      <!--#4 = send coin to escrow -->
      <!--#5 = send coin to user -->
      <!--#6 = Freeport profit -->
      <!--#7 = sent coin to holdings -->
      <!--#8 = sent coin from holdings -->
      <div class="grid grid-cols-12 p-5">
        <div class="col-span-2">Time</div>
        <div class="col-span-6">Description</div>
        <div class="col-span-2">Amount</div>
        <div class="col-span-2">Balance</div>
      </div>

      <div v-for="t in transactions" class="text-gray-700 font-semibold text-[14px]">
        <!-- Wallet Created -->

        <div
          v-if="t.category === 1"
          class="grid grid-cols-12 grid-rows-1 border-b  rounded-md  m-1 p-1"
          :key="t.id"

        >
          <div class="col-span-2">{{ relativeDate(t.created) }}</div>
          <div class="col-span-6">Wallet Created</div>
          <div class="col-span-2">--</div>
          <div class="col-span-2">Balance: 0</div>
        </div>
        <!-- WithDrawl -->
        <div
          v-if="t.category === 2"
          class="grid grid-cols-12 grid-rows-3  border-b rounded-md m-1 p-1"
          :key="t.id"

        >
          <div class="col-span-2 row-span-1">{{ relativeDate(t.created) }}</div>
          <div class="col-span-6 row-span-3">
            <div class="col-span-6 row-span-1">Withdrawl</div>
            <div class="col-span-6 row-span-1">Fee: {{ t.fee }}</div>
            <div class="col-span-6 row-span-1">TXID: {{ t.txid }}</div>
            <div class="col-span-6 row-span-1">Comment: {{ t.commentbch }}</div>
          </div>
          <div class="col-span-2 row-span-1 text-red-600">-{{ t.amount }}</div>
          <div class="col-span-2 row-span-1 ">Balance: {{ t.balance }}</div>
        </div>

        <!--#3 = Deposit -->
        <div
          v-if="t.category === 3"
          class="grid grid-cols-12 grid-rows-3 border-b rounded-md m-1 p-1"
          :key="t.id"

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

          <div class="col-span-2 row-span-1 text-green-600">{{ t.amount }}</div>
          <div class="col-span-2 row-span-1 ">
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
          class="grid grid-cols-12 grid-rows-2 border-b m-1 p-1"
          :key="t.id"

        >
          <div class="col-span-2 row-span-1">{{ relativeDate(t.created) }}</div>
          <div class="col-span-6 row-span-1">
            <div class="col-span-6 row-span-2">Transaction</div>
            <div v-if="t.order_uuid">
              <router-link
                        class=" hover:text-blue-400 text-blue-600 hover:underline"
                :to="{ name: 'vendorordersview', params: { uuid: t.order_uuid } }"
                >Transaction Order #{{ t.order_uuid }}</router-link
              >
            </div>
          </div>
          <div class="col-span-2 row-span-1 text-red-600 ">-{{ t.amount }}</div>
          <div class="col-span-2 row-span-1 ">{{ t.balance }}</div>
        </div>
        <!--#5 = sent coin to user -->
        <div
          v-if="t.category === 5"
          class="grid grid-cols-12 grid-rows-2 border-b m-1 p-1"
          :key="t.id"

        >
          <div class="col-span-2 row-span-1">{{ relativeDate(t.created) }}</div>
          <div class="col-span-6 row-span-2">
            Transaction
            <div v-if="t.order_uuid">
              <router-link
                       class=" hover:text-blue-400 text-blue-600 hover:underline"
                :to="{ name: 'vendorordersview', params: { uuid: t.order_uuid } }"
                >Transaction Order #{{ t.order_uuid }}</router-link
              >
            </div>
          </div>
          <div class="col-span-2 row-span-1 text-green-600 ">{{ t.amount }}</div>
          <div class="col-span-2 row-span-1 ">{{ t.balance }}</div>
        </div>
        <!--#6 = Freeport profit -->
        <div
          v-if="t.category === 6"
          class="grid grid-cols-12 grid-rows-2 border-b rounded-md m-1 p-1"
          :key="t.id"

        >
          <div class="col-span-2 row-span-1">{{ relativeDate(t.created) }}</div>
          <div class="col-span-6 row-span-2">
            Transaction
            <div v-if="t.order_uuid">
              <router-link
                         class=" hover:text-blue-400 text-blue-600 hover:underline"
                :to="{ name: 'vendorordersview', params: { uuid: t.order_uuid } }"
                >Transaction Order #{{ t.order_uuid }}</router-link
              >
            </div>
          </div>
          <div class="col-span-2 row-span-1 text-green-600">{{ t.amount }}</div>
          <div class="col-span-2 row-span-1 ">{{ t.balance }}</div>
        </div>
        <!--#7 = sent coin to holdings -->
        <div
          v-if="t.category === 7"
          class="grid grid-cols-4 grid-rows-2  rounded-md m-1 p-1"
          :key="t.id"

        >
          <div class="col-span-2 row-span-1">{{ relativeDate(t.created) }}</div>
          <div class="col-span-6 row-span-2">
            Transaction
            <div v-if="t.order_uuid">
              <router-link
                   class=" hover:text-blue-400 text-blue-600 hover:underline"
                :to="{ name: 'vendorordersview', params: { uuid: t.order_uuid } }"
                >Transaction Order #{{ t.order_uuid }}</router-link
              >
            </div>
          </div>
          <div class="col-span-2 row-span-1 text-green-600">{{ t.amount }}</div>
          <div class="col-span-2 row-span-1 ">{{ t.balance }}</div>
        </div>
                <div
          v-if="t.category === 8"
          class="grid grid-cols-12 grid-rows-2  bordered rounded-md m-1 p-1"
          :key="t.id"

        >
          <div class="col-span-2 row-span-1">{{ relativeDate(t.created) }}</div>
          <div class="col-span-6 row-span-2">
            Transaction
            <div v-if="t.order_uuid">
              <router-link
               class=" hover:text-blue-400 text-blue-600 hover:underline"
                :to="{ name: 'vendorordersview', params: { uuid: t.order_uuid } }"
                >Transaction Order #{{ t.order_uuid }}</router-link
              >
            </div>
          </div>
          <div class="col-span-2 row-span-1 text-green-600">{{ t.amount }}</div>
          <div class="col-span-2 row-span-1 ">{{ t.balance }}</div>
        </div>
        <div
          v-if="t.category === 9"
          class="grid grid-cols-12 grid-rows-2 bordered rounded-md m-1 p-1"
          :key="t.id"

        >
          <div class="col-span-2 row-span-1">{{ relativeDate(t.created) }}</div>
          <div class="col-span-6 row-span-2">
            Refund from Escrow
            <div v-if="t.order_uuid">
              <router-link
                 class=" hover:text-blue-400 text-blue-600 hover:underline"
                :to="{ name: 'vendorordersview', params: { uuid: t.order_uuid } }"
                >Transaction Order #{{ t.order_uuid }}</router-link
              >
            </div>
          </div>
          <div class="col-span-2 row-span-1 text-green-600">{{ t.amount }}</div>
          <div class="col-span-2 row-span-1 ">{{ t.balance }}</div>
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
import { mapGetters } from "vuex";
import { formatDistance } from "date-fns";
import MainHeaderTop from "../../../layouts/headers/MainHeaderTop.vue";
import MainHeaderMid from "../../../layouts/headers/MainHeaderMid.vue";
import MainHeaderBottom from "../../../layouts/headers/MainHeaderBottom.vue";
import MainHeaderVendor from "../../../layouts/headers/MainHeaderVendor.vue";
import MainFooter from "../../../layouts/footers/FooterMain.vue";
import authHeader from "../../../services/auth.header";

/**
 *
 @typedef {Object} t.amount
 @typedef {Object} t.commentbch

 *
 */

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


  methods: {
     userstatus() {
       axios({
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
          console.log(error)
          this.$router.push("/login");
        });
    },

     btctransactions() {
       axios({
        method: "get",
        url: "/btc/transactions",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if ((response.status = 200)) {
        
            this.transactions = response.data;
          }
 
      });
    },
    relativeDate(value: any) {
      let e = new Date(value).valueOf();
      return formatDistance(e, new Date());
    },
  },
});
</script>

<style type="ts" scoped></style>
