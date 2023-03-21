<template>
    <MainHeaderTop />
    <MainHeaderMid />
    <MainHeaderBottom />
    <div class="wrapper">
        <div class="container max-w-7xl mx-auto pb-60 bg-gray-300 text-neutral">
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

            <div class="flex text-[22px] invisible md:visible">Deposit Monero</div>

            <div class="flex text-[22px] justify-center visible md:invisible">Deposit Monero</div>
            <div class="bg-white rounded-md">
                <div class="flex justify-center mt-8 text-[20px]">Address:</div>
                <div class="flex py-10 justify-center mt-8 text-[12px]">
                    {{ xmr_address }}
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
import authHeader from '../../../services/auth.header.js'

export default defineComponent({
    name: 'Xmrrecieve',
    components: {
        MainHeaderTop,
        MainHeaderMid,
        MainHeaderBottom,

        MainFooter,
    },
    data() {
        return {
            xmr_address: '',
            user: null,
        }
    },
    mounted() {
        this.userstatus()
        this.getxmraddress()
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
                .catch(() => {
                    this.$router.push('/login')
                })
        },
        getxmraddress() {
            axios({
                method: 'get',
                url: '/xmr/receive',
                withCredentials: true,
                headers: authHeader(),
            })
                .then((response) => {
                    if (response.data.success) {
                        this.xmr_address = response.data.xmr_address
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

<style type="ts" scoped></style>
