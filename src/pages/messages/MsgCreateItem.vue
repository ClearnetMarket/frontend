
<template>
  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />
  <div class="wrapper">
    <div class="container max-w-7xl mx-auto px-10  mb-10 text-white">
      <nav class="rounded-md w-full mb-5">
        <ol class="list-reset flex">
          <li>
            <router-link :to="{ name: 'home' }">
              <a class="text-primary hover:text-primary ">Home</a>
            </router-link>
          </li>
          <li>
            <span class="text-white mx-2">/</span>
          </li>
          <li>
            <router-link :to="{ name: 'MsgHome' }">
              <a class="text-primary hover:text-primary ">Message Center Home</a>
            </router-link>
          </li>
          <li>
            <span class="text-white mx-2">/</span>
          </li>
        </ol>
      </nav>
      <div class="grid grid-cols-12 gap-4 ">
        <div class="col-span-12 md:col-span-3">
          <div class="  bg-neutral rounded-md shadow-md text-white p-5">
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

        <div class="col-span-12 md:col-span-9">
          <div v-if="itemforsale">
            <div class="grid grid-cols-12 gap-4 border border-1 p-4 mb-4 bg-neutral rounded-md">
              <div class="col-span-2">
                <img class="" :src="itemforsale.image_one_url_500" alt="" />
              </div>
              <div class="col-span-10">
                <div class="font-bold text-[18px]">
                  {{ itemforsale.item_title }}
                </div>
                <div class="text-[14px]">Item ID: {{ itemforsale.uuid }}</div>
                <div class="text-[14px]">Item Price: {{ itemforsale.price }}</div>

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
          </div>
          <div class="text-[18px] mb-3">
            <div v-if="other_user">
              Contact {{ other_user.display_name }}
            </div>
          </div>
          <form class="rounded-md pt-6 pb-8 mb-4 w-full" @submit.prevent="onSubmit">
            <div class="">
              <textarea v-model="SendMsgForm.msginfo" id="item_description" placeholder="Write something .."
                class="rounded w-full py-2 px-3 input-primary text-black">
                  </textarea>
              <span v-if="v$.SendMsgForm.msginfo.$error" class="text-red-600 text-center">
                {{ v$.SendMsgForm.msginfo.$errors[0].$message }}
              </span>
            </div>
            <div class="flex justify-end">
              <button
                class="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit">
                Message Vendor
              </button>
            </div>
          </form>
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
import { notify } from "@kyvg/vue3-notification";
import useValidate from "@vuelidate/core";
import { formatDistance } from "date-fns";
import { required, minLength } from "@vuelidate/validators";
import authHeader from "../../services/auth.header";
import MainHeaderTop from "../../layouts/headers/MainHeaderTop.vue";
import MainHeaderMid from "../../layouts/headers/MainHeaderMid.vue";
import MainHeaderBottom from "../../layouts/headers/MainHeaderBottom.vue";
import MainHeaderVendor from "../../layouts/headers/MainHeaderVendor.vue";
import MainFooter from "../../layouts/footers/FooterMain.vue";

export default defineComponent({
  name: "MsgCreateItem",
  components: {
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainHeaderVendor,
    MainFooter,
  },
  mounted () {
    let user_uuid_route = useRoute();
    this.other_user_uuid = user_uuid_route.params.uuid;
    this.item_uuid = user_uuid_route.params.itemuuid;
    this.userstatus();
    this.getotheruser();
    this.gettheitem();
    this.getmsgsofusers();
  },
  data () {
    return {
      v$: useValidate(),
      itemforsale: null,
      other_user: null,
      other_user_count: 0,
      userlist: null,
      other_user_uuid: null,
      item_uuid: null,
      user_one: null,
      user_two: null,
      user: null,
      SendMsgForm: {
        msginfo: "",
      },
    };
  },
  validations () {

    return {
      SendMsgForm: {
        msginfo: { required, minLength: minLength(4) },
      },
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
        .catch((error) => {
          this.$router.push("/login")
        })
    },
    gettheitem () {
      axios({
        method: "get",
        url: "/item/" + this.item_uuid,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          this.itemforsale = response.data;
        })
        .catch((error) => {
          console.log(error)
        });
    },

    getotheruser () {
      axios({
        method: "get",
        url: "/info/user-info/" + this.other_user_uuid,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if (response.data.success) {
            this.other_user = response.data;
          }
        })
        .catch((error) => {
          console.log(error)
        });
    },

    getmsgsofusers () {
      axios({
        method: "get",
        url: "/msg/msgs/all",
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          this.userlist = response.data;
          console.log(this.userlist)
        })
        .catch(() => { });
    },
    getcountofusers () {
      axios({
        method: "get",
        url: "/msg/msgs/all",
        withCredentials: true,
      })
        .then((response) => {
          this.other_user_count = response.data.get_count;
        })
        .catch(() => { });
    },
    sendMessage (payLoad: {
      order_uuid: string;
      body: string;
      item_uuid: string;
    }) {
      axios({
        method: "post",
        url: "/msg/create/item",
        data: payLoad,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if (response.data.success) {
            notify({
              title: "Message Center",
              text: "Successfully sent message!",
              type: "success",
            });
            this.$router.push({
              name: "MarketItem",
              params: { id: this.itemforsale.uuid },
            });
          }
          if (response.data.error) {
            notify({
              title: "Freeport Error",
              text: response.data.error,
              type: "error",
            });

            this.$router.push({
              name: "MarketItem",
              params: { id: this.itemforsale.uuid },
            });
          }
        })
        .catch((error) => {
          console.log(error)
          notify({
            title: "Freeport Error",
            text: "Error posting information.",
            type: "error",
          });
        });
    },

    onSubmit () {
      const payLoad = {
        body: this.SendMsgForm.msginfo,
        item_uuid: this.item_uuid,
        order_uuid: '',
      };
      this.v$.$validate(); // checks all inputs
      if (this.v$.$invalid) {
        notify({
          title: "Message",
          text: "Form Failure",
          type: "error",
        });
      } else {

        this.sendMessage(payLoad);
      }
    },
  },
});
</script>

<style scoped></style>
