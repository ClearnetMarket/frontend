
<template>
    <MainHeaderTop />
    <MainHeaderMid />
    <MainHeaderBottom />

    <div class="max-w-4xl mx-auto wrapper px-10" v-if="loaded">

        <div class="grid grid-cols-1 w-full gap-4 mb-5">
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
                    <li>
                        <router-link :to="{ name: 'ModHome' }">
                            <a class="text-blue-600 hover:text-blue-700">Mod Home</a>
                        </router-link>
                    </li>
                    <li>
                        <span class="text-gray-500 mx-2">/</span>
                    </li>
                    <li>
                        <router-link :to="{ name: 'ModDisputeHome' }">
                            <a class="text-blue-600 hover:text-blue-700">Dispute Home</a>
                        </router-link>
                    </li>
                    <li>
                        <span class="text-gray-500 mx-2">/</span>
                    </li>
                </ol>
            </nav>
        </div>

        <div class="grid grid-cols-12">
            <div class="col-span-12 mt-5 ">
                <div class="grid grid-cols-12 text-[12px] ">


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
                                        <div v-if="order.overall_status === 4" class="col-span-3">Delivered
                                        </div>
                                        <div v-if="order.overall_status === 5" class="col-span-3">
                                            Finalized Order
                                        </div>
                                        <div v-if="order.overall_status === 6" class="col-span-3">
                                            Requested cancel from vendor
                                        </div>
                                        <div v-if="order.overall_status === 7" class="col-span-3">Cancelled
                                        </div>
                                        <div class="text-red-600 col-span-2" v-if="order.overall_status === 8">
                                            Disputed
                                        </div>
                                        <div v-if="order.overall_status === 10" class="col-span-3">Finalized
                                        </div>
                                    </div>
                                    <div class="col-span-12 text-[14px]">
                                        <div class="grid grid-cols-12 md:pt-5 md:gap-5">
                                            <div class="col-span-12 md:col-span-3 flex justify-center pb-5">
                                                <img class="object-contain" :src="order.image_one" alt="" />
                                            </div>
                                            <div class="col-span-12 md:col-span-9">
                                                <div
                                                    class="text-blue-600 hover:text-blue-600 hover:underline text-[18px] text-center">
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
                                                                <div
                                                                    class="text-blue-600 hover:text-blue-500 hover:underline pl-3">
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
                                        <button class="bg-yellow-600 hover:bg-zinc-400 text-white font-bold py-1 px-3 
                                                    rounded focus:outline-none focus:shadow-outline w-full" type="button">
                                            Leave Feedback
                                        </button>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="rounded-md border border-gray-300 bg-gray-300 p-5 mb-5 ">
            <div class="col-span-12 justify-center  text-[18px] mb-5 flex gap-2" v-if="order.moderator_uuid">
                <div class=""> moderator: </div>
                <div class="text-orange-500 font-bold">  {{ order.moderator_user_name }}</div>
              
            </div>
            <div class="col-span-12 text-orange-500 text-[18px] mb-5" v-else>
                Moderator: Waiting on a moderator to take the case ...
            </div>
            <div class="col-span-12 flex justify-center text-[20px] my-5">
                <div v-if="order.extended_timer == 1">Autofinalize has been paused on this order.</div>
                <div v-else>Order will autofinalize: {{ autofinalizetimer }}</div>
            </div>

            <div class="flex gap-4 text-[14px] mb-2 justify-center">
                <button
                    class="bg-gray-600 hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    @click="extenddisputetime()">
                    Extend Time before Auto Finalize
                </button>
                <button
                    class="bg-purple-900 hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit" @click="markdisputecancelledstillclosed()">
                    Cancel-Close order
                </button>

                <button
                    class="bg-pink-600 hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit" @click.prevent="markdisputecancelledstillopen()">
                    Cancel-Open Order
                </button>
            </div>
            <div class="flex gap-4 text-[14px] justify-center">
                <button
                    class="bg-green-600 hover:bg-zinc-400 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit" @click.prevent="sendsplit100vendor()">
                    100-V 0-C
                </button>
                <button
                    class="bg-green-600 hover:bg-zinc-400 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit" @click.prevent="sendsplit75vendor()">
                    75-V 25-C
                </button>
                <button
                    class="bg-green-600 hover:bg-zinc-400 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit" @click.prevent="sendsplit50vendor()">
                    50/50
                </button>
                <button
                    class="bg-green-600 hover:bg-zinc-400 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit" @click.prevent="sendsplit25vendor()">
                    25-V 75-C
                </button>
                <button
                    class="bg-green-600 hover:bg-zinc-400 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit" @click.prevent="sendsplit0vendor()">
                    0-V 100-C
                </button>
            </div>
        </div>

        <div class="rounded-md border border-gray-300 bg-gray-300 p-5">
            <div class="grid grid-cols-12">
                <div class="col-span-6">
                    <div class="mb-2">
                        Customer Ratings ({{ order.customer_user_name }})
                    </div>
                    <div v-for="customer in customerratings" class="mb-1">
                        <div class="border-t-1">
                            <StarRatingCustomer v-bind:rating="customer.customer_rating" />
                            <div class="">{{ customer.review }}</div>
                        </div>
                    </div>
                </div>
                <div class="col-span-6">
                    <div class="mb-2">
                        Vendor Ratings ({{ order.vendor_user_name }})
                    </div>
                    <div v-for="vendor in vendorratings" class="mb-1">
                        <StarRating v-bind:rating="vendor.vendor_rating" />

                        <div class="">{{ vendor.review }}</div>
                    </div>
                </div>
                <div class="col-span-12">
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
                <div class="col-span-12">
                    <div v-if="order.overall_status === 10">
                        <div class="font-bold">Add a post dispute message</div>
                        <form class="pb-8 mb-4 w-full" @submit.prevent="sendMessagePayloadDispute">
                            <div class="">
                                <textarea v-model="SendDisputeForm.disputemsginfo" id="item_description"
                                    placeholder="Leave a message saying split percent and overall reason for split percent .."
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
                <div class="col-span-12">
                    <div v-for="comment in mainpostcomments">
                        <div v-if="comment.mod_uuid != null">
                            <div class="grid grid-cols-12 p-2 rounded bg-white mb-2">
                                <div class="col-span-12 text-orange-500" v-if="comment.timestamp">
                                    Freeport Mod - {{ relativeDate(comment.timestamp) }} ago
                                </div>
                                <div class="col-span-12 text-gray-800 p-1">
                                    {{ comment.body }}
                                </div>
                            </div>
                        </div>
                        <div v-if="comment.mod_uuid == null">
                            <div class="grid grid-cols-12 p-2 rounded bg-white mb-2 g">
                                <div class="col-span-12 text-gray-500 flex gap-3" v-if="comment.user_one_uuid">
                                    <router-link :to="{
                                        name: 'userprofile',
                                        params: { uuid: comment.user_one_uuid },
                                    }">
                                        <div class="text-blue-600 hover:text-blue-500 hover:underline pl-3">
                                            {{ comment.user_one }}
                                        </div>
                                    </router-link>
                                    <div class="col-span-12 text-gray-500 flex" v-if="comment.timestamp">
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
import axios from "axios";
import { useRoute } from "vue-router";
import { formatDistance } from "date-fns";
import authHeader from "../../services/auth.header";
import MainHeaderTop from "../../layouts/headers/MainHeaderTop.vue";
import MainHeaderMid from "../../layouts/headers/MainHeaderMid.vue";
import MainHeaderBottom from "../../layouts/headers/MainHeaderBottom.vue";
import MainHeaderVendor from "../../layouts/headers/MainHeaderVendor.vue";
import MainFooter from "../../layouts/footers/FooterMain.vue";
import StarRatingCustomer from "../../components/star_rating/StarCustomer.vue";
import StarRating from "../../components/star_rating/Star.vue";

