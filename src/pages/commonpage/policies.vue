<template>
    <MainHeaderTop />
    <MainHeaderMid />
    <MainHeaderBottom />

    <div v-if="user">
        <MainHeaderVendor v-show="user.user_admin === 1" />
    </div>

    <div class="container max-w-7xl mx-auto px-10 mt-2 mb-72">
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

        <div class="bg-white rounded-md p-5 mb-5">
            <div class="text-[18px] font-bold text-blue-600 rounded-md">Freeport Policies</div>
        </div>
        <div class="bg-white rounded-md p-5 mb-5">
            <div class="text-[18px] font-bold rounded-md">Code of conduct</div>
            <div class="text-red-600">- NO ILLEGAL ITEMS THAT WOULD BE ILLEGAL IN THE USA ARE ALLOWED</div>
            <div class="">- Any attempts to scam or decieve will result in a ban from the site.</div>
            <div class="">- Threatning site admins, mods, users, vendors will result in a ban.</div>
            <div class="">- Anything that will bring a bad reputation to freeport or a user will result in a ban.</div>
        </div>
        <div class="bg-white rounded-md p-5 mb-5">
            <div class="text-[18px] font-bold rounded-md">Escrow</div>
            <div class="">- Vendor has 48 hours to accept the order or the coin is returned to seller.</div>
            <div class="">
                - If the vendor doesnt ship within 5 days of order created the coin is returned to seller.
            </div>
            <div class="">- The buyer may select finalize early if they recieved the item to close the order.</div>
            <div class="">- Orders autofinalze after 20 days from order if no issues and vendor is paid.</div>
        </div>

        <div class="bg-white rounded-md p-5 mb-5">
            <div class="text-[18px] font-bold rounded-md">Wallets</div>
            <div class="">- It takes 1 confirmation for Bitcoin/ Bitcoincash/ Monero transactions to be visible.</div>
            <div class="">
                - It takes 6 confirmations for Bitcoin/ Bitcoincash/ Monero transactions to be confirmed for deposit.
            </div>
            <div class="">
                - If a deposit gets "stuck" sending to Freeport or withdrawing please just wait. It happens sometimes
                and a low fee can cause a withdraw to be stuck a week.
            </div>
        </div>

        <div class="bg-white rounded-md p-5 mb-5">
            <div class="text-[18px] font-bold rounded-md">Data Policy and Privacy</div>
            <div class="">
                - We collect email addresses solely for password recovery/ notifications/ and spamming you ads for
                marketing reasons in a reasonable manner.
            </div>
            <div class="">
                - We do not use your address, personal info, or anything related to your account other than intended
                purposes.
            </div>
            <div class="">
                - All passwords are encrypted on Freeport and we do our best to not allow any data leaks or "hacks".
            </div>
            <div class="">- We strongly recommend not keeping coin on the site.</div>
            <div class="">
                - We strongly recommend setting up PGP and teaching your vendors/customers how to use it.
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
    name: 'Policies',
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
