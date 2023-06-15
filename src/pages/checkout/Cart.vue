
<template>
  <div v-if="loaded">
    <MainHeaderTop />
    <MainHeaderMid />
    <MainHeaderBottom />
    <div v-if="user">
      <MainHeaderVendor v-show="user.user_admin === 1" />
    </div>
    <div class="wrapper">
      <div class="max-w-7xl mx-auto pb-36 ">
        <div class="grid grid-cols-1 w-full gap-4 px-10 mb-5">
          <div class="mt-5">
            <nav class="rounded-md">
              <ol class="list-reset flex">
                <li>
                  <router-link :to="{ name: 'home' }">
                    <a class="text-primary hover:text-primary ">Home</a>
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
          <div class="col-span-12 md:col-span-9 px-2">
            <div class="grid grid-cols-4 border-b pb-8">
              <div class="col-span-3 font-semibold text-2xl ">Shopping Cart</div>
              <div class="col-span-1 col-start-4 font-semibold text-2xl">
                {{ order_summary_count }} Items
              </div>
            </div>
            <div v-if="order_summary_count > 0">
              <div v-for="(item, index) in shopping_cart_items_list" :key="index">
                <div v-if="item.title_of_item">
                  <div class="bg-neutral hover:bg-secondary p-2 rounded-md">
                    <div class="grid grid-cols-12 px-1 py-1 gap-5">
                      <!-- product -->

                      <div class="col-span-3">
                        <img class="h-24" :src="item.image_of_item" alt="" />
                      </div>
                      <div class="col-span-7">
                        <div class="grid grid-cols-12 ">
                          <div class="col-span-12 font-bold text-[18px]">
                            {{ item.title_of_item }}
                          </div>
                          <div class="col-span-12 font-bold text-[18px] py-1">
                            <span class="text-primary hover:text-blue-300 text-xs ">
                              <div v-if="item.vendor_uuid">
                                <router-link :to="{
                                  name: 'vendorprofile',
                                  params: { uuid: item.vendor_uuid },
                                }">
                                  Sold by: {{ item.vendor_user_name }}
                                </router-link>
                              </div>
                            </span>
                          </div>
                          <div class="col-span-12 font-bold text-[18px] py-1 text-black">
                            <select @change="itemamount($event, item)" v-model="item.quantity_of_item">
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

                          <div class="col-span-12 font-bold text-[18px] py-1 text-black">
                            <select @change="selectedshipping($event, item)" :key="item.id"
                              v-model="item.selected_shipping">
                              <option value="1" v-if="item.shipping_free === true">
                                {{ item.shipping_info_0 }}
                              </option>
                              <option value="2" v-if="item.shipping_two === true">
                                {{ item.shipping_info_2 }}
                              </option>
                              <option value="3" v-if="item.shipping_three === true">
                                {{ item.shipping_info_3 }}
                              </option>
                            </select>
                          </div>
                          <div class="col-span-12 font-bold text-[18px] py-1">
                            <div class="flex">
                              <div class="">
                                <a @click="deleteitem(item)" href="#"
                                  class="font-semibold hover:text-red-500 text-gray-500 text-xs">Remove</a>
                              </div>
                              <div class="px-5">
                                <a @click.prevent="saveforlateritem(item)" href="#"
                                  class="font-semibold hover:text-red-500 text-gray-500 text-xs">Save For Later</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-span-2 text-right text-[18px] p-5">
                        <span class="font-semibold"> {{ item.price_of_item }}{{ returncurrencysymbol(item.currency)
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="hover:bg-blue-300">
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
              <div v-for="item in shopping_cart_items_saved_list">
                <div class="hover:bg-blue-300 bg-neutral">
                  <div class="grid grid-cols-12 px-1 py-1">
                    <!-- product -->
                    <div class="col-span-3">
                      <img class="h-24" :src="item.image_of_item" alt="" />
                    </div>
                    <div class="col-span-7">
                      <div class="grid grid-cols-12">
                        <div class="col-span-12 font-bold text-[18px]">
                          {{ item.title_of_item }}
                        </div>
                        <div class="col-span-12 font-bold text-[18px] py-1">
                          <span class="text-white text-xs">
                            Sold by: {{ item.vendor_user_name }}
                          </span>
                        </div>

                        <div class="col-span-12 font-bold text-[18px] py-1">
                          <div class="flex">
                            <div class="">
                              <a @click.prevent="deleteitem(item)" href="#"
                                class="font-semibold hover:text-red-500 text-gray-500 text-xs">Remove</a>
                            </div>
                            <div class="px-5">
                              <a @click.prevent="movetocartitem(item)" href="#"
                                class="font-semibold hover:text-red-500 text-gray-500 text-xs">Move to Cart</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-span-2 text-right">
                      <span class="font-semibold">
                        {{ item.price_of_item }}{{ returncurrencysymbol(item.currency) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="hover:bg-gray-300">
                <div class="grid grid-cols-1 px-1 py-1">
                  <div class="text-[20px] text-center">No saved items!</div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-span-12 md:col-span-3 px-8  rounded-md  bg-neutral">
            <div v-if="order_summary_count > 0">
              <div class="grid grid-cols-1">
                <div class="col-span-1">
                  <h1 class="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                </div>
                <div class="mb-5">
                  <div class="col-span-1">
                    <span class="font-semibold text-sm uppercase">Items {{ order_summary_count }}</span>
                  </div>
                </div>
                <div>
                  <div class="col-span-12">
                    <label class="font-medium inline-block mb-3 text-sm uppercase">Item Cost: {{ order_summary_cost }} {{
                      returncurrencysymbol(user.currency)
                    }}</label>
                  </div>
                  <div class="col-span-12">
                    <div v-if="order_summary_shipping_cost === 0">
                      <div v-if="order_summary_count > 0">
                        <div class="text-primary font-bold">Free Shipping</div>
                      </div>
                    </div>
                    <div v-else>
                      <label class="font-medium inline-block mb-3 text-sm uppercase">Shipping: {{
                        order_summary_shipping_cost
                      }}</label>
                    </div>
                  </div>
                </div>
                <div class="col-span-1">
                  <div class="border-t mt-8">
                    <div class="font-semibold py-6 text-sm uppercase">
                      <span>Total cost {{ order_summary_shipping_and_price_cost }} {{
                        returncurrencysymbol(user.currency)
                      }}</span>
                    </div>
                    <router-link :to="{ name: 'checkout' }">
                      <button v-if="order_summary_count > 0"
                        class="bg-primary font-semibold hover:bg-primary py-3 text-sm text-white uppercase w-full rounded-md">
                        Checkout
                      </button>
                    </router-link>

                    <div class="text-white bg-secondary mt-5 mb-5 text-center font-bold">
                      Crypto Prices will be calculated on Checkout
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <h1 class="font-semibold text-[16px] text-center text-white">Add Items to your cart to checkout</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <MainFooter />
  </div>
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

  data () {
    return {
      loaded: false,
      user: null,
      quantity: 0,
      cart_status: null,
      option: null,
      shopping_cart_count: 0,
      shopping_cart_items_list: [],
      shopping_cart_items_saved_list: [],
      order_summary_count: 0,
      order_summary_cost: 0,
      order_summary_shipping_cost: 0,
      order_summary_shipping_and_price_cost: "",
    };
  },
  created () {
    this.userstatus();
  },
  mounted () {
    this.get_updated_prices_and_quantity();
    this.get_shopping_cart_items();
    this.get_shopping_cart_items_saved_for_later();
    this.get_shopping_cart_order_summary();
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
    // gets the item to update price and quanity for cart
    get_updated_prices_and_quantity () {
      axios({
        method: "get",
        url: "/checkout/update/price",
        headers: authHeader(),
      })
        .then((response) => {
          if (response.data.success) { }
        })
        .catch((error) => { });
    },
    // gets the items in the shopping cart
    get_shopping_cart_items () {
      axios({
        method: "get",
        url: "/checkout/data/incart",
        headers: authHeader(),
      })
        .then((response) => {
          if (response.data.error) { this.shopping_cart_items_list = null }
          else { this.shopping_cart_items_list = response.data }
        })
        .catch(() => {
          this.shopping_cart_items_list = null;
        });
    },
    // gets items saved for later
    get_shopping_cart_items_saved_for_later () {
      axios({
        method: "get",
        url: "/checkout/data/saved",
        headers: authHeader(),
      })
        .then((response) => {

          if (response.data.error) { this.shopping_cart_items_saved_list = null }
          else { this.shopping_cart_items_saved_list = response.data }

        })
        .catch(() => {
          this.shopping_cart_items_saved_list = null;
        });
    },
    // gets the " order summary" information
    get_shopping_cart_order_summary () {
      axios({
        method: "get",
        url: "/checkout/data/total",
        headers: authHeader(),
      })
        .then((response) => {

          if (response.data.success) {
            this.order_summary_count = response.data.total_items;
            this.order_summary_shipping_cost = response.data.total_shipping;
            this.order_summary_cost = response.data.total_price_before_shipping;
            this.order_summary_shipping_and_price_cost = response.data.total_price;
          }
          this.loaded = true;
        })
        .catch(() => {
          this.shopping_cart_items_saved_list = null;
        });
    },

    selectedshipping (event: any, item: any) {
      this.option = event.target.value;
      let payLoad = {
        new_shipping_option: this.option,
      };
      axios({
        method: "put",
        url: "/checkout/changeshippingoption/" + item.id,
        headers: authHeader(),
        data: payLoad,
      })
        .then(() => {
          this.get_shopping_cart_order_summary();
        });
    },
    // update item amount
    itemamount (event: any, item: any) {
      this.quantity = event.target.value;
      let payLoad = {
        new_amount: this.quantity,
      };
      axios({
        method: "put",
        url: "/checkout/updateamount/" + item.id,
        headers: authHeader(),
        data: payLoad,
      })
        .then((response) => {
          if (response.data.success) {
            notify({
              title: "Shopping Cart",
              text: "Item amount updated!",
              type: "success",
            });
            this.shopping_cart_count = response.data.status;
            this.get_shopping_cart_order_summary();
          }
        })
        .catch(() => {
          notify({
            title: "Freeport Error",
            text: "Error posting information.",
            type: "error",
          });
        });
    },
    // delete an item
    deleteitem (item: any) {
      axios({
        method: "delete",
        url: "/checkout/delete/" + item.id,
        headers: authHeader(),
      })
        .then((response) => {
          if (response.data.success) {
            notify({
              title: "Success",
              text: "Item deleted from shopping cart.",
              type: "success",
            });
            this.get_shopping_cart_items();
            this.get_shopping_cart_items_saved_for_later();
            this.get_shopping_cart_order_summary();
          }
        })
        .catch(() => {
          notify({
            title: "Freeport Error",
            text: "Error posting information.",
            type: "error",
          });
        });
    },
    // save an item for later
    saveforlateritem (item: any) {
      axios({
        method: "put",
        url: "/checkout/saveforlater/" + item.id,
        headers: authHeader(),
      })
        .then((response) => {
          if (response.data.success) {
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
        .catch(() => {
          notify({
            title: "Freeport Error",
            text: "Error posting information.",
            type: "error",
          });
        });
    },
    // move item to sart from saved
    movetocartitem (item: any) {
      axios({
        method: "put",
        url: "/checkout/movecartitem/" + item.id,
        headers: authHeader(),
      })
        .then((response) => {
          if (response.data.success) {
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
        .catch(() => {
          notify({
            title: "Freeport Error",
            text: "Error posting information.",
            type: "error",
          });
        });
    },

    returncurrencysymbol (currencydigit: number) {
      if (currencydigit === 0) {
        return "$";
      } else if (currencydigit === 1) {
        return "₱";
      } else if (currencydigit === 2) {
        return "CHF";
      } else if (currencydigit === 3) {
        return "SAD";
      } else if (currencydigit === 4) {
        return "B/.";
      } else if (currencydigit === 5) {
        return "₽";
      } else if (currencydigit === 6) {
        return "kr";
      } else if (currencydigit === 7) {
        return "kr";
      } else if (currencydigit === 8) {
        return "kr";
      } else if (currencydigit === 9) {
        return "₪";
      } else if (currencydigit === 10) {
        return "kr";
      } else if (currencydigit === 11) {
        return "฿";
      } else if (currencydigit === 12) {
        return "R$";
      } else if (currencydigit === 13) {
        return "₹";
      } else if (currencydigit === 14) {
        return "R";
      } else if (currencydigit === 14) {
        return "$";
      } else if (currencydigit === 16) {
        return "¥";
      } else if (currencydigit === 17) {
        return "Ft";
      } else if (currencydigit === 18) {
        return "$";
      } else if (currencydigit === 19) {
        return "¥";
      } else if (currencydigit === 20) {
        return "$";
      } else if (currencydigit === 21) {
        return "zł";
      } else if (currencydigit === 22) {
        return "£";
      } else if (currencydigit === 23) {
        return "₺";
      } else if (currencydigit === 24) {
        return "₩";
      } else if (currencydigit === 25) {
        return "Rp";
      } else if (currencydigit === 26) {
        return "$";
      } else if (currencydigit === 27) {
        return "RM";
      } else if (currencydigit === 28) {
        return "лв";
      } else if (currencydigit === 29) {
        return "€";
      } else if (currencydigit === 31) {
        return "kn";
      } else if (currencydigit === 30) {
        return "Kč";
      }
    },
  },
});
</script>
