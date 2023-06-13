<template>
    <div class="grid grid-cols-12 flex-col  ">
        <div class="col-span-12 text-[24px] text-white pl-3">Featured Items</div>
        <div class="col-span-12 sm:gap-1 md:gap-5 md:mb-5
                        flex sm:justify-center sm:flex-wrap md:flex-nowrap 
                         md:justify-start 
                        md:overflow-hidden ">
            <div v-for="item in todayfeatured" :key="item.id">
                <generic_item :item="item" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import generic_item from '../item/generic_item.vue'

export default defineComponent({
    name: 'TodayFeatured',
    components: {
        generic_item,
    },
    data () {
        return {
            todayfeatured: [],
            loadedbtcprice: false,

            price_coin_btc: null,
            price_coin_bch: null,
            price_coin_xmr: null,
            price: 0,
            currency: 0,
        }
    },
    computed: {},

    mounted () {
        this.gettodayfeatured()
    },

    methods: {
        gettodayfeatured () {
            axios({
                method: 'get',
                url: '/itemquery/query/todayfeatured',
                withCredentials: true,
            })
                .then((response) => {
                    this.todayfeatured = response.data
                })
                .catch(() => { })
        },
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

    },
})
</script>
<style>
.break {
    flex-basis: 100%;
    height: 0;
}
</style>
