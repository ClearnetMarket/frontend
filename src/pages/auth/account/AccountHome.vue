<template>
  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />

  <div v-if="user">
    <MainHeaderVendor v-show="user.user_admin == 1" />
  </div>
  <!-- Top Stuff-->
  <div class="container h-screen max-w-7xl mx-auto px-10">
    <!-- Container-->
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

    <div class="grid grid-cols-1 bg-white rounded-md p-6">
      <div class="text-[24px]">My Account</div>
    </div>

    <!-- END Top Stuff-->

    <div class="grid sm:grid-cols-1 md:grid-cols-3 gap-5 my-3">
      <router-link :to="{ name: 'defaultaddress' }">
      <div
        class="col-span-1 border border-1 rounded-md p-5 hover:bg-gray-100"
 
        style="cursor: pointer"
      >
        <div class="grid grid-cols-4 grid-rows-2">
          <div class="col-span-1 row-span-2">Icon</div>
          <div class="col-span-3 row-span-1 text-[20px]">Orders</div>
          <div class="col-span-3 row-span-1 text-[14px] text-gray-600">
            View your orders
          </div>
        </div>
      </div>
      </router-link>
      <router-link :to="{ name: 'changepassword' }">
      <div
        class="col-span-1 border border-1 rounded-md p-5 hover:bg-gray-100"
        style="cursor: pointer"
      >
        <div class="grid grid-cols-4 grid-rows-2">
          <div class="col-span-1 row-span-2">Icon</div>
          <div class="col-span-3 row-span-1 text-[20px]">Account Password</div>
          <div class="col-span-3 row-span-1 text-[14px] text-gray-600">
            Change Account Password
          </div>
        </div>
      </div>
      </router-link>
      <router-link :to="{ name: 'changepin' }">
      <div
        class="border border-1 rounded-md p-5 hover:bg-gray-100"
        style="cursor: pointer"
      >
        <div class="grid grid-cols-4 grid-rows-2">
          <div class="col-span-1 row-span-2">Icon</div>
          <div class="col-span-3 row-span-1 text-[20px]">Account Pin</div>
          <div class="col-span-3 row-span-1 text-[14px] text-gray-600">
            Change Wallet Pin
          </div>
        </div>
      </div>
        </router-link>

  

 
        <router-link :to="{ name: 'profile' }">
      <div
        class="border border-1 rounded-md p-5 hover:bg-gray-100"
        style="cursor: pointer"
      >
        <div class="grid grid-cols-4 grid-rows-2">
          <div class="col-span-1 row-span-2">Icon</div>
          <div class="col-span-3 row-span-1 text-[20px]">Ratings</div>
          <div class="col-span-3 row-span-1 text-[14px] text-gray-600">
            View my ratings
          </div>
        </div>
      </div>
      </router-link>
      <router-link :to="{ name: 'profile' }">
      <div
        class="border border-1 rounded-md p-5 hover:bg-gray-100"
        style="cursor: pointer"
      >
        <div class="grid grid-cols-4 grid-rows-2">
          <div class="col-span-1 row-span-2">Icon</div>
          <div class="col-span-3 row-span-1 text-[20px]">Profile</div>
          <div class="col-span-3 row-span-1 text-[14px] text-gray-600">
            Change Profile Info
          </div>
        </div>
      </div>
      </router-link>
      <router-link :to="{ name: 'defaultaddress' }">
      <div
        class="border border-1 rounded-md p-5 hover:bg-gray-100"
        style="cursor: pointer"
      >
        <div class="grid grid-cols-4 grid-rows-2">
          <div class="col-span-1 row-span-2">Icon</div>
          <div class="col-span-3 row-span-1 text-[20px]">Messages</div>
          <div class="col-span-3 row-span-1 text-[14px] text-gray-600">
            View Messages
          </div>
        </div>
      </div>
      </router-link>
      <router-link :to="{ name: 'defaultaddress' }">
      <div class="border border-1 rounded-md p-5 hover:bg-gray-100" style="cursor: pointer">
        <div class="grid grid-cols-4 grid-rows-2">
          <div class="col-span-1 row-span-2">Icon</div>
          <div class="col-span-3 row-span-1 text-[20px]">My Address</div>
          <div class="col-span-3 row-span-1 text-[14px] text-gray-600">
            Default Shipping Address
          </div>
        </div>
      </div>
      </router-link>
    </div>
    
  </div>
  <!-- END container-->
  <MainFooter />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { ref } from "vue";
import MainHeaderTop from "../../../layouts/headers/MainHeaderTop.vue";
import MainHeaderMid from "../../../layouts/headers/MainHeaderMid.vue";
import MainHeaderBottom from "../../../layouts/headers/MainHeaderBottom.vue";
import MainHeaderVendor from "../../../layouts/headers/MainHeaderVendor.vue";
import MainFooter from "../../../layouts/footers/FooterMain.vue";
import authHeader from "../../../services/auth.header";

export default defineComponent({
  name: "Login",
  components: {
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainHeaderVendor,
    MainFooter,
  },

  data() {
    return {};
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
        }
      });
    },
    async userprofile() {
      await axios({
        method: "get",
        url: "/profile/profile_home",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if ((response.status = 200)) {
        }
      });
    },
  },
});
</script>

<style type="ts" scoped></style>
