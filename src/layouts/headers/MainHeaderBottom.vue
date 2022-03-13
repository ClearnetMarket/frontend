<template>
    <div class="bg-zinc-700 py-1 text-white">
        <div class="container grid grid-cols-12 max-w-7xl mx-auto text-bold text-center">
            <div class="sm:col-span-6 md:col-start-2 md:col-span-2 m-0 h-full">
                <select
                    class="form-select appearance-none block h-full w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat rounded transition ease-in-out m-0"
                    aria-label="Default select example"
                >
                    <option selected>All Categories</option>
                    <option
                        class="shadow form-select appearance-none block w-full px-3 py-1.5 text-base font-normal focus:shadow-outline text-gray-500 bg-white bg-clip-padding bg-no-repeat border rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        v-for="(item, index) in categoriesList"
                        :key="index"
                        :value="item.id"
                    >{{ item.name }}</option>
                </select>
            </div>
            <div class="col-start-10 col-span-1 pt-2 text-[13px] font-bold ">
                <div class="text-white">Bitcoin</div>
                <div class=" pl-1">{{ btcprice }} USD</div>
            </div>
            <div class="col-start-11 col-span-1 pt-2 text-[13px] font-bold ">
                <div class="text-white">Bitcoin Cash</div>
                <div class=" pl-1">{{ bchprice }} USD</div>
            </div>
            <div class="col-start-12 col-span-1 pt-2 text-[13px] font-bold ">
                <div class="text-white">Monero</div>
                <div class=" pl-1 font-bold">{{ xmrprice }} USD</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import axios from 'axios';
import { MenuIcon } from '@heroicons/vue/solid'

export default defineComponent({
    name: 'MainHeaderBottom',
    components: { MenuIcon },
    data () {
        return {
            btcprice: null,
            xmrprice: null,
            bchprice: null,

            // btcbalance: null,
            // xmrbalance: null,
            // bchbalance: null,

            categoriesList: {},
        }
    },
    computed: {
        ...mapGetters(['user']),
    },
    mounted () {
        this.getbtcprice();
        this.getbchprice();
        this.getxmrprice();

        // this.getxmrbalance();
        // this.getbchbalance();
        // this.getbtcbalance();

        this.getCategoryList();
    },

    methods: {
        gotoxmrwallet () {
            this.$router.push({ name: 'xmrwallet' });
        },
        gotobtcwallet () {
            this.$router.push({ name: 'btcwallet' });
        },

        gotobchwallet () {
            this.$router.push({ name: 'bchwallet' });
        },

        //  Get prices of current coins
        async getxmrprice () {
            await axios({
                method: 'get',
                url: '/xmr/price',
            })
                .then((response) => {
                    if (response.data) {
                        this.xmrprice = response.data.price_xmr_usd
                    }
                })
        },
        async getbchprice () {
            await axios({
                method: 'get',
                url: '/bch/price',
            })
                .then((response) => {
                    if (response.data) {
                        this.bchprice = response.data.bch_price_usd
                    }
                })
        },
        async getbtcprice () {
            await axios({
                method: 'get',
                url: '/btc/price',
            })
                .then((response) => {
                    if (response.data) {
                        this.btcprice = response.data.btc_price_usd
                    }
                })
        },
        // //  Get balances for dropdowns
        // async getxmrbalance () {
        //     await axios({
        //         method: 'get',
        //         url: '/xmr/balance',
        //     })
        //         .then((response) => {
        //             if (response.data) {
        //                 this.xmrbalance = response.data.xmr_balance
        //             }
        //         })
        // },

        // async getbchbalance () {
        //     await axios({
        //         method: 'get',
        //         url: '/bch/balance',
        //     })
        //         .then((response) => {
        //             if (response.data) {
        //                 this.bchbalance = response.data.bch_balance
        //             }
        //         })
        // },
        // async getbtcbalance () {
        //     await axios({
        //         method: 'get',
        //         url: '/btc/balance',
        //     })
        //         .then((response) => {
        //             if (response.data) {
        //                 this.btcbalance = response.data.btc_balance
        //             }
        //         })
        // },
        async getCategoryList () {
            const path = '/category/sidebar';
            await axios
                .get(path, { withCredentials: true })
                .then((response) => {
                    this.categoriesList = response.data;
                })
                .catch((error) => {

                });
        },


    },
});
</script>
