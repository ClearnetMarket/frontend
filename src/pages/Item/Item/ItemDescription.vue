<template>
    <div class="max-w-7xl mx-auto bg-neutral rounded-md mt-5 ">
        <div class="grid grid-cols-1 text-[20px] font-semibold text-white px-5">Item Description</div>
        <div class="rounded-md p-5">
            {{ description }}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ItemDescription',
    props: ['description'],
    data() {
        return {}
    },

    mounted() {},

    methods: {},
})
</script>
