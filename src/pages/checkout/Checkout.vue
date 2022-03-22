<template>
  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />
  <div v-if="user">
    <MainHeaderVendor v-show="user.user_admin == 1" />
  </div>
    <div class="max-w-7xl mx-auto flex mb-0 wrapper">
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

export default defineComponent({
  name: "Checkout",
 
  components: {
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainHeaderVendor,
  },

  data() {
    return {
      
    };
  },

  mounted() {
  
  },

  methods: {
    
  },
});
</script>
