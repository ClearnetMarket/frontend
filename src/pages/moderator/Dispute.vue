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
              <div class="col-span-2"></div>
              <div class="col-span-4">
                <div class="">Order #{{ order.uuid }}</div>
              </div>
              <div class="col-span-12">
                Date Shipped: {{ order.date_shipped }}
              </div>

              <div class="col-span-12">
                {{ order.shipping_description }}
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
      order_id: "",
      order: "",
    };
  },

  mounted() {
    const order_id_route = useRoute();
    const order_id = order_id_route.params.uuid;
    this.order_id = order_id;
    this.getuserorder();
  },

  methods: {
    getuserorder: async function () {
      await axios({
        method: "get",
        url: `/orders/${this.order_id}`,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
          this.order = response.data;
        }
      });
    },
    //  Finishes an order
    // Splits percentage to various users
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
        url: `/mod/dispute/canceldispute/closed/${this.order_id}`,
        withCredentials: true,
        headers: authHeader(),
        data: payLoad,
      }).then((response) => {
        if (response.status == 200) {
        }
      });
    },


  },
});
</script>
