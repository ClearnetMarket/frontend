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

    <div class="flex justify-center mx-auto">
      <div class="max-w-md">
        <div class="text-center">
          In order to unlock your account, change password, or recover your
          account in the future you will need this account key. We dont do
          emails or other methods to recover your account.

          <div class="text-[24px]">You should write these words down.</div>
        </div>
        <div class="flex justify-center">
          <div
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2 mb-2"
          >
            {{ word1 }}
          </div>
          <div
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2 mb-2"
          >
            {{ word2 }}
          </div>
          <div
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2 mb-2"
          >
            {{ word3 }}
          </div>
          <div
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2 mb-2"
          >
            {{ word4 }}
          </div>
          <div
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2 mb-2"
          >
            {{ word5 }}
          </div>
          <div
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2 mb-2"
          >
            {{ word6 }}
          </div>
        </div>
        <div class="flex justify-center my-10">
          <router-link :to="{ name: 'accountseedconfirm' }">
            <button
              class="bg-zinc-600 hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-blue-300 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Confirm Account
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { ref } from "vue";
import { mapGetters } from "vuex";
import { useRoute } from "vue-router";
import authHeader from "../../services/auth.header";
import HeaderPlain from "../../layouts/headers/HeaderPlain.vue";

export default defineComponent({
  name: "accountseed",
  components: {
    HeaderPlain,
  },

  data() {
    return {
      word1: "",
      word2: "",
      word3: "",
      word4: "",
      word5: "",
      word6: "",
    };
  },
  mounted() {
    this.userstatus();
    this.userstatusconfirmed();
    this.sendwordrequest();
  },

  methods: {
    async userstatus() {
      console.log();
      await axios({
        method: "get",
        url: "/auth/whoami",
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if ((response.status = 200)) {
            this.$store.dispatch("user", response.data.user);
          }
        })
        .catch((error) => {});
    },

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
    sendwordrequest() {
      axios({
        method: "get",
        url: "/auth/account-seed",

        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if (response.status == 200) {
            this.word1 = response.data.word1;
            this.word2 = response.data.word2;
            this.word3 = response.data.word3;
            this.word4 = response.data.word4;
            this.word5 = response.data.word5;
            this.word6 = response.data.word6;
          }
        })
        .catch((error) => {});
    },
  },
});
</script>

<style type="ts" scoped></style>
