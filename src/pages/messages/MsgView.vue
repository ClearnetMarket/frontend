<template>
  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />
  <div v-if="loaded">
    <div class="wrapper">
      <div class="container max-w-7xl mx-auto px-10 pb-10 text-white">
        <nav class="rounded-md w-full mb-5">
          <ol class="list-reset flex">
            <li>
              <router-link :to="{ name: 'home' }">
                <a class="text-blue-600 hover:text-blue-700">Home</a>
              </router-link>
            </li>
            <li>
              <span class="text-gray-500 mx-2">/</span>
            </li>
            <li>
              <router-link :to="{ name: 'MsgHome' }">
                <a class="text-blue-600 hover:text-blue-700">Message Center Home</a>
              </router-link>
            </li>
            <li>
              <span class="text-gray-500 mx-2">/</span>
            </li>
          </ol>
        </nav>
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12 md:col-span-3">
            <div class="  bg-neutral rounded-md shadow-md text-white p-5 mt-5">
              <div class="text-[18px] mb-5">Message Center</div>

              <div v-for="othermsgs in userlist">
                <div v-if="othermsgs.post_id === postid">
                  <router-link :to="{
                    name: 'MsgView',
                    params: { postid: othermsgs.post_id },
                  }">
                    <div class="grid grid-cols-12  border-2  rounded-md bg-blue-300 p-2 hover:bg-gray-300">
                      <div class="col-span-12 md:col-span-6 text-blue-600 hover:text-blue-700">
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
                <div v-if="othermsgs.post_id !== postid">
                  <div v-if="othermsgs.read === 0" class="rounded-md">
                    <router-link :to="{
                      name: 'MsgView',
                      params: { postid: othermsgs.post_id },
                    }">
                      <div class="grid grid-cols-12  border-y-1 rounded-md p-2 hover:bg-gray-300">
                        <div class="col-span-12 md:col-span-6 text-blue-600 hover:text-blue-700">
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
                      <div class="grid grid-cols-12  rounded-md p-2 hover:bg-gray-300">

                        <div class="col-span-12 md:col-span-6">

                          <div v-if="othermsgs.user_one === user.user_name">
                            {{ othermsgs.user_two }}
                          </div>
                          <div v-else>{{ othermsgs.user_one }}</div>
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
          </div>

          <div class="col-span-12 md:col-span-9">
            <div v-if="itemforsale"
              class="grid grid-cols-12 gap-4 mb-4 border border-1 bg-neutral rounded-md shadow-md text-white p-5">
              <div class="col-span-12 md:col-span-2">
                <img class="" :src="itemforsale.image_one_url_500" alt="" />

              </div>
              <div class="col-span-12 md:col-span-10">
                <div class="font-bold text-[18px]">
                  <router-link class="hover:text-blue-500 hover:underline"
                    :to="{ name: 'MarketItem', params: { id: item_uuid } }">
                    {{ itemforsale.item_title }}
                  </router-link>
                </div>
                <div class="text-[14px]">Item ID: {{ itemforsale.uuid }}</div>
                <div class="text-[14px]">
                  Item Price: {{ itemforsale.price }}
                </div>

                <div class="text-[14px]">
                  Item Location: {{ itemforsale.origin_country_name }}
                </div>

                <div class="text-[14px]">
                  Free Shipping: {{ itemforsale.shipping_info_0 }}
                </div>
                <div class="text-[14px]">
                  Paid Shipping: {{ itemforsale.shipping_info_2 }}
                </div>
              </div>
            </div>

            <!-- comment Form -->
            <form class="rounded-md pt-6 pb-4 w-full" @submit.prevent="onSubmit">
              <div class="">
                <textarea v-model="SendMsgForm.msginfo" id="item_description" placeholder="Write something .."
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline mb-3"></textarea>
              </div>
              <div class="flex justify-end">
                <button
                  class="bg-gray-600 hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit">
                  Reply
                </button>
              </div>
            </form>
            <!-- comments -->
            <!-- Top Post -->

            <div v-for="comment in mainpostcomments" :key="comment.id">
              <div class="grid grid-cols-12 p-5 bg-neutral border-gray-400">
              

                <!-- THis is for comment ADMIN -->
                <div class="col-span-12 flex " v-if="comment.who_commented === 3">
                  <div class="col-span-12">
                    <router-link class="hover:text-blue-500 hover:underline font-bold" :to="{
                      name: 'userprofile',
                      params: { uuid: comment.mod_uuid },
                    }">
                      {{ comment.mod_name }} [ADMIN]
                    </router-link>
                    - {{ relativeDate(comment.timestamp) }} ago

                    <div class="col-span-12 text-yellow-600 bg-blue-200 p-3 border rounded-md">
                      {{ comment.body }}
                    </div>
                  </div>
                </div>



                <!-- THis is for comment VENDOR  -->
                <div class="col-span-12 text-white flex justify-start" v-else-if="comment.who_commented === 1">
                  <div class="col-span-12">
                    <router-link class="hover:text-blue-500 hover:underline font-bold" :to="{
                      name: 'userprofile',
                      params: { uuid: comment.user_one_uuid },
                    }">
                      {{ comment.user_one }}
                    </router-link>
                    - {{ relativeDate(comment.timestamp) }} ago
                    <div class="col-span-12 text-white bg-blue-500 p-3 border rounded-md">
                      {{ comment.body }}
                    </div>
                  </div>
                </div>


                  <!-- THis is for comment CUSTOMER -->
                  <div class="col-span-12 text-white flex justify-end" v-else-if="comment.who_commented === 2">
                    <div class="col-span-12">
                      <router-link class="hover:text-blue-500 hover:underline font-bold" :to="{
                        name: 'userprofile',
                        params: { uuid: comment.user_two_uuid },
                      }">
                        {{ comment.user_two }}
                      </router-link>
                      - {{ relativeDate(comment.timestamp) }} ago
                      <div class="col-span-12 text-white bg-gray-500 p-3 border rounded-md">
                        {{ comment.body }}
                      </div>
                    </div>
                  </div>




                <!-- THis is for comment from SITE -->
                <div class="col-span-12 text-white flex justify-start" v-else>
                  <div class="col-span-12">
                    <router-link class="hover:text-blue-500 hover:underline font-bold" :to="{
                      name: 'userprofile',
                      params: { uuid: comment.user_one_uuid },
                    }">
                      {{ comment.user_one }}
                    </router-link>
                    - {{ relativeDate(comment.timestamp) }} ago
                    <div class="col-span-12 text-white bg-gray-500 p-3 border rounded-md">
                      {{ comment.body }}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <MainFooter />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { formatDistance } from "date-fns";
