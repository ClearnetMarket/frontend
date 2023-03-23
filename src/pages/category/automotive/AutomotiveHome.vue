<template>
    <MainHeaderTop />
    <MainHeaderMid />
    <MainHeaderBottom />
    <div v-if="user">
        <MainHeaderVendor v-show="user.user_admin === 1" />
    </div>
    <div class="max-w-7xl mx-auto mb-20 wrapper px-10">
        <div class="grid grid-cols-1 w-full gap-4">
            <div class="mb-10 mt-5">
                <nav class="rounded-md">
                    <ol class="list-reset flex">
                        <li>
                            <router-link :to="{ name: 'home' }">
                                <a class="text-blue-600 hover:text-blue-700">Home</a>
                            </router-link>
                        </li>
                        <li>
                            <span class="text-white mx-2">/</span>
                        </li>
                        <li>
                            <router-link :to="{ name: 'categoryhome' }">
                                <a class="text-blue-600 hover:text-blue-700">Categories</a>
                            </router-link>
                        </li>
                        <li>
                            <span class="text-white mx-2">/</span>
                        </li>
                    </ol>
                </nav>
            </div>
        </div>

        <div class="grid grid-cols-12 gap-4">
            <div class="col-span-12 sm:col-span-3">
                <div class="text-[20px] font-bold">All Categories</div>
                <router-link :to="{ name: 'categoryelectronics' }">
                    <div class="hover:underline text-blue-600 hover:text-blue-700">Electronics</div>
                </router-link>
                <router-link :to="{ name: 'categorysmartphones' }">
                    <div class="hover:underline text-blue-600 hover:text-blue-700">Smartphones and Tablets</div>
                </router-link>
                <router-link :to="{ name: 'categoryautomotive' }">
                    <div class="hover:underline text-blue-600 hover:text-blue-700">Automotive</div>
                </router-link>
                <router-link :to="{ name: 'categoryhobbies' }">
                    <div class="hover:underline text-blue-600 hover:text-blue-700">Hobbies and Collectibles</div>
                </router-link>
                <router-link :to="{ name: 'categoryjewelrygold' }">
                    <div class="hover:underline text-blue-600 hover:text-blue-700">Jewelry Gold and Coins</div>
                </router-link>
                <router-link :to="{ name: 'categoryapparel' }">
                    <div class="hover:underline text-blue-600 hover:text-blue-700">Apparel and Accessories</div>
                </router-link>
                <router-link :to="{ name: 'categoryhomeandgarden' }">
                    <div class="hover:underline text-blue-600 hover:text-blue-700">Home and Garden</div>
                </router-link>
                <router-link :to="{ name: 'categoryart' }">
                    <div class="hover:underline text-blue-600 hover:text-blue-700">Art and Crafts</div>
                </router-link>
                <router-link :to="{ name: 'categorycomputers' }">
                    <div class="hover:underline text-blue-600 hover:text-blue-700">Computers and Parts</div>
                </router-link>
                <router-link :to="{ name: 'categorybooksandmovies' }">
                    <div class="hover:underline text-blue-600 hover:text-blue-700">Books and Movies</div>
                </router-link>
                <router-link :to="{ name: 'categorydigital' }">
                    <div class="hover:underline text-blue-600 hover:text-blue-700">Digital Items</div>
                </router-link>
            </div>
            <div class="col-span-9">
                <RecentAuto />
            </div>
        </div>
    </div>
    <MainFooter />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MainHeaderTop from '../../../layouts/headers/MainHeaderTop.vue'
import MainHeaderMid from '../../../layouts/headers/MainHeaderMid.vue'
import MainHeaderBottom from '../../../layouts/headers/MainHeaderBottom.vue'
import MainHeaderVendor from '../../../layouts/headers/MainHeaderVendor.vue'
import MainFooter from '../../../layouts/footers/FooterMain.vue'
import RecentAuto from './items/recent_items.vue'

export default defineComponent({
    name: 'Categoryautomotive',
    components: {
        MainHeaderTop,
        MainHeaderMid,
        MainHeaderBottom,
        MainHeaderVendor,
        MainFooter,
        RecentAuto,
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
