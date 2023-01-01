
<template>
  <div class="max-w-7xl mx-auto px-10 bg-white rounded-md">
    <div class="grid grid-cols-1 text-[20px] font-semibold text-gray-600">Item Description</div>
    <div class="rounded-md p-5">
      {{ description }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";


export default defineComponent({
  name: "ItemDescription",
  props: ["description"],
  data() {
    return {};
  },

  mounted() {},

  methods: {},
});
</script>
