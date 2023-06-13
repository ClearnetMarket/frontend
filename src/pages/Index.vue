<template>
    <MainHeaderTop />
    <MainHeaderMid />
    <MainHeaderBottom />
    <div v-if="user">
        <Confirmed />
        <Newticketmsg />
    </div>

    <div v-if="user">
        <MainHeaderVendor v-show="user.user_admin === 1" />
    </div>
    <div class="wrapper">
        <div class="container max-w-7xl mx-auto mb-0 bg-text-white text-white overflow-hidden">
            <TodayFeatured />
            <AllItems />
        </div>
    </div>
    <MainFooter />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import authHeader from '../services/auth.header'
import MainHeaderTop from '../layouts/headers/MainHeaderTop.vue'
import MainHeaderMid from '../layouts/headers/MainHeaderMid.vue'
import MainHeaderBottom from '../layouts/headers/MainHeaderBottom.vue'
import MainHeaderVendor from '../layouts/headers/MainHeaderVendor.vue'
import Newticketmsg from '../layouts/headers/Ticketmsg.vue'
import Confirmed from '../layouts/headers/NotConfirmed.vue'
import MainFooter from '../layouts/footers/FooterMain.vue'
import TodayFeatured from '../components/item_slides/today_featured.vue'
import AllItems from '../components/item_slides/all_items.vue'

export default defineComponent({
    name: 'Home',

    components: {
        MainHeaderTop,
        MainHeaderMid,
        MainHeaderBottom,
        MainHeaderVendor,
        Newticketmsg,
        MainFooter,
        Confirmed,
        TodayFeatured,
        AllItems,
    },

    data () {
        return {
            token: null,
            user: null,
        }
    },

    created () {
        this.userstatus()
    },
    methods: {
        userstatus () {
            axios({
                method: 'get',
                url: '/auth/whoami',
                withCredentials: true,
                headers: authHeader(),
            })
                .then((response) => {
                    if (response.data.login == true) {
                        this.user = response.data.user
                        this.user.confirmed = response.data.user.confirmed
                    }
                })
                .catch(() => {
                    this.user = null
                })
        },
    },
})
</script>

<style type="ts" scoped>
.opensans {
    font-family: 'Open Sans', sans-serif;
}
</style>
