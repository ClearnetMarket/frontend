<template>
    <MainHeaderTop />
    <MainHeaderMid />
    <MainHeaderBottom />
    <div v-if="user">
        <MainHeaderVendor v-show="user.user_admin === 1" />
    </div>
    <div class="max-w-7xl mx-auto mb-20 wrapper px-10 overflow-hidden">
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
                    </ol>
                </nav>
            </div>
        </div>

        <div class="grid grid-cols-12 gap-4">
            <div class="col-span-12 sm:col-span-12 md:col-span-3">
               <CategoryList />
            </div>
            <div class="col-span-12 sm:col-span-12 md:col-span-9 ">
                <div class="text-center text-[28px]">All Items</div>
                <AllItems />
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
import AllItems from '../../components/item_slides/all_items.vue'
import CategoryList from '../../components/category_slides/categorylist.vue'



export default defineComponent({
    name: 'Categoryhome',
    components: {
        MainHeaderTop,
        MainHeaderMid,
        MainHeaderBottom,
        MainHeaderVendor,
        MainFooter,
        AllItems,
        CategoryList
    },

    data () {
        return {
            user: null,

         

        }
    },
    mounted () { },
    methods: {


        
    },
})
</script>
