<template>
    <div class="flex flex-nowrap flex-col p-5 mb-10 mt-10">
        <div class="mt-5 mx-10 md:flex md:mb-5 gap-5">
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
    data() {
        return {
            allitems: [],
            loadedbtcprice: false,
        }
    },
    computed: {},

    mounted() {
        this.getallitems()
    },

    methods: {
        getallitems() {
            axios({
                method: 'get',
                url: '/itemquery/query/all',
                withCredentials: true,
            })
                .then((response) => {
                    if (response.data.success) {
                        this.allitems = response.data
                    }
                })
                .catch(() => {})
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
