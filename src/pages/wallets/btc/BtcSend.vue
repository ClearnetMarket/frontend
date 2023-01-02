
<template>
    <div class="h-screen">
  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />

  <div class="container  max-w-7xl mx-auto px-10 pb-60 bg-gray-100"><!-- Container-->
   
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
    <div class="flex text-[22px] ">Send Bitcoin</div>
    <div class="flex gap-4">


      <div class="flex-1 bg-white rounded-md justify-center mt-20 p-5">
        <form method="post" @submit="onSubmit">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Address</label>
            <label class="block text-gray-700 mb-2 text-[11px]" for="username">Address of the wallet you are sending
              coin too.</label>
            <input v-model="wallet.btc_address"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username" type="text" placeholder="Address" />
            <span v-if="v$.wallet.btc_address.$error" class="text-red-600 text-center">
              {{ v$.wallet.btc_address.$errors[0].$message }}
            </span>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Transaction Description</label>
            <label class="block text-gray-700 mb-2 text-[11px]" for="username">This is the name other users will see you
              as. It would be the name
              of your store.</label>
            <input v-model="wallet.btc_decscription"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username" type="text" placeholder="Description" />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Amount</label>

            <div class="flex flex-row">
              <input v-model="wallet.btc_amount"
                class="basis-1/3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="amount" type="text" autocomplete="off" placeholder="Amount" />
              <span v-if="v$.wallet.btc_amount.$error" class="text-red-600 text-center">
                {{ v$.wallet.btc_amount.$errors[0].$message }}
              </span>
            </div>
          </div>
         
          <div class="flex items-center justify-center mb-6">
            <button
              class="bg-blue-600 hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit">
              Send Coin
            </button>
          </div>
        </form>
      </div>
      <div class=" flex-1 f mt-20 w-full">
        <div class="font-semibold">Bitcoin Balances (BTC)</div>
        <div class="flex justify-between   border-b-gray-700 border-b-2">
          <div class="grow-0">Total </div>
          <div class="grow"> </div>
          <div class="grow-0"> {{ btcbalance }}</div>
        </div>

      </div>
    </div>
  </div>
</div>
  <MainFooter />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { notify } from "@kyvg/vue3-notification";
import { mapGetters } from "vuex";
import MainHeaderTop from "../../../layouts/headers/MainHeaderTop.vue";
import MainHeaderMid from "../../../layouts/headers/MainHeaderMid.vue";
import MainHeaderBottom from "../../../layouts/headers/MainHeaderBottom.vue";
import MainHeaderVendor from "../../../layouts/headers/MainHeaderVendor.vue";
import MainFooter from "../../../layouts/footers/FooterMain.vue";
import authHeader from "../../../services/auth.header";
import useValidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

export default defineComponent({
  name: "btcsend",
  components: {
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainHeaderVendor,
    MainFooter,
  },
  mounted () {
    this.userstatus();
    this.getbtcbalance();
  },
  data () {
    return {
      v$: useValidate(),
      btcbalance: 0,
      wallet: {
        btc_address: null,
        btc_decscription: "",
        btc_amount: 0,
      
      },
    };
  },
  validations () {
    return {
      wallet: {
        btc_address: { required, minLength: minLength(25) },
        btc_amount: { required, minLength: minLength(1) },
      
      },
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
          if ((response.status = 200)) {
          }
        })
        .catch((error) => {
       
          this.$router.push("/login");
        });
    },
    getbtcbalance () {
      axios({
        method: "get",
        url: "/btc/balance",
        headers: authHeader(),
      }).then((response) => {
        if (response.data) {
          this.btcbalance = response.data.btc_balance;
        }
      });
    },
    SendCoin (payLoad: any) {
      axios({
        method: "post",
        url: "/btc/send",
        data: payLoad,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if ((response.status = 200)) {
            const message_sent =
              "Success! Sent " +
              this.wallet.btc_amount +
              " to " +
              this.wallet.btc_address;
            notify({
              title: "Freeport",
              text: message_sent,
              type: "success",
            });
            this.$router.push("/vendor/itemsforsale");
          }
        })
        .catch((error) => {
         
          notify({
            title: "Freeport Error",
            text: "Error With Sending Money",
            type: "error",
          });
        });
    },
    onSubmit () {
      const payLoad = {
        btc_address: this.wallet.btc_address,
        btc_decscription: this.wallet.btc_decscription,
        btc_amount: this.wallet.btc_amount,
       
      };
      this.v$.$validate(); // checks all inputs
      if (this.v$.$invalid) {
        notify({
          title: "Authorization",
          text: "Form Failure",
          type: "error",
        });
      } else {
        notify({
          title: "Wallet",
          text: "Success Sending Coin. It will be sent shortly.",
          type: "success",
        });
        this.SendCoin(payLoad);
      }
    },
  },
});
</script>

<style type="ts" scoped>

</style>
