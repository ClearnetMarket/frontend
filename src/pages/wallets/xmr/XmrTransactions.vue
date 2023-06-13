
<template>
  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />
  <div class="wrapper">
    <div v-if="user">
      <div class="container max-w-7xl mx-auto text-white">
        <!-- Container-->

        <nav class="rounded-md w-full px-5 py-5">
          <ol class="list-reset flex">
            <li>
              <router-link :to="{ name: 'home' }">
                <a class="text-primary hover:text-primary ">Home</a>
              </router-link>
            </li>
            <li>
              <span class="text-gray-500 mx-2">/</span>
            </li>

            <li>
              <router-link :to="{ name: 'wallet' }">
                <a class="text-primary hover:text-primary ">Wallet Home</a>
              </router-link>
            </li>
            <li>
              <span class="text-gray-500 mx-2">/</span>
            </li>
          </ol>
        </nav>

        <div class="px-5">
          <div class="px-5">
            <div class="grid grid-cols-1 pt-5 ">
              <div class="col-span-1 mb-5 text-[24px] text-center">Monero Transactions</div>
            </div>
            <div class="grid grid-cols-1 px-5">
              <div class="text-white text-[11px]">
                *Transactions are processed in the order received and can take a bit of
                time to show depending on volume.
              </div>
            </div>
            <div class="grid grid-cols-1 text-white text-[11px] px-5">
              <div class="">Confirmed at 6 Confirmations</div>
            </div>
          </div>
        </div>
        <div v-if="transactions" class=" px-5">
          <!--#1 = Wallet created -->
          <!--#2 = Withdrawl -->
          <!--#3 = Deposit -->
          <!--#4 = send coin to escrow -->
          <!--#5 = send coin to user -->
          <!--#6 = Freeport profit -->
          <!--#7 = sent coin to holdings -->
          <!--#8 = sent coin from holdings -->
          <!--#9 = vendor rejected order -->
          <div class="sm:grid grid-cols-12 p-5 hidden ">
            <div class="col-span-2">Time</div>
            <div class="col-span-6">Description</div>
            <div class="col-span-2">Amount</div>
            <div class="col-span-2">Balance</div>
          </div>

          <div v-for="t in transactions" class="text-white font-semibold text-[14px] bg-neutral rounded-md">

            <!-- Wallet Created -->
            <div v-if="t.category === 1" class="grid grid-cols-12 grid-rows-1 border-b rounded-md m-1 p-1 my-5"
              :key="t.id">
              <div class="col-span-12 sm:col-span-2">{{ relativeDate(t.created) }}</div>
              <div class="col-span-12 sm:col-span-6">Wallet Created</div>
              <div class="col-span-12 sm:col-span-2">--</div>
              <div class="col-span-12 sm:col-span-2">Balance: 0</div>
            </div>

            <!-- WithDrawl -->
            <div v-if="t.category === 2" class="grid grid-cols-12 grid-rows-3  border-b rounded-md m-1 p-1 my-5"
              :key="t.id">
              <div class="col-span-12 sm:col-span-2 row-span-1">{{ relativeDate(t.created) }}</div>
              <div class="col-span-12 sm:col-span-6 row-span-3">
                <div class="col-span-12 sm:col-span-6 row-span-1">Withdrawl</div>
                <div class="col-span-12 sm:col-span-6 row-span-1">Fee: {{ t.fee }}</div>
                <div class="col-span-12 sm:col-span-6 row-span-1">TXID: {{ t.txid }}</div>
                <div class="col-span-12 sm:col-span-6 row-span-1">Comment: {{ t.commentxmr }}</div>
              </div>
              <div class="col-span-6 sm:col-span-2 row-span-1 text-red-600">-{{ t.amount }}</div>
              <div class="col-span-6 sm:col-span-2 row-span-1">Balance: {{ t.balance }}</div>
            </div>

            <!--#3 = Deposit -->
            <div v-if="t.category === 3"
              class="grid grid-cols-12 grid-rows-3  text-white border-b rounded-md m-1 p-1 my-5" :key="t.id">
              <div class="col-span-12 sm:col-span-2 row-span-1">{{ relativeDate(t.created) }}</div>
              <div class="col-span-12 sm:col-span-6 row-span-3">
                Deposit
                <div v-if="t.confirmations >= 6">
                  <div class="col-span-12 sm:col-span-6 row-span-1">Confirmed</div>
                </div>
                <div v-else>
                  <div class="col-span-12 sm:col-span-6 row-span-1">
                    Unconfirmed: {{ t.confirmations }}
                  </div>
                </div>
                <div class="col-span-12 sm:col-span-6 row-span-1">TXID: {{ t.txid }}</div>
              </div>

              <div class="col-span-6 sm:col-span-2 row-span-1 text-green-600">{{ t.amount }}</div>
              <div class="col-span-6 sm:col-span-2 row-span-1 ">
                <div v-if="t.confirmed === 0">Balance:
                  <div v-if="t.balance - t.amount === 0">0 + {{ t.amount }}</div>
                  <div v-else>{{ t.balance - t.amount }} + {{ t.amount }}</div>
                  <div v-else>{{ t.balance }}</div>
                </div>
              </div>
            </div>

            <!--#4 = send coin to escrow -->
            <div v-if="t.category === 4" class="grid grid-cols-12 grid-rows-2  border-b rounded-md m-1 p-1 my-5"
              :key="t.id">
              <div class="col-span-12 sm:col-span-2 row-span-1">{{ relativeDate(t.created) }}</div>
              <div class="col-span-12 sm:col-span-6 row-span-1">
                <div class="col-span-12 sm:col-span-6 row-span-2"></div>
                <div v-if="t.orderid">
                  <router-link class="linkcolor_shopping hover:text-primary hover:underline"
                    :to="{ name: 'vendorordersview', params: { uuid: t.order_uuid } }">Transaction Order # {{
                      t.orderid
                    }}</router-link>
                </div>
              </div>
              <div class="col-span-6 sm:col-span-2 row-span-1 text-red-600">Amount: -{{ t.amount }}</div>
              <div class="col-span-6 sm:col-span-2 row-span-1 ">Balance: {{ t.balance }}</div>
            </div>

            <!--#5 = sent coin to user -->
            <div v-if="t.category === 5" class="grid grid-cols-12 grid-rows-2 border-b rounded-md m-1 p-1 my-5"
              :key="t.id">
              <div class="col-span-12 sm:col-span-2 row-span-1">{{ relativeDate(t.created) }}</div>
              <div class="col-span-12 sm:col-span-6 row-span-2">
                <div v-if="t.orderid">
                  <router-link class="linkcolor_shopping"
                    :to="{ name: 'vendorordersview', params: { uuid: t.order_uuid } }">Transaction Order # {{
                      t.orderid
                    }}</router-link>
                </div>
              </div>
              <div class="col-span-6 sm:col-span-2 row-span-1 text-green-600">Amount: {{ t.amount }}</div>
              <div class="col-span-6 sm:col-span-2 row-span-1 ">Balance: {{ t.balance }}</div>
            </div>

            <!--#6 = Freeport profit -->
            <div v-if="t.category === 6" class="grid grid-cols-12 grid-rows-2 border-b rounded-md m-1 p-1 my-5"
              :key="t.id">
              <div class="col-span-12 sm:col-span-2 row-span-1">{{ relativeDate(t.created) }}</div>
              <div class="col-span-12 sm:col-span-6 row-span-2">
                <div v-if="t.orderid">
                  <router-link class="linkcolor_shopping"
                    :to="{ name: 'vendorordersview', params: { uuid: t.order_uuid } }">Transaction Order # {{
                      t.orderid
                    }}</router-link>
                </div>
              </div>
              <div class="col-span-6 sm:col-span-2 row-span-1 text-green-600">Amount: {{ t.amount }}</div>
              <div class="col-span-6 sm:col-span-2 row-span-1 ">Balance: {{ t.balance }}</div>
            </div>

            <!--#7 = sent coin to holdings -->
            <div v-if="t.category === 7" class="grid grid-cols-4 grid-rows-2  border-b rounded-md m-1 p-1 my-5"
              :key="t.id">
              <div class="col-span-12 sm:col-span-2 row-span-1">{{ relativeDate(t.created) }}</div>
              <div class="col-span-12 sm:col-span-6 row-span-2">

                <div v-if="t.orderid">
                  <router-link class="linkcolor_shopping"
                    :to="{ name: 'vendorordersview', params: { uuid: t.order_uuid } }">Transaction Order # {{
                      t.orderid
                    }}</router-link>
                </div>
              </div>
              <div class="col-span-12 sm:col-span-2 row-span-1 text-green-600">{{ t.amount }}</div>
              <div class="col-span-12 sm:col-span-2 row-span-1 ">{{ t.balance }}</div>
            </div>

            <div v-if="t.category === 8" class="grid grid-cols-12 grid-rows-2  border-b rounded-md m-1 p-1 my-5"
              :key="t.id">
              <div class="col-span-12 sm:col-span-2 row-span-1">{{ relativeDate(t.created) }}</div>
              <div class="col-span-12 sm:col-span-6 row-span-2">

                <div v-if="t.orderid">
                  <router-link class="linkcolor_shopping"
                    :to="{ name: 'vendorordersview', params: { uuid: t.order_uuid } }">Transaction Order # {{
                      t.orderid
                    }}</router-link>
                </div>
              </div>
              <div class="col-span-12 sm:col-span-2 row-span-1 text-green-600">{{ t.amount }}</div>
              <div class="col-span-12 sm:col-span-2 row-span-1 ">{{ t.balance }}</div>
            </div>

            <div v-if="t.category === 9" class="grid grid-cols-12 grid-rows-2  border-b m-1 p-1 my-5" :key="t.id">
              <div class="col-span-12 sm:col-span-2 row-span-1">{{ relativeDate(t.created) }}</div>
              <div class="col-span-12 sm:col-span-6 row-span-2">
                Refund from Escrow
                <div v-if="t.orderid">
                  <router-link class="linkcolor_shopping"
                    :to="{ name: 'vendorordersview', params: { uuid: t.order_uuid } }">Transaction Order # {{
                      t.orderid
                    }}</router-link>
                </div>
              </div>
              <div class="col-span-12 sm:col-span-2 row-span-1 text-green-600">{{ t.amount }}</div>
              <div class="col-span-12 sm:col-span-2 row-span-1 ">{{ t.balance }}</div>
            </div>
          </div>

          <div class="col-span-12 mb-20" v-if="recordsLength > 0">
            <pagination @paginate="getPage" :records="recordsLength" v-model="page" :per-page="perPage"
              :options="options"> </pagination>
            <div class="flex justify-center"> {{ recordsLength }} Transactions Found</div>
          </div>
          <div class="col-span-12 mb-20 flex justify-center" v-else>{{ recordsLength }} Transactions</div>

        </div>
        <div v-else>
          <div class="pt-5 text-center">
            You have no transactions at this time ....
          </div>
        </div>
      </div>
    </div>
  </div>
  <MainFooter />
