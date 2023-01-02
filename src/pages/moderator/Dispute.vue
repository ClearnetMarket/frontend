
<template>
    <div class="h-screen">
  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />

  <div class="max-w-4xl mx-auto wrapper px-10">
    <div class="grid grid-cols-1 w-full gap-4">
      <div class="mb-10 mt-5 px-5">
        <nav class="rounded-md">
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
      </div>
    </div>
    <div class="grid grid-cols-12">
      <div class="col-span-12 mt-5">
        <div class="grid grid-cols-12 rounded-md border border-gray-300 mb-5">
          <div class="col-span-12 bg-gray-200 px-5 py-5">
            <div class="grid grid-cols-12 text-[12px]">
              <div
                class="col-span-12 text-orange-500 text-[18px] mb-5"
                v-if="order.moderator_uuid"
              >
                Moderator id#: {{ order.moderator_uuid }}
              </div>
              <div class="col-span-12 text-orange-500 text-[18px] mb-5" v-else>
                Moderator: Waiting on a moderator to take the case ...
              </div>
              <div class="col-span-3">
                <div class="">Order Placed</div>
                <div class="">{{ order.created }}</div>
              </div>
              <div class="col-span-3">
                <div class="">Total</div>
                <div v-if="order.digital_currency === 1">
                  {{ order.price_total_btc }} BTC
                </div>
                <div v-if="order.digital_currency === 2">
                  {{ order.price_total_bch }} BCH
                </div>
                <div v-if="order.digital_currency === 3">
                  {{ order.price_total_xmr }} XMR
                </div>
              </div>
              <div class="col-span-4">
                <div class="">Order #{{ order.uuid }}</div>
              </div>
              <div class="col-span-12 mt-5">
                Date Shipped: {{ order.date_shipped }}
              </div>
              <div class="col-span-12 mt-5">Quantity: {{ order.quantity }}</div>
              <div class="col-span-12 mt-5">
                Shipping Description: {{ order.shipping_description }}
              </div>
            </div>
          </div>
        </div>
        <div class="rounded-md border border-gray-300 p-5">
          <div class="grid grid-cols-12">
            <div class="col-span-12">
              Please Write as detailed as possible the circumstances of the
              order.
              <div class="pl-5">
                <ul style="list-style-type: square">
                  <li>
                    Include tracking # and other official shipping documents
                  </li>
                  <li>Describe the nature of why the dispute happened</li>
                  <li>
                    Please be thourough with any issue you think has arisen.
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-span-12">
              <div class="" v-if="order.overall_status === 8">
                <form
                  class="rounded-md pt-6 pb-8 mb-4 w-full"
                  @submit.prevent="sendMessagePayload"
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
                      Send
                    </button>
                  </div>
                </form>
              </div>
              <div class="" v-else>
                <div class="">Dispute has been closed by the moderator</div>
              </div>
            </div>
            <div class="col-span-12">
              <div v-for="comment in mainpostcomments">
                <div v-if="comment.mod_uuid != null">
                  <div class="grid grid-cols-12 p-2 rounded bg-white mb-2">
                    <div class="col-span-12 text-orange-500">
                      Freeport Mod - {{ relativeDate(comment.timestamp) }} ago
                    </div>
                    <div class="col-span-12 text-gray-800 p-1">
                      {{ comment.body }}
                    </div>
                  </div>
                </div>
                <div v-if="comment.mod_uuid == null">
                  <div class="grid grid-cols-12 p-2 rounded bg-white mb-2">
                    <div class="col-span-12 text-gray-500">
                      {{ comment.user_one }} -
                      {{ relativeDate(comment.timestamp) }} ago
                    </div>
                    <div class="col-span-12 text-gray-800 p-1">
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
</div>
  <MainFooter />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { formatDistance } from "date-fns";
import { notify } from "@kyvg/vue3-notification";
import axios from "axios";
import authHeader from "../../services/auth.header";
import MainHeaderTop from "../../layouts/headers/MainHeaderTop.vue";
import MainHeaderMid from "../../layouts/headers/MainHeaderMid.vue";
import MainHeaderBottom from "../../layouts/headers/MainHeaderBottom.vue";
import MainHeaderVendor from "../../layouts/headers/MainHeaderVendor.vue";
import MainFooter from "../../layouts/footers/FooterMain.vue";

/**
 *
 @typedef {Object} comment.mod_uuid
 @typedef {Object} order.date_shipped
 @typedef {Object} order.moderator_uuid

 *
 */

export default defineComponent({
  name: "Dispute",

  components: {
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainHeaderVendor,
    MainFooter,
  },

  data() {
    return {
      mainpostcomments: [],
      order_id: null,
      order: null,
      postid: "",
      SendMsgForm: {
        msginfo: "",
      },
    };
  },

  mounted() {
    let order_id_route = useRoute();
    this.order_id = order_id_route.params.uuid;
    this.getuserorder();
  },

  methods: {
    relativeDate(value: any) {

      let e = new Date(value).valueOf();
      return formatDistance(e, new Date());
    },
    // get the user order
    getuserorder() {
      axios({
        method: "get",
        url: `/orders/${this.order_id}`,
        withCredentials: true,
        headers: authHeader(),
      })
      .then((response) => {
        if (response.status == 200) {
          this.order = response.data;
          this.postid = this.order.dispute_post_id;
          this.getmainpostcomments();
        }
      });
    },
    // get the post comments
     getmainpostcomments() {
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
    // comments on the post
     sendMessageComment(payLoad: { textbody: string }) {
      axios({
        method: "post",
        url: "/msg/create/comment/" + this.postid,
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
          this.getmainpostcomments();
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
    sendMessagePayload() {
      const payLoad = {
        textbody: this.SendMsgForm.msginfo,
      };
      this.sendMessageComment(payLoad);
    },
  },
});
</script>
