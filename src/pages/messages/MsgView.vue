<template>
  <div class="bg-gray-300">
    <MainHeaderTop />
    <MainHeaderMid />
    <MainHeaderBottom />
    <div class="container max-w-7xl mx-auto px-10 wrapper pb-10">
      <div v-if="loaded">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-3">
            <div
              class="border border-1 bg-white rounded-md shadow-md text-gray-700 p-5"
            >
              <div class="text-[18px] mb-5">Message Center</div>

              <div v-for="userobject in userlist">
                <div v-if="userobject.post_id == postid">
                  <router-link
                    :to="{
                      name: 'MsgView',
                      params: { postid: userobject.post_id },
                    }"
                  >
                    <div
                      class="grid grid-cols-12 mb-5 border-y-1 border rounded-md bg-blue-300 p-2 hover:bg-gray-100"
                    >
                      <div class="col-span-6">
                        <div v-if="userobject.user_one == user.user_name">
                          {{ userobject.user_two }}
                        </div>
                        <div v-else>{{ userobject.user_one }}</div>
                      </div>
                      <div class="col-span-6 text-[11px]">
                        {{ relativeDate(userobject.timestamp) }}
                      </div>
                    </div>
                  </router-link>
                </div>
                <div v-if="userobject.post_id != postid">
                  <div v-if="userobject.read == 0">
                    <router-link
                      :to="{
                        name: 'MsgView',
                        params: { postid: userobject.post_id },
                      }"
                    >
                      <div
                        class="grid grid-cols-12 mb-5 border-y-1 rounded-md p-2 hover:bg-gray-100"
                      >
                        <div class="col-span-6">
                          <div v-if="userobject.user_one == user.user_name">
                            {{ userobject.user_two }}
                          </div>
                          <div v-else>{{ userobject.user_one }}</div>
                        </div>
                        <div class="col-span-6 text-[11px]">
                          {{ relativeDate(userobject.timestamp) }}
                        </div>
                      </div>
                    </router-link>
                  </div>
                  <div v-if="userobject.read == 1">
                    <router-link
                      :to="{
                        name: 'MsgView',
                        params: { postid: userobject.post_id },
                      }"
                    >
                      <div
                        class="grid grid-cols-12 mb-5 border-y-1 bg-yellow-300 rounded-md p-2 hover:bg-gray-100"
                      >
                        <div class="col-span-6">
                          <div v-if="userobject.user_one == user.user_name">
                            {{ userobject.user_two }}
                          </div>
                          <div v-else>{{ userobject.user_one }}</div>
                        </div>
                        <div class="col-span-6 text-[11px]">
                          {{ relativeDate(userobject.timestamp) }}
                        </div>
                      </div>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-span-9">
            <div
              class="grid grid-cols-12 gap-4 mb-4 border border-1 bg-white rounded-md shadow-md text-gray-700 p-5"
            >
              <div class="col-span-2">
                <img class="w-full" src="{{itemforsale.image_one_url}}" />
              </div>
              <div class="col-span-10">
                <div class="font-bold text-[18px]">
                  <router-link
                    class="hover:text-blue-500 hover:underline"
                    :to="{ name: 'item', params: { id: item_uuid } }"
                  >
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
            <form
              class="rounded-md pt-6 pb-4 w-full"
              @submit.prevent="onSubmit"
            >
              <div class="">
                <textarea
                  v-model="SendMsgForm.msginfo"
                  id="item_description"
                  placeholder="Write something .."
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"
                ></textarea>
              </div>
              <div class="flex justify-end">
                <button
                  class="bg-gray-600 hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Reply
                </button>
              </div>
            </form>
            <!-- comments -->
            <!-- Top Post -->
            <div class="border border-1">
              <div class="grid grid-cols-12 p-5 border-b border-gray-400">
                <div class="col-span-12 text-gray-600">
                  <router-link
                    class="hover:text-blue-500 hover:underline"
                    :to="{
                      name: 'userprofile',
                      params: { uuid: mainpost.user_one_uuid },
                    }"
                    >{{ mainpost.user_one }}</router-link
                  >
                  - {{ relativeDate(mainpost.timestamp) }} ago
                </div>
                <div class="col-span-12 text-gray-800 hover:bg-gray-200 p-3">
                  {{ mainpost.body }}
                </div>
              </div>
            </div>
            <div class="">
              <div v-for="comment in mainpostcomments">
                <div class="grid grid-cols-12 p-5 border-b border-gray-400">
                  <div
                    class="col-span-12 text-gray-600"
                    v-if="comment.user_one_uuid"
                  >
                    <router-link
                      class="hover:text-blue-500 hover:underline"
                      :to="{
                        name: 'userprofile',
                        params: { uuid: comment.user_one_uuid },
                      }"
                    >
                      {{ comment.user_one }}</router-link
                    >
                    - {{ relativeDate(comment.timestamp) }} ago
                  </div>

                  <div
                    v-if="comment.user_one_uuid"
                    class="col-span-12 text-gray-800 bg-gray-200 p-3 border rounded-md"
                  >
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
  <MainFooter />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { ref } from "vue";
