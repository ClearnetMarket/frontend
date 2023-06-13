<template>
  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />

  <div v-if="user">
    <MainHeaderVendor v-show="user.user_admin === 1" />
  </div>
  <div class="wrapper">
    <div class="container max-w-3xl mx-auto px-2  pb-72 text-white">
      <div class="mt-5 mb-5">
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
              <router-link :to="{ name: 'forsale' }">
                <a class="text-primary hover:text-primary ">Items for Sale</a>
              </router-link>
            </li>
            <li>
              <span class="text-gray-500 mx-2">/</span>
            </li>
          </ol>
        </nav>
      </div>
      <div class="grid grid-cols-1 rounded-md p-6 max-w-3xl mx-auto bg-neutral">
        <div class="text-[18px] text-center ">Item# {{ item_id }}</div>
        <UploadImages :item_id="item_id" />
        <form class="rounded-md px-8 pt-6 pb-8 mb-4 w-full" enctype="multipart/form-data" @submit.prevent="onSubmit">
          <p v-for="error of v$.$errors" :key="error.$uid">
            {{ error.$message }}
          </p>
          <div class="border-b pb-10 ">
            <div class="text-[20px] mt-5 mb-5 font-bold">General Info</div>
            <div class="mb-4">
              <label class="block text-white text-sm font-bold mb-2">Item Title</label>
              <input v-model="CreateItemForm.basicInfo.item_title"
                class="rounded w-full py-2 px-3 input-primary text-black" id="item_title" type="text"
                placeholder="Enter title of your item .." />
              <span v-if="v$.CreateItemForm.basicInfo.item_title.$error" class="text-red-600 text-center">
                {{ v$.CreateItemForm.basicInfo.item_title.$errors[0].$message }}
              </span>
            </div>
            <div class="flex gap-5">
              <div class="flex-1 mb-4">
                <label class="block text-white text-sm font-bold mb-2">Category</label>
                <select class="rounded w-full py-2 px-3 input-primary text-black focus:bg-neutral"
                  aria-label="Default select example" id="category" v-model="CreateItemForm.basicInfo.category_id_0">
                  <option class="text-white" v-for="(category, index) in categoryList" :key="index"
                    :value="category.value">
                    {{ category.name }}
                  </option>
                </select>
                <span v-if="v$.CreateItemForm.basicInfo.category_id_0.$error" class="text-red-600 text-center">
                  {{ v$.CreateItemForm.basicInfo.category_id_0.$errors[0].$message }}
                </span>

              </div>
              <div class="flex-1 mb-4">
                <label class="block text-white text-sm font-bold mb-2">Condition</label>
                <select class="rounded w-full py-2 px-3 input-primary text-black focus:bg-neutral"
                  aria-label="Default select example" id="condition" v-model="CreateItemForm.basicInfo.item_condition">
                  <option class="text-white" v-for="(condition, index) in conditionList" :key="index"
                    :value="condition.value">
                    {{ condition.text }}
                  </option>
                </select>
                <span v-if="v$.CreateItemForm.basicInfo.item_condition.$error" class="text-red-600 text-center">
                  {{ v$.CreateItemForm.basicInfo.item_condition.$errors[0].$message }}
                </span>
              </div>
            </div>
          </div>
          <div class="border-b pb-10 ">
            <div class="text-[20px] mt-5 mb-5 font-bold">Pricing</div>
            <div class="flex gap-5">
              <div class="mb-4 flex-1">
                <label class="block text-white text-sm font-bold mb-2">Item Price</label>
                <label class="block text-white text-sm mb-2 text-[11px]">Item Price in your local currency per
                  item</label>
                <input v-model="CreateItemForm.pricingInfo.price"
                  class="rounded w-full py-2 px-3 input-primary text-black" id="price"
                  placeholder="Price in your currency..." @keypress="onlyNumberWithDot" />
                <span v-if="v$.CreateItemForm.pricingInfo.price.$error" class="text-red-600 text-center">
                  {{ v$.CreateItemForm.pricingInfo.price.$errors[0].$message }}
                </span>
              </div>
              <div class="mb-4 flex-1">
                <label class="block text-white text-sm font-bold mb-2">Item Count</label>
                <label class="block text-white text-sm mb-2 text-[11px]">How many you have for sale</label>
                <input v-model="CreateItemForm.pricingInfo.item_count"
                  class="rounded w-full py-2 px-3 input-primary text-black" id="count" type="number" min="0"
                  placeholder="How many your are selling ..." @keypress="onlyNumber" />
                <span v-if="v$.CreateItemForm.pricingInfo.item_count.$error" class="text-red-600 text-center">
                  {{ v$.CreateItemForm.pricingInfo.item_count.$errors[0].$message }}
                </span>
              </div>
            </div>
            <div class="flex gap-5">
              <div class="mb-4 flex-1">
                <label class="block text-white text-sm font-bold mb-2">Accept Bitcoin</label>
                <input type="checkbox" id="digital_currency_1" v-model="CreateItemForm.pricingInfo.digital_currency_1" />
              </div>
              <div class="mb-4 flex-1">
                <label class="block text-white text-sm font-bold mb-2">Accept Bitcoin Cash</label>
                <input type="checkbox" id="digital_currency_2" v-model="CreateItemForm.pricingInfo.digital_currency_2" />
              </div>
              <div class="mb-4 flex-1">
                <label class="block text-white text-sm font-bold mb-2">Accept Monero</label>
                <input type="checkbox" id="digital_currency_3" v-model="CreateItemForm.pricingInfo.digital_currency_3" />
              </div>
            </div>
          </div>
          <div class="border-b pb-10">
            <div class="text-[20px] mt-5 mb-5 font-bold ">Description</div>
            <div class="mb-4 flex-1">
              <textarea v-model="CreateItemForm.basicInfo.item_description" id="item_description"
                class="rounded w-full py-2 px-3 input-primary text-black">
              </textarea>
              <span v-if="v$.CreateItemForm.basicInfo.item_description.$error" class="text-red-600 text-center">
                {{ v$.CreateItemForm.basicInfo.item_description.$errors[0].$message }}
              </span>
            </div>
          </div>

          <div class="border-b pb-10">
            <div class="text-[20px] mt-5 mb-5 font-bold ">Shipping</div>
            <div class="mb-4 ">
              <label class="block text-white text-sm font-bold mb-2">International Shipping</label>
              <div class="flex gap-5">
                <div class="flex-1">
                  <input type="checkbox" v-model="CreateItemForm.shippingInfo.international" />
                </div>
              </div>
            </div>
            <div class="mb-4 flex text-center">
              <div class="flex-1">Option</div>
              <div class="flex-1">Shipping Price</div>
              <div class="flex-1">Estimated Days</div>
            </div>
            <div class="mb-4">
              <label class="block text-white text-sm font-bold mb-2">Free Shipping</label>
              <div class="flex gap-5">
                <div class="flex-1">
                  <input type="checkbox" v-model="CreateItemForm.shippingInfo.free_shipping" />
                </div>
                <div class="flex-1"></div>
                <div class="flex-1">
                  <input type="number" placeholder="Estimated Days" min="0"
                    class="rounded w-full py-2 px-3 input-primary text-black"
                    v-model="CreateItemForm.shippingInfo.free_shipping_days" />
                </div>
              </div>
            </div>
            <div class="mb-4">
              <label class="block text-white text-sm font-bold mb-2">Option 1</label>
              <div class="flex gap-5">
                <div class="flex-1">
                  <input type="checkbox" v-model="CreateItemForm.shippingInfo.shipping_2" />
                </div>
                <div class="flex-1">
                  <input type="number" placeholder="Price" min="0"
                    class="rounded w-full py-2 px-3 input-primary text-black"
                    v-model="CreateItemForm.shippingInfo.shipping_2_price" @keypress="onlyNumberWithDot" />
                </div>
                <div class="flex-1">
                  <input type="number" placeholder="Estimated Days" min="0"
                    class="rounded w-full py-2 px-3 input-primary text-black"
                    v-model="CreateItemForm.shippingInfo.shipping_2_days" @keypress="onlyNumber" />
                </div>
              </div>
            </div>
            <div class="mb-4">
              <label class="block text-white text-sm font-bold mb-2">Option 2</label>
              <div class="flex gap-5">
                <div class="flex-1">
                  <input type="checkbox" v-model="CreateItemForm.shippingInfo.shipping_3" />
                </div>
                <div class="flex-1">
                  <input type="number" placeholder="Price" min="0"
                    class="rounded w-full py-2 px-3 input-primary text-black"
                    v-model="CreateItemForm.shippingInfo.shipping_3_price" @keypress="onlyNumberWithDot" />
                </div>
                <div class="flex-1">
                  <input type="number" placeholder="Estimated Days" min="0"
                    class="rounded w-full py-2 px-3 input-primary text-black"
                    v-model="CreateItemForm.shippingInfo.shipping_3_days" @keypress="onlyNumber" />
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-center mt-20">
            <button
              class="bg-primary hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import authHeader from "../../services/auth.header";
