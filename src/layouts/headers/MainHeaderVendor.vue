<template>
  <div class="text-center font-bold mt-2 flex justify-center">
    <div v-if="disputes">
      <button
        class="flex py-2 px-4 shadow-md no-underline rounded-full text-white font-sans hover:text-white text-sm bg-orange-600 hover:bg-zinc-400 focus:outline-none active:shadow-none mr-2"
      >
        <div class="px-2">{{ disputes }}</div>
        <div class>Disputes</div>
      </button>
    </div>
    <div v-else>
      <button
        class="py-2 px-4 shadow-md no-underline rounded-full text-white font-sans text-sm hover:text-white bg-zinc-600 hover:bg-zinc-400 focus:outline-none active:shadow-none mr-2"
      >
        Disputes
      </button>
    </div>

    <div v-if="returns">
      <button
        class="flex py-2 px-4 shadow-md no-underline rounded-full text-white font-sans text-sm hover:text-white bg-orange-600 hover:bg-zinc-400 focus:outline-none active:shadow-none mr-2"
      >
        <div class="px-2">{{ returns }}</div>
        <div class>Returns</div>
      </button>
    </div>
    <div v-else>
      <button
        class="py-2 px-4 shadow-md no-underline rounded-full text-white font-sans text-sm hover:text-white bg-zinc-600 hover:bg-zinc-400focus:outline-none active:shadow-none mr-2"
      >
        Returns
      </button>
    </div>

    <div v-if="feedback" class="q-mt-none">
      <button
        class="flex py-2 px-4 shadow-md text-sm no-underline rounded-full bg-orange-600 hover:bg-zinc-400 text-white font-sans hover:text-white focus:outline-none active:shadow-none mr-2"
      >
        <div class="px-2">{{ feedback }}</div>
        <div class>Feedback</div>
      </button>
    </div>
    <div v-else>
      <button
        class="py-2 px-4 shadow-md no-underline rounded-full text-white font-sans text-sm hover:text-white bg-zinc-600 hover:bg-zinc-400 focus:outline-none active:shadow-none mr-2"
      >
        Feedback
      </button>
    </div>

    <div v-if="orders">
      <button
        class="flex py-2 px-4 shadow-md no-underline rounded-full bg-orange-600 hover:bg-zinc-400 hover:text-white text-white font-sans text-sm btn-primary focus:outline-none active:shadow-none mr-2"
      >
        <div class="px-2">{{ orders }}</div>
        <div class>Orders</div>
      </button>
    </div>
    <div v-else>
      <button
        class="py-2 px-4 shadow-md no-underline rounded-full text-white font-sans text-sm hover:text-white bg-zinc-600 hover:bg-zinc-400 focus:outline-none active:shadow-none mr-2"
      >
        Orders
      </button>
    </div>
    <router-link :to="{ name: 'forsale' }">
      <button
        class="py-2 px-4 shadow-md no-underline rounded-full text-white font-sans text-sm hover:text-white bg-zinc-600 hover:bg-zinc-400 focus:outline-none active:shadow-none mr-2"
      >
        My items
      </button>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import axios from "axios";
import authHeader from "../../services/auth.header";
export default defineComponent({
  name: "MainHeaderVendor",

  data() {
    return {
      login: null,
      user: "",
      orders: "",
      disputes: "",
      feedback: "",
      returns: "",
    };
  },

  mounted() {
    this.userstatus();
  },

  methods: {
    async userstatus() {
      await axios({
        method: "get",
        url: "/auth/whoami",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if ((response.status = 200)) {
          let user = response.data.user;
          let user_auth_status = response.data.login;
          if (user.user_admin > 0 && user_auth_status == true) {
            this.getvendorfeedback();
            this.getvendordisputes();
            this.getvendororders();
            this.getvendorreturns();
          }
        } else {
          console.log("err");
        }
      });
    },
    async getvendorfeedback() {
      await axios({
        method: "get",
        url: "/vendor/new-feedback-count",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.data) {
          this.feedback = response.data.count;
        }
      });
    },
    async getvendordisputes() {
      await axios({
        method: "get",
        url: "/vendor/new-disputes-count",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.data) {
          this.disputes = response.data.count;
        }
      });
    },
    async getvendororders() {
      await axios({
        method: "get",
        url: "/vendor/new-orders-count",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.data) {
          this.orders = response.data.count;
        }
      });
    },
    async getvendorreturns() {
      await axios({
        method: "get",
        url: "/vendor/returns-count",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.data) {
          this.returns = response.data.count;
        }
      });
    },
  },
});
</script>
