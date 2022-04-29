<template>
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
                Moderator: {{ order.moderator_uuid }}
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
                <div v-if="order.digital_currency == 1">
                  {{ order.price_total_btc }} BTC
                </div>
                <div v-if="order.digital_currency == 2">
                  {{ order.price_total_bch }} BCH
                </div>
                <div v-if="order.digital_currency == 3">
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
            <div class="col-span-6">
              <div class="">
                Customer Ratings ({{ order.customer_user_name }})
              </div>
              <div v-for="customer in customerratings">
                <div class="">{{ customer.customer_rating }}</div>
                <div class="">{{ customer.review }}</div>
              </div>
            </div>
             <div class="col-span-6">
              <div class="">
                Vendor Ratings ({{ order.vendor_user_name }})
              </div>
              <div v-for="vendor in vendorratings">
                <div class="">{{ vendor.vendor_rating }}</div>
                <div class="">{{ vendor.review }}</div>
              </div>
            </div>
            <div class="col-span-12">
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
            <div class="col-span-12">
              <div v-for="comment in mainpostcomments">
                <div class="grid grid-cols-12 p-5">
                  <div class="col-span-12 text-gray-600">
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
import authHeader from "../../services/auth.header";
import MainHeaderTop from "../../layouts/headers/MainHeaderTop.vue";
import MainHeaderMid from "../../layouts/headers/MainHeaderMid.vue";
import MainHeaderBottom from "../../layouts/headers/MainHeaderBottom.vue";
import MainHeaderVendor from "../../layouts/headers/MainHeaderVendor.vue";
import MainFooter from "../../layouts/footers/FooterMain.vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "ModDispute",

  components: {
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainHeaderVendor,
    MainFooter,
  },

  data() {
    return {
      order_id: "",
      order: "",
      customerratings: [],
      vendorratings: [],
      SendMsgForm: {
        msginfo: "",
      },
    };
  },

  mounted() {
    const order_id_route = useRoute();
    const order_id = order_id_route.params.uuid;
    this.order_id = order_id;
    this.getuserorder();
    this.getcustomerfeedback();
    this.getvendorfeedback();
  },

  methods: {
    relativeDate(value) {
      var d = value;
      var e = new Date(d).valueOf();
      return formatDistance(e, new Date());
    },
    // get the user order
    getuserorder: async function () {
      await axios({
        method: "get",
        url: `/mod/orderinfo/${this.order_id}`,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
          this.order = response.data;
        }
      });
    },
    // gets the customer feedback
    getcustomerfeedback: async function () {
      await axios({
        method: "get",
        url: `/mod/customer/ratings/${this.order.customer_uuid}`,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
          this.customerratings = response.data;
        }
      });
    },
    // gets the vendor feedback
    getvendorfeedback: async function () {
      await axios({
        method: "get",
        url: `/mod/vendor/ratings/${this.order.vendor_uuid}`,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
          this.customerratings = response.data;
        }
      });
    },
    // Finishes an order Splits percentage to various users
    async markdisputefinished(payLoad: {
      percenttovendor: string;
      percenttocustomer: string;
    }) {
      await axios({
        method: "get",
        url: `/mod/dispute/settle/${this.order_id}`,
        withCredentials: true,
        headers: authHeader(),
        data: payLoad,
      }).then((response) => {
        if (response.status == 200) {
        }
      });
    },
    markdisputePayload() {
      const payLoad = {
        percenttovendor: this.loginForm.username,
        percenttocustomer: this.loginForm.password,
      };
      this.markdisputefinished(payLoad);
    },

    //  Brings an order to open status
    async markdisputecancelledstillopen() {
      await axios({
        method: "get",
        url: `/mod/dispute/canceldispute/open/${this.order_id}`,
        withCredentials: true,
        headers: authHeader(),
        data: payLoad,
      }).then((response) => {
        if (response.status == 200) {
        }
      });
    },
    //  Brings an order to closed status
    async markdisputecancelledstillclosed() {
      await axios({
        method: "get",
        url: `/mod/dispute/canceldispute/closed/${this.order_id}`,
        withCredentials: true,
        headers: authHeader(),
        data: payLoad,
      }).then((response) => {
        if (response.status == 200) {
        }
      });
    },
    //  Extends the time on an order
    async extenddisputetime() {
      await axios({
        method: "get",
        url: `/mod/dispute/extend/${this.order_id}`,
        withCredentials: true,
        headers: authHeader(),
        data: payLoad,
      }).then((response) => {
        if (response.status == 200) {
        }
      });
    },
    // get the post comments
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
        .catch((error) => {});
    },
    // comments on the post
    async sendMessageComment(payLoad: { textbody: string }) {
      await axios({
        method: "post",
        url: "/msg/create/comment" + this.postid,
        data: payLoad,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if ((response.status = 200)) {
            this.getmainpostcomments();
          }
        })
        .catch((error) => {
          if (error.response) {
          }
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
