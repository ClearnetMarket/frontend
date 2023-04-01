
<template>
  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />
  <div class="wrapper">
    <div class="container  max-w-7xl mx-auto px-10 pb-60  text-white">

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
      <div class="flex text-[22px] invisible md:visible">Send Monero</div>

      <div class="flex text-[22px] justify-center visible md:invisible ">Send Monero</div>

      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 md:col-span-6">
          <div class=" flex-1 f mt-8 w-full">
            <div class="font-semibold">Monero Balances (XMR)</div>
            <div class="flex justify-between   border-b-gray-700 border-b-2">
              <div class="grow-0">Total </div>
              <div class="grow"> </div>
              <div class="grow-0"> {{ xmrbalance }}</div>
            </div>
          </div>
        </div>

        <div class="col-span-12 md:col-span-6">
          <div class="flex-1 bg-neutral rounded-md justify-center mt-8 p-5">
            <form method="post" @submit="onSubmit">
              <div class="mb-4">
                <label class="block text-white text-sm font-bold mb-2" for="username">Address</label>
                <label class="block text-white mb-2 text-[11px]" for="username">Address of the wallet you are sending
                  coin too.</label>
                <input v-model="wallet.xmr_address"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                  id="username" type="text" placeholder="Address" />
                <span v-if="v$.wallet.xmr_address.$error" class="text-red-600 text-center">
                  {{ v$.wallet.xmr_address.$errors[0].$message }}
                </span>
              </div>
              <div class="mb-4">
                <label class="block text-white text-sm font-bold mb-2" for="username">Transaction Description</label>
                <label class="block text-white mb-2 text-[11px]" for="username">This is the name other users will see
                  you as. It would be the name
                  of your store.</label>
                <input v-model="wallet.xmr_description"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                  id="username" type="text" placeholder="Description" />
              </div>

              <div class="mb-4">
                <label class="block text-white text-sm font-bold mb-2" for="password">Amount</label>

                <div class="flex flex-row">
                  <input v-model="wallet.xmr_amount"
                    class="basis-1/3 shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                    id="amount" type="text" autocomplete="off" placeholder="Amount" />
                  <span v-if="v$.wallet.xmr_amount.$error" class="text-red-600 text-center">
                    {{ v$.wallet.xmr_amount.$errors[0].$message }}
                  </span>
                </div>
              </div>

              <div class="flex items-center justify-center mb-6">
                <button
                  class="bg-zinc-600 hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit">
                  Send Coin
                </button>
              </div>
            </form>
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
import useValidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import MainHeaderTop from "../../../layouts/headers/MainHeaderTop.vue";
import MainHeaderMid from "../../../layouts/headers/MainHeaderMid.vue";
import MainHeaderBottom from "../../../layouts/headers/MainHeaderBottom.vue";
import MainHeaderVendor from "../../../layouts/headers/MainHeaderVendor.vue";
import MainFooter from "../../../layouts/footers/FooterMain.vue";
import authHeader from "../../../services/auth.header.js";



export default defineComponent({
  name: "xmrsell",
  components: {
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainHeaderVendor,
    MainFooter,
  },

  mounted () {
    this.userstatus();
    this.getxmrbalance();
  },
  data () {
    return {
      v$: useValidate(),
      xmrbalance: 0,
      user: null,
      wallet: {
        xmr_address: "",
        xmr_description: "",
        xmr_amount: "",

      },
    };
  },
  validations () {
    return {
      wallet: {
        xmr_address: { required, minLength: minLength(25) },
        xmr_amount: { required, minLength: minLength(1) },

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
          if ((response.data.login == true)) {

            this.user = response.data.user
          }
        })
        .catch(() => {
          this.$router.push("/login")
        });
    },
    SendCoin (payLoad: {
      xmr_address: string;
      xmr_desccription: string;
      xmr_amount: string;

    }) {
      axios({
        method: "post",
        url: "/xmr/send",
        data: payLoad,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if ((response.data.success)) {
            const message_sent =
              "Success! Sent " +
              this.wallet.xmr_amount +
              " to " +
              this.wallet.xmr_address;
            notify({
              title: "Freeport",
              text: message_sent,
              type: "success",
            });
            this.$router.push("/vendor/itemsforsale")
          }
        })
        .catch((error) => {
          console.log(error)
          notify({
            title: "Freeport Error",
            text: "Error With Sending Money",
            type: "error",
          });
        });
    },
    getxmrbalance () {
      axios({
        method: "get",
        url: "/xmr/balance",
        headers: authHeader(),
      }).then((response) => {
        if (response.data) {
          this.xmrbalance = response.data.xmr_balance;
        }
      });
    },
    onSubmit () {
      const payLoad = {
        xmr_address: this.wallet.xmr_address,
        xmr_desccription: this.wallet.xmr_description,
        xmr_amount: this.wallet.xmr_amount,

      }
      this.v$.$validate(); // checks all inputs
      if (this.v$.$invalid) {
        notify({
          title: "Wallet",
          text: "Form Failure",
          type: "error",
        });
      }
      else {
        notify({
          title: "Wallet",
          text: "Success Sending Coin. It will be sent shortly.",
          type: "success",
        });
        this.SendCoin(payLoad)
      }
    },
  },
});
</script>
