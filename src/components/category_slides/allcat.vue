<template>
    <div class="flex flex-nowrap flex-col p-5">
        <div class="md:flex md:mb-5 gap-5">
            <div v-for="item in items">
                <generic_item :item="item" />
            </div>
        </div>
    </div>

    <div class="flex justify-center" v-if="recordsLength > 9">
        <pagination @paginate="getPage" :records="recordsLength" v-model="page" :per-page="perPage" :options="options">
        </pagination>
        <div class="flex justify-center mb-10"> {{ recordsLength }} items Found</div>
    </div>
    <div class="col-span-12 flex justify-center" v-else>{{ recordsLength }} items</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import PaginationComp from '../MyPagination.vue'
import authHeader from "../../services/auth.header"
import generic_item from '../item/generic_item.vue'


export default defineComponent({
    name: 'AllItemsCategory',
    props: ["categoryid"],
    components: { generic_item },
    data () {
        return {
            items: [],
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
    computed: {},
    mounted () {
        this.getPage(this.page)
        this.main_search_count()
    },
    methods: {
        getPage: function (page: any) {
            // we simulate an api call that fetch the records from a backend
            this.items = [];
            const startIndex = this.perPage * (page - 1) + 1;
            const endIndex = startIndex + this.perPage - 1;
            this.get_category_items(page)

        },

        get_category_items (page: any) {
            axios({
                method: 'get',
                url: '/category/all/' + this.categoryid + '/' + page,
                headers: authHeader(),
            }).then((response) => { this.items = response.data })
        },

        main_search_count () {
            axios({
                method: 'get',
                url: '/category/all/count/' + this.categoryid,
                headers: authHeader(),
            }).then((response) => {
                this.recordsLength = response.data.count

            })
        },



    },
})
</script>
