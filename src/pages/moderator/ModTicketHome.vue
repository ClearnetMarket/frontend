
<template>
    <MainHeaderTop />
    <MainHeaderMid />
    <MainHeaderBottom />
    <div class="wrapper">
        <div class="max-w-4xl mx-auto wrapper px-10">
            <div class="grid grid-cols-1 w-full gap-4">

                <nav class="rounded-md">
                    <ol class="list-reset flex">
                        <li>
                            <router-link :to="{ name: 'home' }">
                                <a class="text-primary hover:text-primary ">Home</a>
                            </router-link>
                        </li>
                        <li>
                            <span class="text-white mx-2">/</span>
                        </li>
                        <li>
                            <router-link :to="{ name: 'ModHome' }">
                                <a class="text-primary hover:text-primary ">Mod Home</a>
                            </router-link>
                        </li>
                        <li>
                            <span class="text-white mx-2">/</span>
                        </li>
                    </ol>
                </nav>

            </div>
            <div class="text-center text-[20px] mb-5">Mod Tickets Home</div>
            <div class="grid grid-cols-12 gap-5">
                <div class="col-span-12 sm:col-span-4 ">
                    <div class="bg-neutral rounded-md p-3">
                        <div class="text-[20px] font-bold ">Admin Navigation</div>
                        <router-link :to="{ name: 'ModHome' }">
                            <div class="hover:underline text-primary hover:text-primary my-5">Mod Home</div>
                        </router-link>
                        <router-link :to="{ name: 'ModTicketsHome' }">
                            <div class="hover:underline text-primary hover:text-primary my-5">Tickets</div>
                        </router-link>
                        <router-link :to="{ name: 'ModDisputeHome' }">
                            <div class="hover:underline text-primary hover:text-primary my-5">Disputes</div>
                        </router-link>
                    </div>
                </div>


                <div class="col-span-12 sm:col-span-8  rounded-md p-5">
                    <div class="grid grid-cols-12 gap-5">
                        <div class="col-span-12 sm:col-span-12 ">
                            <div v-if="all_tickets.length > 0">
                                <div v-for="ticket in all_tickets" :key="ticket.id">
                                    <div
                                        class="grid grid-cols-12 border-b-2 border-gray-400  bg-neutral mb-5 p-5 rounded-md">
                                        <router-link class="col-span-12"
                                            :to="{ name: 'ModTicket', params: { uuid: ticket.uuid } }">
                                            <div
                                                class="col-span-12  text-primary hover:underline hover:text-blue-500 text-[16px] overflow-hidden">
                                                {{ ticket.subject }}
                                            </div>
                                        </router-link>
                                        <div class="col-span-12 flex gap-5">
                                            <div class="">
                                                User:
                                            </div>
                                            <div class="">
                                                {{ ticket.author }}
                                            </div>
                                        </div>
                                        <div class="col-span-12 flex gap-5 ">
                                            <div class="">
                                                Created:
                                            </div>
                                            <div class="">
                                                {{ relativeDate(ticket.timestamp) }} ago
                                            </div>
                                        </div>
                                        <div class="col-span-12 flex gap-5">
                                            <div class="">
                                                Status:
                                            </div>
                                            <div class="">
                                                <div class="text-red-600 font-bold" v-if="ticket.status == 0">Closed</div>
                                                <div class="text-green-600 font-bold" v-if="ticket.status == 1">Open</div>
                                                <div class="text-orange-600 font-bold" v-if="ticket.status == 2">New Message
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                No Previous Tickets
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
import { formatDistance } from "date-fns";

export default defineComponent({
    name: "ModTicketHome",

    components: {
        MainHeaderTop,
        MainHeaderMid,
        MainHeaderBottom,
        MainHeaderVendor,
        MainFooter,
    },

    data () {
        return {
            interval: null,
            other_user: null,
            userlist: [],
            user: null,
            all_tickets: [],
            stats_count: 0,
            stats_open: 0,
            stats_completed: 0,
        };
    },
    created () {
        this.userstatus();
    },
    mounted () {
        this.get_all_tickets();
        this.interval = setInterval(() => {
            this.get_all_tickets();
        }, 30000);
    },
    beforeDestroy () {
        clearInterval(this.interval)
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
                    if ((response.data.login == true)) {
                        this.user = response.data.user;
                        if (this.user.user_admin !== 10) {

                        }
                    }
                })
                .catch(() => {
                    this.user = null;
                });
        },
        get_all_tickets () {
            axios({
                method: "get",
                url: "/mod/getalltickets",
                withCredentials: true,
                headers: authHeader(),
            })
                .then((response) => {
                    if (response.data.success) {
                        this.all_tickets = response.data;
                    }
                    else { }
                });
        },
        get_ticket_stats () {
            axios({
                method: "get",
                url: "/mod/getalltickets",
                withCredentials: true,
                headers: authHeader(),
            })
                .then((response) => {
                    if (response.data.success) {
                        this.stats_count = response.data.count;
                        this.stats_open = response.data.open;
                        this.stats_completed = response.data.completed;
                    }
                    else { }
                });
        },


    },
});
</script>

