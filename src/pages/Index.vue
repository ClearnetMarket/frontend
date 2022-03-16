<template>

<MainHeaderTop/>
<MainHeaderMid/>
<MainHeaderBottom/>

<div v-if="user">
<MainHeaderVendor/>

</div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { defineComponent } from 'vue';
import axios from 'axios';
import authHeader from '../services/auth.header';
import MainHeaderTop from '../layouts/headers/MainHeaderTop.vue'
import MainHeaderMid from '../layouts/headers/MainHeaderMid.vue'
import MainHeaderBottom from '../layouts/headers/MainHeaderBottom.vue'
import MainHeaderVendor from '../layouts/headers/MainHeaderVendor.vue'

export default defineComponent({
  name: 'Home',

  components: { MainHeaderTop, MainHeaderMid, MainHeaderBottom, MainHeaderVendor},

  data () {
    return {
      token: null,
      current_user: []
    };
  },
  computed: {
    ...mapGetters(['user']),
  },
      mounted () {
        this.userstatus()
    },

  methods: {
    async userstatus () {
    await axios({
    method: 'get',
    url: '/auth/whoami',
    withCredentials: true,
    headers: authHeader()
    })
        .then((response) => {
          if (response.status = 200) {
        
            this.$store.dispatch('user', response.data.user);
     
          }
        })
        .catch((error) => {
         
        })
    },

  },
});

</script>


<style type="ts" scoped>
</style>