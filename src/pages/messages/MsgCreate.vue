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
      <div class="col-span-6">
        <div class="text-[18px] mb-3">
          Contact {{ other_user.display_name }}
        </div>

        <form
          class="rounded-md pt-6 pb-8 mb-4 w-full"
          @submit.prevent="CreateItem"
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
      <div class="col-span-3 p-5">
        <div class="text-[16px]">Rules:</div>
        <div class="text-[12px]">
          <ul class="font-bold list-inside list-disc">
            <li>Be Respectful Of Others</li>
            <li>Do not solicit</li>
            <li>Review bombing is not tolerated</li>
            <li>Asking for payment outside of Freeport invalidates escrow.</li>
          </ul>
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
import useValidate from "@vuelidate/core";
import { required, email, minLength, sameAs } from "@vuelidate/validators";
import authHeader from "../../services/auth.header";
import MainHeaderTop from "../../layouts/headers/MainHeaderTop.vue";
import MainHeaderMid from "../../layouts/headers/MainHeaderMid.vue";
import MainHeaderBottom from "../../layouts/headers/MainHeaderBottom.vue";
import MainHeaderVendor from "../../layouts/headers/MainHeaderVendor.vue";
import MainFooter from "../../layouts/footers/FooterMain.vue";

export default defineComponent({
  name: "MsgCreate",
  components: {
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainHeaderVendor,
    MainFooter,
  },

  data() {
    return {
      v$: useValidate(),
      other_user: [],
      other_user_uuid: "",
      SendMsgForm: {
        msginfo: "",
      },
    };
  },
  mounted() {
    const user_uuid_route = useRoute();
    this.other_user_uuid = user_uuid_route.params.uuid;
    console.log(this.other_user_uuid);
    this.getotheruser();
  },
  computed: {
    ...mapGetters(["user"]),
  },
  validations() {
    return {
      SendMsgForm: {
        msginfo: { required, minLength: minLength(4) },
      },
    };
  },
  methods: {
    async getotheruser() {
      console.log(this.other_user_uuid);
      await axios({
        method: "get",
        url: "/info/user-info/" + this.other_user_uuid,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if ((response.status = 200)) {
          this.other_user = response.data;
        }
      });
    },

    async getmsgsofusers() {
      await axios({
        method: "get",
        url: "/msg/count",
        withCredentials: true,
      })
        .then((response) => {
          this.userlist = response.data;
        })
        .catch((error) => {});
    },
    async getcountofusers() {
      await axios({
        method: "get",
        url: "/msg/msgs/all",
        withCredentials: true,
      })
        .then((response) => {
          this.other_user_count = response.data.get_count;
        })
        .catch((error) => {});
    },
    async sendMessage(payLoad: {
      order_uuid: string;
      user_two_uuid: string;
      body: string;
    }) {
      await axios({
        method: "post",
        url: "/msg/create",
        data: payLoad,
      })
        .then((response) => {
          if ((response.status = 200)) {
            notify({
              title: "Message Center",
              text: "Successfully sent message!",
              type: "success",
            });
            this.$router.push({
              name: "MsgHome",
            });
          }
        })
        .catch((error) => {
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
        textbody: this.SendMsgForm.msginfo,
        order_uuid: null,
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
          text: "Form success",
          type: "success",
        });

        this.sendMessage(payLoad);
      }
    },
  },
});
</script>

<style></style>
