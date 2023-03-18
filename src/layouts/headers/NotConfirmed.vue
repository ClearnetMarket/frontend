<template>
    <div v-if="loaded === true">
        <div v-if="user.confirmed === 0">
            <div class="bg-yellow-400 py-1 text-gray-800 font-bold">
                <div
                    class="container flex flex-col max-w-7xl mx-auto text-bold text-center justify-center align-center"
                >
                    <div class="">
                        You are currently unconfirmed. If you forget your password, pin, or account gets stolen your
                        crypto is gone!
                    </div>

                    <div class="text-blue-700 hover:text-blue-600">
                        <router-link :to="{ name: 'accountseed' }">Confirm Account </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import authHeader from '../../services/auth.header'
import axios from 'axios'
export default defineComponent({
    name: 'Confirmed',

    data() {
        return {
            loaded: false,
            user: null,
            btcprice: null,
            xmrprice: null,
            bchprice: null,
            confirmed: false,
        }
    },
    created() {
        this.userstatus()
        this.userstatusconfirmed()
    },
    methods: {
        userstatus() {
            axios({
                method: 'get',
                url: '/auth/whoami',
                withCredentials: true,
                headers: authHeader(),
            })
                .then((response) => {
                    if ((response.data.login == true)) {
                        this.user = response.data.user
                        this.user.confirmed = response.data.user.confirmed
                        this.loaded = true
                    }
                })
                .catch(() => {
                    this.user = null
                })
        },
        userstatusconfirmed() {
            axios({
                method: 'get',
                url: '/auth/amiconfirmed',
                withCredentials: true,
                headers: authHeader(),
            })
                .then((response) => {
                    if (response.data.success) {
                        if (response.data.confirmed == true) {
                            this.confirmed = true
                        } else if (response.data.confirmed == false) {
                            this.confirmed = false
                        }
                    }
                })
                .catch(() => {})
        },
    },
})
</script>
