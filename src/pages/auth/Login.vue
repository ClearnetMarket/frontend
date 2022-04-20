<template>
  <HeaderPlain />
  <div class="max-w-7xl mx-auto">
    <div class="mx-auto max-w-lg flex items-center justify-center mb-10 mt-36">
      <form
        class="bg-gray-100 shadow-md border-2 border-gray-300 rounded-md px-8 pt-6 pb-8 mb-4 w-full"
        @submit.prevent="onSubmit"
      >
        <div class="mb-4 text-center text-[28px] text-zinc-600">Login</div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2"
            >Username</label
          >
          <input
            v-model="loginForm.username"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2"
            >Password</label
          >
          <input
            v-model="loginForm.password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            autocomplete="off"
            placeholder="Password"
          />
        </div>
        <div class="flex items-center justify-center mb-6">
          <button
            class="bg-yellow-600 hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
        <div class="flex flex-col justify-center mt-5">
          <router-link
            :to="{ name: 'forgotpassword' }"
            class="text-center font-bold text-sm text-blue-500 hover:text-blue-800"
            >Forgot Password?</router-link
          >
        </div>

        <div class="flex flex-col justify-center mt-5">
            <router-link
            :to="{ name: 'register' }"
            class="text-center font-bold text-sm text-blue-500 hover:text-blue-800"
            >Register Here</router-link
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
import authHeader from "../../services/auth.header";

export default defineComponent({
  name: "Login",
  components: { HeaderPlain },

  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
    };
  },
  mounted() {
    this.userstatus();
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
            this.$router.push({ name: "home" });
          }
        })
        .catch((error) => {});
    },
    async sendLogin(payLoad: { username: string; password: string }) {
      await axios({
        method: "post",
        url: "/auth/login",
        data: payLoad,
      })
        .then((response) => {
          console.log(response);
          if (response.data.user) {
       
            localStorage.setItem("auth_user", response.data.user);
            localStorage.setItem("auth_token", response.data.token);
            this.$store.dispatch("user", response.data.user);
            this.$router.push({ name: "home" });
          }
        })
        .catch((error) => {
          if (error.response) {
          }
        });
    },
    onSubmit() {
      const payLoad = {
        username: this.loginForm.username,
        password: this.loginForm.password,
      };

      this.sendLogin(payLoad);
    },
  },
});
</script>

<style type="ts" scoped></style>
