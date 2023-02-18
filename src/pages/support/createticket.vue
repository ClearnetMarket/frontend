
<template>
    <MainHeaderTop />
    <MainHeaderMid />
    <MainHeaderBottom />
    <div class="wrapper">
        <div class="container max-w-5xl mx-auto px-10  mb-10">
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
                                <router-link :to="{ name: 'supporthome' }">
                                    <a class="text-blue-600 hover:text-blue-700">Customer Support</a>
                                </router-link>
                            </li>
                            <li>
                                <span class="text-gray-500 mx-2">/</span>
                            </li>
                            

                          </ol>
                    </nav>
                </div>

            <div class="grid grid-cols-12 gap-5">
                <div class="col-span-12 sm:col-span-4 bg-white rounded-md p-5">
                    <div class="text-[18px] mb-5 text-center">My Open Tickets</div>
                    <div v-if="all_tickets.length > 0">
                        <div v-for="ticket in all_tickets" :key="ticket.id">
                            <div class="grid grid-cols-12 border-b-2 border-gray-400 mb-5 ">
                                <router-link class="col-span-12" :to="{ name: 'supportviewticket', params: { uuid: ticket.uuid } }">
                                    <div class="col-span-12  hover:underline hover:text-blue-500 text-[16px] overflow-hidden" >
                                         {{ ticket.subject  }}
                                    </div>
                                </router-link>
                               
                                <div class="col-span-12 flex gap-5 mt-2">
                                    <div class="">
                                        Created:
                                    </div>
                                    <div class="">
                                        {{ relativeDate (ticket.timestamp) }} ago
                                    </div>
                                </div>
                                <div class="col-span-12 flex gap-5">
                                    <div class="">
                                        Status:
                                    </div>
                                    <div class="">
                                        <div v-if="ticket.status == 0">New Message</div>
                                        <div v-if="ticket.status == 1">Open</div>
                                        <div v-if="ticket.status == 2">Closed</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        No Previous Tickets
                    </div>
                </div>
                <div class="col-span-12 sm:col-span-8">
                    <div class="text-[18px] mb-3 text-center">
                        Create a New Ticket
                    </div>

                    <form class="rounded-md pt-6 pb-8 mb-4 w-full bg-white p-5" @submit.prevent="onSubmit">
                        <label class="block text-gray-700 text-sm font-bold mb-2">Subject</label>
                        <input v-model="SendMsgForm.subject"
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                            leading-tight focus:outline-none focus:shadow-outline"
                            id="subject" type="text" placeholder="Enter a subject of your issue .." />
                        <span v-if="v$.SendMsgForm.subject.$error" class="text-red-600 text-center">
                            {{ v$.SendMsgForm.subject.$errors[0].$message }}
                        </span>
                        <label class="block text-gray-700 text-sm font-bold mb-2 mt-3">Issue</label>
                        <textarea v-model="SendMsgForm.msginfo" id="item_description" placeholder="Write something .."
                            class="shadow appearance-none border rounded w-full py-2 px-3
                                text-gray-700 leading-tight
                                focus:outline-none focus:shadow-outline mb-3">
                        </textarea>
                        <span v-if="v$.SendMsgForm.msginfo.$error" class="text-red-600 text-center">
                            {{ v$.SendMsgForm.msginfo.$errors[0].$message }}
                        </span>
                        <div class="flex justify-end">
                            <button class="bg-gray-600 hover:bg-zinc-400 text-white font-bold 
                                        py-2 px-4 rounded
                                        focus:outline-none focus:shadow-outline" type="submit">
                                Create Ticket
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
import { notify } from "@kyvg/vue3-notification";
import useValidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import authHeader from "../../services/auth.header";
import MainHeaderTop from "../../layouts/headers/MainHeaderTop.vue";
import MainHeaderMid from "../../layouts/headers/MainHeaderMid.vue";
import MainHeaderBottom from "../../layouts/headers/MainHeaderBottom.vue";
import MainHeaderVendor from "../../layouts/headers/MainHeaderVendor.vue";
import MainFooter from "../../layouts/footers/FooterMain.vue";
import { formatDistance } from "date-fns";

export default defineComponent({
    name: "supportticket",

    components: {
        MainHeaderTop,
        MainHeaderMid,
        MainHeaderBottom,
        MainHeaderVendor,
        MainFooter,
    },

    data () {
        return {
            v$: useValidate(),
            other_user: null,
            userlist: [],
            user: null,
            all_tickets: [],
            other_user_count: 0,
            other_user_uuid: null,
            SendMsgForm: {
                msginfo: "",
                subject: "",
            },
        };
    },
    mounted () {
        this.userstatus();
        this.get_all_tickets();
    },

    validations () {
        return {
            SendMsgForm: {
                msginfo: { required, minLength: minLength(4) },
                subject: { required, minLength: minLength(4) },
            },
        };
    },
    methods: {
        truncate: function (data: any, num: any) {
            const reqdString =
                data.split("").slice(0, num).join("");
            return reqdString;
        },
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
                    if ((response.status = 200)) {
                        this.user = response.data.user;
                    }
                })
                .catch(() => {
                    this.user = null;
                });
        },
        get_all_tickets () {
            axios({
                method: "get",
                url: "/customer-service/tickets",
                withCredentials: true,
                headers: authHeader(),
            })
                .then((response) => {
                    if ((response.status = 200)) {
                        this.all_tickets = response.data;
                    }
                    else {  }
                });
        },
        sendMessage (payLoad: { textbody: string, subject: string }) {
            axios({
                method: "post",
                url: "/customer-service/create/ticket",
                data: payLoad,
                withCredentials: true,
                headers: authHeader(),
            })
                .then((response) => {
                    if ((response.status = 200)) {
                        this.$router.push({ name: "supportviewticket", params: { uuid: response.data.ticket }, });
                    }
                })
                .catch((error) => {
                    console.log(error)
                    notify({
                        title: "Freeport Error",
                        text: "Error creating ticket :(  Please send an email!",
                        type: "error",
                    });
                });
        },
        onSubmit () {
            let payLoad = { textbody: this.SendMsgForm.msginfo, subject: this.SendMsgForm.subject };
            this.v$.$validate(); // checks all inputs
            if (this.v$.$invalid) {
                notify({
                    title: "Message",
                    text: "Form Failure",
                    type: "error",
                });
            }
            else {
                this.sendMessage(payLoad);
            }
        },
    },
});
</script>

