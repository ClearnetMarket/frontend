<template>
    <div class="bg-zinc-800 mt-50 pb-24 inset-x-0 bottom-0 footerclass">
        <div class="max-w-4xl mx-auto">
            <div class="flex flex-row w-full mb-10 gap-4">
                <div class="basis-1/2 sm:basis-1/2 lg:basis-1/4 text-left">
                    <div class="text-[20px] mb-5 text-white"></div>
                    <router-link :to="{ name: 'policies' }">
                        <div class="text-[16px] py-1 text-white hover:text-gray-400">Freeport Policies</div>
                    </router-link>
                    <router-link :to="{ name: 'supporthome' }">
                        <div class="text-[16px] py-1 text-white hover:text-gray-400">Customer Support</div>
                    </router-link>

                    <router-link :to="{ name: 'btcwallet' }">
                        <div class="text-[16px] py-1 text-white hover:text-gray-400">BTC Wallet</div>
                    </router-link>
                    <router-link :to="{ name: 'bchwallet' }">
                        <div class="text-[16px] py-1 text-white hover:text-gray-400">BCH Wallet</div>
                    </router-link>
                    <router-link :to="{ name: 'xmrwallet' }">
                        <div class="text-[16px] py-1 text-white hover:text-gray-400">XMR Wallet</div>
                    </router-link>
                </div>

                <div class="lg:basis-1/4 text-center">
                    <div class="text-[38px] mb-5 text-white"></div>
                </div>

                <div class="sm:basis-1/2 lg:basis-1/2 text-center">
                    <div class="text-[38px] mb-5 text-white">Privacy Sold Here</div>
                    <div class="text-[14px] mb-5 text-white break-words">
                        We never sell data. We never give up personal information. All Shipping information deleted
                        after finalizing.
                    </div>
                </div>
            </div>

            <div class="flex text-white justify-center">Freeport.cash 2022</div>
            <div class="flex text-white justify-center">
                <router-link :to="{ name: 'legal' }">
                    <div class="text-[16px] text-white hover:text-gray-400">Legal</div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'MainFooter',
    data() {
        return {
            user: null,
        }
    },

    mounted() {},
    methods: {},
})
</script>
<style>
.footerclass {
    bottom: 0;
}
</style>
