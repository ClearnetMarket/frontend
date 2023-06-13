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
                                <a class="text-primary hover:text-primary ">Home</a>
                            </router-link>
                        </li>
                        <li>
                            <span class="text-white mx-2">/</span>
                        </li>
                        <li>
                            <router-link :to="{ name: 'categoryhome' }">
                                <a class="text-primary hover:text-primary ">Categories</a>
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
            <div class="col-span-12 sm:col-span-12 md:col-span-3">
                <CategoryList />
            </div>
            <div class="col-span-12 sm:col-span-12 md:col-span-9 ">
                <div class="text-center text-[28px]">Apparal Clothing and Accessories</div>

                <AllItemsCategory :categoryid="category_id" />

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
import CategoryList from '../../../components/category_slides/categorylist.vue'
import AllItemsCategory from '../../../components/category_slides/allcat.vue'


export default defineComponent({
    name: 'Categoryapparel',
    components: {
        MainHeaderTop,
        MainHeaderMid,
        MainHeaderBottom,
        MainHeaderVendor,
        MainFooter,
        CategoryList,
        AllItemsCategory
    },

    data () {
        return {
            category_id: 25,
            user: null,
        }
    },
    mounted () { },
    methods: {},
})
</script>
