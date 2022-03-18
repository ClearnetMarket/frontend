<template>
  <div class="max-w-7xl mx-auto px-10">
    <div class="grid sm:grid-cols-1 md:grid-cols-3 mt-5 gap-5">
      <div class="col-span-1 bg-red-300">Images</div>
      <div class="col-span-1 bg-green-300 p-2">
        <div class="text-[20px] mb-10">{{ item.item_title }}</div>
        <div class="text-[16px] font-weight-bold">Conditon</div>
        <div class="text-[14px] font-weight-bold mb-10">
          {{ condition }}
        </div>
        <div class="text-[16px] font-weight-bold">Price</div>
        <div class="text-[14px] font-weight-bold mb-10">New</div>

        <div class="text-[16px] font-weight-bold">Shipping</div>
        <div class="text-[14px] font-weight-bold mb-10">New</div>
      </div>
      <div class="col-span-1 bg-blue-400">asd</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "ItemVendorInfo",
  props: [],

  data() {
    return {};
  },
  computed() {},

  mounted() {},

  methods: {},
});
</script>
