<template>
  <div class="max-w-7xl mx-auto grid sm:grid-cols-12 md:grid-cols-12 mb-0">
    <div
      class="grid sm:col-span-12 md:col-span-3 grid-rows-2 text-center pt-5 m-0 text-gray-800 hover:text-gray-600 "
      @click="gotourl('home')"
      style="cursor: pointer"
    >
      <div class="row-span-1 text-[24px] text-blue-600 font-semibold ">Freeport</div>
      <div class="row-span-1 text-[14px] font-semibold text-gray-700"></div>
    </div>
    <div class="sm:col-span-4 md:col-span-6 pt-5">
      <form class="grid grid-cols-12" @submit.prevent="mainsearch()">
       
          <div class="col-span-10 ">
            <input
              v-model="searchForm.searchInput"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:shadow-outline focus:border"
              id="search"
              type="text"
              autocomplete="off"
              placeholder="Search freeport..."
            />
          </div>
          <div class="col-span-2">
            <button
              class="bg-blue-600 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Search
            </button>
          </div>
      </form>
    </div>
    <div
      class="sm:col-span-4 sm:col-start-8 md:col-span-3 md:col-start-11 pt-5 pr-5"
    >
      <router-link :to="{ name: 'cart' }">
        <div class="grid grid-cols-12 grid-rows-2 p-1 hover:border-blue-600 border-transparent border-2 rounded">
          <div class="row-span-2 col-span-3 pt-1">
            <ShoppingBagIcon class="text-white bg-blue-600 w-7 h-7" />
          </div>
          <div
            class="row-span-1 col-span-9 font-bold text-[14px] text-gray-700"
          >
            Shopping Cart
          </div>
          <div class="row-span-1 col-span-9 text-[14px] text-gray-700">
            <div v-if="user" class="flex">
            {{ shopping_cart_count }} Items
            </div>
              <div v-else>
                0 Items
              </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ShoppingBagIcon } from "@heroicons/vue/solid";
import axios from "axios";
import authHeader from "../../services/auth.header";

export default defineComponent({
  name: "MainHeaderMid",
  components: { ShoppingBagIcon },
  data() {
    return {
      shopping_cart_count: 0,
      user: null,
      searchForm: {
        searchInput: "",
      },
    };
  },
  created() {
  
  },
  mounted() {
    this.userstatus()
     this.get_shopping_cart_count();
  },
  methods: {
    userstatus() {
      axios({
        method: "get",
        url: "/auth/whoami",
        withCredentials: true,
        headers: authHeader(),
      })
          .then((response) => {
            if ((response.status = 200)) {
              this.user = response.data.user
              this.user.confirmed = response.data.user.confirmed
              this.$store.dispatch("user", response.data.user);
            }
          })
          .catch(() => {this.user = null});
    },
    //  change url in dropdown
    gotourl(nameofurl: string) {
      this.$router.replace({ name: nameofurl })
    },
    mainsearch() {

      if (this.searchForm.searchInput !== ''){
          this.$router.push({
          name: "search",
          params: { searchstring: this.searchForm.searchInput },
        });
      }
      else{

      }


    },
    // Get How many items in shopping cart
    get_shopping_cart_count()  {

       axios({
        method: "get",
        url: "/info/user-cart-count",
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
         
          if ((response.status = 200)) {
        this.shopping_cart_count = response.data.status;
          }
          else{
          
            this.shopping_cart_count = 0
          }
      });
    },
  },
});
</script>

<style type="sass" scoped></style>
