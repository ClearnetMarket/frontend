<template>
    <MainHeaderTop />
    <MainHeaderMid />
    <MainHeaderBottom />

    <div v-if="user">
        <MainHeaderVendor v-show="user.user_admin === 1" />
    </div>
    <div class="wrapper">
        <!-- Top Stuff-->
        <div class="container max-w-7xl mx-auto px-10 pb-72 text-white">
            <!-- Container-->
            <div class="mt-5 mb-5">
                <nav class="rounded-md w-full">
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
            <div class="grid grid-cols-12 mb-5 md:mb-0 invisible md:visible text-[18px] bg-neutral rounded-t-md font-bold ">

                <div class="col-span-2 text-center">Coin</div>
                <div class="col-span-2 text-center">Market</div>
                <div class="col-span-3 text-center">Amount</div>
                <div class="col-span-5 text-center">Actions</div>
            </div>

            <div class="grid grid-cols-12 border-t-2 border-gray-200 bg-neutral mb-5 md:mb-0 font-bold">
                <div class="col-span-4 md:col-span-2 rounded-md p-5">
                    <div class="flex gap-3">
                        <img class="object-contain" src="../../assets/coin/btc/btc_small.png" alt="No Image Found .." />
                        Bitcoin
                    </div>
                </div>
                <div class="md:col-span-2 invisible md:visible rounded-md p-5 text-center">
                    {{ btcprice }}
                </div>
                <div class="col-span-7 md:col-span-3 rounded-md p-5 text-center">
                    <div v-if="btcbalance == 0">0 BTC</div>
                    <div v-else>{{ btcbalance }}</div>
                </div>
                <div class="col-span-12 md:col-span-5 justify-center flex py-3">
                    <router-link :to="{ name: 'btcwalletsend' }" class="px-1">
                        <button
                            class="bg-gray-700 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                        >
                            Withdraw
                        </button>
                    </router-link>
                    <router-link :to="{ name: 'btcwalletrecieve' }" class="px-1">
                        <button
                            class="bg-gray-700 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                        >
                            Deposit
                        </button>
                    </router-link>
                    <router-link :to="{ name: 'btcwallet' }" class="px-1">
                        <button
                            class="bg-gray-700 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                        >
                            Transactions
                        </button>
                    </router-link>
                </div>
            </div>

            <div class="grid grid-cols-12 border-t-2 border-gray-200 bg-neutral mb-5 md:mb-0 font-bold">
                <div class="col-span-4 md:col-span-2 rounded-md p-5">
                    <div class="flex gap-3">
                        <img class="object-contain" src="../../assets/coin/bch/bch_small.png" alt="No Image Found .." />
                        Bitcoin Cash
                    </div>
                </div>
                <div class="md:col-span-2 invisible md:visible rounded-md p-5 text-center">
                    {{ bchprice }}
                </div>
                <div class="col-span-7 md:col-span-3 rounded-md p-5 text-center">
                    <div v-if="bchbalance == 0">0 BCH</div>
                    <div v-else>{{ bchbalance }}</div>
                </div>
                <div class="col-span-12 md:col-span-5 justify-center flex py-3">
                    <router-link :to="{ name: 'bchwalletsend' }" class="px-1">
                        <button
                            class="bg-gray-700 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                        >
                            Withdraw
                        </button>
                    </router-link>
                    <router-link :to="{ name: 'bchwalletrecieve' }" class="px-1">
                        <button
                            class="bg-gray-700 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                        >
                            Deposit
                        </button>
                    </router-link>
                    <router-link :to="{ name: 'bchwallet' }" class="px-1">
                        <button
                            class="bg-gray-700 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                        >
                            Transactions
                        </button>
                    </router-link>
                </div>
            </div>

            <div class="grid grid-cols-12 border-t-2 border-gray-200 bg-neutral mb-5 md:mb-0 rounded-b-md font-bold">
                <div class="col-span-4 md:col-span-2 rounded-md p-5">
                    <div class="flex gap-3">
                        <img class="object-contain" src="../../assets/coin/xmr/xmr_small.png" alt="No Image Found .." />
                        Monero
                    </div>
                </div>
                <div class="md:col-span-2 invisible md:visible rounded-md p-5 text-center">
                    {{ xmrprice }}
                </div>
                <div class="col-span-7 md:col-span-3 rounded-md p-5 text-center">
                    <div v-if="xmrbalance == 0">0 XMR</div>
                    <div v-else>{{ xmrbalance }}</div>
                </div>
                <div class="col-span-12 md:col-span-5 justify-center flex py-3">
                    <router-link :to="{ name: 'xmrwalletsend' }" class="px-1">
                        <button
                            class="bg-gray-700 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                        >
                            Withdraw
                        </button>
                    </router-link>
                    <router-link :to="{ name: 'xmrwalletrecieve' }" class="px-1">
                        <button
                            class="bg-gray-700 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                        >
                            Deposit
                        </button>
                    </router-link>
                    <router-link :to="{ name: 'xmrwallet' }" class="px-1">
                        <button
                            class="bg-gray-700 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                        >
                            Transactions
                        </button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
    <!-- END container-->
    <MainFooter />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import MainHeaderTop from '../../layouts/headers/MainHeaderTop.vue'
