<template>
  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />
  <div v-if="user">
    <MainHeaderVendor v-show="user.user_admin == 1" />
  </div>
  <div class="max-w-7xl mx-auto px-10 pb-36 wrapper">
    <div class="grid grid-cols-1 w-full gap-4">
      <div class="mb-10 mt-5">
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
          </ol>
        </nav>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-9 px-10 py-10">
        <div class="grid grid-cols-4 border-b pb-8">
          <h1 class="col-span-1 font-semibold text-2xl">Shopping Cart</h1>
          <h2 class="col-span-1 col-start-4 font-semibold text-2xl">
            {{ order_summary_count }} Items
          </h2>
        </div>

        <div v-if="shopping_cart_items_list">
          <div v-for="(item, index) in shopping_cart_items_list" :key="index">
            <div class="hover:bg-gray-100">
              <div class="grid grid-cols-12 px-1 py-1">
                <!-- product -->

                <div class="col-span-3">
                  <img
                    class="h-24"
                    src="https://drive.google.com/uc?id=18KkAVkGFvaGNqPy2DIvTqmUH_nk39o3z"
                    alt=""
                  />
                </div>
                <div class="col-span-7">
                  <div class="grid grid-cols-12">
                    <div class="col-span-12 font-bold text-[18px]">
                      {{ item.title_of_item }}
                    </div>
                    <div class="col-span-12 font-bold text-[18px] py-1">
                      <span class="text-blue-600 hover:text-blue-300 text-xs">
                        <router-link
                          :to="{
                            name: 'userprofile',
                            params: { uuid: item.vendor_uuid },
                          }"
                        >
                          Sold by: {{ item.vendor_user_name }}
                        </router-link>
                      </span>
                    </div>
                    <div class="col-span-12 font-bold text-[18px] py-1">
                      <select
                        @change="itemamount($event, item)"
                        v-model="item.quantity_of_item"
                      >
                        <option value="1">1</option>
                        <option value="2" v-if="item.vendor_supply >= 2">
                          2
                        </option>
                        <option value="3" v-if="item.vendor_supply >= 3">
                          3
                        </option>
                        <option value="4" v-if="item.vendor_supply >= 4">
                          4
                        </option>
                        <option value="5" v-if="item.vendor_supply >= 5">
                          5
                        </option>
                        <option value="6" v-if="item.vendor_supply >= 6">
                          6
                        </option>
                        <option value="7" v-if="item.vendor_supply >= 7">
                          7
                        </option>
                        <option value="8" v-if="item.vendor_supply >= 8">
                          8
                        </option>
                        <option value="9" v-if="item.vendor_supply >= 9">
                          9
                        </option>
                        <option value="10" v-if="item.vendor_supply >= 10">
                          10
                        </option>
                      </select>
                    </div>

                    <div class="col-span-12 font-bold text-[18px] py-1">
                      <select
                        @change="selectedshipping($event, item)"
                        :key="item.id"
                        v-model="item.selected_shipping"
                      >
                        <option value="1" v-if="item.shipping_free == true">
                          {{ item.shipping_info_0 }}
                        </option>
                        <option value="2" v-if="item.shipping_two == true">
                          {{ item.shipping_info_2 }}
                        </option>
                        <option value="3" v-if="item.shipping_three == true">
                          {{ item.shipping_info_3 }}
                        </option>
                      </select>
                    </div>
                    <div class="col-span-12 font-bold text-[18px] py-1">
                      <div class="flex">
                        <div class="">
                          <a
                            @click="deleteitem(item)"
                            href="#"
                            class="font-semibold hover:text-red-500 text-gray-500 text-xs"
                            >Remove</a
                          >
                        </div>
                        <div class="px-5">
                          <a
                            @click.prevent="saveforlateritem(item)"
                            href="#"
                            class="font-semibold hover:text-red-500 text-gray-500 text-xs"
                            >Save For Later</a
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-span-2 text-right">
                  <span class="font-semibold">${{ item.price_of_item }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="hover:bg-gray-100">
            <div class="grid grid-cols-1 px-1 py-1">
              <div class="text-[20px] text-center">
                No Items in your shopping cart!
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-4 pb-8 mt-10 border-t">
          <div class="col-span-12 font-semibold text-lg">Saved for Later</div>
        </div>

        <div v-if="shopping_cart_items_saved_list">
          <div v-for="(item, index) in shopping_cart_items_saved_list">
            <div class="hover:bg-gray-100">
              <div class="grid grid-cols-12 px-1 py-1">
                <!-- product -->

                <div class="col-span-3">
                  <img
                    class="h-24"
                    src="https://drive.google.com/uc?id=18KkAVkGFvaGNqPy2DIvTqmUH_nk39o3z"
                    alt=""
                  />
                </div>
                <div class="col-span-7">
                  <div class="grid grid-cols-12">
                    <div class="col-span-12 font-bold text-[18px]">
                      {{ item.title_of_item }}
                    </div>
                    <div class="col-span-12 font-bold text-[18px] py-1">
                      <span class="text-gray-600 text-xs">
                        Sold by: {{ item.vendor_user_name }}
                      </span>
                    </div>

                    <div class="col-span-12 font-bold text-[18px] py-1">
                      <div class="flex">
                        <div class="">
                          <a
                            @click.prevent="deleteitem(item)"
                            href="#"
                            class="font-semibold hover:text-red-500 text-gray-500 text-xs"
                            >Remove</a
                          >
                        </div>
                        <div class="px-5">
                          <a
                            @click.prevent="movetocartitem(item)"
                            href="#"
                            class="font-semibold hover:text-red-500 text-gray-500 text-xs"
                            >Move to Cart</a
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-span-2 text-right">
                  <span class="font-semibold">${{ item.price_of_item }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="hover:bg-gray-100">
            <div class="grid grid-cols-1 px-1 py-1">
              <div class="text-[20px] text-center">No saved items!</div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-3 px-8 py-10 border border-gray-300">
        <div class="grid grid-cols-1">
          <div class="col-span-1">
            <h1 class="font-semibold text-2xl border-b pb-8">Order Summary</h1>
          </div>
          <div class="mb-5">
            <div class="col-span-1">
              <span class="font-semibold text-sm uppercase"
                >Items {{ order_summary_count }}</span
              >
            </div>
          </div>
          <div>
            <div class="col-span-12">
              <label class="font-medium inline-block mb-3 text-sm uppercase"
                >Item Cost: {{ order_summary_cost }}</label
              >
            </div>
            <div class="col-span-12">
              <div v-if="order_summary_shipping_cost == 0">
                <div v-if="order_summary_count > 0">
                  <div class="text-orange-500">Free Shipping</div>
                </div>
              </div>
              <div v-else>
                <label class="font-medium inline-block mb-3 text-sm uppercase"
                  >Shipping: {{ order_summary_shipping_cost }}</label
                >
              </div>
            </div>
          </div>
          <div class="col-span-1">
            <div class="border-t mt-8">
              <div class="font-semibold py-6 text-sm uppercase">
                <span
                  >Total cost {{ order_summary_shipping_and_price_cost }}</span
                >
              </div>
              <router-link :to="{ name: 'checkout' }">
                <button
                  v-if="order_summary_count > 0"
                  class="bg-yellow-500 font-semibold hover:bg-yellow-600 py-3 text-sm text-white uppercase w-full"
                >
                  Checkout
                </button>
              </router-link>
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
  name: "Cart",
  components: {
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainHeaderVendor,
    MainFooter,
  },

  data() {
    return {
      shopping_cart_items_list: [],
      shopping_cart_items_saved_list: [],
      order_summary_count: "",
      order_summary_cost: "",
      order_summary_shipping_cost: "",
      order_summary_shipping_and_price_cost: "",
    };
  },
  mounted() {
    this.get_updated_prices_and_quantity();
    this.get_shopping_cart_items();
    this.get_shopping_cart_items_saved_for_later();
    this.get_shopping_cart_order_summary();
  },

  methods: {
    // gets the item to update price and quanity for cart
    async get_updated_prices_and_quantity() {
      await axios({
        method: "get",
        url: "/checkout/update/price",
        headers: authHeader(),
      })
        .then((response) => {
          if (response.status == 200) {
          }
        })
        .catch((error) => {
          notify({
            title: "Freeport Error",
            text: "Error retrieving information.",
            type: "error",
          });
        });
    },
    // was a bug so it would set items to one
    // not used currently
    async set_amount_to_one() {
      await axios({
        method: "post",
        url: "/checkout/setamount/one",
        headers: authHeader(),
      })
        .then((response) => {
          if (response.status == 200) {
          }
        })
       .catch((error) => {
          notify({
            title: "Freeport Error",
            text: "Error retrieving information.",
            type: "error",
          });
        });
    },

    // gets the items in the shopping cart
    async get_shopping_cart_items() {
      await axios({
        method: "get",
        url: "/checkout/data/incart",
        headers: authHeader(),
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
    // gets items saved for later
    async get_shopping_cart_items_saved_for_later() {
      await axios({
        method: "get",
        url: "/checkout/data/saved",
        headers: authHeader(),
      })
        .then((response) => {
          this.cart_status = response.status;
          if (this.cart_status == 200) {
            if (response.data.status !== "none") {
              this.shopping_cart_items_saved_list = response.data;
            } else {
              this.shopping_cart_items_saved_list = null;
            }
          }
        })
        .catch((error) => {
          this.shopping_cart_items_saved_list = null;
        });
    },
    // getts the " order summary" information
    async get_shopping_cart_order_summary() {
      await axios({
        method: "get",
        url: "/checkout/data/total",
        headers: authHeader(),
      })
        .then((response) => {
          this.cart_status = response.status;
          if (this.cart_status == 200) {
            this.order_summary_count = response.data.total_items;
            this.order_summary_shipping_cost = response.data.total_shipping;
            this.order_summary_cost = response.data.total_price_before_shipping;
            this.order_summary_shipping_and_price_cost =
              response.data.total_price;
          }
        })
        .catch((error) => {
          this.shopping_cart_items_saved_list = null;
        });
    },
    // get the item current amount
    async currentitemamount(item, index) {
      await axios({
        method: "get",
        url: "/checkout/currentquantity/" + item.id,
        headers: authHeader(),
      }).then((response) => {
        return response.data.amount;
      });
    },
    // changes the shipping option
    async selectedshipping(event, item) {
      this.option = event.target.value;
      let payLoad = {
        new_shipping_option: this.option,
      };
      await axios({
        method: "put",
        url: "/checkout/changeshippingoption/" + item.id,
        headers: authHeader(),
        data: payLoad,
      }).then((response) => {
        this.get_shopping_cart_order_summary();
      });
    },
    // update item amount
    async itemamount(event, item) {
      this.quantity = event.target.value;
      let payLoad = {
        new_amount: this.quantity,
      };
      await axios({
        method: "put",
        url: "/checkout/updateamount/" + item.id,
        headers: authHeader(),
        data: payLoad,
      })
        .then((response) => {
          if ((response.status = 200)) {
            notify({
              title: "Shopping Cart",
              text: "Item amount updated!",
              type: "success",
            });
            this.shopping_cart_count = response.data.status;

            this.get_shopping_cart_order_summary();
          }
        })
        .catch((error) => {
          notify({
            title: "Freeport Error",
            text: "Error posting information.",
            type: "error",
          });
        });
    },
    // delete an item
    async deleteitem(item) {
      await axios({
        method: "delete",
        url: "/checkout/delete/" + item.id,
        headers: authHeader(),
      })
        .then((response) => {
          if ((response.status = 200)) {
            notify({
              title: "Freeport Error",
              text: "Item deleted from shopping cart.",
              type: "error",
            });
            this.get_shopping_cart_items();
            this.get_shopping_cart_items_saved_for_later();
            this.get_shopping_cart_order_summary();
          }
        })
        .catch((error) => {
          notify({
            title: "Freeport Error",
            text: "Error posting information.",
            type: "error",
          });
        });
    },
    // save an item for later
    async saveforlateritem(item) {
      await axios({
        method: "put",
        url: "/checkout/saveforlater/" + item.id,
        headers: authHeader(),
      })
        .then((response) => {
          if ((response.status = 200)) {
            notify({
              title: "Shopping Cart",
              text: "Item saved for later!",
              type: "success",
            });
            this.get_shopping_cart_items();
            this.get_shopping_cart_items_saved_for_later();
            this.get_shopping_cart_order_summary();
          }
        })
        .catch((error) => {
          notify({
            title: "Freeport Error",
            text: "Error posting information.",
            type: "error",
          });
        });
    },
    // move item to sart from saved
    async movetocartitem(item) {
      await axios({
        method: "put",
        url: "/checkout/movecartitem/" + item.id,
        headers: authHeader(),
      })
        .then((response) => {
          if ((response.status = 200)) {
            notify({
              title: "Shopping Cart",
              text: "Item moved to cart!",
              type: "success",
            });
            this.get_shopping_cart_items();
            this.get_shopping_cart_items_saved_for_later();
            this.get_shopping_cart_order_summary();
          }
        })
        .catch((error) => {
          notify({
            title: "Freeport Error",
            text: "Error posting information.",
            type: "error",
          });
        });
    },
  },
});
</script>
