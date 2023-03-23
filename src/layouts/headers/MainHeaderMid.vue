<template>
  <div class="max-w-7xl mx-auto grid grid-cols-12  py-2">
    <div
      class="col-span-12 md:col-span-3 lg:col-span-3 text-center sm:mb-5  text-white hover:text-white "
      @click="gotourl('home')"
      style="cursor: pointer"
    >
      <div class=" text-[24px] text-blue-600 font-semibold pt-1">Freeport</div>

    </div>
    <div class="col-span-8  md:col-span-6 lg:col-span-7 sm:pl-5 overflow-hidden pt-1">
      <form class="grid grid-cols-12 " @submit.prevent="mainsearch()">

          <div class="col-span-8 md:col-span-8 ">
            <input
              v-model="searchForm.searchInput"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:shadow-outline focus:border"
              id="search"
              type="text"
              autocomplete="off"
              placeholder="Search freeport..."
            />
          </div>
          <div class="col-span-2 md:col-span-4">
            <button
              class="bg-primary hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Search
            </button>
          </div>
      </form>
    </div>
    <div class="col-span-4 md:col-span-3 lg:col-span-2 pr-5 ">
      <router-link :to="{ name: 'cart' }">
        <div class="grid grid-cols-12 grid-rows-2 p-1 gap-x-3 hover:border-blue-600 border-transparent border-2 rounded text-white">
          <div class="row-span-2 col-span-3 pt-1">
            <font-awesome-icon icon="fa-solid fa-cart-shopping" class="text-[24px]" />
          </div>
          <div class="row-span-1 col-span-9 font-bold text-[14px] ">
             Shopping Cart
          </div>
          <div class="row-span-1 col-span-9 text-[14px] text-white">
            <div v-if="user" class="flex">
            {{ shoppingcartcount }} Items
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
import { defineComponent } from "vue"
import axios from "axios";
import authHeader from "../../services/auth.header";

export default defineComponent({
  name: "MainHeaderMid",

  data() {
    return {
      shoppingcartcount: 0,
      currenturl: null,
      user: null,
      searchForm: {
        searchInput: "",
      },
    };
  },
  mounted() {
    this.userstatus()
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
            if ((response.data.login == true)) {
              this.user = response.data.user
              this.user.confirmed = response.data.user.confirmed

              this.get_shopping_cart_count();
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

          if ((response.data.success)) {
            this.shoppingcartcount = response.data.amount;
          }
          else{
            this.shoppingcartcount = 0
          }
      });
    },
  },
});
</script>

<style type="sass" scoped></style>
