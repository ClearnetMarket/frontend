<template>

<MainHeaderTop/>
<MainHeaderMid/>
<MainHeaderBottom/>
<MainHeaderVendor/>
<div v-if="user">

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
            this.current_user = response.data.user
            console.log(this.current_user)
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