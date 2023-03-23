
<template>

  <HeaderPlain />
    <div class="wrapperplain">
  <div class="container max-w-7xl mx-auto bg-gray-300 text-white">
    <div class="mx-auto max-w-lg flex items-center justify-center ">
      <form class="bg-neutral rounded-md  px-8 pt-6 pb-8 mb-4 mt-4 w-full" method="POST" @submit.prevent="onSubmit">
        <div class="mb-4 text-center text-[28px] text-zinc-600">Register</div>

        <div class="mb-4">
          <label class="block text-white text-sm font-bold mb-2" for="username">Username</label>
          <input v-model="registerForm.username"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            id="username" type="text" placeholder="Login Username" />
          <span v-if="v$.registerForm.username.$error" class="text-red-600 text-center">
            {{ v$.registerForm.username.$errors[0].$message }}
          </span>
        </div>
        <div class="mb-4">
          <label class="block text-white text-sm font-bold mb-2" for="username">Display Username</label>
          <label class="block text-white mb-2 text-[11px]" for="username">This is the name other users will see you
            as. It would be the name
            of your store.</label>
          <input v-model="registerForm.display_username"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            id="display_username" type="text" placeholder="Username" />
          <span v-if="v$.registerForm.display_username.$error" class="text-red-600 text-center">
            {{ v$.registerForm.display_username.$errors[0].$message }}
          </span>
        </div>
        <div class="mb-4">
          <label class="block text-white text-sm font-bold mb-2" for="username">Email</label>

          <input v-model="registerForm.email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            id="email" type="text" placeholder="Email" />
          <span v-if="v$.registerForm.email.$error" class="text-red-600 text-center">
            {{ v$.registerForm.email.$errors[0].$message }}
          </span>
        </div>
        <div class="mb-4">
          <label class="block text-white text-sm font-bold mb-2" for="password">Password</label>
          <input v-model="registerForm.password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            id="password" type="password" autocomplete="off" placeholder="Password" />
          <span v-if="v$.registerForm.password.$error" class="text-red-600 text-center">
            {{ v$.registerForm.password.$errors[0].$message }}
          </span>
        </div>
        <div class="mb-4">
          <label class="block text-white text-sm font-bold mb-2" for="password_confirm">Confirm Password</label>
          <input v-model="registerForm.password_confirm"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            id="password" type="password" autocomplete="off" placeholder="Confirm Password" />
          <span v-if="v$.registerForm.password_confirm.$error" class="text-red-600 text-center">
            {{ v$.registerForm.password_confirm.$errors[0].$message }}
          </span>
        </div>

        <div class="mb-4">
          <label class="block text-white text-sm font-bold mb-2" for="password_confirm">Country</label>
          <select
            class="shadow form-select appearance-none block w-full px-3 py-1.5 text-base font-normal focus:shadow-outline text-gray-500 bg-neutral bg-clip-padding bg-no-repeat border rounded transition ease-in-out m-0 focus:text-white focus:bg-neutral focus:border-blue-600 focus:outline-none"
            aria-label="Default select example" v-model="registerForm.country">
            <option class="text-white" v-for="(country, index) in countryList" :key="index" :value="country.value">
              {{ country.name }}
            </option>
          </select>
          <span v-if="v$.registerForm.country.$error" class="text-red-600 text-center">
            {{ v$.registerForm.country.$errors[0].$message }}
          </span>
        </div>

        <div class="mb-4">
          <label class="block text-white text-sm font-bold mb-2" for="password_confirm">Currency</label>
          <select
            class="shadow form-select appearance-none block w-full px-3 py-1.5 text-base font-normal focus:shadow-outline text-gray-500 bg-neutral bg-clip-padding bg-no-repeat border rounded transition ease-in-out m-0 focus:text-white focus:bg-neutral focus:border-blue-600 focus:outline-none"
            aria-label="Default select example" v-model="registerForm.currency">
            <option class="text-white" v-for="(currency, index) in currencyList" :key="index"
              :value="currency.value">
              {{ currency.text }}
            </option>
            <span v-if="v$.registerForm.currency.$error" class="text-red-600 text-center">
              {{ v$.registerForm.currency.$errors[0].$message }}
            </span>
          </select>
        </div>

        <div class="flex items-center justify-center mb-6">
          <button
            class="bg-primary hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit">
            Register
          </button>
        </div>
        <div class="flex flex-col justify-center">
          <router-link :to="{ name: 'forgotpassword' }"
            class="text-center font-bold text-sm text-blue-500 hover:text-blue-800">Forgot Password?</router-link>
        </div>
        <div class="flex flex-col justify-center mt-5">
          <router-link :to="{ name: 'login' }"
            class="text-center font-bold text-sm text-blue-500 hover:text-blue-800">Login Here</router-link>
        </div> 
      </form>
    </div>
  </div> </div>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { notify } from "@kyvg/vue3-notification";
