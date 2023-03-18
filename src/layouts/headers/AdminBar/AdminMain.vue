<template>
    <div class="text-center mt-1 flex justify-center">
        <router-link :to="{ name: 'ModTicket' }">
            <button
                class="bg-blue-600 hover:bg-zinc-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-2"
            >
                Tickets
            </button>
        </router-link>
        <div v-if="disputes">
            <router-link :to="{ name: 'ModTicket' }">
                <button
                    class="bg-orange-600 hover:bg-zinc-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-2"
                >
                    <span class="px-2">{{}}</span>
                    <span class>Tickets</span>
                </button>
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import authHeader from '../../../services/auth.header'

export default defineComponent({
    name: 'MainHeaderAdmin',

    data() {
        return {
            login: null,
            user: null,
            orders: '',
            disputes: '',
            feedback: '',
        }
    },

    mounted() {
        this.userstatus()
    },

    methods: {
        userstatus() {
            axios({
                method: 'get',
                url: '/auth/whoami',
                withCredentials: true,
                headers: authHeader(),
            }).then((response) => {
             if ((response.data.login == true)) {
                    let user = response.data.user

                    this.user = response.data.user

                    let user_auth_status = response.data.login
                    if (user.user_admin > 0 && user_auth_status == true) {
                        this.getvendorfeedback()
                        this.getvendordisputes()
                        this.getvendororders()
                    }
                }
            })
        },
        getvendorfeedback() {
            axios({
                method: 'get',
                url: '/vendor/new-feedback-count',
                withCredentials: true,
                headers: authHeader(),
            }).then((response) => {
                if (response.data) {
                    this.feedback = response.data.count
                }
            })
        },
        getvendordisputes() {
            axios({
                method: 'get',
                url: '/vendor/new-disputes-count',
                withCredentials: true,
                headers: authHeader(),
            }).then((response) => {
                if (response.data) {
                    this.disputes = response.data.count
                }
            })
        },
        getvendororders() {
            axios({
                method: 'get',
                url: '/vendor/new-orders-count',
                withCredentials: true,
                headers: authHeader(),
            }).then((response) => {
                if (response.data) {
                    this.orders = response.data.count
                }
            })
        },
    },
})
</script>
