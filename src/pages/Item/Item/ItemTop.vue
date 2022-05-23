<template>
  <div class="max-w-7xl mx-auto px-10 border-b mb-10">
    <div class="grid sm:grid-cols-1 md:grid-cols-3 mt-5 gap-5">
      <div class="col-span-1">Images</div>
      <div class="col-span-1 px-5">
        <div class="text-[20px] mb-1 font-bold">{{ title }}</div>
        <div class="border border-gray-400 mb-5"></div>
        <div class="flex gap-4">
          <div class="text-[16px] font-weight-bold text-gray-700">
            Conditon:
          </div>
          <div class="text-[16px] text-gray-700">
            {{ condition }}
          </div>
        </div>
        <div class="flex gap-4">
          <div class="text-[16px] font-weight-bold text-gray-700">
            Quantity:
          </div>
          <div class="text-[16px] text-gray-700">
            {{ itemcount }}
          </div>
        </div>

        <div class="flex pt-4 mb-1 justify-between">
          <div v-if="digitalcurrencyone == true">
            <span class="text-sm font-semibold text-orange-500 mr-2 mb-2"
              >Bitcoin</span
            >
          </div>
          <div v-if="digitalcurrencythree == true">
            <span class="text-sm font-semibold text-orange-700 mr-2 mb-2">
              Monero</span
            >
          </div>
          <div v-if="digitalcurrencytwo == true">
            <span class="text-sm font-semibold text-green-600 mr-2 mb-2"
              >Bitcoin Cash</span
            >
          </div>
        </div>
        <div class="text-[24px] font-weight-bold text-gray-700 text-center">
          {{ price }} {{ returncurrencysymbol(currency) }}
        </div>

        <div class="mb-2 text-[14px]">
          <div v-if="digitalcurrencyone == true">
            <div class="flex">
              <div class="text-orange-500 pr-5">BTC:</div>
              <div class="font-weight-bold text-gray-700">
                {{ pricebtc }}
              </div>
            </div>
          </div>
          <div v-if="digitalcurrencytwo == true">
            <div class="flex">
              <div class="text-green-600 pr-5">BCH:</div>
              <div class="] font-weight-bold text-gray-700">
                {{ pricebch }}
              </div>
            </div>
          </div>
          <div v-if="digitalcurrencythree == true">
            <div class="flex">
              <div class="text-orange-700 pr-5">XMR:</div>
              <div class="font-weight-bold text-gray-700">
                {{ pricexmr }}
              </div>
            </div>
          </div>
        </div>
        <div class="mb-2 text-[14px] text-gray-700">
          <div class="grid grid-cols-12 gap-4">
            <div class="col-span-3">Located:</div>
            <div class="col-span-9">
              {{ exactcity }} {{ exactstateorprovence }} {{ exactzipcode }}
              {{ origincountry }}
            </div>
          </div>

          <div v-if="(shippingfree = true)">
            <div class="grid grid-cols-12 gap-4">
              <div class="font-[12px] col-span-3">Shipping:</div>

              <div class="flex col-span-9">
                Free Shipping Estimated {{ freeshippingdays }} days after
                purchase
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-1 px-5">
        <div class="flex justify-center mb-5">
          <button
            class="bg-yellow-500 hover:bg-zinc-400 hover:text-white rounded-lg text-black font-semibold py-2 px-10 focus:outline-none focus:shadow-outline content-center justify-center"
            type="submit"
            @click="addtocart()"
          >
            Add to Cart
          </button>
        </div>
        <div
          class="text-center mb-2 text-yellow-600 font-bold"
          v-if="shippingfree == true"
        >
          Free Shipping
        </div>
        <div class="flex flex-col">
          <div class="px-2 mb-5 text-gray-700 font-semibold">
            <div class="border rounded-lg px-2">
              <div class="px-5 text-[16px] text-center">
                Moderator Supported
              </div>
              <ul class="text-[11px] mb-5">
                <li>-All Items are backed by moderator support.</li>
                <li>-Dispute's prevent against fraud.</li>
              </ul>
              <div class="px-5 text-[16px] text-center">Escrow Transaction</div>
            </div>
          </div>
          <div class="flex flex-col">
            <div class="px-2 mb-10 text-gray-700 font-semibold">
              <div class="border rounded-lg px-2">
                <div class="text-[16px]">
                  <div class="mb-5 text-[18px] text-center">Vendor Stats</div>
                  <div class="text-[12px] flex">
                    <div v-if="vendoruuid">
                      <div class="flex">
                        <div class="">Sold by:</div>
                        <router-link
                          :to="{
                            name: 'vendorprofile',
                            params: { uuid: vendoruuid },
                          }"
                        >
                          <div
                            class="text-blue-500 hover:text-blue-300 hover:underline pl-3"
                          >
                            {{ vendorname }} ({{ vendortotalsales }})
                          </div>
                        </router-link>
                      </div>
                    </div>
                  </div>
                  <div v-if="vendortotalsales > 0">
                    <div class="text-[12px] flex">
                      ({{ vendorrating }} Feedback rating
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="star"
                        class="w-4 text-yellow-500 mr-1"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path
                          fill="currentColor"
                          d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 
                            103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5
                            105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                        ></path></svg
                      >)
                    </div>
                  </div>
                  <div v-else>
                    <div class="text-[12px]">Newbie Seller</div>
                  </div>

                  <div v-if="vendoruuid">
                    <div
                      class="mb-2 text-[14px] text-blue-500 hover:text-blue-300 hover:underline pl-3 text-center"
                    >
                      <router-link
                      v-if="user"
                        :to="{
                          name: 'MsgCreateItem',
                          params: { uuid: vendoruuid, itemuuid: uuid },
                        }"
                      >
                        Contact Seller
                      </router-link>
                    </div>
                  </div>
                  <div v-if="vendoruuid">
                    <div
                      class="text-[14px] text-blue-500 hover:text-blue-300 hover:underline pl-3 text-center"
                    >
                      <router-link
                        :to="{
                          name: 'vendorprofile',
                          params: { uuid: vendoruuid },
                        }"
                      >
                        View Vendor Store
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { notify } from "@kyvg/vue3-notification";
import { useRouter, useRoute } from "vue-router";
import authHeader from "../../../services/auth.header";

