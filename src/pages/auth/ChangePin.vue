
<template>
  <HeaderPlain />
  <div class="wrapperplain">
    <div class="container max-w-3xl mx-auto text-white">
      <div class="mx-auto flex mb-1">
        <div class="mt-5 mb-5 px-10">
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
      <div class="mx-auto max-w-lg flex items-center justify-center mb-10 mt-12 px-5">
        <form class="bg-neutral rounded-md px-8 pt-6 pb-8 mb-4 w-full" @submit.prevent="onSubmit">
          <div class="mb-4 text-center text-[28px] ">Change Pin</div>
          <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2">Enter current Password</label>
            <input v-model="ChangePinForm.password"
                   class="rounded w-full py-2 px-3 input-primary text-black"
                   id="password"
                   type="password"
                   placeholder="Password" />
            <span v-if="v$.ChangePinForm.password.$error" class="text-red-600 text-center">
              {{ v$.ChangePinForm.password.$errors[0].$message }}
            </span>
          </div>
          <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2">Enter New Pin</label>
            <input v-model="ChangePinForm.pin"
                    class="rounded w-full py-2 px-3 input-primary text-black"
                    id="password"
                    type="password"
                    placeholder="Password" />
            <span v-if="v$.ChangePinForm.pin.$error" class="text-red-600 text-center">
              {{ v$.ChangePinForm.pin.$errors[0].$message }}
            </span>
          </div>

          <div class="mb-6">
            <label class="block text-white text-sm font-bold mb-2">Confirm New Pin</label>
            <input v-model="ChangePinForm.pin_confirm"
                    class="rounded w-full py-2 px-3 input-primary text-black"
                    id="passwordtwo"
                    type="password"
                    autocomplete="off"
                    placeholder="Confirm Password" />
            <span v-if="v$.ChangePinForm.pin_confirm.$error" class="text-red-600 text-center">
              {{ v$.ChangePinForm.pin_confirm.$errors[0].$message }}
            </span>
          </div>
          <div class="flex items-center justify-center mb-6">
            <button
              class="bg-primary hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import axios from "axios"
import { notify } from "@kyvg/vue3-notification"
import useValidate from "@vuelidate/core"
import { required, minLength } from "@vuelidate/validators"
import HeaderPlain from "../../layouts/headers/HeaderPlain.vue"
import authHeader from "../../services/auth.header"


export default defineComponent({
  name: "changepin",
  components: {
    HeaderPlain,
  },

  data () {
    return {
      v$: useValidate(),
      user: null,
      ChangePinForm: {
        pin: "",
        pin_confirm: "",
        password: "",
      },
    };
  },
  created(){
    this.userstatus;
  },
  validations () {
    return {
      ChangePinForm: {
        pin: { required, minLength: minLength(4) },
        pin_confirm: { required, minLength: minLength(4) },
        password: { required, minLength: minLength(6) },
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
          if (response.data.login == true) {
            this.user = response.data.user;
          }
        })
        .catch(() => {
          this.$router.push({ name: "login" });
        });
    },
    sendRequest (payLoad: { pin: string; pin_confirm: string }) {
      axios({
        method: "post",
        url: "/auth/change-pin",
        data: payLoad,
      })
        .then((response) => {
          if (response.data.status == "success") {
            notify({
              title: "Authorization",
              text: "Success!",
              type: "success",
            });
            this.$router.push({ name: "login" });
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
    onSubmit () {
      const payLoad = {
        pin: this.ChangePinForm.pin,
        pin_confirm: this.ChangePinForm.pin_confirm,
      };
      this.v$.$validate(); // checks all inputs
      if (this.v$.$invalid) {
        notify({
          title: "Authorization",
          text: "Form Failure",
          type: "error",
        });
      } else {
        notify({
          title: "Authorization",
          text: "Form success",
          type: "success",
        });
        this.sendRequest(payLoad);
      }
    },
  },
});
</script>
