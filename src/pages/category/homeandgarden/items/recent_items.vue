<template>
    <div class="flex flex-nowrap flex-col">
        <div class="text-center text-[24px] font-bold">Recent Home and Garden</div>

        <div class="mt-5 mx-10 md:flex md:mb-5 gap-5">
            <div v-for="item in items" :key="item.id">
                <generic_item :item="item" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import generic_item from '../../../../components/item/generic_item.vue'

export default defineComponent({
    name: 'RecentAuto',
    components: {
        generic_item,
    },
    data() {
        return {
            items: [],
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
                url: '/category/query/index/automotive',
                withCredentials: true,
            })
                .then((response) => {
                    if ((response.status = 200)) {
                        this.items = response.data
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
