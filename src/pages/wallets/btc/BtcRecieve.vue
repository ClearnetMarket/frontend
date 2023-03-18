<template>
    <MainHeaderTop />
    <MainHeaderMid />
    <MainHeaderBottom />
    <div class="wrapper">
        <div class="container max-w-7xl mx-auto pb-60 bg-gray-300">
            <!-- Container-->
            <div class="mt-5 mb-5 px-10">
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
                        <li>
                            <router-link :to="{ name: 'wallet' }">
                                <a class="text-blue-600 hover:text-blue-700">Wallet Home</a>
                            </router-link>
                        </li>
                        <li>
                            <span class="text-gray-500 mx-2">/</span>
                        </li>
                    </ol>
                </nav>
            </div>

            <div class="flex text-[22px] invisible md:visible">Deposit Bitcoin</div>

            <div class="flex text-[22px] justify-center visible md:invisible">Deposit Bitcoin</div>
            <div class="bg-white rounded-md">
                <div class="flex justify-center mt-8 text-[20px]">Address:</div>
                <div class="flex py-10 justify-center mt-8 text-[14px]">
                    {{ btc_address }}
                </div>
            </div>
        </div>
    </div>
    <MainFooter />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import MainHeaderTop from '../../../layouts/headers/MainHeaderTop.vue'
import MainHeaderMid from '../../../layouts/headers/MainHeaderMid.vue'
import MainHeaderBottom from '../../../layouts/headers/MainHeaderBottom.vue'
import MainFooter from '../../../layouts/footers/FooterMain.vue'
import authHeader from '../../../services/auth.header'

export default defineComponent({
    name: 'Btcrecieve',

    components: {
        MainHeaderTop,
        MainHeaderMid,
        MainHeaderBottom,

        MainFooter,
    },
    data() {
        return {
            user: null,
            btc_address: '',
        }
    },
    mounted() {
        this.userstatus()
        this.getbtcaddress()
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
                  if ((response.data.login == true)) {
                        this.user = response.data.user
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        getbtcaddress() {
            axios({
                method: 'get',
                url: '/btc/receive',
                withCredentials: true,
                headers: authHeader(),
            })
                .then((response) => {
                    if ((response.data.success)) {
                        this.btc_address = response.data.btc_address
                    }
                })
                .catch((error) => {
                    console.log(error)
                    this.$router.push('/login')
                })
        },
    },
})
</script>

<style></style>
