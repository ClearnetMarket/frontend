<template>
  <div class="bg-neutral-800 h-96 pt-20 pb-12 inset-x-0 bottom-0 footerclass">
    <div class="mx-32">
      <div class="flex flex-row w-full">
        <div class="basis-1/4">
          <div v-if="user">
            <div class="text-[20px] mt-5 mb-5 text-yellow-600">Navigation</div>
            <router-link :to="{ name: 'account' }">
              <div class="text-[16px] py-1 text-white hover:text-gray-400">
                Account Home
              </div>
            </router-link>

            <router-link :to="{ name: 'forgotpassword' }">
              <div class="text-[16px] py-1 text-white hover:text-gray-400">
                Forgot Password
              </div>
            </router-link>
          </div>
          <div v-else class="text-yellow-600 text-[20px]">
            <div class="">No hidden fees</div>
            <div class="">No credit cards</div>
            <div class="">No paypal</div>
          </div>
        </div>

        <div class="basis-1/4">
          <div v-if="user">
            <div class="text-[20px] mt-5 mb-5 text-yellow-600">Wallets</div>
            <router-link :to="{ name: 'forgotpassword' }">
              <div class="text-[16px] py-1 text-white hover:text-gray-400">
                Wallet Home
              </div>
            </router-link>
            <router-link :to="{ name: 'btcwallet' }">
              <div class="text-[16px] py-1 text-white hover:text-gray-400">
                Bitcoin
              </div>
            </router-link>
            <router-link :to="{ name: 'bchwallet' }">
              <div class="text-[16px] py-1 text-white hover:text-gray-400">
                Bitcoin Cash
              </div>
            </router-link>
            <router-link :to="{ name: 'xmrwallet' }">
              <div class="text-[16px] py-1 text-white hover:text-gray-400">
                Monero
              </div>
            </router-link>
          </div>
        </div>
        <div class="basis-1/2">
          <div class="text-[38px] mt-5 mb-5 text-yellow-600">
            Privacy sold here
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "MainFooter",
  computed: {
    ...mapGetters(["user"]),
  },
  mounted() {

  },
  methods: {
    data() {
      return {
        user: null,
      };
    },

  },
});
</script>
<style>
.footerclass {
  position: relative;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1rem;
  text-align: center;
}
</style>
