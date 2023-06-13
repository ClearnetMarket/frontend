
<template>
  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />

  <div v-if="user">
    <MainHeaderVendor v-show="user.user_admin === 1" />
  </div>
  <div class="wrapper">
    <!-- Top Stuff-->
    <div class="container max-w-4xl mx-auto  text-white">
      <!-- Container-->
      <div class="mt-5 mb-5 ">
        <nav class="rounded-md w-full">
          <ol class="list-reset flex">
            <li>
              <router-link :to="{ name: 'home' }">
                <a class="text-primary hover:text-primary ">Home</a>
              </router-link>
            </li>
            <li>
              <span class="text-gray-500 mx-2">/</span>
            </li>
            <li>
              <router-link :to="{ name: 'account' }">
                <a class="text-primary hover:text-primary ">Account</a>
              </router-link>
            </li>
            <li>
              <span class="text-gray-500 mx-2">/</span>
            </li>
          </ol>
        </nav>
      </div>

      <form class="bg-neutral  rounded-md px-8 pt-6 pb-8 mb-4  mx-auto max-w-2xl" @submit.prevent="onSubmit">
        <div class="grid grid-cols-12 md:gap-4">
          <div class="col-span-12 mb-4 text-center text-[28px]">
            Set a default Address
          </div>
          <label class="col-span-12 text-white text-sm font-bold mb-2" for="">Country</label>

          <select class="mb-5 md:mb-0 col-span-12  shadow form-select appearance-none block w-full px-3 py-1.5 text-base 
            font-normal focus:shadow-outline border-gray-500  bg-white hover:bg-white focus:bg-white
             bg-clip-padding bg-no-repeat border rounded transition ease-in-out m-0 text-black
              focus:text-gray-900  focus:border-blue-600 focus:outline-none" aria-label="Default select example "
            v-model="ChangeAddressForm.country">
            <option class="text-black" v-for="(country, index) in countryList" :key="index" :value="country.value">
              {{ country.name }}
            </option>
          </select>
          <div class="col-span-12 mb-5 md:mb-0">
            <label class="block text-white text-sm font-bold mb-2">Full Name or Business Name</label>
            <input v-model="ChangeAddressForm.address_name"
              class="shadow appearance-none border text-black border-gray-500 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="address_name" type="text" placeholder="Enter Full Name" />
          </div>
          <div class="col-span-12 mb-5 md:mb-0">
            <label class="block text-white text-sm font-bold mb-2">Street Address</label>
            <input v-model="ChangeAddressForm.address"
              class="text-black shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="address" type="text" placeholder="Address" />
            <span v-if="v$.ChangeAddressForm.address.$error" class="text-red-600 text-center">
            </span>
          </div>
          <div class="col-span-12 mb-5 md:mb-0">
            <input v-model="ChangeAddressForm.apt"
              class="text-black shadow appearance-none border border-gray-500 rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              id="apt" type="text" placeholder="Apt, suite, unit, building, floor, etc" />
          </div>
          <div class="col-span-12 md:col-span-4 mb-5 md:mb-0">
            <label class="block text-white text-sm font-bold mb-2">City</label>
            <input v-model="ChangeAddressForm.city"
              class="text-black shadow appearance-none border border-gray-500 rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              id="city" type="text" placeholder="City" />
            <span v-if="v$.ChangeAddressForm.city.$error" class="text-red-600 text-center">
            </span>
          </div>
          <div class="col-span-12 md:col-span-4 mb-5 md:mb-0">
            <label class="block text-white text-sm font-bold mb-2">State</label>
            <input v-model="ChangeAddressForm.stateorprovence"
              class="text-black shadow appearance-none border border-gray-500 rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              id="state" type="text" placeholder="State or Provence" />
            <span v-if="v$.ChangeAddressForm.stateorprovence.$error" class="text-red-600 text-center">
            </span>
          </div>
          <div class="col-span-12 md:col-span-4 mb-5 md:mb-0">
            <label class="block text-white text-sm font-bold mb-2">Zip Code</label>
            <input v-model="ChangeAddressForm.zip"
              class="text-black shadow appearance-none border border-gray-500 rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              id="zip" type="text" placeholder="Zip" />
            <span v-if="v$.ChangeAddressForm.zip.$error" class="text-red-600 text-center">
            </span>
          </div>
          <div class="col-span-12 md:col-span-12">
            <label class="block text-white text-sm font-bold mb-2">Optional Address</label>
            <textarea v-model="ChangeAddressForm.message"
              class="text-black shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="message" type="textfield" placeholder="Optional instructions" />
          </div>

          <div class="col-span-12 md:col-span-12 flex justify-center mt-5 mb-5">
            <button
              class="bg-secondary hover:bg-primary rounded-md font-semibold py-3 text-sm text-white uppercase w-full">
              Set Default Address
            </button>
          </div>
        </div>
      </form>
      <!-- END Top Stuff-->
      <div class="grid sm:grid-cols-1 md:grid-cols-3 gap-5 my-3"></div>
    </div>
  </div>
  <!-- END container-->
  <MainFooter />
