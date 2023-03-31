<template>
    <MainHeaderTop />
    <MainHeaderMid />
    <MainHeaderBottom />

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
                <CategoryList />
            </div>
            <div class="col-span-12 sm:col-span-9 ">
                <div class="text-center text-[28px]">Automotive Parts & Accessories</div>
                <div class="col-span-12 sm:col-span-9 ">
                    <AllItemsCategory :categoryid="category_id" />
                </div>
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
import CategoryList from '../../../components/category_slides/categorylist.vue'
import AllItemsCategory from '../../../components/category_slides/allcat.vue'


export default defineComponent({
    name: 'Categoryautomotive',
    components: {
        MainHeaderTop,
        MainHeaderMid,
        MainHeaderBottom,
        MainHeaderVendor,
        MainFooter,
        RecentAuto,
        CategoryList,
        AllItemsCategory
    },

    data() {
        return {
            user: null,
            category_id: 9,
        }
    },
    mounted() {},
    methods: {},
})
</script>
