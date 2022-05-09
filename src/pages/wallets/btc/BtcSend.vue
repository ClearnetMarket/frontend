<template>
  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />

  <div class="max-w-7xl mx-auto flex mb-0 wrapper">
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

    <div class="flex mx-10 text-[22px]">Send Bitcoin</div>
    <div class="flex flex-row mx-10 justify-center mt-20">
      <form method="post" @submit="onSubmit">
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="username"
            >Address</label
          >
          <label class="block text-gray-700 mb-2 text-[11px]" for="username"
            >Address of the wallet you are sending coin too.</label
          >
          <input
            v-model="wallet.btc_address"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Address"
          />
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="username"
            >Transaction Description</label
          >
          <label class="block text-gray-700 mb-2 text-[11px]" for="username"
            >This is the name other users will see you as. It would be the name
            of your store.</label
          >
          <input
            v-model="wallet.btc_decscription"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Description"
          />
        </div>

        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
            >Amount</label
          >
          
          <div class="flex flex-row">
            <input
              v-model="wallet.btc_amount"
              class="basis-1/3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="amount"
              type="text"
              autocomplete="off"
              placeholder="Amount"
            />
          </div>
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password_confirm"
            >Wallet Pin</label
          >
          <div class="flex flex-row">
            <input
              v-model="wallet.pin"
              class="basis-1/3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="pin"
              type="password"
              autocomplete="off"
              placeholder="Pin"
            />
          </div>
        </div>
        <div class="flex items-center justify-center mb-6">
          <button
            class="bg-zinc-600 hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Send Coin
          </button>
        </div>
      </form>
    </div>
   </div>
  <MainFooter />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { ref } from "vue";
import { mapGetters } from "vuex";
import MainHeaderTop from "../../../layouts/headers/MainHeaderTop.vue";
import MainHeaderMid from "../../../layouts/headers/MainHeaderMid.vue";
import MainHeaderBottom from "../../../layouts/headers/MainHeaderBottom.vue";
import MainHeaderVendor from "../../../layouts/headers/MainHeaderVendor.vue";
import MainFooter from "../../../layouts/footers/FooterMain.vue";
import authHeader from "../../../services/auth.header.ts";

export default defineComponent({
  name: "btcsend",
  components: {
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainHeaderVendor,
    MainFooter,
  },
  mounted() {
    this.userstatus();
    this.getbtcbalance();
  },
  data() {
    return {
      dense: ref(true),
      wallet: {
        btc_address: "",
        btc_decscription: "",
        btc_amount: "",
        pin: "",
      },
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
          }
        })
        .catch((error) => {
          this.$router.push("/login");
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
    async SendCoin(payLoad: {
      btc_address: string;
      btc_decscription: string;
      btc_amount: string;
      pin: string;
    }) {
      await axios({
        method: "post",
        url: "/btc/send",
        data: payLoad,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if ((response.status = 200)) {
          const message_sent =
            "Success! Sent " +
            this.wallet.btc_amount +
            " to " +
            this.wallet.btc_address;
          this.$q.notify({
            type: "positive",
            message: message_sent,
            position: "top",
          });
          this.$router.push("/vendor/itemsforsale");
        }
      });
    },
    async onSubmit() {
      const payLoad = {
        btc_address: this.wallet.btc_address,
        btc_decscription: this.wallet.btc_decscription,
        btc_amount: this.wallet.btc_amount,
        pin: this.wallet.pin,
      };
      await this.SendCoin(payLoad);
    },
  },
});
</script>

<style type="ts" scoped></style>
