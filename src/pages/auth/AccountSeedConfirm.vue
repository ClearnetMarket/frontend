
<template>
  <div class="h-screen">
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

          />
          <span
            v-if="v$.wordForm.word0.$error"
            class="text-red-600 text-center"
          >
            {{ v$.wordForm.word0.$errors[0].$message }}
          </span>
          <input
            v-model="wordForm.word1"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-blue-300 focus:outline-none focus:shadow-outline"
            type="text"
            autocomplete="off"
            placeholder="Word 2"
           
          />
          <span
            v-if="v$.wordForm.word1.$error"
            class="text-red-600 text-center"
          >
            {{ v$.wordForm.word1.$errors[0].$message }}
          </span>
          <input
            v-model="wordForm.word2"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-blue-300 focus:outline-none focus:shadow-outline"
            type="text"
            autocomplete="off"
            placeholder="Word 3"
           
          />
          <span
            v-if="v$.wordForm.word2.$error"
            class="text-red-600 text-center"
          >
            {{ v$.wordForm.word2.$errors[0].$message }}
          </span>
          <input
            v-model="wordForm.word3"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-blue-300 focus:outline-none focus:shadow-outline"
            type="text"
            autocomplete="off"
            placeholder="Word 4"
          
          />
          <span
            v-if="v$.wordForm.word3.$error"
            class="text-red-600 text-center"
          >
            {{ v$.wordForm.word3.$errors[0].$message }}
          </span>
          <input
            v-model="wordForm.word4"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-blue-300 focus:outline-none focus:shadow-outline"
            type="text"
            autocomplete="off"
            placeholder="Word 5"
          
          />
          <span
            v-if="v$.wordForm.word5.$error"
            class="text-red-600 text-center"
          >
            {{ v$.wordForm.word5.$errors[0].$message }}
          </span>

          <input
            v-model="wordForm.word5"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-blue-300 focus:outline-none focus:shadow-outline"
            type="text"
            autocomplete="off"
            placeholder="Word 6"
           
          />
          <span
            v-if="v$.wordForm.word5.$error"
            class="text-red-600 text-center"
          >
            {{ v$.wordForm.word5.$errors[0].$message }}
          </span>
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
</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios  from "axios";
import { notify } from "@kyvg/vue3-notification";
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import authHeader from "../../services/auth.header";
import HeaderPlain from "../../layouts/headers/HeaderPlain.vue";

export default defineComponent({
  name: "accountseedconfirm",
  components: {
    HeaderPlain,
  },
  data() {
    return {

    v$: useValidate(),
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
  validations() {
    return {
      wordForm: {
        word0: { required },
        word1: { required },
        word2: { required },
        word3: { required },
        word4: { required },
        word5: { required },
      },
    };
  },
  mounted() {
    this.userstatusconfirmed();
  },
  methods: {
    userstatusconfirmed() {
     axios({
        method: "get",
        url: "/auth/amiconfirmed",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) { }
      }).catch(() => { });
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
            notify({
              title: "Authorization",
              text: "Success! Welcome to freeport!!",
              type: "success",
            });
            this.$router.push({ name: "home" });
          }
        })
        .catch(() => {
          notify({
            title: "Authorization",
            text: "Invalid Credentials.",
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
      this.v$.$validate(); // checks all inputs
      if (this.v$.$invalid) {
        notify({
          title: "Authorization",
          text: "Form Failure",
          type: "error",
        });
      } else {
      
        this.sendWordRequest(payLoad);
      }
    },
  },
});
</script>
