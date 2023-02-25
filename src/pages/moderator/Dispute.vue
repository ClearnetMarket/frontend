
<template>
  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />

  <div class="max-w-4xl mx-auto wrapper px-10" v-if="loaded">
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


    <div class="grid grid-cols-12 rounded-md border border-gray-300 ">
      <div class="col-span-12 bg-gray-100 px-5 py-5 rounded-t-md">
        <div class="grid grid-cols-12 text-[12px]">
          <div class="col-span-12 md:col-span-4  gap-2 text-[15px]">
            <div class="md:text-center font-bold">Order Placed</div>
            <div class="md:text-center">{{ order.created }}</div>
          </div>
          <div class="col-span-12 md:col-span-3  gap-5 text-[15px]">
            <div class="md:text-center font-bold">Total</div>
            <div class="md:text-center ">
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
          </div>

          <div class="col-span-12 md:col-span-4 gap-2 text-[15px]">
            <div class="md:text-center font-bold">Order #</div>
            <div class="md:text-center">
              <router-link class="text-blue-600 hover:text-blue-500 hover:underline" :to="{
                name: 'ordersview',
                params: { uuid: order.uuid },
              }">
                {{ order.uuid }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-12 bg-white px-5  rounded-b-md">
        <div class="grid grid-cols-12 ">
          <div class="col-span-12 md:col-span-9 ">
            <div class="grid grid-cols-12">
              <div class="col-span-12 text-[20px] text-center md:text-left">
                <div v-if="order.overall_status === 1" class="col-span-3">
                  Waiting to be accepted
                </div>
                <div v-if="order.overall_status === 2" class="col-span-3">
                  Waiting on Shipment
                </div>
                <div v-if="order.overall_status === 3" class="col-span-3">Shipped</div>
                <div v-if="order.overall_status === 4" class="col-span-3">Delivered</div>
                <div v-if="order.overall_status === 5" class="col-span-3">
                  Finalized Order
                </div>
                <div v-if="order.overall_status === 6" class="col-span-3">
                  Requested cancel from vendor
                </div>
                <div v-if="order.overall_status === 7" class="col-span-3">Cancelled</div>
                <div class="text-red-600 col-span-2" v-if="order.overall_status === 8">
                  Disputed
                </div>
                <div v-if="order.overall_status === 10" class="col-span-3">Finalized</div>
              </div>
              <div class="col-span-12 text-[14px]">
                <div class="grid grid-cols-12 md:pt-5 md:gap-5">
                  <div class="col-span-12 md:col-span-3 flex justify-center pb-5">
                    <img class="object-contain" :src="order.image_one" alt="" />
                  </div>
                  <div class="col-span-12 md:col-span-9">
                    <div class="text-blue-600 hover:text-blue-600 hover:underline text-[18px] text-center">
                      <router-link :to="{
                        name: 'MarketItem',
                        params: { id: order.item_uuid },
                      }">
                        {{ order.title_of_item }}
                      </router-link>
                    </div>
                    <div class="">
                      <div v-if="order.vendor_uuid">
                        <div class="flex justify-center md:justify-start">
                          <div class="">Sold by:</div>
                          <router-link :to="{
                            name: 'userprofile',
                            params: { uuid: order.vendor_uuid },
                          }">
                            <div class="text-blue-600 hover:text-blue-500 hover:underline pl-3">
                              {{ order.vendor_user_name }}
                            </div>
                          </router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Requested Cancel from vendor -->
          <div v-if="order.overall_status === 6" class="col-span-3"></div>
          <!-- Disputed order -->
          <div v-if="order.overall_status === 8" class="col-span-3">
            <router-link :to="{
              name: 'Dispute',
              params: { uuid: order.uuid },
            }">
            
            </router-link>
          </div>
          <!-- Finalized order -->
          <div v-if="order.overall_status === 10" class="col-span-3">
            <div v-if="order.vendor_feedback === 0">
              <router-link :to="{
                name: 'Dispute',
                params: { uuid: order.uuid },
              }">
              </router-link>

              <router-link class="text-blue-600 hover:text-blue-500 hover:underline" :to="{
                name: 'ordersview',
                params: { uuid: order.uuid },
              }">
                <button
                  class="bg-yellow-600 hover:bg-zinc-400 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full"
                  type="button">
                  Leave Feedback
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>




    <div class="rounded-md border border-gray-300 p-5">
      <div class="grid grid-cols-12">
        <div v-if="order.moderator_uuid" class="col-span-12 mb-5">
            <div class="col-span-12 justify-center  text-[18px] mb-5 flex gap-2" v-if="order.moderator_uuid">
              <div class=""> moderator: </div>
              <div class="text-orange-500 font-bold">  {{ order.moderator_user_name }}</div>
          
          </div>
        </div>
        <div v-else class="col-span-12 text-orange-500 text-[18px] mb-5 text-center">
          Moderator: Waiting on a moderator to take the case ...
        </div>
        <div class="col-span-12 flex justify-center text-[20px] my-5">
          <div v-if="order.extended_timer == 1">Autofinalize has been paused on this order.</div>
          <div v-else>Order will autofinalize: {{ autofinalizetimer }}</div>
        </div>

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
          <div v-if="order">
            <div class="" v-if="order.overall_status === 8">
              <form class="rounded-md pt-6 pb-8 mb-4 w-full" @submit.prevent="sendMessagePayload">
                <div class="">
                  <textarea v-model="SendMsgForm.msginfo" id="item_description" placeholder="Write something .."
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"></textarea>
                </div>
                <div class="flex justify-end">
                  <button
                    class="bg-gray-600 hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit">
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div v-else>
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
              <div class="grid grid-cols-12 p-2 rounded bg-white mb-2 g">
                <div class="col-span-12 text-gray-500 flex gap-3">
                  <router-link :to="{
                    name: 'userprofile',
                    params: { uuid: comment.user_one_uuid },
                  }">
                    <div class="text-blue-600 hover:text-blue-500 hover:underline pl-3">
                      {{ comment.user_one }}
                    </div>
                  </router-link>
                  <div class="col-span-12 text-gray-500 flex">
                    - {{ relativeDate(comment.timestamp) }} ago
                  </div>
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



export default defineComponent({
  name: "Dispute",

  components: {
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainHeaderVendor,
    MainFooter,
  },

  data () {
    return {
      mainpostcomments: [],
      order_id: null,
      order: null,
      autofinalizetimer: null,
      loaded: false,
      postid: "",
      SendMsgForm: {
        msginfo: "",
      },
    };
  },

  mounted () {

    this.getuserorder();
  },

  methods: {
    relativeDate (value: any) {

      let e = new Date(value).valueOf();
      return formatDistance(e, new Date());
    },
    // get the user order
    getuserorder () {
      let order_id_route = useRoute();
      this.order_id = order_id_route.params.uuid;
      axios({
        method: "get",
        url: "/orders/" + this.order_id,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if (response.status == 200) {

            this.order = response.data;
            this.postid = this.order.dispute_post_id;
            this.getmainpostcomments();
            this.getautofinalizetime();
            this.loaded = true;
          }
        });
    },
    // get the post comments
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
        // get the post comments
    getautofinalizetime () {
      axios({
        method: "get",
        url: "/orders/autofinalize/" + this.order_id,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          this.autofinalizetimer = response.data.status;
        })
        .catch((error) => {
          console.log(error)
        });
    },

    // comments on the post
    sendMessageComment (payLoad: { textbody: string }) {
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
    sendMessagePayload () {
      const payLoad = {
        textbody: this.SendMsgForm.msginfo,
      };
      this.sendMessageComment(payLoad);
    },
  },
});
</script>
