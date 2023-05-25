<template>
       <div class="grid grid-cols-12 flex-col ">
                <div class="col-span-12 text-[24px] text-white pl-3">Items</div>
                <div class="col-span-12 sm:gap-1 md:gap-5 md:mb-5
                            flex sm:justify-center sm:flex-wrap md:flex-nowrap 
                            md:justify-start 
                            md:overflow-hidden ">
            <div v-for="item in allitems" :key="item.id">
                <generic_item :item="item" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import generic_item from '../item/generic_item.vue'

export default defineComponent({
    name: 'AllItems',
    components: {
        generic_item,
    },
    data () {
        return {
            allitems: [],
            loadedbtcprice: false,
        }
    },
    computed: {},

    mounted () {
        this.getallitems()
    },

    methods: {
        getallitems () {
            axios({
                method: 'get',
                url: '/itemquery/query/all',
                withCredentials: true,
            })
                .then((response) => {
                    this.allitems = response.data
                })
                .catch(() => { })
        },
    },
})
</script>
<style>
.break {
    flex-basis: 100%;
    height: 0;
}
</style>
