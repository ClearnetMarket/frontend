<template>
  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />
  <div v-if="user">
    <MainHeaderVendor v-show="user.user_admin == 1" />
  </div>

  <div class="max-w-7xl mx-auto wrapper">
    <div class="grid grid-cols-1 w-full gap-4">
      <div class="mb-10 mt-5 px-5">
        <nav class="rounded-md">
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
              <router-link :to="{ name: 'cart' }">
                <a class="text-blue-600 hover:text-blue-700">Shopping Cart</a>
              </router-link>
            </li>
            <li>
              <span class="text-gray-500 mx-2">/</span>
            </li>
          </ol>
        </nav>
      </div>
    </div>
    <div class="text-center text-[28px]">Checkout</div>
    <div class="grid grid-cols-12 w-full gap-4">
      <div class="col-span-9 grid-rows-3 px-10 py-10">
        <div class="grid grid-cols-12 border-b border-gray-300 pb-4">
          <div class="col-span-1 font-bold">1</div>
          <div class="col-span-3 font-bold text-">Shipping Options</div>
          <div class="col-span-6">
            <div class="grid grid-cols-1">
              <div class="">{{ address_name }}</div>
              <div class="">{{ address }}</div>
              <div class="">{{ apt }}</div>
              <div class="flex">
                <div class="pr-1">{{ city }}</div>
                <div class="px-1">{{ stateorprovence }}</div>
                <div class="px-1">{{ zip }}</div>
              </div>
            </div>
          </div>
          <div
            class="col-span-2 text-center text-[12px] text-blue-600 hover:text-blue-400"
          >
            <router-link :to="{ name: 'defaultaddress' }"> Change </router-link>
          </div>
        </div>

        <div class="grid grid-cols-12 pb-4 pt-4">
          <div class="col-span-1 font-bold">2</div>
          <div class="col-span-3 font-bold">Payment Method</div>
          <div class="col-span-6">
            <div class="grid grid-cols-1">
              <div class="text-[12px]">
                <div v-if="btcbalance == 0">BTC Balance: 0.00000000</div>
                <div v-else>BTC Balance: {{ btcbalance }}</div>
              </div>
              <div class="text-[12px]">
                <div v-if="bchbalance == 0">BCH Balance: 0.00000000</div>
                <div v-else>BCH Balance: {{ bchbalance }}</div>
              </div>
              <div class="text-[12px]">
                <div v-if="xmrbalance == 0">XMR Balance: 0.000000000000</div>
                <div v-else>XMR Balance: {{ xmrbalance }}</div>
              </div>
            </div>
          </div>
          <div class="col-span-2 text-center text-[12px]"></div>
        </div>

        <div class="grid grid-cols-12 pb-4">
          <div class="col-span-1 font-bold"></div>
          <div class="col-span-11 text-">
            <div v-for="(item, index) in shopping_cart_items_list">
              <div class="grid grid-cols-12 gap-4 border border-gray-300 p-4">
                <div class="col-span-2">
                  <img
                    class="h-24"
                    src="https://drive.google.com/uc?id=18KkAVkGFvaGNqPy2DIvTqmUH_nk39o3z"
                    alt=""
                  />
                </div>
                <div class="col-span-4">
                  <div class="grid grid-cols-1">
                    <div class="col-span-1 font-bold pb-4">
                      {{ item.title_of_item }}
                    </div>
                    <div class="col-span-1">{{ item.price_of_item }}$</div>
                    <div class="col-span-1">
                      {{ item.quantity_of_item }} items
                    </div>
                  </div>
                </div>
                <div class="col-span-6">
                  <div v-if="item.digital_currency_1 == true">
                    <input
                      v-on:change="checkoutpaymenttype($event, item)"
                      v-model="item.selected_currency"
                      type="radio"
                      :id="item.id"
                      :name="item.id"
                      value="1"
                      :checked="item.selected_digital_currency == 1"
                    />

                    <label class="px-5" for="btc">Bitcoin</label><br />
                  </div>

                  <div v-if="item.digital_currency_2 == true">
                    <input
                      v-on:change="checkoutpaymenttype($event, item)"
                      v-model="item.selected_currency"
                      type="radio"
                      :id="item.id"
                      :name="item.id"
                      value="2"
                      :checked="item.selected_digital_currency == 2"
                    />

                    <label class="px-5" for="bch">Bitcoin Cash</label><br />
                  </div>

                  <div v-if="item.digital_currency_3 == true">
                    <input
                      v-on:change="checkoutpaymenttype($event, item)"
                      v-model="item.selected_currency"
                      type="radio"
                      :id="item.id"
                      :name="item.id"
                      value="3"
                      :checked="item.selected_digital_currency == 3"
                    />
                    <label class="px-5" for="xmr">Monero</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-3 px-10 py-10">
        <div class="grid grid-cols-1">
          <div class="col-span-1">
            <h1 class="font-semibold text-2xl border-b pb-8">Order Summary</h1>
          </div>
          <div class="mb-5">
            <div v-if="btctotalprice > 0">
              <div class="col-span-1">
                <span class="font-semibold text-sm uppercase">Bitcoin </span>
                <div class="text-[14px]">Items: {{ btcsumofitem }}</div>
                <div class="text-[14px]">Price: {{ btcprice }}</div>
                <div class="text-[14px]">
                  Shipping Price: {{ btcshippingprice }}
                </div>
                <div class="text-[14px]">Total Price: {{ btctotalprice }}</div>
              </div>
            </div>
            <div v-if="bchtotalprice > 0">
              <div class="col-span-1">
                <span class="font-semibold text-sm uppercase"
                  >Bitcoin Cash</span
                >
                <div class="text-[14px]">Items: {{ bchsumofitem }}</div>
                <div class="text-[14px]">Price: {{ bchprice }}</div>
                <div class="text-[14px]">
                  Shipping Price: {{ bchshippingprice }}
                </div>
                <div class="text-[14px]">Total Price: {{ bchtotalprice }}</div>
              </div>
            </div>
            <div v-if="xmrtotalprice > 0">
              <div class="col-span-1">
                <span class="font-semibold text-sm uppercase">Monero</span>
                <div class="text-[14px]">Items: {{ xmrsumofitem }}</div>
                <div class="text-[14px]">Price: {{ xmrprice }}</div>
                <div class="text-[14px]">
                  Shipping Price: {{ xmrshippingprice }}
                </div>
                <div class="text-[14px]">Total Price: {{ xmrtotalprice }}</div>
              </div>
            </div>
            <div class="mt-5 mb-5">
              <button
                v-show="
                  xmrtotalprice <= xmrbalance &&
                  bchtotalprice <= bchbalance &&
                  btctotalprice <= btcbalance
                "
                @click="checkoutorder()"
                class="bg-yellow-500 rounded-md font-semibold hover:bg-yellow-600 py-3 text-sm text-white uppercase w-full"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <MainFooter />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { notify } from "@kyvg/vue3-notification";
