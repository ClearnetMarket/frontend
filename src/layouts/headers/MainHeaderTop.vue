<template>
  <nav class="bg-blue-600 py-1 text-white">
    <div
      class="container flex justify-between gap-x-0 max-w-7xl mx-auto text-bold text-center"
    >
      <div class="flex ml-5">
        <div class="flex sm:col-span-2 md:col-span-1 pt-1 m-0">
          <div class="px-3">English</div>
          <div class="px-3">USD</div>
        </div>
      </div>
      <div class="flex mr-5">
        <div v-if="user" class="flex">
          <div v-show="user.user_admin == 0">
            <router-link :to="{ name: 'sell' }">
              <button
                class="bg-zinc-600 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mx-3"
              >
                Sell
              </button>
            </router-link>
          </div>
          <div v-if="user.user_admin >= 2">
            <router-link :to="{ name: 'ModHome' }" class="px-3">
            <button
              class="bg-zinc-600 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
            >
              Moderator
            </button>
          </router-link>
          </div>
          <router-link :to="{ name: 'MsgHome' }" class="px-3">
            <button
              class="bg-zinc-600 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
            >
              Msg
            </button>
          </router-link>
          <router-link :to="{ name: 'account' }" class="px-3">
            <button
              class="bg-zinc-600 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
            >
              {{user.user_name}}
            </button>
          </router-link>
          <router-link :to="{ name: 'userorders' }" class="px-3">
            <button
              class="bg-zinc-600 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
            >
              Orders
            </button>
          </router-link>

          <button
            class="bg-zinc-600 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
            type="button"
            @click="logout"
          >
            Logout
          </button>
        </div>

        <div v-else class="flex gap-2">
          <router-link :to="{ name: 'login' }">
            <button
              class="bg-zinc-600 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </router-link>
          <router-link :to="{ name: 'register' }">
            <button
              class="bg-zinc-600 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
          </router-link>
        </div>
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
      this.$router.push({
              name: "home",
            });
    },
  },
});
</script>
