<template>
  <div class="bg-yellow-400 py-1 text-gray-800 font-bold">
    <div
      class="container flex flex-col max-w-7xl mx-auto text-bold text-center justify-center align-center"
    >
      <div class="">
        You are currently unconfirmed. If you forget your password, pin, or
        account gets stolen your crypto is gone!
      </div>
    
        <div class=" text-blue-700 hover:text-blue-600">
          <router-link :to="{ name: 'accountseed' }">Confirm Account
           </router-link></div>
     
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Confirmed",

  data() {
    return {
      btcprice: null,
      xmrprice: null,
      bchprice: null,

      categoriesList: {},
    };
  },

  methods: {},
});
</script>
