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
                                <a class="text-primary hover:text-primary ">Home</a>
                            </router-link>
                        </li>
                        <li>
                            <span class="text-gray-500 mx-2">/</span>
                        </li>
                    </ol>
                </nav>
            </div>
        </div>
        <div class="grid grid-cols-12 gap-4">
            <div class="col-span-3 hidden md:flex sm:h-50">
                <CategoryList />
            </div>
            <div class="col-span-12 md:col-span-9">
                <div class="flex mb-2 font-bold">{{ recordsLength }} results for {{ searchstring }}</div>
                <div v-for="(f, index) in searchresults">
                    <Searchitems :item="f" :selected-index="index" />
                </div>
                <div class="col-span-12 mb-20" v-if="recordsLength > 0">
                    <pagination @paginate="getPage" :records="recordsLength" v-model="page" :per-page="perPage"
                        :options="options"> </pagination>
                    <div class="flex justify-center"> {{ recordsLength }} items Found</div>
                </div>
                <div class="col-span-12 mb-20 flex justify-center" v-else>{{ recordsLength }} items</div>
            </div>
        </div>
    </div>

    <MainFooter />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import authHeader from '../../services/auth.header'
import MainHeaderTop from '../../layouts/headers/MainHeaderTop.vue'
import MainHeaderMid from '../../layouts/headers/MainHeaderMid.vue'
import MainHeaderBottom from '../../layouts/headers/MainHeaderBottom.vue'
import MainHeaderVendor from '../../layouts/headers/MainHeaderVendor.vue'
import MainFooter from '../../layouts/footers/FooterMain.vue'
import Searchitems from '../../components/search/search_results.vue'
import CategoryList from '../../components/category_slides/categorylist.vue'
import PaginationComp from '../../components/MyPagination.vue'


export default defineComponent({
    name: 'Search',
    components: {
        MainHeaderTop,
        MainHeaderMid,
        MainHeaderBottom,
        MainHeaderVendor,
        MainFooter,
        Searchitems,
        CategoryList,
    },

    data () {
        return {
            searchresults: [],
            searchresultscount: 0,
            searchstring: null,

            page: 1,
            perPage: 50,
            recordsLength: 0,
            options: {
                edgeNavigation: false,
                format: false,
                template: PaginationComp
            }

        }
    },
    watch: {
        $route () {
            this.searchresults == null
            this.searchstring = this.$route.params.searchstring
            this.getPage(this.page);
        },
    },
    mounted () {
        this.searchstring = this.$route.params.searchstring
        this.main_search_count()
        this.getPage(this.page);
    },
    methods: {
        getPage: function (page: any) {
            // we simulate an api call that fetch the records from a backend
            this.searchresults = [];
            const startIndex = this.perPage * (page - 1) + 1;
            const endIndex = startIndex + this.perPage - 1;

            this.main_search(page)

        },

        main_search (page: any) {
            axios({
                method: 'get',
                url: '/search/query/' + this.searchstring + '/' + this.page,
                headers: authHeader(),
            }).then((response) => { this.searchresults = response.data })
        },
        main_search_count () {
            axios({
                method: 'get',
                url: '/search/query/count/' + this.searchstring,
                headers: authHeader(),
            }).then((response) => { this.recordsLength = response.data.count })
        },
    },
})
</script>
