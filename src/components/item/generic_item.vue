<template>
    <!--Card 1 Type-->

    <div class="h-80 w-40" @click="$router.replace({ name: 'MarketItem', params: { id: item.uuid } })" style="cursor: pointer">

        <div class="rounded overflow-hidden border  text-center shadow-md w-40 md:w-42 h-64 bg-neutral mt-5 ">
            <div class="flex justify-center w-full overflow-hidden h-48">
                <div class="md:w-48 md:h-48 " v-if="item.image_one_url_250">
                    <img class="object-contain " :src="item.image_one_url_250" />
                </div>
                <div v-else class="">
                    <img class=" object-cover w-48 h-36" src="../../assets/noimage.jpg" alt="" />
                </div>
            </div>

            <!--- Price and Currency -->
            <div class="flex justify-center text-[18px] font-bold  ">
                {{ item.price }} {{ returncurrencysymbol (item.currency) }}
            </div>

            <!--- Currency accepted bubbles -->
            <div class="flex justify-center pt-2">
            
                <span v-if="item.digital_currency_1 === true"
                    class="inline-block   px-3 py-1 text-sm font-semibold text-orange-500 mr-2 mb-2">BTC</span>
                <span v-if="item.digital_currency_3 === true"
                    class="inline-block   px-3 py-1 text-sm font-semibold text-orange-700 mr-2 mb-2">XMR</span>
                <span v-if="item.digital_currency_2 === true"
                    class="inline-block  px-2 py-1 text-sm font-semibold text-green-600 mr-2 mb-2">BCH</span>
            </div>
        </div>
    </div>

</template>

<script lang="ts">

import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
    name: "generic_item",
    props: [
        "item",

    ],
    data () {
        return {
            coin: [],
            price_coin_btc: null,
            price_coin_bch: null,
            price_coin_xmr: null,

        };
    },
    mounted () { },
    computed: {},
    methods: {
        pricefilter_btc (price: number, currency: number) {
            axios({
                method: "get",
                url: "/price/btcprice/" + price + '/' + currency,
                withCredentials: true,
            })
                .then((response) => {
                    if (response.data.success) {
                        this.price_coin_btc = response.data.coin;
                    }
                })
                .catch(() => { });
        },

        pricefilter_bch (price: number, currency: number) {
            axios({
                method: "get",
                url: "/price/bchprice/" + price + '/' + currency,
                withCredentials: true,
            })
                .then((response) => {
                    if (response.data.success) {
                        this.price_coin_bch = response.data.coin;
                    }
                })
                .catch(() => { });
        },

        pricefilter_xmr (price: number, currency: number) {
            axios({
                method: "get",
                url: "/price/xmrprice/" + price + '/' + currency,
                withCredentials: true,
            })
                .then((response) => {
                    if (response.data.success) {
                        this.price_coin_xmr = response.data.coin;
                    }
                })
                .catch(() => { });
        },
        returncurrencysymbol (currencydigit: number) {
            if (currencydigit === 0) { return "$" }
            else if (currencydigit === 1) { return "₱" }
            else if (currencydigit === 2) { return "CHF" }
            else if (currencydigit === 3) { return "SAD" }
            else if (currencydigit === 4) { return "B/." }
            else if (currencydigit === 5) { return "₽" }
            else if (currencydigit === 6) { return "kr" }
            else if (currencydigit === 7) { return "kr" }
            else if (currencydigit === 8) { return "kr" }
            else if (currencydigit === 9) { return "₪" }
            else if (currencydigit === 10) { return "kr" }
            else if (currencydigit === 11) { return "฿" }
            else if (currencydigit === 12) { return "R$" }
            else if (currencydigit === 13) { return "₹" }
            else if (currencydigit === 14) { return "R" }
            else if (currencydigit === 14) { return "$" }
            else if (currencydigit === 16) { return "¥" }
            else if (currencydigit === 17) { return "Ft" }
            else if (currencydigit === 18) { return "$" }
            else if (currencydigit === 19) { return "¥" }
            else if (currencydigit === 20) { return "$" }
            else if (currencydigit === 21) { return "zł" }
            else if (currencydigit === 22) { return "£" }
            else if (currencydigit === 23) { return "₺" }
            else if (currencydigit === 24) { return "₩" }
            else if (currencydigit === 25) { return "Rp" }
            else if (currencydigit === 26) { return "$" }
            else if (currencydigit === 27) { return "RM" }
            else if (currencydigit === 28) { return "лв" }
            else if (currencydigit === 29) { return "€" }
            else if (currencydigit === 31) { return "kn" }
            else if (currencydigit === 30) { return "Kč" }
        },
        returncurrency (currencydigit: any) {
            if (currencydigit === 0) { return "USD" }
            else if (currencydigit === 1) { return "PHP" }
            else if (currencydigit === 2) { return "CHF" }
            else if (currencydigit === 3) { return "SAD" }
            else if (currencydigit === 4) { return "SGD" }
            else if (currencydigit === 5) { return "RUB" }
            else if (currencydigit === 6) { return "DKK" }
            else if (currencydigit === 7) { return "RON" }
            else if (currencydigit === 8) { return "NOK" }
            else if (currencydigit === 9) { return "ILS"; }
            else if (currencydigit === 10) { return "SEK" }
            else if (currencydigit === 11) { return "THB" }
            else if (currencydigit === 12) { return "BRL" }
            else if (currencydigit === 13) { return "INR" }
            else if (currencydigit === 14) { return "ZAR" }
            else if (currencydigit === 14) { return "HKD" }
            else if (currencydigit === 16) { return "JPY" }
            else if (currencydigit === 17) { return "HUF" }
            else if (currencydigit === 18) { return "MXN" }
            else if (currencydigit === 19) { return "CNY" }
            else if (currencydigit === 20) { return "AUD" }
            else if (currencydigit === 21) { return "PLN" }
            else if (currencydigit === 22) { return "GBP" }
            else if (currencydigit === 23) { return "TRY" }
            else if (currencydigit === 24) { return "KRW" }
            else if (currencydigit === 25) { return "IDR" }
            else if (currencydigit === 26) { return "NZD" }
            else if (currencydigit === 27) { return "MYR" }
            else if (currencydigit === 28) { return "BGN" }
            else if (currencydigit === 29) { return "EUR" }
            else if (currencydigit === 31) { return "HRK" }
            else if (currencydigit === 30) { return "CZK" }
        },
    },
});
</script>
