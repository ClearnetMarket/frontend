
<template>
  <HeaderPlain />
  <div class="wrapperplain">
    <div class="container max-w-3xl mx-auto text-white">
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
    <div class="mx-auto max-w-lg flex items-center justify-center mb-10 mt-12 text-white">
      <form class="bg-neutral rounded-md px-8 pt-6 pb-8 mb-4 w-full" @submit.prevent="onSubmit">
        <div class="mb-4 text-center text-[20px] ">
          In order to unlock your account, please enter your account seed below.
        </div>
        <div class="my-5">
          <input v-model="wordForm.word0" class="rounded w-full py-2 px-3 input-primary text-black" type="text"
            autocomplete="off" placeholder="Word 1" />
          <span v-if="v$.wordForm.word0.$error" class="text-red-600 text-center">
            {{ v$.wordForm.word0.$errors[0].$message }}
          </span>
        </div>
        <div class="my-5">
          <input v-model="wordForm.word1" class="rounded w-full py-2 px-3 input-primary text-black" type="text"
            autocomplete="off" placeholder="Word 2" />
          <span v-if="v$.wordForm.word1.$error" class="text-red-600 text-center">
            {{ v$.wordForm.word1.$errors[0].$message }}
          </span>
        </div>
        <div class="my-5">
          <input v-model="wordForm.word2" class="rounded w-full py-2 px-3 input-primary text-black" type="text"
            autocomplete="off" placeholder="Word 3" />
          <span v-if="v$.wordForm.word2.$error" class="text-red-600 text-center">
            {{ v$.wordForm.word2.$errors[0].$message }}
          </span>
        </div>
        <div class="my-5">
          <input v-model="wordForm.word3" class="rounded w-full py-2 px-3 input-primary text-black" type="text"
            autocomplete="off" placeholder="Word 4" />
          <span v-if="v$.wordForm.word3.$error" class="text-red-600 text-center">
            {{ v$.wordForm.word3.$errors[0].$message }}
          </span>
        </div>
        <div class="my-5">
          <input v-model="wordForm.word4" class="rounded w-full py-2 px-3 input-primary text-black" type="text"
            autocomplete="off" placeholder="Word 5" />
          <span v-if="v$.wordForm.word4.$error" class="text-red-600 text-center">
            {{ v$.wordForm.word4.$errors[0].$message }}
          </span>
        </div>
        <div class="my-5">
          <input v-model="wordForm.word5" class="rounded w-full py-2 px-3 input-primary text-black" type="text"
            autocomplete="off" placeholder="Word 6" />
          <span v-if="v$.wordForm.word5.$error" class="text-red-600 text-center">
            {{ v$.wordForm.word5.$errors[0].$message }}
          </span>
        </div>
        <div class="flex p-md justify-center">
          <button
            class="bg-primary hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-blue-300 focus:outline-none focus:shadow-outline"
            type="submit">
            Confirm
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import axios from "axios"
import { notify } from "@kyvg/vue3-notification"
import useValidate from "@vuelidate/core"
import { required } from "@vuelidate/validators"
import HeaderPlain from "../../layouts/headers/HeaderPlain.vue"

export default defineComponent({
  name: "forgotpassword",
  components: {
    HeaderPlain,
  },
  data () {
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
    }
  },
  validations () {
    return {
      wordForm: {
        word0: { required },
        word1: { required },
        word2: { required },
        word3: { required },
        word4: { required },
        word5: { required },
      },
    }
  },

  methods: {
    sendWordRequest (payLoad: {
      word0: string;
      word1: string;
      word2: string;
      word3: string;
      word4: string;
      word5: string;
    }) {
      axios({
        method: "post",
        url: "/auth/unlock-account",
        data: payLoad,
      })
        .then((response) => {
          if (response.data.login == true) {
            localStorage.setItem("auth_token", response.data.token);
            localStorage.setItem("auth_user", response.data.user);
            this.$router.push({ name: "changepassword" });
          }
        })
        .catch(() => {
          notify({
            title: "Authorization",
            text: "Form Error",
            type: "error",
          });
        });
    },
    onSubmit () {
      const payLoad = {
        word0: this.wordForm.word0,
        word1: this.wordForm.word1,
        word2: this.wordForm.word2,
        word3: this.wordForm.word3,
        word4: this.wordForm.word4,
        word5: this.wordForm.word5,
      }

      this.v$.$validate(); // checks all inputs
      if (this.v$.$invalid) {
        notify({
          title: "Authorization",
          text: "Form Failure",
          type: "error",
        });
      }
      else {
        this.sendWordRequest(payLoad);
      }
    },
  },
});
</script>

<style type="ts" scoped></style>
