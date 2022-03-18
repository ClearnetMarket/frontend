<template>
  <div class="mt-5 mx-10 ">
  
    <div v-for="item in todayfeatured" :key="item.id">
      <div class="flex gap-5" 
       @click="$router.replace({name:'item', params: {id: item.uuid }})"
        style="cursor: pointer"
      >
        <!--Card 1-->
        <div class="rounded overflow-hidden shadow-lg ">
          <img class="w-full" src={{item.image_one_server}} />
          <div class="px-6 py-1">
            <div class="text-xl mb-2">{{ item.item_title }}</div>
            {{ item.price }}USD
          </div>
          <div class="px-6 pt-4 pb-2">
            <span
              class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-orange-500 mr-2 mb-2"
              >Bitcoin</span
            >
            <span
              class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-orange-700 mr-2 mb-2"
              >Monero</span
            >
            <span
              class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-green-600 mr-2 mb-2"
              >Bitcoin Cash</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "TodayFeatured",
  data() {
    return {
      todayfeatured: "",
    };
  },

  mounted() {
    this.gettodayfeatured();
  },

  methods: {
    async gettodayfeatured() {
      await axios({
        method: "get",
        url: "/category/query/index/todayfeatured",
        withCredentials: true,
      })
        .then((response) => {
          if ((response.status = 200)) {
            this.todayfeatured = response.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>
