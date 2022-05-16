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
  </div>

    <div class="mx-auto max-w-lg flex items-center justify-center mb-10 mt-12">
    <form
      class="bg-gray-100 shadow-md border-2 border-gray-300 rounded-md px-8 pt-6 pb-8 mb-4 w-full"
      @submit.prevent="onSubmit"
    >
      <div class="mb-4 text-center text-[20px] text-zinc-600">
        In order to unlock your account, please enter your account seed below.
      </div>

      <input
        v-model="wordForm.word0"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-blue-300 focus:outline-none focus:shadow-outline"
        type="text"
        autocomplete="off"
        placeholder="Word 1"
      />
      <input
        v-model="wordForm.word1"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-blue-300 focus:outline-none focus:shadow-outline"
        type="text"
        autocomplete="off"
        placeholder="Word 2"
      />
      <input
        v-model="wordForm.word2"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-blue-300 focus:outline-none focus:shadow-outline"
        type="text"
        autocomplete="off"
        placeholder="Word 3"
      />
      <input
        v-model="wordForm.word3"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-blue-300 focus:outline-none focus:shadow-outline"
        type="text"
        autocomplete="off"
        placeholder="Word 4"
      />
      <input
        v-model="wordForm.word4"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-blue-300 focus:outline-none focus:shadow-outline"
        type="text"
        autocomplete="off"
        placeholder="Word 5"
      />
      <input
        v-model="wordForm.word5"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-blue-300 focus:outline-none focus:shadow-outline"
        type="text"
        autocomplete="off"
        placeholder="Word 6"
      />
      <div class="flex p-md justify-center">
        <button
          class="bg-zinc-600 hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-blue-300 focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Confirm
        </button>
      </div>
    </form>
  </div>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { ref } from "vue";
import { notify } from "@kyvg/vue3-notification";

import authHeader from "../../services/auth.header";
import HeaderPlain from "../../layouts/headers/HeaderPlain.vue";


export default defineComponent({
  name: "forgotpassword",
  components: {
    HeaderPlain
  },

  data() {
    return {
      wordForm: {
        word0: "",
        word1: "",
        word2: "",
        word3: "",
        word4: "",
        word5: "",
      },
    };
  },

  methods: {
    sendWordRequest(payLoad: {
      word0: string;
      word1: string;
      word2: string;
      word3: string;
      word4: string;
      word5: string;
    }) {
      axios({
        method: "post",
        url: "/auth/login",
        data: payLoad,
      })
        .then((response) => {
          if (response.data.status == "success") {
            notify({
              title: "Authorization",
              text: "Success",
              type: "success",
            });
             this.$router.push({ name: "login" });
          }
        })
        .catch((error) => {
            notify({
              title: "Authorization",
              text: "Incorrect Credentials",
              type: "error",
            });
        });
    },
    onSubmit() {
      const payLoad = {
        word0: this.wordForm.word0,
        word1: this.wordForm.word1,
        word2: this.wordForm.word2,
        word3: this.wordForm.word3,
        word4: this.wordForm.word4,
        word5: this.wordForm.word5,
      };
      this.sendWordRequest(payLoad);
    },
  },
});
</script>

<style type="ts" scoped></style>
