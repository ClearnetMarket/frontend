<template>
  <HeaderPlain />
  <div class="max-w-7xl">
   <router-view />

  </div>



</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import HeaderPlain from './headers/HeaderPlain.vue'

export default defineComponent({
  name: 'SimpleLayout',
  components: { HeaderPlain },
  computed: {
    ...mapGetters(['user']),
  },

  methods: {  
    logout () {
      localStorage.removeItem('user_token');
      localStorage.removeItem('auth_token');
      this.$store.dispatch('user', null);
      this.$router.push({ name: 'home' });

    }
  }
});
</script>

<style>
.linkcolor_topb a:link {
    color: #ffffff;
    text-decoration: none;
}
.linkcolor_topb a:visited {
    color: #ffffff;
    text-decoration: none;
}
.linkcolor_topb a:hover {
    color: #ff9900;
    text-decoration: none;
}
.linkcolor_topb a:active {
    color: #ff9900;
    text-decoration: none;
}</style>