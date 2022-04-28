<template>
  <div class="max-w-7xl mx-auto px-10">
      <div class="grid grid-cols-1 text-[20px]">

      Item Description

      </div>
      <div class="border border-1 border-gray-300 rounded-md p-5">
            {{description}}
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "ItemDescription",
   props: ["description"],
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
