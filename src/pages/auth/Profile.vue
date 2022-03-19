<template>
  <HeaderPlain />
<div class="col-xs-12 text-center q-mb-md">
    <h3 v-if="user">{{ user.user_name }}</h3>
    <h3 v-if="user"></h3>
    {{ user.user_id }}
    {{ msg }}
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { defineComponent } from 'vue';
import axios from 'axios';
import authHeader from '../../services/auth.header';
import HeaderPlain from "../../layouts/headers/HeaderPlain.vue";


export default defineComponent({
  name: 'Home',
  components: { HeaderPlain },

  data () {
    return {
      token: this.allCookies,
      msg: this.msg
    };
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    sendRequest () {
      axios({
        method: 'get',
        url: '/index',
        withCredentials: true,
        headers: authHeader()
      })
        .then((response) => {
          if (response.status == 200) {
            this.msg = response.data;
          }
        })
        .catch((error) => {
         
        })
    }
  },
  created () {
    this.sendRequest();
  },
});

</script>


<style type="ts" scoped>
</style>