import useValidate from "@vuelidate/core";
import { required, email, minLength, sameAs } from "@vuelidate/validators";
import HeaderPlain from "../../layouts/headers/HeaderPlain.vue";

export default defineComponent({
  name: "Register",
  components: { HeaderPlain },
  data () {
    return {
      v$: useValidate(),
      isAuthenticated: false,
      currencyList: [],
      countryList: [],
      registerForm: {
        username: "",
        display_username: "",
        email: "",
        password: "",
        password_confirm: "",
        currency: "",
        country: "",
      },
    };
  },
  mounted () {
    this.getCountryList();
    this.getCurrencyList();
  },
  validations () {
    return {
      registerForm: {
        password: { required, minLength: minLength(6) },
        username: { required, minLength: minLength(6) },
        display_username: { required, minLength: minLength(6) },
        email: { email, required },
        password_confirm: {
          required,
          minLength: minLength(6),
          sameAs: sameAs(this.registerForm.password),
        },
        currency: { required },
        country: { required },

      },
    };
  },
  methods: {
    onSubmit () {
      const payLoad = {
        username: this.registerForm.username,
        display_username: this.registerForm.display_username,
        password: this.registerForm.password,
        email: this.registerForm.email,
        currency: this.registerForm.currency,
        country: this.registerForm.country,
      };
      this.v$.$validate(); // checks all inputs
      if (this.v$.$invalid) {
        notify({
          title: "Authorization",
          text: "Form Failure;  Fields must be filled our correctly.",
          type: "error",
        });
      } else {
        this.Register(payLoad);
      }
    },
    Register (payLoad: {
      display_username: string;
      username: string;
      password: string;
      email: string;
      country: string;
      currency: string;
    }) {
      let path = "/auth/register";
      axios({
        method: "post",
        url: path,
        data: payLoad,
        withCredentials: true,
      })
        .then((response) => {
           if (response.data.error) {
                       notify({
            title: "Authorization",
            text: response.data.error,
            type: "error",
          });

           };

          if (response.data.user) {
            localStorage.setItem("auth_user", response.data.user);
            localStorage.setItem("auth_token", response.data.token);

            this.$router.push({ name: "accountseed" });
            notify({
              title: "Authorization",
              text: "Success",
              type: "success",
            });
          }
        })
        .catch((response) => {

          notify({
            title: "Authorization",
            text: "Failed to Register.",
            type: "error",
          });

        });
    },
    getCurrencyList () {
      const path = "/auth/query/currency";
      axios({
        method: "get",
        url: path,
        withCredentials: true,
      })
        .then((response) => {
          this.currencyList = response.data;
        })

    },
    getCountryList () {
      const path = "/auth/query/country";
      axios
        .get(path, { withCredentials: true })
        .then((response) => {
          this.countryList = response.data;
        })
        .catch(() => {
          notify({
            title: "Data Retrieval Failure",
            text: "Failed to get country list",
            type: "error",
          });
        });
    },
  },
});
</script>

<style  scoped>

</style>
