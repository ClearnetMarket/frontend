<template>
    <MainHeaderTop />
    <MainHeaderMid />
    <MainHeaderBottom />

    <div v-if="user">
        <MainHeaderVendor v-show="user.user_admin === 1" />
    </div>

    <div class="container max-w-7xl mx-auto px-10 mt-2 pb-72 text-white">
        <div class="mt-5 mb-5">
            <nav class="rounded-md w-full">
                <ol class="list-reset flex">
                    <li>
                        <router-link :to="{ name: 'home' }">
                            <a class="text-blue-600 hover:text-blue-700">Home</a>
                        </router-link>
                    </li>
                    <li>
                        <span class="text-white mx-2 mb-2 mt-2 bg-">/</span>
                    </li>
                </ol>
            </nav>
        </div>
        <div class="bg-neutral rounded-md p-5 mb-5">
            <div class="text-[18px] font-bold text-blue-600 rounded-md">Prohibited Items you cant sell here</div>
        </div>


        <div class="bg-neutral rounded-md p-5 mb-5 text-white">
            <div class="text-[14px] font-bold text-blue-600 rounded-md mb-5">
                We reserve the right to remove items we consider borderline to these items. We want to keep the items clean
                so we
                can grow the market and not scare away new vendors/users. Please keep items friendly.
            </div>
            <div class="flex mb-2">
                <div class="font-bold px-2"> Drugs </div>
                <div class="">- Any items related to drugs including marijuana
                    seeds, THC products, gummies, bongs,
                    grinders, guides for drugs, drug scales, etc.
                </div>
            </div>
            <div class="flex mb-2">
                <div class="font-bold px-2">Pornography </div>
                <div class="">- Any attempt to sell porography items such as videos, images, chats, meetings or
                    links to other social media.</div>
            </div>
           <div class="flex mb-2">
                <div class="font-bold px-2">Weapons</div>
                <div class="">- Guns and ammo are not allowed. Gun attachments or items related are not allowed.
                    Knives/swords are allowed.</div>
            </div>
           <div class="flex mb-2">
                <div class="font-bold px-2">Potential Scam Items</div>
                <div class="">- Any attempts to scam or decieve will result in a ban from the site.</div>
            </div>
           <div class="flex mb-2">
                <div class="font-bold px-2">Hacked Items</div>
                <div class=""> - This includes account information, database information, accounts, or "hacking"
                    services.</div>
            </div>
            <div class="flex mb-2">
                <div class="font-bold px-2">Downloaded Items</div>
                <div class=""> - Downloaded movies, books, mp3s are not alowed.</div>
            </div>
            <div class="flex mb-2">
                <div class="font-bold px-2">Stolen Items</div>
                <div class=""> - Any item that is lawfully considered stolen is not allowed.</div>
            </div>
            <div class="flex mb-2">
                <div class="font-bold px-2">Illegal Items</div>
                <div class=""> - Any item that is lawfully illegal in your state or jurisdiction.</div>
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
    name: 'Prohibited',
    components: {
        MainHeaderTop,
        MainHeaderMid,
        MainHeaderBottom,
        MainHeaderVendor,
        MainFooter,
    },
    data () {
        return {
            user: null,
        }
    },

    mounted () { },

    methods: {},
})
</script>
