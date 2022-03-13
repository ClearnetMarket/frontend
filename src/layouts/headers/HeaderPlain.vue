<template>
  <nav class="bg-blue-600 py-2 md:py-3">
    <div class="container px-4 mx-auto md:flex md:items-center">
      <div class="flex justify-between items-center">
          <router-link class="font-bold text-xl text-white  hover:text-gray-300"
            to="/">
            Clearnet Market
          </router-link>
  
        <button
          class="border border-solid border-gray-600 px-3 py-1 rounded 
          text-gray-600 opacity-50 hover:opacity-75 md:hidden"
          id="navbar-toggle"
        >
          <i class="fas fa-bars"></i>
        </button>
      </div>

      <div class="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0" id="navbar-collapse">
        <router-link
         to="/login"
          class="p-1 lg:px-3 md:mx-2 text-black bg-white text-center border border-blue-600
           border-transparent rounded hover:bg-gray-200 hover:text-black transition-colors duration-300"
        >Login
        </router-link>
        <router-link
          class="p-1 lg:px-3 md:mx-2 text-black bg-white text-center border border-solid
           border-blue-600 rounded hover:bg-gray-200 hover:text-black transition-colors duration-300 mt-1 md:mt-0 md:ml-1"
          to="/register"
        >Signup</router-link>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'HeaderPlain',
  computed: {
    ...mapGetters(['user']),
  },

  methods: {
    logout () {
      localStorage.removeItem('user_token');
      localStorage.removeItem('auth_token');
      localStorage.clear();
      this.$store.dispatch('user', null);


    },
  },
});
</script>