import authHeader from "../../services/auth.header";
import MainHeaderTop from "../../layouts/headers/MainHeaderTop.vue";
import MainHeaderMid from "../../layouts/headers/MainHeaderMid.vue";
import MainHeaderBottom from "../../layouts/headers/MainHeaderBottom.vue";
import MainHeaderVendor from "../../layouts/headers/MainHeaderVendor.vue";
import MainFooter from "../../layouts/footers/FooterMain.vue";

export default defineComponent({
  name: "Checkout",

  components: {
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainHeaderVendor,
    MainFooter,
  },

  data() {
    return {
      checkoutitems: "",
      shopping_cart_items_list: "",
      xmrbalance: "",
      bchbalance: "",
      btcbalance: "",
      btcsumofitem: "",
      btcprice: "",
      btcshippingprice: "",
      btctotalprice: "",
      bchsumofitem: "",
      bchprice: "",
      bchshippingprice: "",
      bchtotalprice: "",
      xmrsumofitem: "",
      xmrprice: "",
      xmrshippingprice: "",
      xmrtotalprice: "",
      address_name: "",
      countryList: "",
      country: "",
      address: "",
      apt: "",
      city: "",
      stateorprovence: "",
      zip: "",
      message: "",
      interval: null,
    };
  },

  mounted() {
    this.getxmrprice();
    this.getbchprice();
    this.getbtcprice();
    this.get_shopping_cart_items();
    this.updateprices();
    this.get_shopping_cart_order_summary();
    this.getcurrentshipping();
  },
  created() {
    this.interval = setInterval(() => {
      this.updateprices();
    }, 50000);
  },
  methods: {
    async checkoutorder() {
      await axios({
        method: "post",
        url: "/checkout/payment",
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if ((response.status = 200)) {
            notify({
              title: "Freeport Message",
              text: "Successfully completed order!",
              type: "success",
            });
            this.$router.push({ name: "userorders" });
          }
        })
        .catch((error) => {
          
        });
    },
    async updateprices() {
      await axios({
        method: "get",
        url: "/checkout/update/price",
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if ((response.status = 200)) {
          }
        })
        .catch((error) => {
        
        });
    },
    async get_shopping_cart_items() {
      await axios({
        method: "get",
        url: "/checkout/data/incart",
        headers: authHeader(),
        withCredentials: true,
      })
        .then((response) => {
          this.cart_status = response.status;
          if (this.cart_status == 200) {
            this.shopping_cart_items_list = response.data;
          } else {
            this.shopping_cart_items_list = null;
          }
        })
        .catch((error) => {
          this.shopping_cart_items_list = null;
         
        });
    },

    async checkoutpaymenttype(event, item) {
      this.selectedpayment = event.target.value;
      let payLoad = {
        new_currency: this.selectedpayment,
      };
      await axios({
        method: "post",
        url: "/checkout/changepaymentoption/" + item.id,
        headers: authHeader(),
        data: payLoad,
      })
        .then((response) => {
          this.get_shopping_cart_order_summary();
        })
        .catch((error) => {
          this.shopping_cart_items_list = null;
       
        });
    },

    async get_shopping_cart_order_summary() {
      await axios({
        method: "get",
        url: "/checkout/data/cart/total",
        headers: authHeader(),
      }).then((response) => {
        this.cart_status = response.status;
        if (this.cart_status == 200) {
          this.btcsumofitem = response.data.btc_sum_of_item;
          this.btcprice = response.data.btc_price;
          this.btcshippingprice = response.data.btc_shipping_price;
          this.btctotalprice = response.data.btc_total_price;
          this.bchsumofitem = response.data.bch_sum_of_item;
          this.bchprice = response.data.bch_price;
          this.bchshippingprice = response.data.bch_shipping_price;
          this.bchtotalprice = response.data.bch_total_price;
          this.xmrsumofitem = response.data.xmr_sum_of_item;
          this.xmrprice = response.data.xmr_price;
          this.xmrshippingprice = response.data.xmr_shipping_price;
          this.xmrtotalprice = response.data.xmr_total_price;
        }
      }).catch((error) => {
          
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
          this.address_name = response.data.address_name;
          this.country = response.data.country;
          this.address = response.data.address;
          this.apt = response.data.apt;
          this.city = response.data.city;
          this.address = response.data.address;
          this.stateorprovence = response.data.state_or_provence;
          this.zip = response.data.zip;
          this.message = response.data.message;
        }
      });
    },
    //  Get prices of current coins
    async getxmrprice() {
      await axios({
        method: "get",
        url: "/xmr/balance",
        headers: authHeader(),
      })
        .then((response) => {
          if (response.data) {
            this.xmrbalance = response.data.xmr_balance;
          }
        })
        .catch((error) => {
          this.shopping_cart_items_list = null;
        
        });
    },
    async getbchprice() {
      await axios({
        method: "get",
        url: "/bch/balance",
        headers: authHeader(),
      })
        .then((response) => {
          if (response.data) {
            this.bchbalance = response.data.bch_balance;
          }
        })
        .catch((error) => {
          this.shopping_cart_items_list = null;
        
        });
    },
    async getbtcprice() {
      await axios({
        method: "get",
        url: "/btc/balance",
        headers: authHeader(),
      })
        .then((response) => {
          if (response.data) {
            this.btcbalance = response.data.btc_balance;
          }
        })
        .catch((error) => {
          this.shopping_cart_items_list = null;
         
        });
    },
  },
});
</script>
