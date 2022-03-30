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
            <router-link :to="{ name: 'account' }">
              <a class="text-blue-600 hover:text-blue-700">Account</a>
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
        <div class="col-span-12 mb-4 text-center text-[28px] text-zinc-600">
          Set a default Address
        </div>
        <label class="col-span-12 text-gray-700 text-sm font-bold mb-2" for=""
          >Country</label
        >
        <select
          class="col-span-12 shadow form-select appearance-none block w-full px-3 py-1.5 text-base font-normal focus:shadow-outline border-gray-500 text-gray-700 bg-white bg-clip-padding 
          bg-no-repeat border rounded transition ease-in-out m-0 focus:text-gray-900 focus:bg-white focus:border-blue-600 focus:outline-none"
          aria-label="Default select example"
          v-model="ChangeAddressForm.country"
        >
          <option
            class="text-gray-700"
            v-for="(country, index) in countryList"
            :key="index"
            :value="country.value"
          >
            {{ country.name }}
          </option>
        </select>
        <div class="col-span-12">
          <label class="block text-gray-700 text-sm font-bold mb-2"
            >Full Name or Business Name</label
          >
          <input
            v-model="ChangeAddressForm.address_name"
            class="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address_name"
            type="text"
            placeholder="Enter Full Name"
          />
        </div>
        <div class="col-span-12">
          <label class="block text-gray-700 text-sm font-bold mb-2"
            >Street Address</label
          >
          <input
            v-model="ChangeAddressForm.address"
            class="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address"
            type="text"
            placeholder="Address"
          />
        </div>
        <div class="col-span-12">
          <input
            v-model="ChangeAddressForm.apt"
            class="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="apt"
            type="text"
            placeholder="Apt, suite, unit, building, floor, etc"
          />
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
        <div class="col-span-12">
          <label class="block text-gray-700 text-sm font-bold mb-2"
            >Optional Address</label
          >
          <textarea
            v-model="ChangeAddressForm.message"
            class="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="message"
            type="textfield"
            placeholder="Optional instructions"
          />
        </div>

        <div class="col-span-4 col-start-5 mt-5 mb-5">
          <button
            class="bg-yellow-500 rounded-md font-semibold hover:bg-yellow-600 py-3 text-sm text-black uppercase w-full"
          >
            Set Default Address
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

export default defineComponent({
  name: "defaultaddress",
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
        countryList: "",
        address_name: "",
        country: "",
        address: "",
        apt: "",
        city: "",
        stateorprovence: "",
        zip: "",
        message: "",
      },
    };
  },

  computed: {
    ...mapGetters(["user"]),
  },

  mounted() {
    this.getCountryList();
    this.getcurrentshipping();
  },

  methods: {
    async addusershipping(payLoad: {
      country: string;
      address: string;
      address_name: string;
      apt: string;
      city: string;
      stateorprovence: string;
      zip: string;
      message: string;
    }) {
      await axios({
        method: "put",
        url: "/info/defaultaddress",
        data: payLoad,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if ((response.status = 200)) {
        }
      });
    },
    async getcurrentshipping() {
      await axios({
        method: "get",
        url: "/info/getdefaultaddress",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if ((response.status = 200)) {
          this.ChangeAddressForm.country = response.data.country;
          this.ChangeAddressForm.address_name = response.data.address_name;
          this.ChangeAddressForm.address = response.data.address;
          this.ChangeAddressForm.apt = response.data.apt;
          this.ChangeAddressForm.city = response.data.city;
          this.ChangeAddressForm.address = response.data.address;
          this.ChangeAddressForm.stateorprovence = response.data.state_or_provence;
          this.ChangeAddressForm.zip = response.data.zip;
          this.ChangeAddressForm.message = response.data.message;
         
        }
      });
    },

    async getCountryList() {
      const path = "/auth/query/country";
      await axios
        .get(path, { withCredentials: true })
        .then((response) => {
          this.countryList = response.data;
        })
        .catch((error) => {});
    },

    async onSubmit() {
      const payLoad = {
        country: this.ChangeAddressForm.country,
        address: this.ChangeAddressForm.address,
        address_name: this.ChangeAddressForm.address_name,
        apt: this.ChangeAddressForm.apt,
        city: this.ChangeAddressForm.city,
        stateorprovence: this.ChangeAddressForm.stateorprovence,
        zip: this.ChangeAddressForm.zip,
        message: this.ChangeAddressForm.message,
      };
      await this.addusershipping(payLoad);
    },
  },
});
</script>

<style type="ts" scoped></style>
