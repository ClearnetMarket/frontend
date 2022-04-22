<template>
  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />
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
          </ol>
        </nav>
      </div>
    </div>

    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-3">
        <div class="text-[20px] font-bold">All Categories</div>
        <router-link :to="{ name: 'categoryelectronics' }">
          <div class="hover:underline">Electronics</div>
        </router-link>
        <router-link :to="{ name: 'categorysmartphones' }">
          <div class="hover:underline">Smartphones and Tablets</div>
        </router-link>
        <router-link :to="{ name: 'categoryautomotive' }">
          <div class="hover:underline">Automotive</div>
        </router-link>
        <router-link :to="{ name: 'categoryhobbies' }">
          <div class="hover:underline">Hobbies and Collectibles</div>
        </router-link>
        <router-link :to="{ name: 'categoryjewelrygoldcoins' }">
          <div class="hover:underline">Jewelry Gold and Coins</div>
        </router-link>
        <router-link :to="{ name: 'categoryapparel' }">
          <div class="hover:underline">Apparel and Accessories</div>
        </router-link>
        <router-link :to="{ name: 'categoryhomeandgarden' }">
          <div class="hover:underline">Home and Garden</div>
        </router-link>
        <router-link :to="{ name: 'categoryartsandcrafts' }">
          <div class="hover:underline">Art and Crafts</div>
        </router-link>
        <router-link :to="{ name: 'categorycomputers' }">
          <div class="hover:underline">Computers and Parts</div>
        </router-link>
        <router-link :to="{ name: 'categorybooksmovies' }">
          <div class="hover:underline">Books and Movies</div>
        </router-link>
        <router-link :to="{ name: 'categorydigitalitems' }">
          <div class="hover:underline">Digital Items</div>
        </router-link>
      </div>
      <div class="col-span-9">
        <div class="grid grid-cols-3">
         {{searchresults}}
      </div>
    </div>
  </div>
  </div>
  <MainFooter />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import authHeader from "../../services/auth.header";
import MainHeaderTop from "../../layouts/headers/MainHeaderTop.vue";
import MainHeaderMid from "../../layouts/headers/MainHeaderMid.vue";
import MainHeaderBottom from "../../layouts/headers/MainHeaderBottom.vue";
import MainHeaderVendor from "../../layouts/headers/MainHeaderVendor.vue";
import MainFooter from "../../layouts/footers/FooterMain.vue";
import { useRouter, useRoute } from "vue-router";
export default defineComponent({
  name: "search",
  components: {
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainHeaderVendor,
    MainFooter,
  },

  data() {
    return {
      searchresults:"",
      searchstring: "",
    };

  },
    watch: {
    $route() {

  
    this.main_search();
    },
  },
  mounted(){
 
    this.searchstring = this.$route.params.searchstring;
    this.main_search();
  },
  methods: {
     main_search() {
      axios({
        method: "get",
        url: "/search/query/"  + this.searchstring,
        headers: authHeader(),
      }).then((response) => {
       this.searchresults = response.data
       console.log(this.searchresults)
      });
    },

  },
});
</script>
