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
        <CategoryList />
      </div>
      <div class="col-span-9 ">
        <div class="flex mb-2">{{searchresultscount}} results for {{searchstring}}</div>
         <div v-for="(f, index) in searchresults">
         <Searchitems :item='f' :selected-index='index' />
         </div>
   
    </div>
  </div>
  </div>
  <MainFooter />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import authHeader from "../../services/auth.header";
import MainHeaderTop from "../../layouts/headers/MainHeaderTop.vue";
import MainHeaderMid from "../../layouts/headers/MainHeaderMid.vue";
import MainHeaderBottom from "../../layouts/headers/MainHeaderBottom.vue";
import MainHeaderVendor from "../../layouts/headers/MainHeaderVendor.vue";
import MainFooter from "../../layouts/footers/FooterMain.vue";
import Searchitems from "../../components/search/search_results.vue";
import CategoryList from "../../components/category_slides/categorylist.vue";

export default defineComponent({
  name: "search",
  components: {
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainHeaderVendor,
    MainFooter,
    Searchitems,
    CategoryList
  },

  data() {
    return {
      searchresults:"",
      searchresultscount:"",
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
    this.main_search_count();
  },
  methods: {
     main_search() {
      axios({
        method: "get",
        url: "/search/query/"  + this.searchstring,
        headers: authHeader(),
      }).then((response) => {
       this.searchresults = response.data

      });
    },
     main_search_count() {
      axios({
        method: "get",
        url: "/search/query/"  + this.searchstring + "/count",
        headers: authHeader(),
      }).then((response) => {
       this.searchresultscount = response.data.count

      });
    },
  },
});
</script>
