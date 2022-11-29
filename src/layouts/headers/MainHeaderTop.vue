<template>
  <div class="nav bg-zinc-700 py-2 ">
    <div class="container gap-x-0 max-w-7xl mx-auto text-center">
      <div class="grid md:grid-cols-1 lg:grid-cols-2">
        <div class="invisible lg:visible col-span-1">
          <div class="flex flex-wrap  ml-5 text-white font-bold">
            <div class="px-3">English</div>
            <div class="px-3">USD</div>
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex flex-wrap lg:justify-end md:justify-evenly">
            <div v-if="user">
              <div v-if="user.user_admin >= 2">
                <router-link :to="{ name: 'ModHome' }" class="px-3">
                  <button
                    class="hover:bg-blue-600 text-white hover:text-white py-1 px-3 rounded focus:outline-none focus:shadow-outline font-bold"
                  >
                    Moderator
                  </button>
                </router-link>
              </div>
              <router-link :to="{ name: 'sell' }">
                <button
                  class="hover:bg-blue-600 text-white hover:text-white py-1 px-3 rounded focus:outline-none focus:shadow-outline mx-3 font-bold"
                >
                  Sell
                </button>
              </router-link>

              <router-link :to="{ name: 'MsgHome' }" class="px-3">
                <button
                  class="hover:bg-blue-600 text-white hover:text-white py-1 px-3 rounded focus:outline-none focus:shadow-outline font-bold"
                >
                  Msg
                </button>
              </router-link>
              <router-link :to="{ name: 'account' }" class="px-3">
                <button
                  class="hover:bg-blue-600 text-white hover:text-white py-1 px-3 rounded focus:outline-none focus:shadow-outline font-bold"
                >
                  {{ user.user_name }}
                </button>
              </router-link>
              <router-link :to="{ name: 'userorders' }" class="px-3">
                <button
                  class="hover:bg-blue-600 text-white hover:text-white py-1 px-3 rounded focus:outline-none focus:shadow-outline font-bold"
                >
                  Orders
                </button>
              </router-link>


            </div>

            <div v-else class="flex gap-2">
              <router-link :to="{ name: 'login' }">
                <button
                  class="bg-zinc-600 hover:bg-zinc-400 text-white py-1 px-3 rounded focus:outline-none focus:shadow-outline font-bold"
                >
                  Login
                </button>
              </router-link>
              <router-link :to="{ name: 'register' }">
                <button
                  class="bg-zinc-600 hover:bg-zinc-400 text-white py-1 px-3 rounded focus:outline-none focus:shadow-outline font-bold"
                >
                  Sign Up
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import axios from "axios";
import authHeader from "../../services/auth.header";

export default defineComponent({
  name: "MainHeaderTop",
  mounted() {
    this.userstatus();
  },
  data() {
    return {
      user: null,
    };
  },
  methods: {
    userstatus() {
      axios({
        method: "get",
        url: "/auth/whoami",
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if ((response.status = 200)) {
            console.log(response);
            this.user = response.data.user;
          }
        })
        .catch(() => {
          this.user = null;
        });
    },
    logout() {
      localStorage.removeItem("auth_token");
      localStorage.clear();
      this.$store.dispatch("user", null);
      this.userstatus();
      this.$router.push({ name: "home" });
    },
  },
});
</script>
