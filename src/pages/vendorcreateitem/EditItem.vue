<template>
  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />

  <div v-if="user">
    <MainHeaderVendor v-show="user.user_admin == 1" />
  </div>
  <div class="">
    <div class="container max-w-7xl mx-auto px-10">
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
                <a class="text-blue-600 hover:text-blue-700">Items for Sale</a>
              </router-link>
            </li>
            <li>
              <span class="text-gray-500 mx-2">/</span>
            </li>
          </ol>
        </nav>
      </div>
      <div class="grid grid-cols-1 rounded-md p-6 max-w-3xl mx-auto">
        <div class="text-[24px]">Create a new Item</div>
        <UploadImages :item_id="item_id" />

        <form
          class="rounded-md px-8 pt-6 pb-8 mb-4 w-full"
          enctype="multipart/form-data"
          @submit.prevent="onSubmit"
        >
          <div class="text-[18px] mt-5 mb-5">General Info</div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2"
              >Item Title</label
            >
            <input
              v-model="CreateItemForm.basicInfo.item_title"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="item_title"
              type="text"
              placeholder="Enter title of your item .."
            />
          </div>
          <div class="flex gap-5">
            <div class="flex-1 mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2"
                >Category</label
              >
              <select
                class="shadow form-select appearance-none block w-full px-3 py-1.5 text-base font-normal focus:shadow-outline text-gray-500 bg-white bg-clip-padding bg-no-repeat border rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                aria-label="Default select example"
                id="category"
                v-model="CreateItemForm.basicInfo.category_id_0"
              >
                <option
                  class="text-gray-700"
                  v-for="(category, index) in categoryList"
                  :key="index"
                  :value="category.value"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>
            <div class="flex-1 mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2"
                >Condition</label
              >
              <select
                class="shadow form-select appearance-none block w-full px-3 py-1.5 text-base font-normal focus:shadow-outline text-gray-500 bg-white bg-clip-padding bg-no-repeat border rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                aria-label="Default select example"
                id="condition"
                v-model="CreateItemForm.basicInfo.item_condition"
              >
                <option
                  class="text-gray-700"
                  v-for="(condition, index) in conditionList"
                  :key="index"
                  :value="condition.value"
                >
                  {{ condition.text }}
                </option>
              </select>
            </div>
          </div>
          <div class="text-[18px] mt-5 mb-5">Pricing</div>
          <div class="flex gap-5">
            <div class="mb-4 flex-1">
              <label class="block text-gray-700 text-sm font-bold mb-2"
                >Item Price</label
              >
              <label class="block text-gray-700 text-sm mb-2 text-[11px]"
                >Item Price in your local currency per item</label
              >
              <input
                v-model="CreateItemForm.pricingInfo.price"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="price"
                placeholder="Price in your currency..."
                @keypress="onlyNumberWithDot"
              />
              <span
                v-if="v$.CreateItemForm.pricingInfo.price.$error"
                class="text-red-600 text-center"
              >
                {{ v$.CreateItemForm.pricingInfo.price.$errors[0].$message }}
              </span>
            </div>
            <div class="mb-4 flex-1">
              <label class="block text-gray-700 text-sm font-bold mb-2"
                >Item Count</label
              >
              <label class="block text-gray-700 text-sm mb-2 text-[11px]"
                >How many you have for sale</label
              >
              <input
                v-model="CreateItemForm.pricingInfo.item_count"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="count"
                type="number"
                min="0"
                placeholder="How many your are selling ..."
                @keypress="onlyNumber"
              />
              <span
                v-if="v$.CreateItemForm.pricingInfo.item_count.$error"
                class="text-red-600 text-center"
              >
                {{
                  v$.CreateItemForm.pricingInfo.item_count.$errors[0].$message
                }}
              </span>
            </div>
          </div>
          <div class="flex gap-5">
            <div class="mb-4 flex-1">
              <label class="block text-gray-700 text-sm font-bold mb-2"
                >Accept Bitcoin</label
              >
              <input
                type="checkbox"
                checked="checked"
                id="digital_currency_1"
                v-model="CreateItemForm.pricingInfo.digital_currency_1"
              />
            </div>
            <div class="mb-4 flex-1">
              <label class="block text-gray-700 text-sm font-bold mb-2"
                >Accept Bitcoin Cash</label
              >
              <input
                type="checkbox"
                checked="checked"
                id="digital_currency_2"
                v-model="CreateItemForm.pricingInfo.digital_currency_2"
              />
            </div>
            <div class="mb-4 flex-1">
              <label class="block text-gray-700 text-sm font-bold mb-2"
                >Accept Monero</label
              >
              <input
                type="checkbox"
                checked="checked"
                id="digital_currency_3"
                v-model="CreateItemForm.pricingInfo.digital_currency_3"
              />
            </div>
          </div>
          <div class="text-[18px] mt-5 mb-5">Description</div>
          <div class="mb-4 flex-1">
            <textarea
              v-model="CreateItemForm.basicInfo.item_description"
              id="item_description"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
            <span
              v-if="v$.CreateItemForm.basicInfo.item_description.$error"
              class="text-red-600 text-center"
            >
              {{ v$.CreateItemForm.basicInfo.item_description.$errors[0].$message }}
            </span>
          </div>

          <div class="text-[18px] mt-5 mb-5">Shipping</div>

          <div class="mb-4 flex text-center">
            <div class="flex-1">Option</div>
            <div class="flex-1">Shipping Price</div>
            <div class="flex-1">Estimated Days</div>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2"
              >Free Shipping</label
            >
            <div class="flex gap-5">
              <div class="flex-1">
                <input
                  type="checkbox"
                  checked="checked"
                  v-model="CreateItemForm.shippingInfo.free_shipping"
                />
              </div>
              <div class="flex-1"></div>
              <div class="flex-1">
                <input
                  type="integer"
                  placeholder="Estimated Days"
                  min="0"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  v-model="CreateItemForm.shippingInfo.free_shipping_days"
                />
              </div>
            </div>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2"
              >Option 1</label
            >
            <div class="flex gap-5">
              <div class="flex-1">
                <input
                  type="checkbox"
                  checked="checked"
                  v-model="CreateItemForm.shippingInfo.shipping_2"
                />
              </div>
              <div class="flex-1">
                <input
                  type="integer"
                  placeholder="Price"
                  min="0"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  v-model="CreateItemForm.shippingInfo.shipping_2_price"
                  @keypress="onlyNumberWithDot"
                />
              </div>
              <div class="flex-1">
                <input
                  type="integer"
                  placeholder="Estimated Days"
                  min="0"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  v-model="CreateItemForm.shippingInfo.shipping_2_days"
                  @keypress="onlyNumber"
                />
              </div>
            </div>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2"
              >Option 2</label
            >
            <div class="flex gap-5">
              <div class="flex-1">
                <input
                  type="checkbox"
                  checked="checked"
                  v-model="CreateItemForm.shippingInfo.shipping_3"
                />
              </div>
              <div class="flex-1">
                <input
                  type="integer"
                  placeholder="Price"
                  min="0"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  v-model="CreateItemForm.shippingInfo.shipping_3_price"
                  @keypress="onlyNumberWithDot"
                />
              </div>
              <div class="flex-1">
                <input
                  type="integer"
                  placeholder="Estimated Days"
                  min="0"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  v-model="CreateItemForm.shippingInfo.shipping_3_days"
                  @keypress="onlyNumber"
                />
              </div>
            </div>
          </div>
          <div class="flex justify-center mt-20">
            <button
              class="bg-gray-600 hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create Item
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <MainFooter />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { ref } from "vue";
import authHeader from "../../services/auth.header";
import { mapGetters } from "vuex";
import { constants } from "perf_hooks";
import { notify } from "@kyvg/vue3-notification";
import useValidate from "@vuelidate/core";
import { required, email, minLength, sameAs } from "@vuelidate/validators";
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
  setup() {
    const isSelectDisabled = ref(false); // Form Toggle
    return { isSelectDisabled }; // Form Toggle
  },
  mounted() {
    this.userstatus();
    this.getItemForSale();
    this.getCategoryList(); // Query Categories
    this.getConditionList(); // Query Conditionlist
    this.getCountryList(); // Query Countries
    this.getFormData();
  },

  data() {
    return {
      v$: useValidate(),
      item_id: "",
      marketitem: "",
      authtoken: "",
      categoryList: [],

      countryList: [],

      CreateItemForm: {
        basicInfo: {
          item_title: "",
          category_id_0: "",
          item_condition: "",
          item_description: "",
        },
        pricingInfo: {
          digital_currency_1: "",
          digital_currency_2: "",
          digital_currency_3: "",
          item_count: "",
          price: "",
        },
        shippingInfo: {
          worldwide_shipping: "",
          free_shipping: "",
          free_shipping_days: "",
          shipping_2: "",
          shipping_2_days: "",
          shipping_2_price: "",
          shipping_3: "",
          shipping_3_days: "",
          shipping_3_price: "",
          shipping_to_country_one: "",
          shipping_to_country_two: "",
          shipping_to_country_three: "",
          shipping_to_country_four: "",
        },
      },
    };
  },
  validations() {
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
        shippingInfo: {
          shipping_to_country_one: { required },
        },
      },
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    async userstatus() {
      //user Auth
      await axios({
        method: "get",
        url: "/auth/whoami",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status != 200) {
          this.$router.push({ name: "home" });
        }
      });
    },
    // gets the item from paramater router
    async getItemForSale() {
      const item_id_route = useRoute();
      const item_id = item_id_route.params.id;
      this.item_id = item_id;
      const path = "/item/" + this.item_id;

      await axios({
        method: "get",
        url: path,
        withCredentials: true,
      })
        .then((response) => {
          if (response.status === 200) {
            this.marketitem = response.data;
          }
        })
        .catch((error) => {});
    },
    // main item recreation function
    async SendItemCreation(payLoad: {
      item_id: string;
      item_title: string;
      item_condition: string;
      item_description: string;
      category_id_0: string;
      keywords: string;
      item_count: string;
      digital_currency_1: string;
      digital_currency_2: string;
      digital_currency_3: string;
      price: string;
      free_shipping: string;
      free_shipping_days: string;
      shipping_2: string;
      shipping_2_days: string;
      shipping_2_price: string;
      shipping_3: string;
      shipping_3_days: string;
      shipping_3_price: string;
      shipping_to_country_one: string;
      shipping_to_country_two: string;
      shipping_to_country_three: string;
      shipping_to_country_four: string;
    }) {
      let path = "/vendorcreateitem/create-item-main/" + this.item_id;
      await axios({
        method: "post",
        url: path,
        data: payLoad,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if (response.data.status == "success") {
            this.$router.push("/vendor/itemsforsale");
            notify({
              title: "Freeport",
              text: "Item Created successfully",
              type: "success",
            });
          }
          if (response.data.status == "error") {
            this.$router.push({ name: "edititem", params: { id: itemid } });
            notify({
              title: "Freeport Error",
              text: "Error creating item",
              type: "error",
            });
          }
        })
        .catch((error) => {
          if (error.response) {
            notify({
              title: "Freeport Error",
              text: "Item Created successfully",
              type: "success",
            });
            if (error.response.status === 401) {
              this.$store.commit("loginFailure");
            } else if (error.response.status === 403) {
              notify({
                title: "Freeport Error",
                text: "Error.  Not logged in!",
                type: "error",
              });
            }
          }
        });
    },
    // pre fill form data
    async getFormData() {
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
          this.CreateItemForm.basicInfo.item_description =
            response.data.item_description;
          this.CreateItemForm.basicInfo.item_condition =
            response.data.item_condition;
          this.CreateItemForm.basicInfo.keywords = response.data.keywords;
          this.CreateItemForm.basicInfo.category_name_0 =
            response.data.category_name_0;
          this.CreateItemForm.basicInfo.category_id_0 =
            response.data.category_id_0;
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
          this.CreateItemForm.shippingInfo.destination_country_one =
            response.data.item_title;
          this.CreateItemForm.shippingInfo.destination_country_two =
            response.data.item_title;
          this.CreateItemForm.shippingInfo.destination_country_two_name =
            response.data.item_title;
          this.CreateItemForm.shippingInfo.destination_country_three =
            response.data.item_title;
          this.CreateItemForm.shippingInfo.destination_country_three_name =
            response.data.item_title;
          this.CreateItemForm.shippingInfo.destination_country_four =
            response.data.item_title;
          this.CreateItemForm.shippingInfo.destination_country_four_name =
            response.data.item_title;
        })
        .catch((error) => {});
    },
    // function to allow only numbers
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        // 46 is dot
        $event.preventDefault();
      }
    },
    // function allows only a dot
    onlyNumberWithDot($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        $event.preventDefault();
      }
    },
    // gets the list of countrys
    async getCountryList() {
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
        .catch((error) => {});
    },
    // gets the categories
    async getCategoryList() {
      let path = "/vendorcreateitem/query/category";

      await axios({
        method: "get", //you can set what request you want to be
        url: path,
        withCredentials: true,
      })
        .then((response) => {
          this.categoryList = response.data;
        })
        .catch((error) => {});
    },
    // gets list of item conditions
    async getConditionList() {
      let path = "/vendorcreateitem/query/condition";
      await axios({
        method: "get",
        url: path,
        withCredentials: true,
      })
        .then((response) => {
          this.conditionList = response.data;
        })
        .catch((error) => {});
    },
    // payload for form data
    onSubmit() {
      let payLoad = {
        item_id: this.item_id,
        item_title: this.CreateItemForm.basicInfo.item_title,
        item_condition: this.CreateItemForm.basicInfo.item_condition,
        item_description: this.CreateItemForm.basicInfo.item_description,
        keywords: this.CreateItemForm.basicInfo.keywords,
        category_id_0: this.CreateItemForm.basicInfo.category_id_0,
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
        shipping_3_days: this.CreateItemForm.shippingInfo.shipping_3_days,
        shipping_3_price: this.CreateItemForm.shippingInfo.shipping_3_price,
        shipping_to_country_one:
          this.CreateItemForm.shippingInfo.shipping_to_country_one,
        shipping_to_country_two:
          this.CreateItemForm.shippingInfo.shipping_to_country_two,
        shipping_to_country_three:
          this.CreateItemForm.shippingInfo.shipping_to_country_three,
        shipping_to_country_four:
          this.CreateItemForm.shippingInfo.shipping_to_country_four,
      };
      this.v$.$validate(); // checks all inputs
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
        this.SendItemCreation(payLoad);
      }
    },
  },
});
</script>
