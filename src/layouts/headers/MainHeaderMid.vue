<template>
  <div class="max-w-7xl mx-auto grid grid-cols-12 md:py-2">
    <div class="col-span-12 md:col-span-3 lg:col-span-3 text-center  text-white hover:text-white "
      @click="gotourl('home')" style="cursor: pointer">
      <div class="text-[24px] text-white font-bold pt-1 ">Freeport</div>
    </div>
    <div class="sm:col-span-12 sm:px-10 md:col-span-6 lg:col-span-7 overflow-hidden">
      <form class="grid grid-cols-12" @submit.prevent="mainsearch()">
        <div class="sm:col-span-9 md:col-span-8 ">
          <input v-model="searchForm.searchInput" class="rounded w-full py-2 px-3
             input-primary text-black leading-tight" id="search" type="text" autocomplete="off"
            placeholder="Search freeport..." />
        </div>
        <div class="col-span-2 md:col-span-4 ">
          <button class="bg-secondary hover:bg-primary text-white font-bold py-2 pt-1
               px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Search
          </button>
        </div>
      </form>
    </div>
    <div class="sm:invisible sm:h-1 sm:col-span-12 md:visible md:col-span-3 lg:col-span-2 pr-5 ">
      <router-link :to="{ name: 'cart' }">
        <div
          class="grid grid-cols-12 grid-rows-2 p-1 gap-x-3 border-transparent border-2 rounded text-white hover:text-primary">
          <div class="row-span-1 col-span-9 font-bold text-[14px] flex justify-center gap-5">
            <div class="col-span-3"> <font-awesome-icon icon="fa-solid fa-cart-shopping" class="text-[18px]" /></div>
            <div class="col-span-3">
              <div class="text-[14px] ">
                <div v-if="user" class="flex">
                  {{ shoppingcartcount }} items
                </div>
                <div v-else>
                  0 items
                </div>
              </div>
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

  data () {
    return {
      shoppingcartcount: 0,
      currenturl: null,
      user: null,
      searchForm: {
        searchInput: "",
      },
    };
  },
  mounted () {
    this.userstatus()
  },
  methods: {
    userstatus () {
      axios({
        method: "get",
        url: "/auth/whoami",
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if (response.data.login == true) {
            this.user = response.data.user
            this.user.confirmed = response.data.user.confirmed

            this.get_shopping_cart_count();
          }
        })
        .catch(() => { this.user = null });
    },
    //  change url in dropdown
    gotourl (nameofurl: string) {
      this.$router.replace({ name: nameofurl })
    },
    mainsearch () {
      if (this.searchForm.searchInput !== '') {
        this.$router.push({
          name: "search",
          params: { searchstring: this.searchForm.searchInput },
        });
      }
    },
    // Get How many items in shopping cart
    get_shopping_cart_count () {
      axios({
        method: "get",
        url: "/info/user-cart-count",
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {

          if (response.data.success) {
            this.shoppingcartcount = response.data.amount;
          }
          else {
            this.shoppingcartcount = 0
          }
        });
    },
  },
});
</script>

<style  scoped></style>