import MainHeaderMid from '../../layouts/headers/MainHeaderMid.vue'
import MainHeaderBottom from '../../layouts/headers/MainHeaderBottom.vue'
import MainHeaderVendor from '../../layouts/headers/MainHeaderVendor.vue'
import MainFooter from '../../layouts/footers/FooterMain.vue'
import authHeader from '../../services/auth.header'

export default defineComponent({
    name: 'Login',
    components: {
        MainHeaderTop,
        MainHeaderMid,
        MainHeaderBottom,
        MainHeaderVendor,
        MainFooter,
    },

    data() {
        return {
            user: null,
            usercurrency: null,
            btcprice: '',
            xmrprice: '',
            bchprice: '',
            xmrbalance: 0,
            bchbalance: 0,
            btcbalance: 0,
            wallettotal: 0,
        }
    },
    created () {
        this.userstatus()
        this.getbtcprice()
        this.getbchprice()
        this.getxmrprice()
        this.getxmrbalance()
        this.getbchbalance()
        this.getbtcbalance()
    },
    methods: {
        userstatus() {
            axios({
                method: 'get',
                url: '/auth/whoami',
                withCredentials: true,
                headers: authHeader(),
            })
                .then((response) => {
                    if (response.data.login == true) {
                        this.user = response.data.user
                        this.userinfo()
                        this.getwallettotals()
                    }
                })
                .catch(() => {
                    this.$router.push({ name: 'login' })
                })
        },

        userinfo() {
            axios({
                method: 'get',
                url: '/info/country-currency',
                withCredentials: true,
                headers: authHeader(),
            }).then((response) => {
                if (response.data.success) {
                    this.usercurrency = response.data.currency
                }
            })
        },

        getwallettotals() {
            axios({
                method: 'get',
                url: '/price/wallets/total/' + this.user.currency,
                withCredentials: true,
                headers: authHeader(),
            }).then((response) => {
                if (response.data) {
                    this.wallettotal = response.data.coin
                }
            })
        },

        getxmrprice() {
            axios({
                method: 'get',
                url: '/xmr/price',
                withCredentials: true,
                headers: authHeader(),
            }).then((response) => {
                if (response.data) {
                    this.xmrprice = response.data.price_xmr
                }
            })
        },

        getbchprice() {
            axios({
                method: 'get',
                url: '/bch/price',
                withCredentials: true,
                headers: authHeader(),
            }).then((response) => {
                if (response.data) {
                    this.bchprice = response.data.bch_price
                }
            })
        },

        getbtcprice() {
            axios({
                method: 'get',
                url: '/btc/price',
                withCredentials: true,
                headers: authHeader(),
            }).then((response) => {
                if (response.data) {
                    this.btcprice = response.data.btc_price
                }
            })
        },

        //  Get balances for dropdowns
        getxmrbalance() {
            axios({
                method: 'get',
                url: '/xmr/balance',
                withCredentials: true,
                headers: authHeader(),
            }).then((response) => {
                if (response.data) {
                    this.xmrbalance = response.data.xmr_balance
                }
            })
        },

        getbchbalance() {
            axios({
                method: 'get',
                url: '/bch/balance',
                headers: authHeader(),
            }).then((response) => {
                if (response.data) {
                    this.bchbalance = response.data.bch_balance
                }
            })
        },

        getbtcbalance() {
            axios({
                method: 'get',
                url: '/btc/balance',
                headers: authHeader(),
            }).then((response) => {
                if (response.data) {
                    this.btcbalance = response.data.btc_balance
                }
            })
        },
    },
})
</script>

<style type="ts" scoped></style>
