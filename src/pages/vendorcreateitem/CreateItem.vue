
<template>

  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />

  <div v-if="user">
    <MainHeaderVendor v-show="user.user_admin === 1" />
  </div>
  <div class="">
    <div class="container max-w-7xl mx-auto px-10 text-white">
      <div class="mt-5 mb-5">
        <nav class="rounded-md w-full">
          <ol class="list-reset flex">
            <li>
              <router-link :to="{ name: 'home' }">
                <a class="text-blue-600 hover:text-blue-700">Home</a>
              </router-link>
            </li>
            <li>
              <span class="text-white mx-2">/</span>
            </li>
            <li>
              <router-link :to="{ name: 'forsale' }">
                <a class="text-blue-600 hover:text-blue-700">Items for Sale</a>
              </router-link>
            </li>
            <li>
              <span class="text-white mx-2">/</span>
            </li>
          </ol>
        </nav>
      </div>
      <div class="grid grid-cols-1 rounded-md p-6 max-w-3xl mx-auto">
        <div class="text-[24px]">Create a new Item</div>

        <UploadImages
          :item_id="item_id"
          :image_main="image_main"
          :image_two="image_two"
          :image_three="image_three"
          :image_four="image_four"
        />
        <form
          class="rounded-md px-8 pt-6 pb-8 mb-4 w-full"
          enctype="multipart/form-data"
          @submit.prevent="onSubmit"
        >
          <div class="text-[18px] mt-5 mb-5">General Info</div>
          <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2"
              >Item Title</label
            >
            <input
              v-model="CreateItemForm.basicInfo.title"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Enter title of your item .."
            />
          </div>
          <div class="flex gap-5">
            <div class="flex-1 mb-4">
              <label class="block text-white text-sm font-bold mb-2"
                >Category</label
              >
              <select
                class="shadow form-select appearance-none block w-full px-3 py-1.5 text-base font-normal focus:shadow-outline text-gray-500 bg-neutral bg-clip-padding bg-no-repeat border rounded transition ease-in-out m-0 focus:text-white focus:bg-neutral focus:border-blue-600 focus:outline-none"
                aria-label="Default select example"
                id="category"
                v-model="CreateItemForm.basicInfo.category_id_0"
              >
                <option
                  class="text-white"
                  v-for="(category, index) in categoryList"
                  :key="index"
                  :value="category.value"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>
            <div class="flex-1 mb-4">
              <label class="block text-white text-sm font-bold mb-2"
                >Condition</label
              >
              <select
                class="shadow form-select appearance-none block w-full px-3 py-1.5 text-base font-normal focus:shadow-outline text-gray-500 bg-neutral bg-clip-padding bg-no-repeat border rounded transition ease-in-out m-0 focus:text-white focus:bg-neutral focus:border-blue-600 focus:outline-none"
                aria-label="Default select example"
                id="condition"
                v-model="CreateItemForm.basicInfo.item_condition"
              >
                <option
                  class="text-white"
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
              <label class="block text-white text-sm font-bold mb-2"
                >Item Price</label
              >
              <label class="block text-white text-sm mb-2 text-[11px]"
                >Item Price in your local currency per item</label
              >
              <input
                v-model="CreateItemForm.pricingInfo.price"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                id="price"
                type="number"
                min="0"
                placeholder="Price in your currency..."
                @keypress="onlyNumberWithDot"
              />
            </div>
            <div class="mb-4 flex-1">
              <label class="block text-white text-sm font-bold mb-2"
                >Item Count</label
              >
              <label class="block text-white text-sm mb-2 text-[11px]"
                >How many you have for sale</label
              >
              <input
                v-model="CreateItemForm.pricingInfo.item_count"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                id="count"
                type="number"
                min="0"
                placeholder="How many your are selling ..."
                @keypress="onlyNumber"
              />
            </div>
          </div>
          <div class="flex gap-5">
            <div class="mb-4 flex-1">
              <label class="block text-white text-sm font-bold mb-2"
                >Accept Bitcoin</label
              >
              <input
                type="checkbox"
                id="digital_currency_1"
                v-model="CreateItemForm.pricingInfo.digital_currency_1"
              />
            </div>
            <div class="mb-4 flex-1">
              <label class="block text-white text-sm font-bold mb-2"
                >Accept Bitcoin Cash</label
              >
              <input
                type="checkbox"
                id="digital_currency_2"
                v-model="CreateItemForm.pricingInfo.digital_currency_2"
              />
            </div>
            <div class="mb-4 flex-1">
              <label class="block text-white text-sm font-bold mb-2"
                >Accept Monero</label
              >
              <input
                type="checkbox"
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
              class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>

          <div class="text-[18px] mt-5 mb-5">Destination</div>
          <div class="mb-4">
            <div class="flex gap-5">
              <div class="mb-4 flex-1">
                <label class="block text-white text-sm font-bold mb-2"
                  >Worldwide Shipping or Digital Item</label
                >
                <input
                  type="checkbox"
                  id="digital_currency_1"
                  v-model="isSelectDisabled"
                />
              </div>
            </div>
            <div class="flex gap-5">
              <div class="mb-4 flex-1">
                <label class="block text-white text-sm font-bold mb-2"
                  >Destination One</label
                >

                <select
                  class="shadow form-select appearance-none block w-full px-3 py-1.5 text-base font-normal focus:shadow-outline text-gray-500 bg-neutral bg-clip-padding bg-no-repeat border rounded transition ease-in-out m-0 focus:text-white focus:bg-neutral focus:border-blue-600 focus:outline-none"
                  aria-label="Default select example"
                  id="category"
                  v-model="CreateItemForm.shippingInfo.shipping_to_country_one"
                  :disabled="isSelectDisabled"
                >
                  <option
                    class="text-white"
                    v-for="(country, index) in countryList"
                    :key="index"
                    :value="country.value"
                  >
                    {{ country.name }}
                  </option>
                </select>
              </div>

              <div class="mb-4 flex-1">
                <label class="block text-white text-sm font-bold mb-2"
                  >Destination Two</label
                >

                <select
                  class="shadow form-select appearance-none block w-full px-3 py-1.5 text-base font-normal focus:shadow-outline text-gray-500 bg-neutral bg-clip-padding bg-no-repeat border rounded transition ease-in-out m-0 focus:text-white focus:bg-neutral focus:border-blue-600 focus:outline-none"
                  aria-label="Default select example"
                  id="category"
                  v-model="CreateItemForm.shippingInfo.shipping_to_country_two"
                  :disabled="isSelectDisabled"
                >
                  <option
                    class="text-white"
                    v-for="(country, index) in countryList"
                    :key="index"
                    :value="country.value"
                  >
                    {{ country.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="flex gap-5">
              <div class="mb-4 flex-1">
                <label class="block text-white text-sm font-bold mb-2"
                  >Destination Three</label
                >

                <select
                  class="shadow form-select appearance-none block w-full px-3 py-1.5 text-base font-normal focus:shadow-outline text-gray-500 bg-neutral bg-clip-padding bg-no-repeat border rounded transition ease-in-out m-0 focus:text-white focus:bg-neutral focus:border-blue-600 focus:outline-none"
                  aria-label="Default select example"
                  id="category"
                  v-model="
                    CreateItemForm.shippingInfo.shipping_to_country_three
                  "
                  :disabled="isSelectDisabled"
                >
                  <option
                    class="text-white"
                    v-for="(country, index) in countryList"
                    :key="index"
                    :value="country.value"
                  >
                    {{ country.name }}
                  </option>
                </select>
              </div>

              <div class="mb-4 flex-1">
                <label class="block text-white text-sm font-bold mb-2"
                  >Destination Four</label
                >

                <select
                  class="shadow form-select appearance-none block w-full px-3 py-1.5 text-base font-normal focus:shadow-outline text-gray-500 bg-neutral bg-clip-padding bg-no-repeat border rounded transition ease-in-out m-0 focus:text-white focus:bg-neutral focus:border-blue-600 focus:outline-none"
                  aria-label="Default select example"
                  id="category"
                  v-model="CreateItemForm.shippingInfo.shipping_to_country_four"
                  :disabled="isSelectDisabled"
                >
                  <option
                    class="text-white"
                    v-for="(country, index) in countryList"
                    :key="index"
                    :value="country.value"
                  >
                    {{ country.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="text-[18px] mt-5 mb-5">Shipping</div>

          <div class="mb-4 flex text-center ">
            <div class="flex-1">Option</div>
            <div class="flex-1">Shipping Price</div>
            <div class="flex-1">Estimated Days</div>
          </div>

          <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2"
              >Free Shipping</label
            >
            <div class="flex gap-5">
              <div class="flex-1">
                <input
                  type="checkbox"
                  v-model="CreateItemForm.shippingInfo.free_shipping"
                />
              </div>
              <div class="flex-1"></div>
              <div class="flex-1">
                <input
                  type="number"
                  placeholder="Estimated Days"
                  min="0"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                  v-model="CreateItemForm.shippingInfo.free_shipping_days"
                />
              </div>
            </div>
          </div>
          <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2"
              >Option 1</label
            >
            <div class="flex gap-5">
              <div class="flex-1">
                <input
                  type="checkbox"
                  v-model="CreateItemForm.shippingInfo.shipping_2"
                />
              </div>
              <div class="flex-1">
                <input
                  type="number"
                  placeholder="Price"
                  min="0"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                  v-model="CreateItemForm.shippingInfo.shipping_2_price"
                  @keypress="onlyNumberWithDot"
                />
              </div>
              <div class="flex-1">
                <input
                  type="number"
                  placeholder="Estimated Days"
                  min="0"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                  v-model="CreateItemForm.shippingInfo.shipping_2_days"
                  @keypress="onlyNumber"
                />
              </div>
            </div>
          </div>
          <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2"
              >Option 3</label
            >
            <div class="flex gap-5">
              <div class="flex-1">
                <input
                  type="checkbox"
                  v-model="CreateItemForm.shippingInfo.shipping_3"
                />
              </div>
              <div class="flex-1">
                <input
                  type="number"
                  placeholder="Price"
                  min="0"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                  v-model="CreateItemForm.shippingInfo.shipping_3_price"
                  @keypress="onlyNumberWithDot"
                />
              </div>
              <div class="flex-1">
                <input
                  type="number"
                  placeholder="Estimated Days"
                  min="0"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
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


</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { ref } from "vue";
import authHeader from "../../services/auth.header";
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
  created() {
    this.userstatus();
  },
  mounted(){
    this.createitemtemporary();
    this.getCategoryList(); // Query Categories
    this.getConditionList(); // Query Conditionlist
    this.getCountryList(); // Query Countries
  },

  data() {
    return {
      user: null,
      item_id: null,
      marketitem: Object,
      authtoken: null,
      image_main: null,
      image_two: null,
      image_three: null,
      image_four: null,
      currencyList: [],
      categoryList: [],
      conditionList: [],
      countryList: [],
      CreateItemForm: {
        basicInfo: {
          title: "",
          category_id_0: "",
          item_condition: "",
          item_description: "",
          keywords: "",
        },
        pricingInfo: {
          digital_currency_1: false,
          digital_currency_2: false,
          digital_currency_3: false,
          item_count: "",
          price: "",
        },
        shippingInfo: {
          worldwide_shipping: "",
          free_shipping: false,
          free_shipping_days: "",
          shipping_2: false,
          shipping_2_days: "",
          shipping_2_price: "",
          shipping_3: false,
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

  methods: {
     userstatus() {
       axios({
        method: "get",
        url: "/auth/whoami",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
      if (response.data.login == true) 
        { this.user = response.data.user }
      else 
        { this.$router.push("/login") }
      })
      .catch(() => {
        this.$router.push("/login")
      })
    },

     CreateItem(payload: {
      item_id: string;
      title: string;
      item_condition: string;
      item_description: string;
      category_id_0: string;
      keywords: string;
      item_count: string;
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
      shipping_to_country_one: string;
      shipping_to_country_two: string;
      shipping_to_country_three: string;
      shipping_to_country_four: string;
    }) {
      let path = "/vendorcreateitem/create-item-main/" + this.item_id;
       axios({
        method: "POST",
        url: path,
        data: payload,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if (response.data.success) {
            this.$router.push("/vendor/itemsforsale");
          }
          if (response.data.status == "error") {
            this.$router.push("/vendor/createitem");
          }
        })
        .catch((error) => {

        });
    },

    onlyNumber($event: any) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        // 46 is dot
        $event.preventDefault();
      }
    },
    onlyNumberWithDot($event: any) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        $event.preventDefault();
      }
    },

     getItemForSale() {
      // Get the item thats being modified
      const path = "/item/" + this.item_id;
      axios({
        method: "get",
        url: path,
        withCredentials: true,
      })
        .then((response) => {
          if (response.data.success) {
            this.marketitem = response.data;
            this.image_main = response.data.image_one_server;
            this.image_two = response.data.image_two_server;
            this.image_three = response.data.image_three_server;
            this.image_four = response.data.image_four_server;
          }
        })
        .catch(() => {});
    },
     createitemtemporary() {
      // Create an Item.  // Using thi
       axios({
        method: "GET",
        url: "/vendorcreateitem/create-item",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.data.success) {
          this.item_id = response.data.item_id;
          this.getItemForSale();
        }
      });
    },

     getCountryList() {
      // Get Countries
       let path = "/vendorcreateitem/query/country";
       axios({
        method: "get", //you can set what request you want to be
        url: path,
        withCredentials: true,
        
      })
        .then((response) => {
          this.countryList = response.data;
        })
    },
  

     getCategoryList() {
      const path = "/vendorcreateitem/query/category";

      axios({
        method: "get",
        url: path,
        withCredentials: true,
      })
        .then((response) => {
          this.categoryList = response.data;
        })
        .catch(() => {});
    },
     getConditionList() {
      const path = "/vendorcreateitem/query/condition";
      axios({
        method: "get",
        url: path,
        withCredentials: true,
      })
        .then((response) => {
          this.conditionList = response.data;
        })
        .catch(() => {});
    },
     onSubmit() {

      let payload = {
        item_id: this.item_id,
        title: this.CreateItemForm.basicInfo.title,

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
      this.CreateItem(payload);
    },
  },
});
</script>
