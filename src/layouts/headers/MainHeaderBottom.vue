<template>
    <div class="bg-neutral">
        <div class="container max-w-7xl mx-auto text-bold text-center">
            <div class="grid grid-cols-12">
                <div class="col-span-12 md:col-span-0 lg:col-span-3 invisible lg:visible h-1">
                    <div class="flex ml-5">
                        <div class="pb-2">
                            <div class="dropdown">
                                <button
                                    class="hover:bg-secondary text-white hover:text-white py-1 pt-3 rounded focus:outline-none focus:shadow-outline font-bold px-5">
                                    Categories
                                </button>
                                <ul tabindex="0"
                                    class="dropdown-content menu p-2 shadow bg-neutral rounded-box w-52 text-white text-left ">
                                    <li class="text-white hover:bg-primary hover:font-bold hover:text-accent"><a
                                            @click="gotourl('categoryelectronics')"> Electronics </a></li>
                                    <li class="text-white hover:bg-primary hover:font-bold hover:text-accent"><a
                                            @click="gotourl('categorycomputers')"> Computers and Parts </a></li>
                                    <li class="text-white hover:bg-primary hover:font-bold hover:text-accent"><a
                                            @click="gotourl('categorysmartphones')">Smart Phones and Accessories</a> </li>
                                    <li class="text-white hover:bg-primary hover:font-bold hover:text-accent"><a
                                            @click="gotourl('categoryautomotive')">Automotive </a></li>
                                    <li class="text-white hover:bg-primary hover:font-bold hover:text-accent"><a
                                            @click="gotourl('categoryhobbies')">Hobbies and Collectibles</a></li>
                                    <li class="text-white hover:bg-primary hover:font-bold hover:text-accent"><a
                                            @click="gotourl('categoryjewelrygold')"> Jewelry Precious Metals and Coins</a>
                                    </li>
                                    <li class="text-white hover:bg-primary hover:font-bold hover:text-accent"><a
                                            @click="gotourl('categoryapparel')"> Apparel </a></li>
                                    <li class="text-white hover:bg-primary hover:font-bold hover:text-accent"><a
                                            @click="gotourl('categoryhomeandgarden')"> Home and Garden </a></li>
                                    <li class="text-white hover:bg-primary hover:font-bold hover:text-accent"><a
                                            @click="gotourl('categoryart')"> Arts and Crafts </a></li>
                                    <li class="text-white hover:bg-primary hover:font-bold hover:text-accent"><a
                                            @click="gotourl('categorybooksandmovies')"> Books and Movies </a></li>
                                    <li class="text-white hover:bg-primary hover:font-bold hover:text-accent"><a
                                            @click="gotourl('categorydigital')"> Digital Items </a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="sm:col-span-12 md:col-span-12 lg:col-start-6 lg:col-span-8 xxl:col-start-7 ">
                    <div class="grid grid-cols-12">
                        <div class="sm:col-span-12 sm:invisible sm:h-0 md:visible md:h-auto md:col-span-2">
                            <div class=" md:pt-2 text-[13px] font-bold">
                                <router-link :to="{ name: 'wallet' }" class="px-3">
                                    <button class="bg-accent hover:bg-primary text-white font-bold py-1 px-3
                                                                rounded focus:outline-none focus:shadow-outline">
                                        Wallets
                                    </button>
                                </router-link>
                            </div>
                        </div>
                        <div class="sm:col-span-12 md:col-span-9">
                            <div class="grid grid-cols-12">
                                <div class="sm:col-span-4 md:col-span-4 ">
                                    <div v-if="user">
                                        <div class=" text-[14px] font-bold">
                                            <div class="text-white">BTC</div>

                                            <div class="break-normal text-warning" v-if="btcpricechange == 0">
                                                {{ btcprice }} {{ returncurrency(user.currency) }}
                                            </div>
                                            <div class="break-normal text-success" v-if="btcpricechange == 1">
                                                {{ btcprice }} {{ returncurrency(user.currency) }}
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <div class=" text-[14px] font-bold">
                                            <div class="text-white">BTC</div>
                                            <div class="break-normal text-warning" v-if="btcpricechange == 0">
                                                {{ btcprice }} USD
                                            </div>
                                            <div class="break-normal text-success" v-if="btcpricechange == 1">
                                                {{ btcprice }} USD
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="sm:col-span-4 md:col-span-3">
                                    <div v-if="user">
                                        <div class=" text-[14px] font-bold">
                                            <div class="text-white">BCH</div>
                                            <div class="break-normal text-warning" v-if="bchpricechange == 0">
                                                {{ bchprice }} {{ returncurrency(user.currency) }}
                                            </div>
                                            <div class="break-normal text-success" v-if="bchpricechange == 1">
                                                {{ bchprice }} {{ returncurrency(user.currency) }}
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <div class=" text-[14px] font-bold">
                                            <div class="text-white">BCH</div>
                                            <div class="break-normal text-warning" v-if="bchpricechange == 0">
                                                {{ bchprice }} USD
                                            </div>
                                            <div class="break-normal text-success" v-if="bchpricechange == 1">
                                                {{ bchprice }} USD
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="sm:col-span-4 md:col-span-3 ">
                                    <div v-if="user">
                                        <div class=" text-[14px] font-bold">
                                            <div class="text-white">XMR</div>
                                            <div class="break-normal text-warning" v-if="xmrpricechange == 0">
                                                {{ xmrprice }} {{ returncurrency(user.currency) }}
                                            </div>
                                            <div class="break-normal text-success" v-if="xmrpricechange == 1">
                                                {{ xmrprice }} {{ returncurrency(user.currency) }}
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <div class=" text-[14px] font-bold">
                                            <div class="text-white">XMR</div>
                                            <div class="break-normal text-warning" v-if="xmrpricechange == 0">
                                                {{ xmrprice }} USD
                                            </div>
                                            <div class="break-normal text-success" v-if="xmrpricechange == 1">
                                                {{ xmrprice }} USD
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
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import authHeader from '../../services/auth.header'