import { notify } from "@kyvg/vue3-notification";
import useValidate from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";
import MainHeaderTop from "../../layouts/headers/MainHeaderTop.vue";
import MainHeaderMid from "../../layouts/headers/MainHeaderMid.vue";
import MainHeaderBottom from "../../layouts/headers/MainHeaderBottom.vue";
import MainHeaderVendor from "../../layouts/headers/MainHeaderVendor.vue";
import MainFooter from "../../layouts/footers/FooterMain.vue";
import UploadImages from "./ItemCreation/UploadImages.vue";

export default defineComponent({
  name: "createitem",
  components: {
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainHeaderVendor,
    MainFooter,
    UploadImages,
  },
  created () {
    this.userstatus();
  },
  mounted () {
    this.getItemForSale();
    this.getCategoryList(); // Query Categories
    this.getConditionList(); // Query Conditionlist
    this.getCountryList(); // Query Countries
    this.getFormData();
    const isSelectDisabled = ref(false); // Form Toggle
    return { isSelectDisabled }; // Form Toggle
  },

  data () {
    return {
      v$: useValidate(),
      user: null,
      item_id: null,
      categoryList: [],
      conditionList: [],
      countryList: [],
      marketitem: null,

      CreateItemForm: {
        basicInfo: {
          item_title: "",
          category_id_0: "",
          category_name_0: "",
          item_condition: "",
          item_description: "",
        },
        pricingInfo: {
          digital_currency_1: false,
          digital_currency_2: false,
          digital_currency_3: false,
          item_count: "",
          price: "",
        },
        shippingInfo: {
          international: false,
          shipping_info_0: "",
          free_shipping: false,
          free_shipping_days: "",
          shipping_2: false,
          shipping_2_days: "",
          shipping_2_price: "",
          shipping_3: false,
          shipping_3_days: "",
          shipping_3_price: "",
        },
      },
    };
  },
  validations () {
    return {
      CreateItemForm: {
        basicInfo: {
          item_title: { required, minLength: minLength(6) },
          category_id_0: { required },
          item_condition: { required },
          item_description: { required },
        },
        pricingInfo: {
          item_count: { required },
          price: { required },
        },
      },
    };
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
          if (response.data.login == true) { this.user = response.data.user }
          else { this.$router.push("/login") }
        })
        .catch(() => {
          this.$router.push("/login")
        })
    },
    // gets the item from paramater router
    getItemForSale () {
      let item_id_route = useRoute();
      this.item_id = item_id_route.params.id;
      let path = "/item/" + this.item_id;

      axios({
        method: "get",
        url: path,
        withCredentials: true,
      })
        .then((response) => {
          if (response.data.success) {
            this.marketitem = response.data;

          }
        })
    },
    // main item recreation function
    SendItemCreation (payLoad: {
      item_id: string;
      item_title: string;
      item_condition: string;
      item_description: string;
      category_id_0: string;
      category_name_0: string;
      item_count: string;
      shipping_info_0: string;
      digital_currency_1: boolean;
      digital_currency_2: boolean;
      digital_currency_3: boolean;
      price: string;
      free_shipping: boolean;
      free_shipping_days: string;
      shipping_2: boolean;
      shipping_2_days: string;
      shipping_2_price: string;
      shipping_3: boolean;
      shipping_3_days: string;
      shipping_3_price: string;
      international: boolean;

    }) {
      let path = "/vendorcreateitem/create-item-main/" + this.item_id;
      axios({
        method: "post",
        url: path,
        data: payLoad,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          console.log(response.data)
          if (response.data.success == "success") {
            this.$router.push("/vendor/itemsforsale");
            notify({
              title: "Freeport",
              text: "Item Edited Successfully",
              type: "success",
            });
          }
          if (response.data.error == "error") {

            notify({
              title: "Item Error",
              text: "Item not Online.  Not all information provided.",
              type: "error",
            });
          }
        })
        .catch((error) => {
          console.log("errorr!@")
        });
    },
    // pre fill form data
    getFormData () {
      let path = "/vendorcreateitem/get-fields/" + this.item_id;
      axios({
        method: "get", //you can set what request you want to be
        url: path,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          this.CreateItemForm.basicInfo.item_title = response.data.item_title;
          this.CreateItemForm.pricingInfo.item_count = response.data.item_count;
          this.CreateItemForm.basicInfo.item_description = response.data.item_description;
          this.CreateItemForm.basicInfo.item_condition = response.data.item_condition;
          this.CreateItemForm.basicInfo.category_name_0 = response.data.category_name_0;
          this.CreateItemForm.basicInfo.category_id_0 = response.data.category_id_0;
          this.CreateItemForm.pricingInfo.price = response.data.price;
          this.CreateItemForm.pricingInfo.digital_currency_1 =
            response.data.digital_currency_1;
          this.CreateItemForm.pricingInfo.digital_currency_2 =
            response.data.digital_currency_2;
          this.CreateItemForm.pricingInfo.digital_currency_3 =
            response.data.digital_currency_3;
          this.CreateItemForm.shippingInfo.free_shipping =
            response.data.shipping_free;
          this.CreateItemForm.shippingInfo.shipping_2 =
            response.data.shipping_two;
          this.CreateItemForm.shippingInfo.shipping_3 =
            response.data.shipping_three;
          this.CreateItemForm.shippingInfo.free_shipping_days =
            response.data.shipping_day_0;
          this.CreateItemForm.shippingInfo.shipping_info_0 =
            response.data.shipping_info_0;
          this.CreateItemForm.shippingInfo.shipping_2_price =
            response.data.shipping_price_2;
          this.CreateItemForm.shippingInfo.shipping_2_days =
            response.data.shipping_day_2;
          this.CreateItemForm.shippingInfo.shipping_3_price =
            response.data.shipping_price_3;
          this.CreateItemForm.shippingInfo.shipping_3_days =
            response.data.shipping_day_3;
          this.CreateItemForm.shippingInfo.international =
            response.data.international;

        })

    },
    // function to allow only numbers
    onlyNumber ($event: any) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        // 46 is dot
        $event.preventDefault();
      }
    },
    // function allows only a dot
    onlyNumberWithDot ($event: any) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        $event.preventDefault();
      }
    },
    // gets the list of countrys
    getCountryList () {
      let path = "/vendorcreateitem/query/country";

      axios({
        method: "get", //you can set what request you want to be
        url: path,
        withCredentials: true,
      })
        .then((response) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          this.countryList = response.data;
        })

    },
    // gets the categories
    getCategoryList () {
      let path = "/vendorcreateitem/query/category";

      axios({
        method: "get", //you can set what request you want to be
        url: path,
        withCredentials: true,
      })
        .then((response) => {
          this.categoryList = response.data;
        })

    },
    // gets list of item conditions
    getConditionList () {
      let path = "/vendorcreateitem/query/condition";
      axios({
        method: "get",
        url: path,
        withCredentials: true,
      })
        .then((response) => {
          this.conditionList = response.data;
        })

    },
    // payload for form data
    onSubmit () {
      let payLoad = {
        item_id: this.item_id,
        item_title: this.CreateItemForm.basicInfo.item_title,
        item_condition: this.CreateItemForm.basicInfo.item_condition,
        item_description: this.CreateItemForm.basicInfo.item_description,
        category_id_0: this.CreateItemForm.basicInfo.category_id_0,
        category_name_0: this.CreateItemForm.basicInfo.category_name_0,
        digital_currency_1: this.CreateItemForm.pricingInfo.digital_currency_1,
        digital_currency_2: this.CreateItemForm.pricingInfo.digital_currency_2,
        digital_currency_3: this.CreateItemForm.pricingInfo.digital_currency_3,
        item_count: this.CreateItemForm.pricingInfo.item_count,
        price: this.CreateItemForm.pricingInfo.price,
        free_shipping: this.CreateItemForm.shippingInfo.free_shipping,
        free_shipping_days: this.CreateItemForm.shippingInfo.free_shipping_days,
        shipping_2: this.CreateItemForm.shippingInfo.shipping_2,
        shipping_2_days: this.CreateItemForm.shippingInfo.shipping_2_days,
        shipping_2_price: this.CreateItemForm.shippingInfo.shipping_2_price,
        shipping_3: this.CreateItemForm.shippingInfo.shipping_3,
        shipping_info_0: this.CreateItemForm.shippingInfo.shipping_info_0,
        shipping_3_days: this.CreateItemForm.shippingInfo.shipping_3_days,
        shipping_3_price: this.CreateItemForm.shippingInfo.shipping_3_price,
        international: this.CreateItemForm.shippingInfo.international,

      };
      this.v$.$validate(); // checks all inputs

      if (this.v$.$error) {
        notify({
          title: "Freeport",
          text: "Form Failure",
          type: "error",
        });
      } else {

        this.SendItemCreation(payLoad);
      }
    },
  },
});
</script>
