<template>
 <div class="text-[20px] font-bold">All Categories</div>
        <router-link :to="{ name: 'categoryelectronics' }">
          <div class=" text-blue-700 hover:underline hover:text-blue-500 py-1">Electronics</div>
        </router-link>
        <router-link :to="{ name: 'categorysmartphones' }">
          <div class="text-blue-700 hover:underline hover:text-blue-500 py-1">Smartphones and Tablets</div>
        </router-link>
        <router-link :to="{ name: 'categoryautomotive' }">
          <div class="text-blue-700 hover:underline hover:text-blue-500 py-1">Automotive</div>
        </router-link>
        <router-link :to="{ name: 'categoryhobbies' }">
          <div class="text-blue-700 hover:underline hover:text-blue-500 py-1">Hobbies and Collectibles</div>
        </router-link>
        <router-link :to="{ name: 'categoryjewelrygoldcoins' }">
          <div class="text-blue-700 hover:underline hover:text-blue-500 py-1">Jewelry Gold and Coins</div>
        </router-link>
        <router-link :to="{ name: 'categoryapparel' }">
          <div class="text-blue-700 hover:underline hover:text-blue-500 py-1">Apparel and Accessories</div>
        </router-link>
        <router-link :to="{ name: 'categoryhomeandgarden' }">
          <div class="text-blue-700 hover:underline hover:text-blue-500 py-1">Home and Garden</div>
        </router-link>
        <router-link :to="{ name: 'categoryartsandcrafts' }">
          <div class="text-blue-700 hover:underline hover:text-blue-500 py-1">Art and Crafts</div>
        </router-link>
        <router-link :to="{ name: 'categorycomputers' }">
          <div class="text-blue-700 hover:underline hover:text-blue-500 py-1">Computers and Parts</div>
        </router-link>
        <router-link :to="{ name: 'categorybooksmovies' }">
          <div class="text-blue-700 hover:underline hover:text-blue-500 py-1">Books and Movies</div>
        </router-link>
        <router-link :to="{ name: 'categorydigitalitems' }">
          <div class="text-blue-700 hover:underline hover:text-blue-500 py-1">Digital Items</div>
        </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CategoryList",
  data() {
    return {};
  },
  mounted() {},
  computed: {},
  methods: {},
});
</script>
