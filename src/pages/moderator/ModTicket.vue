
<template>
    <MainHeaderTop />
    <MainHeaderMid />
    <MainHeaderBottom />
    <div class="wrapper" v-if="loaded">
        <div class="container max-w-5xl mx-auto px-10 mb-10 text-white">

            <div class="grid grid-cols-1 w-full gap-4 mb-5">
                <nav class="rounded-md">
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
                            <router-link :to="{ name: 'ModHome' }">
                                <a class="text-blue-600 hover:text-blue-700">Mod Home</a>
                            </router-link>
                        </li>
                        <li>
                            <span class="text-white mx-2">/</span>
                        </li>
                        <li>
                            <router-link :to="{ name: 'ModTicketsHome' }">
                                <a class="text-blue-600 hover:text-blue-700">Ticket Home</a>
                            </router-link>
                        </li>
                        <li>
                            <span class="text-white mx-2">/</span>
                        </li>
                    </ol>
                </nav>
            </div>


            <div class="grid grid-cols-12 gap-5">
                <div class="col-span-12 sm:col-span-4">
                    <div v-if="userprofile" class=" bg-neutral rounded-md p-5">
                        <div class="col-span-12 md:col-span-3 flex justify-center">
                            <img class="object-fit" :src="userprofile.profileimage_url_250">
                        </div>
                        <div class="col-span-12 md:col-span-9">
                            <div class="text-[20px] text-center">{{ userprofile.display_name }}</div>
                            <div class="text-white text-center  mb-5">
                                Member Since: {{ relativeDate(userprofile.member_since) }} ago
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-span-12 sm:col-span-8">
                    <div class="grid grid-cols-12 p-5  bg-neutral rounded-md mb-5">
                        <div class="col-span-12 text-[18px]  mb-3" v-if="get_ticket != null">
                            Ticket # {{ get_ticket.uuid }}:
                        </div>
                         <div class="col-span-12 text-[18px]  mb-3 bg-gray-300 round-md" v-if="get_ticket != null">
                            {{ get_ticket.subject }}
                        </div>
                        
                        <div class="col-span-12 text-[18px] mb-3" v-if="get_ticket.status == 1">
                            Status: Open
                        </div>
                        <div class="col-span-12 text-[18px] mb-3" v-else>
                            Status: Closed
                        </div>
                        <button class="col-span-12  bg-gray-600 hover:bg-zinc-400 text-white py-2 px-4 
                            rounded focus:outline-none focus:shadow-outline mb-5" type="submit" 
                            @click.prevent="close_current_ticket()">
                            Mark Ticket as Closed
                        </button>
                        <form class="col-span-12 rounded-md pt-6 pb-8 mb-4 w-full bg-neutral p-5" @submit.prevent="onSubmit">

                            <textarea v-model="SendMsgForm.msginfo" id="item_description" placeholder="Write something .."
                                class="shadow appearance-none border rounded w-full py-2 px-3
                                            text-white leading-tight
                                            focus:outline-none focus:shadow-outline mb-3">
                                </textarea>
                            <span v-if="v$.SendMsgForm.msginfo.$error" class="text-red-600 text-center">
                                {{ v$.SendMsgForm.msginfo.$errors[0].$message }}
                            </span>

                            <div class="flex justify-end">
                                <button
                                    class="bg-gray-600 hover:bg-zinc-400 text-white font-bold 
                                            py-2 px-4 rounded
                                            focus:outline-none focus:shadow-outline"
                                    type="submit">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                    <div class="grid grid-cols-12 p-5  bg-neutral rounded-md">
                        <div v-for="comment in get_ticket_data" :key="comment.id" class="col-span-12">
                            <div class="grid grid-cols-12 mb-5" v-if="user">
                            

                                <div v-if="comment.author_uuid != admin_user.user_id"
                                    class="col-span-12 flex justify-start">
                                    <div class="col-span-12 text-white font-bold text-[18px]">
                                        <router-link class="hover:text-blue-500 hover:underline" :to="{
                                            name: 'userprofile',
                                            params: { uuid: comment.author_uuid },
                                        }">
                                            {{ comment.author }}
                                        </router-link>
                                    </div>
                                    <div class="text-white">
                                        - {{ relativeDate(comment.timestamp) }} ago
                                    </div>
                                </div>
                                <div v-else class="col-span-12  flex justify-end">
                                    <div class="col-span-12 text-yellow-600 font-bold text-[18px]">
                                        {{ comment.author }} [ADMIN]
                                    </div>
                                    <div class="text-white">
                                        - {{ relativeDate(comment.timestamp) }} ago
                                    </div>
                                </div>
                                <div class=" col-span-12">
                                    <div v-if="comment.author_uuid != admin_user.user_id"
                                        class="col-span-12 flex   justify-start">
                                        <div class="col-span-12 text-white bg-blue-500 p-3 border rounded-md  ">
                                            {{ comment.text_body }}
                                        </div>
                                    </div>
                                    <div v-else class="col-span-12 flex  justify-end">
                                        <div class="col-span-12 text-white bg-gray-700 p-3 border rounded-md">
                                            {{ comment.text_body }}
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
    name: "ModTicket",

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
            loaded: false,
            get_ticket: null,
            interval: null,
            get_ticket_data: [],
            userlist: [],
            userprofile: null,
            admin_user: null,
            user: null,
            author_uuid: null,
            all_tickets: [],
            SendMsgForm: {
                msginfo: "",
            },
        };
    },
    mounted () {
        this.userstatus();
        this.get_current_ticket();
        this.get_current_ticket_messages();
        this.interval = setInterval(() => {
            this.get_current_ticket_messages();
        }, 50000);
    },

    created () {

    },
    destroyed () {
        clearInterval(this.interval)
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
                    if (response.data.success) {
                        if (response.data.user.user_admin < 2) {
                            this.$router.push({ name: "home" });
                        } else {
                            this.admin_user = response.data.user;
                        }
                    }
                });
        },
        getuser () {
            axios({
                method: "get",
                url: "/info/user-info/" + this.author_uuid,
                withCredentials: true,
                headers: authHeader(),
            }).then((response) => {
                if (response.data.success) {
                    this.user = response.data;
                    this.userprofile = response.data;
                    this.userprofile.profileimage = response.data.profileimage;
                    this.userprofile.display_name = response.data.display_name;
                    this.userprofile.member_since = response.data.member_since;
                    this.userprofile.bio = response.data.bio;
                    this.userprofile.admin_role = response.data.admin_role;
                    this.userprofile.vendor_name = response.data.vendor_name;
                    this.userprofile.customer_rating = response.data.customer_rating;
                    this.userprofile.profileimage_url_250 = response.data.profileimage_url_250;
                }
            })
        },
        get_current_ticket () {
            let url = this.$route.params.uuid
            axios({
                method: "get",
                url: "/mod/ticket/" + url,
                withCredentials: true,
                headers: authHeader(),
            })
                .then((response) => {
                    if (response.data.success) {
                        this.get_ticket = response.data;
                        this.author_uuid = response.data.author_uuid;
                    }
                    this.getuser();
                    this.loaded = true;

                });
        },
        get_current_ticket_messages () {
            let url = this.$route.params.uuid
    
            axios({
                method: "get",
                url: "/mod/ticket/messages/" + url,
                withCredentials: true,
            
                headers: authHeader(),
            })
                .then((response) => {
                    if (response.data.success) {
                        this.get_ticket_data = response.data;
                        this.loaded = true;

                    }
                });
          
        },
        close_current_ticket () {
            let url = this.$route.params.uuid
            axios({
                method: "put",
                url: "/mod/ticket/close/" + url,
                withCredentials: true,
                headers: authHeader(),
            })
                .then((response) => {
                    if (response.data.success) {
                        notify({
                            title: "Message",
                            text: "Successfully closed ticket",
                            type: "success",
                        });
                        this.get_current_ticket();
                    }
                })
        },
        sendMessage (payLoad: { textbody: string, ticketid: any }) {
            axios({
                method: "post",
                url: "/mod/create/ticket/comment",
                data: payLoad,
                withCredentials: true,
                headers: authHeader(),
            })
                .then((response) => {
                    if (response.data.success) {
                        this.get_current_ticket_messages();
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
        onSubmit () {
            let payLoad = { textbody: this.SendMsgForm.msginfo, ticketid: this.$route.params.uuid };
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
