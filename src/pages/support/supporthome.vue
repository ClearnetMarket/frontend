<template>
    <MainHeaderTop />
    <MainHeaderMid />
    <MainHeaderBottom />

    <div v-if="user">
        <MainHeaderVendor v-show="user.user_admin === 1" />
    </div>
    <div class="wrapper">
        <div class="container max-w-3xl mx-auto px-10 wrapper overflow-hidden text-white">
            <div class="mb-5">
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
            <div class="rounded-md mb-5 text-white">
                <div class="text-[18px] font-bold rounded-md mb-2">Contact us</div>
                <div class="pb-5">
                    We are actively watching all tickets and responding as fast as possible. If you have an account you
                    can create a ticket.
                </div>
            </div>
            <div class="bg-neutral rounded-md p-5 mb-5">
                <div class="text-[20px] font-bold rounded-md">Open a Ticket</div>
                <div class="pb-5 pt-5">
                    You can raise a ticket on or messaging system for fastest response possible.
                </div>
                <router-link :to="{ name: 'supportticket' }">
                    <div class="text-blue-500 hover:text-blue-300 hover:underline">Create or View Tickets</div>
                </router-link>
            </div>

            <div class="bg-neutral rounded-md p-5 mb-5">
                <div class="text-[20px] font-bold rounded-md">Email</div>
                <div class="pb-5 pt-5">Email: admin@freeport.com</div>
                <div class="">
                    Please include all relevant information when contacting customer support in an email. Account name
                    is mandatory to look into your request. Do not include your password or seed key.
                </div>
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
    name: 'Supporthome',

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
