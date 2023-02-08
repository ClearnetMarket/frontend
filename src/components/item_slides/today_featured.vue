<template>

  <div class="flex flex-nowrap flex-col p-5 mb-10 mt-10 ">
  
    <div class=" text-[24px]">Today Featured</div>
    <div class="mt-5 mx-10  md:flex md:mb-5 gap-5">
      <div v-for="item in todayfeatured" :key="item.id" >
        <generic_item v-bind:item="item" />
      </div>
    </div>
  </div>


  
</template>

<script lang="ts">
import {defineComponent} from "vue";
import axios from "axios";
import generic_item from "../item/generic_item.vue";
/**
 *
@typedef {Object} item.id
@typedef {Object} item.uuid
@typedef {Object} item.image_one_url
@typedef {Object} item.image_one_server
@typedef {Object} item.item_title
@typedef {Object} item.currency
@typedef {Object} item.price
@typedef {Object} item.origin_country_name
@typedef {Object} item.digitalcurrencyone
@typedef {Object} item.digitalcurrencytwo
@typedef {Object} item.digitalcurrencythree
 *
 */

export default defineComponent({
  name: "TodayFeatured",
  components: {
    generic_item,
  },
  data() {
    return {
      todayfeatured: [],
      loadedbtcprice: false,
    };
  },

  mounted() {
    this.gettodayfeatured();
  },
  computed: {},

  methods: {

    gettodayfeatured() {
      axios({
        method: "get",
        url: ("/itemquery/query/todayfeatured"),
        withCredentials: true,
      })
          .then((response) => {
            if ((response.status = 200)) {
              this.todayfeatured = response.data;

            }
          })
          .catch((error) => {
          });
    },
   
  },
});
</script>
<style>
.break {
  flex-basis: 100%;
  height: 0;
}
</style>