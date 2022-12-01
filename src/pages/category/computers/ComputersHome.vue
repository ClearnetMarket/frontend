<template>
  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />
  <div v-if="user">
    <MainHeaderVendor v-show="user.user_admin === 1" />
  </div>
  <div class="max-w-7xl mx-auto mb-20 wrapper px-10">
    <div class="grid grid-cols-1 w-full gap-4">
      <div class="mb-10 mt-5">
        <nav class="rounded-md">
          <ol class="list-reset flex">
            <li>
              <router-link :to="{ name: 'home' }">
                <a class="text-blue-600 hover:text-blue-700">Home</a>
              </router-link>
            </li>
            <li>
              <span class="text-gray-500 mx-2">/</span>
            </li>
            <li>
              <router-link :to="{ name: 'categoryhome' }">
                <a class="text-blue-600 hover:text-blue-700">Categories</a>
              </router-link>
            </li>
            <li>
              <span class="text-gray-500 mx-2">/</span>
            </li>

          </ol>
        </nav>
      </div>
    </div>

    <div class="grid grid-cols-12 gap-4">

      <div class="col-span-12 text-[30px] mb-5">
        Computers, Graphics Cards, and Parts
      </div>

      <div class="col-span-12 mb-5 text-[20px]">
        All Items
      </div>
    
    </div>
  </div>
  <MainFooter />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MainHeaderTop from "../../../layouts/headers/MainHeaderTop.vue";
import MainHeaderMid from "../../../layouts/headers/MainHeaderMid.vue";
import MainHeaderBottom from "../../../layouts/headers/MainHeaderBottom.vue";
import MainHeaderVendor from "../../../layouts/headers/MainHeaderVendor.vue";
import MainFooter from "../../../layouts/footers/FooterMain.vue";

export default defineComponent({
  name: "categorycomputers",
  components: {
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainHeaderVendor,
    MainFooter,
 
  },

  data() {
    return {
      user: null
    };
  },
  mounted() {},
  methods: {},
});
</script>
