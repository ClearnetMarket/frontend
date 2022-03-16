<template>
  <nav class="bg-blue-600 py-1 text-white">
    <div
      class="container grid sm:grid-cols-2 sm:grid-row-2 md:grid-cols-12 gap-x-0 max-w-7xl mx-auto text-bold text-center"
    >
      <div class="flex sm:col-span-2 md:col-span-1 pt-1 m-0">
        <div class="px-3">English</div>
        <div class="px-3">USD</div>
      </div>
      <div v-if="user" class="flex sm:col-span-2 md:col-span-2 md:col-start-11">
        <router-link :to="{ name: 'account' }">
          <button
            class="bg-zinc-600 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
          >
            Account
          </button>
        </router-link>

        <router-link to="/register" class="px-3">
          <button
            class="bg-zinc-600 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
            type="button"
            @click="logout"
          >
            Logout
          </button>
        </router-link>
      </div>
      <div v-else class="flex sm:col-span-2 md:col-span-2 md:col-start-11">
        <router-link :to="{ name: 'login' }">
          <button
            class="bg-zinc-600 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </router-link>
        <router-link
          class="p-1 lg:px-3 md:mx-2 text-black bg-white text-center border border-solid border-blue-600 rounded hover:bg-gray-200 hover:text-black transition-colors duration-300 mt-1 md:mt-0 md:ml-1"
          :to="{ name: 'register' }"
        >
          <button
            class="bg-zinc-600 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
          >
            Sign Up
          </button>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "MainHeaderTop",
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    logout() {
      localStorage.removeItem("user_token");
      localStorage.removeItem("auth_token");
      localStorage.clear();
    },
  },
});
</script>