import { mapGetters } from "vuex";
import { useRoute } from "vue-router";
import { formatDistance } from "date-fns";
import { notify } from "@kyvg/vue3-notification";
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
    $route() {
      this.postid = this.$route.params.postid;
      this.getmainpost();
    },
  },
  mounted() {
    const post_id_route = useRoute();
    this.postid = post_id_route.params.postid;
    this.getmainpost();
  },
  data() {
    return {
      date: Date.now(),
      loaded: false,
      itemforsale: [],
      order: [],
      postid: "",
      item_uuid: "",
      order_uuid: "",
      mainpost: [],
      mainpostcomments: [],
      SendMsgForm: {
        msginfo: "",
      },
    }
  },
  computed: {
    ...mapGetters(["user"]),
  },

  methods: {
      // get the date conversion
    relativeDate(value) {
      var d = value;
      var e = new Date(d).valueOf();
      return formatDistance(e, new Date());
    },
    // get the main post of the contect from api
    async getmainpost() {
      await axios({
        method: "get",
        url: "/msg/main/post/" + this.postid,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          this.loaded = false;
          this.mainpost = response.data;
          this.item_uuid = response.data.item_uuid;
          this.order_uuid = response.data.order_uuid;
          this.gettheitem();
          this.getcountofusers();
          this.getmsgsofusers();
          this.getmainpostcomments();
          this.loaded = true;
        })
        .catch((error) => {
         
        });
    },
    // get the item
    async gettheitem() {
      await axios({
        method: "get",
        url: "/item/" + this.item_uuid,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if ((response.status = 200)) {
            this.itemforsale = response.data;
          }
        })
        .catch((error) => {  });
    },
    // gets the order of the msg
    async gettheorder() {
      if (user_one_uuid == user.uuid) {
        await axios({
          method: "get",
          url: "/orders/vendor/" + this.order_uuid,
          withCredentials: true,
          headers: authHeader(),
        })
          .then((response) => {
            if ((response.status = 200)) {
              this.order = response.data;
            }
          })
          .catch((error) => { });
      }
      if (user_two_uuid == user.uuid) {
        await axios({
          method: "get",
          url: "/orders/" + this.order_uuid,
          withCredentials: true,
          headers: authHeader(),
        })
          .then((response) => {
            if ((response.status = 200)) {
              this.order = response.data;
            }
          })
          .catch((error) => { });
      }
    },
    // gets coments of main post
    async getmainpostcomments() {
      await axios({
        method: "get",
        url: "/msg/main/comment/" + this.postid,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          this.mainpostcomments = response.data;
        })
       .catch((error) => { });
    },
    // gets the count of posts
    async getcountofusers() {
      await axios({
        method: "get",
        url: "/msg/main/comment/" + this.postid,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          this.other_user_count = response.data.get_count;
        })
        .catch((error) => {});
    },
    // gets the msds of the users
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
    //sends a comment to the api
    async sendcomment(payLoad: { body: string }) {
      await axios({
        method: "post",
        url: "/msg/create/comment/" + this.postid,
        data: payLoad,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if ((response.status = 200)) {
            this.getcountofusers();
            this.getmsgsofusers();
            this.getmainpostcomments();
            this.getmainpost();
          }
        })
        .catch((error) => {});
    },
    //payload for submitting a comment
    onSubmit() {
      const payLoad = {textbody: this.SendMsgForm.msginfo}
      this.sendcomment(payLoad);
      }
    },
});
</script>

<style></style>
