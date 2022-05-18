<template>
  <div class="bg-gray-300">
    <MainHeaderTop />
    <MainHeaderMid />
    <MainHeaderBottom />

    <div class="container max-w-7xl mx-auto px-10 wrapper pb-10">
      <nav class="rounded-md w-full">
        <ol class="list-reset flex">
          <li>
            <router-link :to="{ name: 'home' }">
              <a class="text-blue-600 hover:text-blue-700">Home</a>
            </router-link>
          </li>
          <li>
            <span class="text-gray-500 mx-2">/</span>
          </li>
        </ol>
      </nav>

      <div class="grid grid-cols-12 pt-5  gap-4">
        <div class="col-span-3 ">
          <div
            class="border border-1 bg-white rounded-md shadow-md text-gray-700 p-5"
          >
            <div class="text-[18px] mb-5">Message Center</div>

            <div
              v-for="userobject in userlist"
              class="py-2 hover:bg-gray-200 hover:rounded-md"
            >
              <router-link
                :to="{
                  name: 'MsgView',
                  params: { postid: userobject.post_id },
                }"
              >
                <div v-if="userobject.user_one == user.user_name">
                  <div class=" ">
                    {{ userobject.user_two }}
                  </div>
                </div>
                <div v-else>
                  <div class="">
                    {{ userobject.user_one }}
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-span-9 border border-1 rounded ">
        <div class="text-center">Currently only allowing messaging to vendors through items to prevent botting</div>
          <div v-if="other_user_count > 0">
            <div class="text-[18px] mb-5">
              <div v-if="user_one != user">
                <div class="">
                  {{ user_one }}
                </div>
              </div>
              <div v-else>
                <div class="">
                  {{ user_two }}
                </div>
              </div>
            </div>
          </div>
          <div v-else></div>
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
import { notify } from "@kyvg/vue3-notification";
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