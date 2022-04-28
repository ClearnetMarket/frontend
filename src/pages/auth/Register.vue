<template>
  <HeaderPlain />
  <div class="max-w-7xl mx-auto">
    <div class="mx-auto max-w-lg flex items-center justify-center mb-10 mt-36">
      <form
        class="bg-gray-100 shadow-md border-2 border-gray-300 rounded-md px-8 pt-6 pb-8 mb-4 w-full"
        method="POST"
        @submit.prevent="onSubmit"
      >
        <div class="mb-4 text-center text-[28px] text-zinc-600">Register</div>

        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="username"
            >Username</label
          >
          <input
            v-model="registerForm.username"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Login Username"
            v-model.trim="registerForm.username"
          />
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="username"
            >Display Username</label
          >
          <label class="block text-gray-700 mb-2 text-[11px]" for="username"
            >This is the name other users will see you as. It would be the name
            of your store.</label
          >
          <input
            v-model="registerForm.display_username"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="display_username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="username"
            >Email</label
          >
          
          <input
            v-model="registerForm.email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Email"
          />
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
            >Password</label
          >
          <input
            v-model="registerForm.password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            autocomplete="off"
            placeholder="Password"
              v-model.trim="registerForm.password"
          />
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password_confirm"
            >Confirm Password</label
          >
          <input
            v-model="registerForm.password_confirm"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            autocomplete="off"
            placeholder="Confirm Password"
              v-model.trim="registerForm.password_confirm"
          />
        </div>
        <div class="flex">
          <div class="mb-4 w-1/3">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password_confirm"
              >4 Digit Wallet Pin</label
            >
            <label class="block text-gray-700 mb-2 text-[11px]" for="username"
              >Security for wallet withdrawls</label
            >
            <input
              v-model="registerForm.pin"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="pin"
              type="password"
              autocomplete="off"
              placeholder="Pin"
            />
          </div>
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password_confirm"
            >Country</label
          >
          <select
            class="shadow form-select appearance-none block w-full px-3 py-1.5 text-base font-normal focus:shadow-outline text-gray-500 bg-white bg-clip-padding bg-no-repeat border rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            aria-label="Default select example"
            v-model="registerForm.country"
          >
            <option
              class="text-gray-700"
              v-for="(country, index) in countryList"
              :key="index"
              :value="country.value"
            >
              {{ country.name }}
            </option>
          </select>
        </div>

        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password_confirm"
            >Currency</label
          >
          <select
            class="shadow form-select appearance-none block w-full px-3 py-1.5 text-base font-normal focus:shadow-outline text-gray-500 bg-white bg-clip-padding bg-no-repeat border rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            aria-label="Default select example"
            v-model="registerForm.currency"
          >
            <option
              class="text-gray-700"
              v-for="(currency, index) in currencyList"
              :key="index"
              :value="currency.value"
            >
              {{ currency.text }}
            </option>
          </select>
        </div>

        <div class="flex items-center justify-center mb-6">
          <button
            class="bg-yellow-600 hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
        </div>
        <div class="flex flex-col justify-center">
          <router-link
            :to="{ name: 'forgotpassword' }"
            class="text-center font-bold text-sm text-blue-500 hover:text-blue-800"
            >Forgot Password?</router-link
          >
        </div>
        <div class="flex flex-col justify-center mt-5">
          <router-link
            :to="{ name: 'login' }"
            class="text-center font-bold text-sm text-blue-500 hover:text-blue-800"
            >Login Here</router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import HeaderPlain from "../../layouts/headers/HeaderPlain.vue";

export default defineComponent({
  name: "Register",
  components: { HeaderPlain },
  data() {
    return {
      isAuthenticated: false,
      currencyList: [],
      countryList: [],
      registerForm: {
        username: "",
        display_username: "",
        email: "",
        pin: "",
        password: "",
        password_confirm: "",
        currency: "",
        country: "",
      },
    };
  },
  mounted() {
    this.getCountryList();
    this.getCurrencyList();
  },

  methods: {
    async Register(payLoad: {
      display_username: string;
      username: string;
      password: string;
      email: string;
      pin: string;
      country: string;
      currency: string;
    }) {
      const path = "/auth/register";
      axios({
        method: "post",
        url: path,
        data: payLoad,
        withCredentials: true,
      })
        .then((response) => {
          if (response.data.user) {
            localStorage.setItem("auth_user", response.data.user);
            localStorage.setItem("auth_token", response.data.token);
            this.$store.dispatch("user", response.data.user);
            this.$router.push({ name: "accountseed" });
          }
        })
        .catch((error) => {});
    },
    async getCurrencyList() {
      const path = "/auth/query/currency";

      axios({
        method: "get",
        url: path,
        withCredentials: true,
      })
        .then((response) => {
          this.currencyList = response.data;
        })
        .catch((error) => {});
    },
    async getCountryList() {
      const path = "/auth/query/country";
      await axios
        .get(path, { withCredentials: true })
        .then((response) => {
          this.countryList = response.data;
        })
        .catch((error) => {});
    },
    async onSubmit() {
      const payLoad = {
        username: this.registerForm.username,
        pin: this.registerForm.pin,
        display_username: this.registerForm.display_username,
        password: this.registerForm.password,
        email: this.registerForm.email,
        currency: this.registerForm.currency,
        country: this.registerForm.country,
      };
      await this.Register(payLoad);
    },
  },
});
</script>

<style type="ts" scoped></style>
