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
          <li>
            <router-link :to="{ name: 'forsale' }">
              <a class="text-blue-600 hover:text-blue-700">My Items</a>
            </router-link>
          </li>
          <li>
            <span class="text-gray-500 mx-2">/</span>
          </li>
        </ol>
      </nav>
    </div>

    <form
      class="shadow-md border-2 rounded-md px-8 pt-6 pb-8 mb-4 w-full mx-auto max-w-2xl"
      @submit.prevent="onSubmit"
    >
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 mb-4 text-center text-[20px] text-zinc-600">
          Set your address to help customers find nearby vendors
        </div>

        <div class="col-span-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">City</label>
          <input
            v-model="ChangeAddressForm.city"
            class="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="city"
            type="text"
            placeholder="City"
          />
        </div>
        <div class="col-span-4">
          <label class="block text-gray-700 text-sm font-bold mb-2"
            >State</label
          >
          <input
            v-model="ChangeAddressForm.stateorprovence"
            class="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="state"
            type="text"
            placeholder="State or Provence"
          />
        </div>
        <div class="col-span-4">
          <label class="block text-gray-700 text-sm font-bold mb-2"
            >Zip Code</label
          >
          <input
            v-model="ChangeAddressForm.zip"
            class="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="zip"
            type="text"
            placeholder="Zip"
          />
        </div>

        <div class="col-span-4 col-start-5 mt-5 mb-5">
          <button
            class="bg-yellow-500 rounded-md font-semibold hover:bg-yellow-600 py-3 text-sm text-black uppercase w-full"
          >
            Add Address
          </button>
        </div>
      </div>
    </form>

    <!-- END Top Stuff-->

    <div class="grid sm:grid-cols-1 md:grid-cols-3 gap-5 my-3"></div>
  </div>
  <!-- END container-->
  <MainFooter />
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
import { ref } from "vue";
import { mapGetters } from "vuex";
import MainHeaderTop from "../../../layouts/headers/MainHeaderTop.vue";
import MainHeaderMid from "../../../layouts/headers/MainHeaderMid.vue";
import MainHeaderBottom from "../../../layouts/headers/MainHeaderBottom.vue";
import MainHeaderVendor from "../../../layouts/headers/MainHeaderVendor.vue";
import MainFooter from "../../../layouts/footers/FooterMain.vue";
import authHeader from "../../../services/auth.header";
import { notify } from "@kyvg/vue3-notification";


export default defineComponent({
  name: "vendoraddress",
  components: {
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainHeaderVendor,
    MainFooter,
  },

  data() {
    return {
      ChangeAddressForm: {
        city: "",
        stateorprovence: "",
        zip: "",
      },
    };
  },

  computed: {
    ...mapGetters(["user"]),
  },

  mounted() {
    this.getcurrentshipping();
  },

  methods: {
    async addusershipping(payLoad: {
      city: string;
      stateorprovence: string;
      zip: string;
    }) {
      await axios({
        method: "put",
        url: "/vendor/update/defaultaddress",
        data: payLoad,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if ((response.status = 200)) {
              notify({
              title: "Authorization",
              text: "Success!",
              type: "success",
            });
          this.$router.push({ name: "forsale" });
        }
      });
    },

    async getcurrentshipping() {
      await axios({
        method: "get",
        url: "/vendor/get/defaultaddress",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if ((response.status = 200)) {
          this.ChangeAddressForm.city = response.data.city;
          this.ChangeAddressForm.stateorprovence =
            response.data.state_or_provence;
          this.ChangeAddressForm.zip = response.data.zip;

        }
      })
       .catch((error) => {
          
        });
    },

    async onSubmit() {
      const payLoad = {
        city: this.ChangeAddressForm.city,
        stateorprovence: this.ChangeAddressForm.stateorprovence,
        zip: this.ChangeAddressForm.zip,
      };

      await this.addusershipping(payLoad);
    },
  },
});
</script>

<style type="ts" scoped></style>
