<template>
  <div class="bg-neutral-800 h-96 text-white pt-12 pb-12  inset-x-0 bottom-0 mt-20">
  <div class="mx-32 ">
    <div class="flex flex-row ">
     
      <div class="basis-1/4">
      <div class="text-[20px] mt-5 mb-5 text-indigo-500 ">Navigation</div>
            <div class="text-[16px] pt-2 pb-2">Bitcoin Wallet</div>
      <div class="text-[16px] pt-2 pb-2">Bitcoin Cash Wallet</div>
      <div class="text-[16px] pt-2 pb-2">Monero Wallet</div>
      </div>
      <div class="basis-1/4">
      <div class="text-[20px] mt-5 mb-5 text-indigo-500">Wallets</div>
      <div class="text-[16px] pt-2 pb-2">Bitcoin Wallet</div>
      <div class="text-[16px] pt-2 pb-2">Bitcoin Cash Wallet</div>
      <div class="text-[16px] pt-2 pb-2">Monero Wallet</div>
      </div>
       <div class="basis-1/2">
         <div class="text-[38px] mt-5 mb-5 text-indigo-400 ">
         Commerce for everyone 
         </div>
       </div>
    </div>
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "MainFooter",
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {},
});
</script>