export default defineComponent({
  name: "ItemTop",
  props: [
    "uuid",
    "condition",
    "itemcount",
    "origincountry",
    "totalsold",
    "title",
    "currency",
    "vendorname",
    "vendortotalsales",
    "vendorrating",
    "vendoruuid",

    "imageoneserver",
    "imagetwoserver",
    "imagethreeserver",
    "imagefourserver",

    "digitalcurrencyone",
    "digitalcurrencytwo",
    "digitalcurrencythree",

    "freeshipping",
    "freeshippingdays",
    "shippingtwo",
    "shippingtwodays",
    "shippingthree",
    "shippingthreedays",

    "exactcity",
    "exactstateorprovence",
    "exactzipcode",

    "price",
    "pricebtc",
    "pricebch",
    "pricexmr",
  ],

  data() {
    return {
      shopping_cart_count: "",
      vendor_reviews_total: "",
      exact_city: "",
      exact_stateorprovence: "",
      exact_zipcode: "",
    };
  },
  computed() {},

  mounted() {
    const item_id_route = useRoute();
    this.item_id = item_id_route.params.id;
  },

  methods: {
    // Add item to cart
    addtocart() {
      axios({
        method: "post",
        url: "/checkout/add/" + this.item_id,
        headers: authHeader(),
      })
        .then((response) => {
          if ((response.status = 200)) {
            notify({
              title: "Shoppinng cart message",
              text: "Successfully added item to cart",
              type: "success",
            });
            this.get_shopping_cart_count();
          }
        })
        .catch((error) => {
          if (error.response) {
            notify({
              title: "Shopping Cart Error",
              text: "Error.  Could not add item to cart.",
              type: "error",
            });
          }
        });
    },

    // Get How many items in shopping cart
    async get_shopping_cart_count() {
      await axios({
        method: "get",
        url: "/info/user-cart-count",
        headers: authHeader(),
      }).then((response) => {
        this.shopping_cart_count = response.data.status;
        this.$emit("UpdateCart", this.shopping_cart_count);
      });
    },
    returncurrencysymbol(currencydigit) {
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
    returncurrency(currencydigit) {
      if (currencydigit === 0) {
        return "USD";
      } else if (currencydigit === 1) {
        return "PHP";
      } else if (currencydigit === 2) {
        return "CHF";
      } else if (currencydigit === 3) {
        return "SAD";
      } else if (currencydigit === 4) {
        return "SGD";
      } else if (currencydigit === 5) {
        return "RUB";
      } else if (currencydigit === 6) {
        return "DKK";
      } else if (currencydigit === 7) {
        return "RON";
      } else if (currencydigit === 8) {
        return "NOK";
      } else if (currencydigit === 9) {
        return "ILS";
      } else if (currencydigit === 10) {
        return "SEK";
      } else if (currencydigit === 11) {
        return "THB";
      } else if (currencydigit === 12) {
        return "BRL";
      } else if (currencydigit === 13) {
        return "INR";
      } else if (currencydigit === 14) {
        return "ZAR";
      } else if (currencydigit === 14) {
        return "HKD";
      } else if (currencydigit === 16) {
        return "JPY";
      } else if (currencydigit === 17) {
        return "HUF";
      } else if (currencydigit === 18) {
        return "MXN";
      } else if (currencydigit === 19) {
        return "CNY";
      } else if (currencydigit === 20) {
        return "AUD";
      } else if (currencydigit === 21) {
        return "PLN";
      } else if (currencydigit === 22) {
        return "GBP";
      } else if (currencydigit === 23) {
        return "TRY";
      } else if (currencydigit === 24) {
        return "KRW";
      } else if (currencydigit === 25) {
        return "IDR";
      } else if (currencydigit === 26) {
        return "NZD";
      } else if (currencydigit === 27) {
        return "MYR";
      } else if (currencydigit === 28) {
        return "BGN";
      } else if (currencydigit === 29) {
        return "EUR";
      } else if (currencydigit === 31) {
        return "HRK";
      } else if (currencydigit === 30) {
        return "CZK";
      }
    },
  },
});
</script>
<style></style>