</template>

<script lang="ts">
import { defineComponent } from "vue"
import axios from "axios"
import { formatDistance } from "date-fns"
import MainHeaderTop from "../../../layouts/headers/MainHeaderTop.vue"
import MainHeaderMid from "../../../layouts/headers/MainHeaderMid.vue"
import MainHeaderBottom from "../../../layouts/headers/MainHeaderBottom.vue"
import MainHeaderVendor from "../../../layouts/headers/MainHeaderVendor.vue"
import MainFooter from "../../../layouts/footers/FooterMain.vue"
import authHeader from "../../../services/auth.header.js"
import PaginationComp from '../../../components/MyPagination.vue'


export default defineComponent({
  name: "xmrtransactions",
  components: {
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainHeaderVendor,
    MainFooter,
  },
  created () {
    this.userstatus();

  },
  data () {
    return {
      transactions: [],
      date: Date.now(),
      tab: [],
      user: null,
      page: 1,
      perPage: 50,
      recordsLength: 0,
      options: {
        edgeNavigation: false,
        format: false,
        template: PaginationComp
      }
    };
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
          if (response.data.login == true) { this.user = response.data.user }
          else { this.$router.push("/login") }
        })
        .catch(() => {
          this.$router.push("/login")
        })
    },

    getPage: function (page: any) {
      // we simulate an api call that fetch the records from a backend
      this.transactions = [];
      const startIndex = this.perPage * (page - 1) + 1;
      const endIndex = startIndex + this.perPage - 1;
      this.transactionsxmr(page)
    },
    transactionsxmr (page: any) {
      axios({
        method: 'get',
        url: "/xmr/transactions",
        headers: authHeader(),
      }).then((response) => { this.transactions = response.data; })
    },
    transactions_xmr_count () {
      axios({
        method: 'get',
        url: "/xmr/transactions/count",
        headers: authHeader(),
      }).then((response) => { this.recordsLength = response.data.count })
    },

    relativeDate (value: any) {
      let e = new Date(value).valueOf();
      return formatDistance(e, new Date());
    },
  },
});
</script>

<style type="ts" scoped></style>