export default defineComponent({
    name: 'MainHeaderBottom',

    data () {
        return {
            user: null,
            btcprice: null,
            xmrprice: null,
            bchprice: null,
            btcpricechange: null,
            xmrpricechange: null,
            bchpricechange: null,
            interval: null,
            categoriesList: {},
        }
    },

    created () {
        this.userstatus()
       


        this.interval = setInterval(() => {
            this.getbtcprice_anon()
            this.getbchprice_anon()
            this.getxmrprice_anon()
        }, 100000)
    },
    mounted () {
         this.getCategoryList()
        this.getbchpricechange24hour()
        this.getxmrpricechange24hour()
        this.getbtcpricechange24hour()
    },
    unmounted () {
        clearInterval(this.interval)
    },
    methods: {
        //  change url in dropdown
        getCategoryList () {
            let path = '/category/sidebar'
            axios.get(path).then((response) => {
                this.categoriesList = response.data
            })
        },
        getbchpricechange24hour () {
            axios({
                method: 'get',
                url: '/bch/price/change',
                headers: authHeader(),
            }).then((response) => {
                if (response.data.success) {
                    this.bchpricechange = response.data.change
                }
            })
        },
        getbtcpricechange24hour () {
            axios({
                method: 'get',
                url: '/btc/price/change',
                headers: authHeader(),
            }).then((response) => {
                if (response.data.success) {
                    this.btcpricechange = response.data.change
                }
            })
        },
        getxmrpricechange24hour () {
            axios({
                method: 'get',
                url: '/xmr/price/change',
                headers: authHeader(),
            }).then((response) => {
                if (response.data.success) {
                    this.xmrpricechange = response.data.change
                }
            })
        },

        getbchprice () {
            axios({
                method: 'get',
                url: '/bch/price',
                headers: authHeader(),
            }).then((response) => {
                if (response.data.success) {
                    this.bchprice = response.data.bch_price
                }
            })
        },
        //  Get prices of current coins
        getbchprice_anon () {
            axios({
                method: 'get',
                url: '/bch/price/usd',
            }).then((response) => {
                if (response.data.success) {
                    this.bchprice = response.data.bch_price
                }
            })
        },
        getbtcprice () {
            axios({
                method: 'get',
                url: '/btc/price',
                headers: authHeader(),
            }).then((response) => {
                if (response.data.success) {
                    this.btcprice = response.data.btc_price
                }
            })
        },
        getbtcprice_anon () {
            axios({
                method: 'get',
                url: '/btc/price/usd',
            }).then((response) => {
                if (response.data.success) {
                    this.btcprice = response.data.btc_price
                }
            })
        },
        //  Get prices of current coins
        getxmrprice () {
            axios({
                method: 'get',
                url: '/xmr/price',
                headers: authHeader(),
            }).then((response) => {
                if (response.data.success) {
                    this.xmrprice = response.data.price_xmr
                }
            })
        },
        getxmrprice_anon () {
            axios({
                method: 'get',
                url: '/xmr/price/usd',
            }).then((response) => {
                if (response.data.success) {
                    this.xmrprice = response.data.price_xmr
                }
            })
        },
        gotourl (nameofurl: string) {
            this.$router.replace({ name: nameofurl })
            this.$router.push({ name: nameofurl })
        },

        returncurrency (currencydigit: number) {
            if (currencydigit === 0) {
                return 'USD'
            } else if (currencydigit === 1) {
                return 'PHP'
            } else if (currencydigit === 2) {
                return 'CHF'
            } else if (currencydigit === 3) {
                return 'SAD'
            } else if (currencydigit === 4) {
                return 'SGD'
            } else if (currencydigit === 5) {
                return 'RUB'
            } else if (currencydigit === 6) {
                return 'DKK'
            } else if (currencydigit === 7) {
                return 'RON'
            } else if (currencydigit === 8) {
                return 'NOK'
            } else if (currencydigit === 9) {
                return 'ILS'
            } else if (currencydigit === 10) {
                return 'SEK'
            } else if (currencydigit === 11) {
                return 'THB'
            } else if (currencydigit === 12) {
                return 'BRL'
            } else if (currencydigit === 13) {
                return 'INR'
            } else if (currencydigit === 14) {
                return 'ZAR'
            } else if (currencydigit === 14) {
                return 'HKD'
            } else if (currencydigit === 16) {
                return 'JPY'
            } else if (currencydigit === 17) {
                return 'HUF'
            } else if (currencydigit === 18) {
                return 'MXN'
            } else if (currencydigit === 19) {
                return 'CNY'
            } else if (currencydigit === 20) {
                return 'AUD'
            } else if (currencydigit === 21) {
                return 'PLN'
            } else if (currencydigit === 22) {
                return 'GBP'
            } else if (currencydigit === 23) {
                return 'TRY'
            } else if (currencydigit === 24) {
                return 'KRW'
            } else if (currencydigit === 25) {
                return 'IDR'
            } else if (currencydigit === 26) {
                return 'NZD'
            } else if (currencydigit === 27) {
                return 'MYR'
            } else if (currencydigit === 28) {
                return 'BGN'
            } else if (currencydigit === 29) {
                return 'EUR'
            } else if (currencydigit === 31) {
                return 'HRK'
            } else if (currencydigit === 30) {
                return 'CZK'
            }
        },
        userstatus () {
            axios({
                method: 'get',
                url: '/auth/whoami',
                withCredentials: true,
                headers: authHeader(),
            })
                .then((response) => {
                    if (response.data.login == true) {
                        this.user = response.data.user
                        this.getbtcprice()
                        this.getbchprice()
                        this.getxmrprice()
                    } else {
                        this.getbtcprice_anon()
                        this.getbchprice_anon()
                        this.getxmrprice_anon()
                    }
                })
                .catch(() => {
                    this.getbtcprice_anon()
                    this.getbchprice_anon()
                    this.getxmrprice_anon()
                })
        },
    },
})
</script>
