<template>
  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />
  <div class="container max-w-7xl mx-auto px-10 wrapper mb-10">
    <div class="grid grid-cols-12">
      <div class="col-span-3">
        <div class="text-[18px] mb-5">Message Center</div>
        <div class="text-[12px]">Conversations</div>
     
        <div v-for="userobject in userlist">

            <router-link :to="{ name: 'MsgView', params: {postid: userobject.post_id }}">
              <div v-if="userobject.user_one == user.user_name">
              {{ userobject.user_two }}{{userobject.id}}
              </div>
              <div v-else>
              {{ userobject.user_one }}{{userobject.id}}
              </div>
            </router-link>
        </div>
      </div>
     
      <div class="col-span-9 border border-1 rounded">
        <div v-if="other_user_count > 0">
          <div class="text-[18px] mb-5">
            <div v-if="user_one != user">{{ user_one }}</div>
            <div v-else>{{ user_two }}</div>
          </div>
          <div class="">Conversation</div>
        </div>
      </div>
    </div>
  </div>
  <MainFooter />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { ref } from "vue";
import { mapGetters } from "vuex";
import { useRoute } from "vue-router";
import authHeader from "../../services/auth.header";
import MainHeaderTop from "../../layouts/headers/MainHeaderTop.vue";
import MainHeaderMid from "../../layouts/headers/MainHeaderMid.vue";
import MainHeaderBottom from "../../layouts/headers/MainHeaderBottom.vue";
import MainHeaderVendor from "../../layouts/headers/MainHeaderVendor.vue";
import MainFooter from "../../layouts/footers/FooterMain.vue";

export default defineComponent({
  name: "MsgHome",
  components: {
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainHeaderVendor,
    MainFooter,
  },

  mounted() {
    this.getcountofusers();
    this.getmsgsofusers();
  },
  data() {
    return {
      userlist: [],
      user_one: "",
      user_two: "",
      other_user_count: "",
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },

  methods: {
    async getcountofusers() {
      await axios({
        method: "get",
        url: "/msg/count",
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          this.other_user_count = response.data.get_count;
        })
        .catch((error) => {});
    },

    async getmsgsofusers() {
      await axios({
        method: "get",
        url: "/msg/msgs/all",
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
      
          this.userlist = response.data;
     
        })
        .catch((error) => {});
    },
  },
});
</script>

<style></style>
