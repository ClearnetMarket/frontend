
<template>
  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />
  <div class="wrapper">
    
    <div class="container max-w-4xl mx-auto wrapper px-10 text-neutral">
      <div class="grid grid-cols-1 w-full gap-4">
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

      <div class="text-center text-[20px] mb-5">Mod Home</div>
      <div class="grid grid-cols-12 gap-5">
        <div class="col-span-12 sm:col-span-4 ">
          <div class="bg-white rounded-md p-3">
            <div class="text-[20px] font-bold ">Admin Navigation</div>
            <router-link :to="{ name: 'ModHome' }">
              <div class="hover:underline text-blue-600 hover:text-blue-700 my-5">Mod Home</div>
            </router-link>
            <router-link :to="{ name: 'ModTicketsHome' }">
              <div class="hover:underline text-blue-600 hover:text-blue-700 my-5">Tickets</div>
            </router-link>
            <router-link :to="{ name: 'ModDisputeHome' }">
              <div class="hover:underline text-blue-600 hover:text-blue-700 my-5">Disputes</div>
            </router-link>
          </div>
        </div>

        <div class="col-span-12 sm:col-span-8 ">
          <div class="grid grid-cols-12 ">
            <div class="col-span-12">
              <div class="text-[18px] mb-3">
                Ticket Stats
              </div>
              <div class="grid grid-cols-12 border-b-2 border-gray-400 mb-5 ">
                <div class="col-span-12 ">Total Tickets: {{ stats_ticket_count }}</div>
                <div class="col-span-12 ">Open Tickets: {{ stats_ticket_open }}</div>
                <div class="col-span-12 ">Completed Tickets: {{ stats_ticket_completed }}</div>
              </div>
            </div>
            <div class="col-span-12 sm:col-span-8">
              <div class="text-[18px] mb-3">
                Dispute Stats
              </div>
              <div class="grid grid-cols-12 border-b-2 border-gray-400 mb-5 ">
                <div class="col-span-12 ">Total Disputes: {{ stats_dispute_count }}</div>
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
  name: "ModHome",

  components: {
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainHeaderVendor,
    MainFooter,
  },

  data () {
    return {
      needmodorders: [],
      hadmodorders: [],
      stats_ticket_count: 0,
      stats_ticket_open: 0,
      stats_ticket_completed: 0,

      stats_dispute_count: 0,

    };
  },

  mounted () {
    this.userstatus();
    this.getdisputesneedmod();
    this.getdisputeshasmod();
    this.get_ticket_stats();
    this.get_dispute_stats();
  },

  methods: {
    // get user status
    userstatus () {
      axios({
        method: "get",
        url: "/auth/whoami",
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
       if ((response.data.login == true)) {
            if (response.data.user.user_admin < 2) {
              this.$router.push({ name: "home" });
            }
          }
        });
    },
    // date conversion
    relativeDate (value: any) {
      let e = new Date(value).valueOf();
      return formatDistance(e, new Date());
    },
    // become the moderator of the order
    becomemod (uuid: string) {
      axios({
        method: "get",
        url: "/mod/takeonmod/" + uuid,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if (response.data.success) {
            this.getdisputesneedmod();
            this.getdisputeshasmod();
          }
        });
    },
    // get the disputes that need mods
    getdisputesneedmod () {
      axios({
        method: "get",
        url: "/mod/disputes/available",
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if (response.data.success) {
            this.needmodorders = response.data;
          }
        });
    },
    // get disputes that already has mods
    getdisputeshasmod () {
      axios({
        method: "get",
        url: "/mod/disputes/modded",
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if (response.data.success) {
            this.hadmodorders = response.data;
          }
        });
    },
    get_ticket_stats () {
      axios({
        method: "get",
        url: "/mod/tickets/stats",
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if ((response.data.success)) {
            this.stats_ticket_count = response.data.count;
            this.stats_ticket_open = response.data.open;
            this.stats_ticket_completed = response.data.completed;
          }
          else { }
        });
    },
    get_dispute_stats () {
      axios({
        method: "get",
        url: "/mod/dispute/stats",
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if ((response.data.success)) {
            this.stats_dispute_count = response.data.count;
          }
          else { }
        });
    },
  },
});
</script>
