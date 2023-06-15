
<template>
    <MainHeaderTop />
    <MainHeaderMid />
    <MainHeaderBottom />

    <div class="wrapper">
        <div class="container max-w-7xl mx-auto px-10 wrapper mb-10 overflow-hidden text-white">
            <div class="bg-neutral mt-10">
                <div class="text-center">
                    Please send payment to Address below to complete checkout
                </div>
                <div class="border border-1 p-5">
                 
                </div>
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

export default defineComponent({
    name: 'Payment',
    components: {
        MainHeaderTop,
        MainHeaderMid,
        MainHeaderBottom,
        MainHeaderVendor,
        MainFooter,
    },
    data () {
        return {
            user: null,
            payment_status: 0,

        }
    },

    mounted () { },

    methods: {},
})
</script>
