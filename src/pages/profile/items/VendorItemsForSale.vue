<template>
  <div class="mt-5 mx-10 flex gap-5">
    <div v-for="item in itemsforsale" :key="item.id">
      <div
        class=""
        @click="$router.replace({ name: 'item', params: { id: item.uuid } })"
        style="cursor: pointer"
      >
        <!--Card 1-->
        <div
          class="rounded overflow-hidden border border-gray-200 text-center w-64 h-64 bg-white shadow-md"
        >
          <div class="flex justify-center w-full">
            <div class="bg-red-200" v-if="item.image_one != null">
              <img
                class="object-contain w-24"
                src="{{item.image_one_server}}"
                alt=""
              />
            </div>
            <div v-else class="">
              <img
                class="object-contain w-24"
                src="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                alt="No Image Found .."
              />
            </div>
          </div>
          <!--- Item title -->
          <div
            class="text-[16px] h-12 text-blue-600 hover:text-blue-500 hover:underline overflow-hidden p-1"
          >
            {{ item.item_title }}
          </div>
          <!--- Price and Currency -->
          <div class="text-green-600 text-[18px] font-bold h-4">
            {{ item.price }} {{ returncurrencysymbol(item.currency) }}
          </div>
          <!--- Location -->
          <div class="text-[11px] h-6 overflow-hidden p-2 text-gray-500">
            {{ item.origin_country_name }}
          </div>
          <!--- Currency accepted bubbles -->
          <div class="flex justify-center pt-2">
            <span
              v-if="item.digital_currency_1 == true"
              class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-orange-500 mr-2 mb-2"
              >BTC</span
            >
            <span
              v-if="item.digital_currency_2 == true"
              class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-orange-700 mr-2 mb-2"
              >XMR</span
            >
            <span
              v-if="item.digital_currency_3 == true"
              class="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-green-600 mr-2 mb-2"
              >BCH</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { notify } from "@kyvg/vue3-notification";
import axios from "axios";

export default defineComponent({
  name: "GetVendorItems",
  props: ["vendoruuid"],
  data() {
    return {
      itemsforsale: "",
      loadedbtcprice: false,
    };
  },

  mounted() {
    this.getvendorsitemsforsale();
  },
  computed: {},

  methods: {
    async getvendorsitemsforsale() {
      await axios({
        method: "get",
        url: "/vendor/itemsforsale/" + this.vendoruuid,
        withCredentials: true,
      })
        .then((response) => {
          if ((response.status = 200)) {
            this.itemsforsale = response.data;
          }
        })
        .catch((error) => {
        
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
