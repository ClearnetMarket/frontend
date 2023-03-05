
<template>

  <HeaderPlain />
      <div class="wrapperplain">
  <div class="container max-w-3xl mx-auto">
    <div class="mt-5 mb-5 px-10 ">
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
    <div class="mx-auto max-w-lg flex items-center justify-center mb-10 mt-20 px-5">
      <form
        class="bg-white rounded-md px-8 pt-6 pb-8 mb-4 w-full"
        @submit.prevent="onSubmit"
      >
        <div class="mb-4 text-center text-[28px] text-zinc-600">
          Change Password
        </div>
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
      <span v-if="v$.ChangePasswordForm.password.$error" class="text-red-600 text-center">
        {{ v$.ChangePasswordForm.password.$errors[0].$message }}
      </span>
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
      <span v-if="v$.ChangePasswordForm.password_confirm.$error" class="text-red-600 text-center">
        {{ v$.ChangePasswordForm.password_confirm.$errors[0].$message }}
      </span>
        </div>
        <div class="flex items-center justify-center mb-6">
          <button
            class="bg-zinc-600 hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { notify } from "@kyvg/vue3-notification";
import useValidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import HeaderPlain from "../../layouts/headers/HeaderPlain.vue";

export default defineComponent({
  name: "changepassword",
  components: {
    HeaderPlain,
  },
  data() {
    return {
      v$: useValidate(),
      ChangePasswordForm: {
        password: "",
        password_confirm: "",
      },
    };
  },
  validations() {
    return {
      ChangePasswordForm: {
        password: { required, minLength: minLength(6) },
        password_confirm: { required, minLength: minLength(6) },
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
    onSubmit() {
      const payLoad = {
        password: this.ChangePasswordForm.password,
        password_confirm: this.ChangePasswordForm.password_confirm,
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
      this.sendWordRequest(payLoad);
      }
    },
  },
});
</script>
