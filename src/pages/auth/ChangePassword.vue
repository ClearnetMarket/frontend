<template>
  <HeaderPlain />

  <div v-if="user">
    <MainHeaderVendor v-show="user.user_admin == 1" />
  </div>

  <div class="container max-w-7xl mx-auto px-10">
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
        </ol>
      </nav>
    </div>
    <div class="mx-auto max-w-lg flex items-center justify-center mb-10 mt-20">
      <form
        class="bg-gray-100 shadow-md border-2 border-gray-300 rounded-md px-8 pt-6 pb-8 mb-4 w-full"
        @submit.prevent="onSubmit"
      >
         <div class="mb-4 text-center text-[28px] text-zinc-600">Change Password</div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2"
            >Enter New Password</label
          >
          <input
            v-model="ChangePasswordForm.password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2"
            >Confirm New Password</label
          >
          <input
            v-model="ChangePasswordForm.password_confirm"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="passwordtwo"
            type="password"
            autocomplete="off"
            placeholder="Confirm Password"
          />
        </div>
        <div class="flex items-center justify-center mb-6">
          <button
            class="bg-zinc-600 hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { ref } from "vue";
import authHeader from "../../services/auth.header";
import HeaderPlain from "../../layouts/headers/HeaderPlain.vue";

export default defineComponent({
  name: "changepassword",
  components: {
    HeaderPlain
  },
  data() {
    return {
      ChangePasswordForm: {
        password: "",
        password_confirm: "",
      },
    };
  },

  methods: {
    sendWordRequest(payLoad: { password: string; password_confirm: string }) {
      axios({
        method: "post",
        url: "/auth/change-password",
        data: payLoad,
      }).then((response) => {
        if (response.data.status == "success") {
          this.$router.push({ name: "login" });
        }
      });
    },
    onSubmit() {
      const payLoad = {
        password: this.ChangePasswordForm.password,
        password_confirm: this.ChangePasswordForm.password_confirm,
      };
      this.sendWordRequest(payLoad);
    },
  },
});
</script>

<style type="ts" scoped></style>