</template>

<script lang="ts">
import axios from "axios"
import { defineComponent } from "vue"
import { notify } from "@kyvg/vue3-notification";
import useValidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
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

  data () {
    return {
      countryList: [],
      user: null,
      v$: useValidate(),
      ChangeAddressForm: {
        countryList: [],
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
  validations () {
    return {
      ChangeAddressForm: {
        address: { required, minLength: minLength(6) },
        city: { required, minLength: minLength(2) },
        stateorprovence: { required, minLength: minLength(2) },
        zip: { required, minLength: minLength(2) },
      },
    };
  },
  created () {
    this.userstatus()
  },

  mounted () {
    this.getCountryList();
    this.getcurrentshipping();
  },

  methods: {
    userstatus () {
      axios({
        method: "get",
        url: "/auth/whoami",
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if (response.data.login == true) {
            this.user = response.data.user;
          }
        })
        .catch(() => {
          this.$router.push({ name: "login" });
        });
    },

    addusershipping (payLoad: {
      country: string;
      address: string;
      address_name: string;
      apt: string;
      city: string;
      stateorprovence: string;
      zip: string;
      message: string;
    }) {
      axios({
        method: "put",
        url: "/info/defaultaddress",
        data: payLoad,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if (response.data.success) {
            notify({
              title: "Updated Address",
              text: "Success!",
              type: "success",
            });
            this.$router.push("/account");
          }
        });
    },
    getcurrentshipping () {
      axios({
        method: "get",
        url: "/info/getdefaultaddress",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.data.success) {
          this.ChangeAddressForm.country = response.data.country;
          this.ChangeAddressForm.address_name = response.data.address_name;
          this.ChangeAddressForm.address = response.data.address;
          this.ChangeAddressForm.apt = response.data.apt;
          this.ChangeAddressForm.city = response.data.city;
          this.ChangeAddressForm.stateorprovence = response.data.state_or_provence;
          this.ChangeAddressForm.zip = response.data.zip;
          this.ChangeAddressForm.message = response.data.message;
        }
      });
    },

    getCountryList () {
      const path = "/auth/query/country";
      axios
        .get(path, { withCredentials: true })
        .then((response) => {
          this.countryList = response.data;
        })

    },

    onSubmit () {
      let payLoad = {
        country: this.ChangeAddressForm.country,
        address: this.ChangeAddressForm.address,
        address_name: this.ChangeAddressForm.address_name,
        apt: this.ChangeAddressForm.apt,
        city: this.ChangeAddressForm.city,
        stateorprovence: this.ChangeAddressForm.stateorprovence,
        zip: this.ChangeAddressForm.zip,
        message: this.ChangeAddressForm.message,
      };
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
        this.addusershipping(payLoad);
      }
    },
  },
});
</script>


