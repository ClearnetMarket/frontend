<template>
  <div class="bg-zinc-800 h-52 inset-x-0 bottom-0 footerclass ">
    <div class="mx-32 my-5">
      <div class="flex flex-row w-full">


        <div class="basis-1/4">

          <div class="text-[20px]  mb-5 text-white"></div>

          <router-link :to="{ name: 'policies' }">
            <div class="text-[16px] py-1 text-white hover:text-gray-400">
              Freeport Policies
            </div>
          </router-link>
         
          <router-link :to="{ name: 'contact' }">
            <div class="text-[16px] py-1 text-white hover:text-gray-400">
              Contact
            </div>
          </router-link>

        </div>
        <div class="basis-1/4">
     

        </div>
        <div class="basis-1/2">
          <div class="text-[38px]  mb-5 text-white">
            Privacy Sold Here
          </div>
        

        </div>
      </div>
    </div>
    <div class="flex text-white justify-center">Freeport.cash 2022</div>
<div class="flex text-white justify-center">
    <router-link :to="{ name: 'legal' }">
      <div class="text-[16px] text-white hover:text-gray-400">
        Legal
      </div>
    </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainFooter",

  mounted () {

  },
  data () {
    return {
      user: null,
    };
  },
  methods: {},
});
</script>
<style>
.footerclass {

  bottom: 0;

}
</style>
