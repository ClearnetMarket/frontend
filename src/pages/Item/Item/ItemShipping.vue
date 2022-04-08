<template>

  <div class="max-w-7xl mx-auto px-10 mt-10">
      <div class="grid grid-cols-1 text-[20px]">

      Shipping

      </div>
      <div class="border border-1 border-gray-300 rounded-md p-5">
          Shipping From: {{origincountry}}
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "ItemShipping",
  props: [
    "origincountry",
    "destinationcountryone",
    "destinationcountrytwo",
    "destinationcountrythree",
    "destinationcountryfour",
    "shippingfree",
    "shippingtwo",
    "shippingthree",
    "shippingpricetwo",
    "shippingdaytwo",
    "shippingpricethree",
    "shippingdaythree",
  ],
  data() {
    return {
      
    };
  },

  mounted() {
  
  },

  methods: {
    
  },
});
</script>
