<template>
    <MainHeaderTop />
    <MainHeaderMid />
    <MainHeaderBottom />
    <div class="wrapper">
        <div v-if="user">
            <div class="container max-w-7xl mx-auto text-white">
                <!-- Container-->
                <div class="mt-5 mb-5 px-10">
                    <nav class="rounded-md w-full">
                        <ol class="list-reset flex">
                            <li>
                                <router-link :to="{ name: 'home' }">
                                    <a class="text-primary hover:text-primary ">Home</a>
                                </router-link>
                            </li>
                            <li>
                                <span class="text-gray-500 mx-2">/</span>
                            </li>

                            <li>
                                <router-link :to="{ name: 'wallet' }">
                                    <a class="text-primary hover:text-primary ">Wallet Home</a>
                                </router-link>
                            </li>
                            <li>
                                <span class="text-gray-500 mx-2">/</span>
                            </li>
                        </ol>
                    </nav>
                </div>

                <div class="flex text-[22px] invisible md:visible">Deposit Bitcoin Cash</div>

                <div class="flex text-[22px] justify-center visible md:invisible">Deposit Bitcoin Cash</div>
                <div class="bg-neutral rounded-md">
                    <div class="flex justify-center mt-8 text-[20px]">Address:</div>
                    <div class="flex py-10 justify-center mt-8 text-[14px]">
                        {{ bch_address }}
                    </div>
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
import MainHeaderVendor from '../../../layouts/headers/MainHeaderVendor.vue'
import MainFooter from '../../../layouts/footers/FooterMain.vue'
import authHeader from '../../../services/auth.header'

export default defineComponent({
    name: 'Bchrecieve',
    components: {
        MainHeaderTop,
        MainHeaderMid,
        MainHeaderBottom,
        MainHeaderVendor,
        MainFooter,
    },
    data () {
        return {
            bch_address: '',
            user: null,
        }
    },
    created () {
        this.userstatus();
        this.getbchaddress()
    },

    methods: {
        userstatus () {
            axios({
                method: 'get',
                url: '/auth/whoami',
                withCredentials: true,
                headers: authHeader(),
            })
                .then((response) => {
                    if ((response.data.login == true)) {
                        { this.user = response.data.user }
                    }
                    else { this.$router.push("/login"); }
                })
                .catch((error) => {
                    this.$router.push("/login");
                })
        },
        getbchaddress () {
            axios({
                method: 'get',
                url: '/bch/receive',
                withCredentials: true,
                headers: authHeader(),
            })
                .then((response) => {
                    if (response.data.success) {
                        this.bch_address = response.data.bch_address
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        },
    },
})
</script>

<style type="ts" scoped></style>