export default defineComponent({
    name: "ModDispute",

    components: {
        MainHeaderTop,
        MainHeaderMid,
        MainHeaderBottom,
        MainHeaderVendor,
        MainFooter,
        StarRating,
        StarRatingCustomer,
    },

    data () {
        return {
            mainpostcomments: [],
            order_id: null,
            loaded: false,
            order: null,
            postid: null,
            autofinalizetimer: null,
            customerratings: [],
            vendorratings: [],
            SendMsgForm: {
                msginfo: "",
            },
            SendDisputeForm: {
                disputemsginfo: "",
            },
        };
    },

    mounted () {
        this.userstatus();
        const order_id_route = useRoute();
        this.order_id = order_id_route.params.uuid;
        this.getuserorder();
    },

    methods: {
        // get date conversion
        relativeDate (value: any) {
            let e = new Date(value).valueOf();
            return formatDistance(e, new Date());
        },
        // gets the user status
        userstatus () {
            axios({
                method: "get",
                url: "/auth/whoami",
                withCredentials: true,
                headers: authHeader(),
            }).then((response) => {
                if (response.status == 200) {

                    if (response.data.user.user_admin < 2) {
                        this.$router.push({ name: "home" });
                    }
                }
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

        // get the user order
        getuserorder () {
            axios({
                method: "get",
                url: `/mod/orderinfo/${this.order_id}`,
                withCredentials: true,
                headers: authHeader(),
            }).then((response) => {
                if (response.status == 200) {
                    this.order = response.data;
                    this.postid = response.data.dispute_post_id;
                    this.getmainpostcomments();
                    this.getcustomerfeedback();
                    this.getvendorfeedback();
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

                });
        },

        // gets the customer feedback
        getcustomerfeedback () {
            axios({
                method: "get",
                url: `/mod/customer/ratings/${this.order.customer_uuid}`,
                withCredentials: true,
                headers: authHeader(),
            })
                .then((response) => {
                    if (response.status == 200) {
                        this.customerratings = response.data;
                    }
                });
        },
        // gets the vendor feedback
        getvendorfeedback () {
            axios({
                method: "get",
                url: `/mod/vendor/ratings/${this.order.vendor_uuid}`,
                withCredentials: true,
                headers: authHeader(),
            })
                .then((response) => {
                    if (response.status == 200) {
                        this.vendorratings = response.data;
                    }
                });
        },

        //  Brings an order to open status
        markdisputecancelledstillopen () {
            axios({
                method: "get",
                url: `/mod/dispute/canceldispute/open/${this.order_id}`,
                withCredentials: true,
                headers: authHeader(),

            }).then((response) => {
                if (response.status == 200) {
                    this.getuserorder();
                }
            });
        },
        //  Brings an order to closed status
        markdisputecancelledstillclosed () {
            axios({
                method: "get",
                url: `/mod/dispute/canceldispute/closed/${this.order_id}`,
                withCredentials: true,
                headers: authHeader(),
            }).then((response) => {
                if (response.status == 200) {
                    this.getuserorder();
                }
            });
        },
        //  Extends the time on an order
        extenddisputetime () {
            axios({
                method: "get",
                url: '/mod/dispute/extend/' + this.order_id,
                withCredentials: true,
                headers: authHeader(),

            })
                .then((response) => {
                    if ((response.status = 200)) {
                        this.getuserorder();
                    }
                })
                .catch((error) => {
                    if (error.response) {
                    }
                });
        },
        // 100 to vendor
        split100vendor (payLoad: {
            percenttovendor: string;
            percenttocustomer: string;
        }) {
            axios({
                method: "post",
                url: '/mod/dispute/settle/' + this.order_id,
                data: payLoad,
                withCredentials: true,
                headers: authHeader(),
            })
                .then((response) => {
                    if ((response.status = 200)) {
                        this.getuserorder();
                    }
                })
                .catch((error) => {
                    if (error.response) {
                    }
                });
        },
        sendsplit100vendor () {
            const payLoad = {
                percenttovendor: "100",
                percenttocustomer: "0",
            };
            this.split100vendor(payLoad);
        },
        // 75 to vendor
        split75vendor (payLoad: {
            percenttovendor: string;
            percenttocustomer: string;
        }) {
            axios({
                method: "post",
                url: `/mod/dispute/settle/${this.order_id}`,
                data: payLoad,
                withCredentials: true,
                headers: authHeader(),
            })
                .then((response) => {
                    if ((response.status = 200)) {
                        this.getuserorder();
                    }
                })
                .catch((error) => {

                });
        },
        sendsplit75vendor () {
            const payLoad = {
                percenttovendor: "75",
                percenttocustomer: "25",
            };
            this.split75vendor(payLoad);
        },

        // 50 to vendor
        split50vendor (payLoad: {
            percenttovendor: string;
            percenttocustomer: string;
        }) {
            axios({
                method: "post",
                url: `/mod/dispute/settle/${this.order_id}`,
                data: payLoad,
                withCredentials: true,
                headers: authHeader(),
            })
                .then((response) => {
                    if ((response.status = 200)) {
                        this.getuserorder();
                    }
                })
                .catch((error) => {

                });
        },
        sendsplit50vendor () {
            const payLoad = {
                percenttovendor: "50",
                percenttocustomer: "50",
            };
            this.split50vendor(payLoad);
        },

        // 25 to vendor
        split25vendor (payLoad: {
            percenttovendor: string;
            percenttocustomer: string;
        }) {
            axios({
                method: "post",
                url: `/mod/dispute/settle/${this.postid}`,
                data: payLoad,
                withCredentials: true,
                headers: authHeader(),
            })
                .then((response) => {
                    if ((response.status = 200)) {
                        this.getuserorder();
                    }
                })
                .catch((error) => {

                });
        },
        sendsplit25vendor () {
            const payLoad = {
                percenttovendor: "25",
                percenttocustomer: "75",
            };
            this.split25vendor(payLoad);
        },
        // 0 to vendor
        split0vendor (payLoad: {
            percenttovendor: string;
            percenttocustomer: string;
        }) {
            axios({
                method: "post",
                url: `/mod/dispute/settle/${this.postid}`,
                data: payLoad,
                withCredentials: true,
                headers: authHeader(),
            })
                .then((response) => {
                    if ((response.status = 200)) {
                        this.getuserorder();
                    }
                })
                .catch((error) => {

                });
        },
        sendsplit0vendor () {
            const payLoad = {
                percenttovendor: "0",
                percenttocustomer: "100",
            };
            this.split0vendor(payLoad);
        },
        // comments on the post
        sendMessagePostDispute (payLoad: { textbody: string }) {
            axios({
                method: "post",
                url: "/mod/postdisputemsg/" + this.order.uuid,
                data: payLoad,
                withCredentials: true,
                headers: authHeader(),
            })
                .then((response) => {
                    if ((response.status = 200)) {
                        this.getuserorder();
                        this.SendDisputeForm.disputemsginfo = "";
                    }
                })
                .catch((error) => {

                });
        },
        sendMessagePayloadDispute () {
            const payLoad = {
                textbody: this.SendDisputeForm.disputemsginfo,
            };
            this.sendMessagePostDispute(payLoad);
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
                        this.getuserorder();
                        this.SendMsgForm.msginfo = "";
                    }
                })
                .catch((error) => {

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
