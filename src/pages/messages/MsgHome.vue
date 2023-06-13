
<template>
  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />
  <div class="wrapper">
    <div class="container max-w-7xl mx-auto px-10 pb-10 text-white">
      <nav class="rounded-md w-full mb-5">
        <ol class="list-reset flex">
          <li>
            <router-link :to="{ name: 'home' }">
              <a class="text-primary hover:text-primary ">Home</a>
            </router-link>
          </li>
          <li>
            <span class="text-gray-500 mx-2">/</span>
          </li>
          <li>
            <router-link :to="{ name: 'MsgHome' }">
              <a class="text-primary hover:text-primary ">Message Center</a>
            </router-link>
          </li>
          <li>
            <span class="text-gray-500 mx-2">/</span>
          </li>
        </ol>
      </nav>
      <div class="grid grid-cols-12 pt-5 gap-4">
        <div class="col-span-12 md:col-span-3">
          <div class="border border-1 bg-neutral rounded-md shadow-md text-white p-5">
            <div class="text-[18px] mb-5">Message Center</div>

            <div v-for="othermsgs in userlist" class="py-2  hover:rounded-md">

              <div v-if="othermsgs.read === 0" class="rounded-md">
                <router-link :to="{
                  name: 'MsgView',
                  params: { postid: othermsgs.post_id },
                }">
                  <div class="grid grid-cols-12  border-y-1 rounded-md p-2 hover:bg-accent hover:text-black">
                    <div class="col-span-12 md:col-span-6 ">
                      <div v-if="othermsgs.user_one === user.user_name">
                        {{ othermsgs.user_two }}
                      </div>
                      <div v-else>{{ othermsgs.user_one }}</div>
                    </div>
                    <div class="col-span-12 md:col-span-6 text-[11px]">
                      {{ relativeDate(othermsgs.timestamp) }}
                    </div>
                  </div>
                </router-link>
              </div>
              <div v-if="othermsgs.read === 1" class="rounded-md bg-yellow-400 border-2">
                <router-link :to="{
                  name: 'MsgView',
                  params: { postid: othermsgs.post_id },
                }">
                  <div class="grid grid-cols-12 rounded-md p-2 hover:bg-accent">
                    <div class="col-span-12 md:col-span-6 ">
                      <div v-if="othermsgs.user_one === user.user_name" class="">
                        {{ othermsgs.user_two }}
                      </div>
                      <div v-else>
                        {{ othermsgs.user_one }}
                      </div>
                    </div>
                    <div class="col-span-6 text-[11px]">
                      {{ relativeDate(othermsgs.timestamp) }}
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-12 md:col-span-9 border border-1 rounded ">
          <div class="text-center">Currently only allowing messaging to vendors through items to prevent botting</div>
          <div v-if="other_user_count > 0">
            <div class="text-[18px] mb-5">
              <div v-if="user_one !== user">
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
import authHeader from "../../services/auth.header";
import { formatDistance } from "date-fns";
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
  created () {
    this.userstatus();
  },
  mounted () {
    this.getmsgsofusers();

  },
  data () {
    return {
      userlist: [],
      user: null,
      user_one: null,
      user_two: null,
      other_user_count: 0,
    };
  },

  methods: {
    relativeDate (value: any) {
      let e = new Date(value).valueOf();
      return formatDistance(e, new Date());
    },
    userstatus () {
      axios({
        method: "get",
        url: "/auth/whoami",
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if (response.data.login == true) { this.user = response.data.user }
          else { this.$router.push("/login") }
        })
        .catch(() => {
          this.$router.push("/login")
        })
    },

    getmsgsofusers () {
      axios({
        method: "get",
        url: "/msg/msgs/all",
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => { this.userlist = response.data })
        .catch(() => { })
    },
  },
});
</script>