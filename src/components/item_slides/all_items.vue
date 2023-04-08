<template>
    <div class="flex flex-nowrap flex-col p-5">
        <div class="text-[24px] text-white">Freeport Items</div>
        <div class="md:flex md:mb-5 gap-5 mx-auto">
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
