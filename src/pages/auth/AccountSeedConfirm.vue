<template>
  <HeaderPlain />

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
  <div class="flex justify-center mx-auto">
    <div class="max-w-md">
      <div class="text-center">
        In order to unlock your account, please enter your account seed below.
      </div>
      <form class="" method="POST" @submit.prevent="onSubmit">
        <div class="gap-6">
          <div class="flex justify-center">
            <div class="text-center">Unlock Account</div>
          </div>
          <input
            v-model="wordForm.word0"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-blue-300 focus:outline-none focus:shadow-outline"
            type="text"
            autocomplete="off"
            placeholder="Word 1"
            v-model.trim="wordForm.word0"
          />
          <input
            v-model="wordForm.word1"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-blue-300 focus:outline-none focus:shadow-outline"
            type="text"
            autocomplete="off"
            placeholder="Word 2"
             v-model.trim="wordForm.word1"
          />
          <input
            v-model="wordForm.word2"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-blue-300 focus:outline-none focus:shadow-outline"
            type="text"
            autocomplete="off"
            placeholder="Word 3"
             v-model.trim="wordForm.word2"
          />
          <input
            v-model="wordForm.word3"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-blue-300 focus:outline-none focus:shadow-outline"
            type="text"
            autocomplete="off"
            placeholder="Word 4"
             v-model.trim="wordForm.word3"
          />
          <input
            v-model="wordForm.word4"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-blue-300 focus:outline-none focus:shadow-outline"
            type="text"
            autocomplete="off"
            placeholder="Word 5"
             v-model.trim="wordForm.word4"
          />
          <input
            v-model="wordForm.word5"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-blue-300 focus:outline-none focus:shadow-outline"
            type="text"
            autocomplete="off"
            placeholder="Word 6"
             v-model.trim="wordForm.word5"
          />
          <div class="flex p-md justify-center">
            <button
              class="bg-zinc-600 hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-blue-300 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Confirm
            </button>
          </div>
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
  name: "accountseedconfirm",
  components: {
    HeaderPlain,
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
  mounted() {
    this.userstatusconfirmed();
  },
  methods: {
    async userstatusconfirmed() {
      await axios({
        method: "get",
        url: "/auth/amiconfirmed",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
      
          if (response.data.confirmed == true) {
            this.$router.push({ name: "home" });
          }
        }
      });
    },

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
        url: "/auth/accountseedconfirm",
        data: payLoad,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          
          if (response.data.status == "success") {
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
