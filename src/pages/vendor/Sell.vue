
<template>

  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />

  <div v-if="user">
    <MainHeaderVendor v-show="user.user_admin === 1" />
  </div>

  <div class="container max-w-7xl mx-auto px-10 wrapper mb-10 overflow-hidden" v-if="loaded">
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
    <img alt="" src="../../assets/vendor/tsr.jpg" />
    <div class="flex justify-center my-10">
      <div class="text-center text-[20px]">
        <h4>Vendor Signup</h4>
      </div>
    </div>
    <div class="flex mb-10 text-center">
      We can create a better market, built on user reputation and privacy. Start
      selling today, and bring crypto ecommerce to your part of the world.
    </div>
    <div class="md:flex text-center gap-5">
      <div class="flex-1 bg-white rounded-md border border-1 p-5">
        <div class="text-[20px]">No bullshit</div>
        <div class="flex mb-10 text-center">
          Selling without any hidden fees. No signup or annual fee. No paypal or
          credit card fees. 3% fee on all items.
        </div>
      </div>

      <div class="flex-1 bg-white rounded-md border border-1 p-5">
        <div class="text-[20px]">Privacy</div>
        <div class="flex mb-10 text-center">
          Sell with privacy. We don't store your personal information.
           Sell with confidence that your
          information is never sold, distributed, or used without your
          knowledge.
        </div>
      </div>

      <div class="flex-1 bg-white rounded-md border border-1 p-5">
        <div class="text-[20px]">No banks</div>
        <div class="flex mb-10 text-center">
          Anyone anywhere can sell. No credit cards, banks, or third party
          payment systems.
        </div>
      </div>
    </div>

    <div class="flex mx-auto justify-center text-center gap-5 mt-10">
      <form method="post" @submit.prevent="onSubmit">
        <div class="flex flex-col">
          <div class="">
            <div class="flex text-gray-700 text-sm font-bold">
              I accept the terms of becoming a vendor
            </div>
            <router-link :to="{ name: 'policies' }">
              <div class="text-blue-600 hover:text-blue-500 text-sm font-bold">
                Vendor Agreement
              </div>
            </router-link>
          </div>
          <div class="">
            <input type="checkbox" v-model="accept" name="acceptTerms" />
            <span v-if="v$.accept.$error" class="text-red-600 text-center">
              {{ v$.accept.$errors[0].$message }}
            </span>
          </div>
        </div>
        <div class="mt-5">
          <button
            class="bg-zinc-600 hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit">
            Become Vendor
          </button>
        </div>
      </form>
    </div>
  </div>

  <MainFooter />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { ref } from "vue";
import { notify } from "@kyvg/vue3-notification";
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import authHeader from "../../services/auth.header";
import MainHeaderTop from "../../layouts/headers/MainHeaderTop.vue";
import MainHeaderMid from "../../layouts/headers/MainHeaderMid.vue";
import MainHeaderBottom from "../../layouts/headers/MainHeaderBottom.vue";
import MainHeaderVendor from "../../layouts/headers/MainHeaderVendor.vue";
import MainFooter from "../../layouts/footers/FooterMain.vue";

export default defineComponent({
  name: "sell",
  components: {
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainHeaderVendor,
    MainFooter,
  },

  mounted () {
    this.userstatus();
  },
  data () {
    return {
      v$: useValidate(),
      user: null,
      accept: ref(false),
      user_admin: 0,
      loaded: false
    }
  },

  validations () {
    return {
      accept: { required },
    }
  },
  methods: {
    userstatus () {
      axios({
        method: "get",
        url: "/auth/whoami",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if ((response.status = 200)) {
          this.user_admin = response.data.user.user_admin;

          if (this.user_admin == 1) {
            this.$router.push({ name: "forsale" });
            this.loaded = false
          }
          else {
            this.loaded = true
          }
        }
        else {
          this.$router.push({ name: "login" });
        }
      });
    },
    becomevendor (payLoad: { accept: boolean }) {
      axios({
        method: "post",
        url: "/vendor/becomevendor",
        data: payLoad,
        headers: authHeader(),
      }).then((response) => {
        if ((response.status = 200)) {
          localStorage.setItem("auth_user", response.data.user);
          notify({
            title: "Message Center",
            text: "Welcome to Freeport.  You are now a vendor!",
            type: "success",
          });
          this.$router.push({ name: "forsale" });
        }
      });
    },
    onSubmit () {
      const payLoad = { accept: this.accept }
      this.v$.$validate();

      if (this.v$.$error) {

        notify({
          title: "Signup Error",
          text: "You must read And accept agreement",
          type: "error",
        });
      } else {
        
        this.becomevendor(payLoad);
      }
    },
  },
});
</script>

<style>

</style>