import authHeader from "../../services/auth.header";
import MainHeaderTop from "../../layouts/headers/MainHeaderTop.vue";
import MainHeaderMid from "../../layouts/headers/MainHeaderMid.vue";
import MainHeaderBottom from "../../layouts/headers/MainHeaderBottom.vue";
import MainHeaderVendor from "../../layouts/headers/MainHeaderVendor.vue";
import MainFooter from "../../layouts/footers/FooterMain.vue";

export default defineComponent({
  name: "MsgView",
  components: {
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainHeaderVendor,
    MainFooter,
  },
  watch: {
    '$route' () {
      this.postid = this.$route.params.postid;
      this.getmainpost();
    },
  },
  created () {
    this.userstatus();
    const post_id_route = useRoute();
    this.postid = post_id_route.params.postid;
    this.getmainpost();
  },
  mounted () {

  },
  data () {
    return {
      date: Date.now(),
      loaded: false,
      other_user_count: null,
      itemforsale: null,
      userlist: null,
      user: null,
      interval: null,
      order: null,
      mainpost: null,
      mainpostcomments: [],
      postid: null,
      item_uuid: undefined,
      order_uuid: undefined,
      SendMsgForm: {
        msginfo: "",
      },
    }
  },

  methods: {
    userstatus () {
      axios({
        method: "get",
        url: "/auth/whoami",
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
         if ((response.data.login == true)) {
            this.user = response.data.user
          }
        })
        .catch(() => {
          this.user = null
        });
    },
    // get the date conversion
    relativeDate (value: any) {
      let e = new Date(value).valueOf();
      return formatDistance(e, new Date());
    },
    // get the main post of the contect from api
    getmainpost () {
      this.loaded = false;
      axios({
        method: "get",
        url: "/msg/main/post/" + this.postid,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          this.mainpost = response.data;
          this.item_uuid = response.data.item_uuid;
          this.order_uuid = response.data.order_uuid;
          this.gettheitem();
          this.getcountofusers();
          this.getmsgsofusers();
          this.getmainpostcomments();
          this.message_notification_read();
          this.message_markasread();
          this.loaded = true;
        })
        .catch((error) => {
          console.log(error)
        });
    },
    // gets the count of posts
    message_notification_read () {
      axios({
        method: "put",
        url: "/msg/markasread/" + this.postid,
        withCredentials: true,
        headers: authHeader(),
      })
        .then(() => {

        })
        .catch(() => {
        });
    },
    // gets the count of posts
    message_markasread () {
      axios({
        method: "put",
        url: "/notification/new/messages/markasread",
        withCredentials: true,
        headers: authHeader(),
      })
        .then(() => {
          this.getmsgsofusers();
        })
        .catch(() => {
        });
    },

    // get the item
    gettheitem () {
      axios({
        method: "get",
        url: "/item/" + this.item_uuid,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if ((response.data.success)) {
            this.itemforsale = response.data;
          }
        })
        .catch((error) => {
          console.log(error)
        });
    },
    // gets coments of main post

    getmainpostcomments () {
      axios({
        method: "get",
        url: "/msg/main/comment/" + this.postid,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          this.mainpostcomments = response.data;
        })
        .catch((error) => {
          console.log(error)
        });
    },

    // gets the count of posts
    getcountofusers () {
      axios({
        method: "get",
        url: "/msg/main/comment/" + this.postid,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          this.other_user_count = response.data.get_count;
        })
        .catch(() => {
        });
    },
    // gets the msds of the users
    getmsgsofusers () {
      axios({
        method: "get",
        url: "/msg/msgs/all",
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          this.userlist = response.data;
        })
        .catch((error) => {
          console.log(error)
        });
    },
    //sends a comment to the api
    sendcomment (payLoad: { textbody: string }) {
      axios({
        method: "post",
        url: "/msg/create/comment/" + this.postid,
        data: payLoad,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if ((response.data.success)) {
            this.getcountofusers();
            this.getmsgsofusers();
            this.getmainpostcomments();
            this.getmainpost();
          }

        })
        .catch((error) => {
          console.log(error)
        });
    },
    onSubmit () {
      let payLoad = { textbody: this.SendMsgForm.msginfo }
      this.sendcomment(payLoad);

    }
  },
});
</script>

<style></style>
