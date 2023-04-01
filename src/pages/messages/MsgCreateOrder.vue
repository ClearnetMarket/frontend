
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
              <a class="text-blue-600 hover:text-blue-700">Home</a>
            </router-link>
          </li>
          <li>
            <span class="text-white mx-2">/</span>
          </li>
          <li>
            <router-link :to="{ name: 'MsgHome' }">
              <a class="text-blue-600 hover:text-blue-700">Message Center Home</a>
            </router-link>
          </li>
          <li>
            <span class="text-white mx-2">/</span>
          </li>
        </ol>
      </nav>
      <div class="grid grid-cols-12">
        <div class="col-span-3">
          <div class="text-[18px] mb-5">Message Center</div>
          <div class="text-[12px]">Conversations</div>
          <div class=""></div>
        </div>
        <div class="col-span-9">
          <div class="grid grid-cols-12 gap-4 border border-1 p-4 mb-4">
            <div class="col-span-2">
              <img alt="" class="w-full" src="" />
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

          <div class="text-[18px] mb-3">
            Contact {{ other_user.display_name }}
          </div>

          <form class="rounded-md pt-6 pb-8 mb-4 w-full" @submit.prevent="onSubmit">
            <div class="">
              <textarea v-model="SendMsgForm.msginfo" id="item_description" placeholder="Write something .."
                class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline mb-3"></textarea>
              <span v-if="v$.SendMsgForm.msginfo.$error" class="text-red-600 text-center">
                {{ v$.SendMsgForm.msginfo.$errors[0].$message }}
              </span>
            </div>
            <div class="flex justify-end">
              <button
                class="bg-gray-600 hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit">
                Message User
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
import useValidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { notify } from "@kyvg/vue3-notification";
import authHeader from "../../services/auth.header";
import MainHeaderTop from "../../layouts/headers/MainHeaderTop.vue";
import MainHeaderMid from "../../layouts/headers/MainHeaderMid.vue";
import MainHeaderBottom from "../../layouts/headers/MainHeaderBottom.vue";
import MainHeaderVendor from "../../layouts/headers/MainHeaderVendor.vue";
import MainFooter from "../../layouts/footers/FooterMain.vue";



export default defineComponent({
  name: "MsgCreateOrder",
  components: {
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainHeaderVendor,
    MainFooter,
  },
  mounted () {
    const user_uuid_route = useRoute();
    this.other_user_uuid = user_uuid_route.params.uuid;
    this.item_uuid = user_uuid_route.params.itemuuid;
    this.getotheruser();
    this.gettheitem();
  },
  data () {
    return {
      v$: useValidate(),
      itemforsale: null,
      other_user_count: 0,
      other_user: null,
      other_user_uuid: null,
      item_uuid: null,
      userlist: null,
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
    gettheitem () {
      axios({
        method: "get",
        url: "/item/" + this.item_uuid,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if (response.data.success) {
            this.itemforsale = response.data;
          }
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
        url: "/msg/count",
        withCredentials: true,
      })
        .then((response) => {
          this.userlist = response.data;
        })
        .catch((error) => {
          console.log(error)
        });
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
        .catch((error) => {
          console.log(error)
        });
    },
    sendMessage (payLoad: {
      order_uuid: string;
      user_two_uuid: string;
      body: string;
      item_uuid: string;
    }) {
      axios({
        method: "post",
        url: "/msg/create",
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
              name: "item",
              params: { id: this.itemforsale.uuid },
            });
          }
        })
        .catch((error) => {
          console.log(error)
        });
    },

    onSubmit () {
      const payLoad = {
        order_uuid: this.item_uuid,
        user_two_uuid: this.other_user.uuid,
        body: this.SendMsgForm.msginfo,
        item_uuid: this.item_uuid,
      };

      this.v$.$validate(); // checks all inputs
      if (this.v$.$invalid) {
        notify({
          title: "Message",
          text: "Form Failure",
          type: "error",
        });
      } else {
        notify({
          title: "Message",
          text: "Sent Message",
          type: "success",
        });
        this.sendMessage(payLoad);
      }
    },
  },
});
</script>

<style scoped></style>
