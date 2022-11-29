
<template>
  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />

  <div class="container max-w-7xl mx-auto px-10 wrapper mb-10">
    <div class="grid grid-cols-12">
      <div class="col-span-3">
        <div class="text-[18px] mb-5">Message Center</div>
        <div class="text-[12px]">Conversations</div>
        <div class=""></div>
      </div>

      <div class="col-span-9">
        <div v-if="itemforsale">
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
      </div>
        <div class="text-[18px] mb-3">
          <div v-if="other_user">
          Contact {{ other_user.display_name }}
          </div>
        </div>

        <form
          class="rounded-md pt-6 pb-8 mb-4 w-full"
          @submit.prevent="onSubmit"
        >
          <div class="">
            <textarea
              v-model="SendMsgForm.msginfo"
              id="item_description"
              placeholder="Write something .."
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"
            ></textarea>
            <span
              v-if="v$.SendMsgForm.msginfo.$error"
              class="text-red-600 text-center"
            >
              {{ v$.SendMsgForm.msginfo.$errors[0].$message }}
            </span>
          </div>
          <div class="flex justify-end">
            <button
              class="bg-gray-600 hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Message User
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <MainFooter />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { mapGetters } from "vuex";
import { useRoute } from "vue-router";
import { notify } from "@kyvg/vue3-notification";
import useValidate from "@vuelidate/core";
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
  mounted() {
    const user_uuid_route = useRoute();
    this.other_user_uuid = user_uuid_route.params.uuid;
    this.item_uuid = user_uuid_route.params.itemuuid;

    this.getotheruser();
    this.gettheitem();
  },
  data() {
    return {
      v$: useValidate(),
      itemforsale: null,
      other_user: null,
      other_user_count: 0,
      userlist: null,
      other_user_uuid: null,
      item_uuid: null,
      SendMsgForm: {
        msginfo: "",
      },
    };
  },
  validations() {
    return {
      SendMsgForm: {
        msginfo: { required, minLength: minLength(4) },
      },
    };
  },

  methods: {
     gettheitem() {
      axios({
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
      .catch((error) => {
        console.log(error)
      });
    },

     getotheruser() {
       axios({
        method: "get",
        url: "/info/user-info/" + this.other_user_uuid,
        withCredentials: true,
        headers: authHeader(),
      })
      .then((response) => {
        if ((response.status = 200)) {
          this.other_user = response.data;
        }
      })
      .catch((error) => {
        console.log(error)
      });
    },

     getmsgsofusers() {
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
     getcountofusers() {
       axios({
        method: "get",
        url: "/msg/msgs/all",
        withCredentials: true,
      })
      .then((response) => {
        this.other_user_count = response.data.get_count;
      })
      .catch(() => {});
    },
     sendMessage(payLoad: {
      order_uuid: string;
      user_two_uuid: string;
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
          if ((response.status = 200)) {
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
          notify({
            title: "Freeport Error",
            text: "Error posting information.",
            type: "error",
          });
        });
    },

    onSubmit() {
      const payLoad = {
        user_two_uuid: this.other_user.uuid,
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
