<template>
  <div class="grid grid-cols-12 bg-white mb-2 rounded-md">
    <div class="col-span-12 sm:col-span-12 md:col-span-3">
      <router-link :to="{ name: 'MarketItem', params: { id: item.uuid } }">
        <img alt="" class="object-cover h-48 w-96" :src=item.image_one_url_250 />
      </router-link>
    </div>
    <div class="col-span-12 sm:col-span-9  ">
      <div class="grid grid-cols-12 ">
        <div class="col-span-12 text-center text-[20px] font-bold ">
          <router-link :to="{ name: 'MarketItem', params: { id: item.uuid } }">
            {{ item.item_title }}
          </router-link>
        </div>
        <div class="col-span-6 sm:col-span-8  px-2">
          <div class="col-span-12 text-[26px] my-1">
            {{ item.price }}{{ returncurrencysymbol (item.currency) }}
          </div>
          <div class="col-span-12">
            <div class="flex">
              <div v-if="item.digital_currency_1 === true">
                <span class="inline-block  text-sm font-semibold text-orange-500 ">Bitcoin</span>
              </div>
              <div v-if="item.digital_currency_2 === true">
                <span class="inline-block   text-sm font-semibold text-orange-700 ">Monero</span>
              </div>
              <div v-if="item.digital_currency_3 === true">
                <span class="whitespace-nowrap inline-blocktext-sm font-semibold text-green-600">Bitcoin
                  Cash</span>
              </div>
            </div>
          </div>
          <div class="col-span-12 ">{{ item.item_count }} left</div>
          <div class="col-span-12" v-if="(item.shipping_free === true)">
            <div class="text-gray-500">Free Shipping</div>
          </div>
          <div class="col-span-12" v-else>
            {{ item.shipping_info_2 }}
          </div>

        </div>
        <div class="col-span-6 md:hidden px-2 ">
          <div class="col-span-12 mt-10">
            <router-link :to="{
              name: 'userprofile',
              params: { uuid: item.vendor_uuid },
            }">
              <div class="text-blue-500 hover:text-blue-300 hover:underline ">
                {{ item.vendor_display_name }}
              </div>
            </router-link>
          </div>
          <div class="col-span-12 ">
            <StarRating v-bind:rating="item.item_rating" />
          </div>
        </div>
        <div class="col-span-12 sm:col-span-4 flex justify-center pt-5 pb-5">
          <router-link :to="{ name: 'MarketItem', params: { id: item.uuid } }">
            <button
              class="bg-yellow-500 hover:bg-zinc-400 hover:text-white rounded-lg text-black font-semibold py-2 px-10 focus:outline-none focus:shadow-outline content-center justify-center"
              type="submit">
              View Item
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import StarRating from "../../components/star_rating/Star.vue";


export default defineComponent({
  name: "Searchitems",
  props: ["item"],
  components: {
    StarRating,
  },
  data () {
    return {
      vendorreviews: [],
    };
  },

  mounted () { },
  computed: {},

  methods: {
    getvendorreviews () {
      axios({
        method: "get",
        url: "/vendor/vendor-feedback/" + this.item.vendor_uuid,
        withCredentials: true,
      })
        .then((response) => {
          if ((response.status = 200)) {
            this.vendorreviews = response.data;
            if (this.vendorreviews == undefined) {
              this.vendorreviews = null;
            }
          }
        })
        .catch(() => { });
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
    returncurrency (currencydigit: number) {
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
