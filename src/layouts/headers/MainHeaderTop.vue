<template>
  <div class="nav bg-blue-600 md:py-2 ">
    <div class="container gap-x-0 max-w-7xl mx-auto text-center ">
 <div v-if="loaded">

      <div v-if="user">
       
          <div class="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3">
            <div class="col-span-1 invisible md:visible h-1">
              <div class="flex sm:justify-between lg:justify-start ml-5 text-white font-bold pb-2">
                <div class="px-3.5">English</div>

                <div class="px-3 ">{{ returncurrency (user.currency) }}</div>

              </div>
            </div>
            <div class="col-span-1 lg:col-span-2 ">
              <div class="flex flex-wrap lg:justify-end md:justify-evenly sm:justify-center">
                <div v-if="user">
                  <div v-if="user.user_admin >= 2">
                    <router-link :to="{ name: 'ModHome' }" class="px-3">
                      <button
                        class="hover:bg-zinc-700 text-white hover:text-white py-1 px-3 rounded focus:outline-none focus:shadow-outline font-bold">
                        Moderator
                      </button>
                    </router-link>
                  </div>
                  <router-link :to="{ name: 'sell' }">
                    <button
                      class="hover:bg-zinc-700 text-white hover:text-white py-1 px-3 rounded focus:outline-none focus:shadow-outline mx-3 font-bold">
                      Sell
                    </button>
                  </router-link>

                  <router-link :to="{ name: 'MsgHome' }" class="px-3">
                    <button
                      class="hover:bg-zinc-700 text-white hover:text-white py-1 px-3 rounded focus:outline-none focus:shadow-outline font-bold">
                      Msg
                    </button>
                  </router-link>

                  <router-link :to="{ name: 'userorders' }" class="px-3">
                    <button
                      class="hover:bg-zinc-700 text-white hover:text-white py-1 px-3 rounded focus:outline-none focus:shadow-outline font-bold">
                      Orders
                    </button>
                  </router-link>
                  <router-link :to="{ name: 'account' }" class="px-3">
                    <button
                      class="hover:bg-zinc-700 text-white hover:text-white py-1 px-3 rounded focus:outline-none focus:shadow-outline font-bold">
                      {{ user.user_name }}
                    </button>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="">
          <div class="flex gap-5 justify-center p-5">
            <router-link :to="{ name: 'login' }">
              <button
                class="bg-zinc-700 hover:bg-zinc-400 text-white py-1 px-3 rounded focus:outline-none focus:shadow-outline font-bold">
                Login
              </button>
            </router-link>
            <router-link :to="{ name: 'register' }">
              <button
                class="bg-zinc-700 hover:bg-zinc-400 text-white py-1 px-3 rounded focus:outline-none focus:shadow-outline font-bold">
                Sign Up
              </button>
            </router-link>
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
  name: "MainHeaderTop",
  mounted () {
    this.userstatus();
    this.loaded = true;
  },
  data () {
    return {
      user: null,
      loaded: false,
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

            this.user = response.data.user;
          
          }
        })
        .catch(() => {
          this.user = null;
        });
    },
    logout () {
      localStorage.removeItem("auth_token");
      localStorage.clear();
      this.$store.dispatch("user", null);
      this.userstatus();
      this.$router.push({ name: "home" });
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
