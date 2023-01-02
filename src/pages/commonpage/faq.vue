
<template>
    <div class="h-screen">
  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />

  <div v-if="user">
    <MainHeaderVendor v-show="user.user_admin === 1" />
  </div>

  <div class="container  max-w-7xl mx-auto px-10 mt-2 ">
    <div class="mt-5 mb-5">
      <nav class="rounded-md w-full  ">
        <ol class="list-reset flex  ">
          <li>
            <router-link :to="{ name: 'home' }">
              <a class="text-blue-600 hover:text-blue-700 ">Home</a>
            </router-link>
          </li>
          <li>
            <span class="text-gray-500 mx-2 mb-2 mt-2 bg-">/</span>
          </li>
        </ol>
      </nav>
    </div>
    <div class="mb-72">
    <div class="bg-white rounded-md p-5 mb-5">
      <div class=" text-[18px] font-bold  rounded-md">Can I pay without depositing money to the site?</div>
      <div class="">
        <ul class="list-disc">
          <li>
            Not Currently. We do not currently allow this due to how escrow works. In order to keep payments safe and
            provide
            transaction protection, we keep the coin in escrow.
          </li>
          <li>
            We would like to implement smart contracts in the future.
          </li>
        </ul>
      </div>
    </div>

    <div class="bg-white rounded-md p-5 mb-5">
      <div class=" text-[18px] font-bold  rounded-md">Can I pay in credit card or paypal?</div>
      <div class="">
        <ul class="list-disc">
          <li>
            We do not plan on accepting credit cards or paypal in the near future.
          </li>
        </ul>
      </div>
    </div>

    <div class="bg-white rounded-md p-5 mb-5">
      <div class=" text-[18px] font-bold  rounded-md">Can I return something if its broken or I dont like it?</div>
      <div class="">
        <ul class="list-disc">
          <li>
            We dont allow returns for a few reasons.
              </li>
              </ul>
          <ol class="list-decimal pl-5">
            <li>People can return items if they lost money due to fluctuations in crypto.</li>
            <li>We intend to be as-is market.</li>
            <li>Returns can be impossible in many countries.</li>
          </ol>
      </div>
    </div>


    <div class="bg-white rounded-md p-5 mb-5">
      <div class=" text-[18px] font-bold  rounded-md">What happens if they item is not as described?</div>
      <div class="">
        <ul class="list-disc">
          <li>
            We have moderators that will offer a compromise or full refund if they item is not as described.
          </li>
        </ul>
      </div>
    </div>
    

        <div class="bg-white rounded-md p-5 mb-5">
          <div class=" text-[18px] font-bold  rounded-md">What happens if they item is broken when I got it?</div>
          <div class="">
            <ul class="list-disc">
              <li>
                We have moderators that will offer a compromise or full refund if they item is not as described.
              </li>
            </ul>
          </div>
        </div>
</div>
</div>
  </div>
  <MainFooter />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import MainHeaderTop from "../../layouts/headers/MainHeaderTop.vue";
import MainHeaderMid from "../../layouts/headers/MainHeaderMid.vue";
import MainHeaderBottom from "../../layouts/headers/MainHeaderBottom.vue";
import MainHeaderVendor from "../../layouts/headers/MainHeaderVendor.vue";
import MainFooter from "../../layouts/footers/FooterMain.vue";

export default defineComponent({
  name: "faq",
  components: {
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainHeaderVendor,
    MainFooter,
  },

  mounted () {

  },
  data () {
    return {
      user: null
    };
  },


  methods: {

  },
});
</script>
