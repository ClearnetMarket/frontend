<template>
    <MainHeaderTop />
    <MainHeaderMid />
    <MainHeaderBottom />
    <div class="wrapper">
        <div v-if="user">
            <MainHeaderVendor v-show="user.user_admin === 1" />
        </div>

        <div class="container max-w-7xl mx-auto px-10 mt-2 text-white">
            <div class="mt-5 mb-5">
                <nav class="rounded-md w-full">
                    <ol class="list-reset flex">
                        <li>
                            <router-link :to="{ name: 'home' }">
                                <a class="text-blue-600 hover:text-blue-700">Home</a>
                            </router-link>
                        </li>
                        <li>
                            <span class="text-gray-500 mx-2 mb-2 mt-2 bg-">/</span>
                        </li>
                    </ol>
                </nav>
            </div>
            <div class="bg-neutral rounded-md p-5 mb-5 ">
                <div class="text-[18px] font-bold rounded-md">Contact us</div>
                <div class="pb-5">Our Email is admin@freeport.com</div>
                <div class="">If you have an issue on the site please Open a Ticket.</div>
            </div>
        </div>
    </div>
    <MainFooter />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import MainHeaderTop from '../../layouts/headers/MainHeaderTop.vue'
import MainHeaderMid from '../../layouts/headers/MainHeaderMid.vue'
import MainHeaderBottom from '../../layouts/headers/MainHeaderBottom.vue'
import MainHeaderVendor from '../../layouts/headers/MainHeaderVendor.vue'
import MainFooter from '../../layouts/footers/FooterMain.vue'

export default defineComponent({
    name: 'Supportemail',
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
        }
    },

    mounted() {},

    methods: {},
})
</script>
