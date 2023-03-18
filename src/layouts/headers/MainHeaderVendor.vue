<template>
    <div class="text-center mt-1 flex justify-center">
        <router-link :to="{ name: 'forsale' }">
            <button
                class="bg-blue-600 hover:bg-zinc-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-2"
            >
                Items
            </button>
        </router-link>
        <div v-if="disputes">
            <router-link :to="{ name: 'vendorordersdispute' }">
                <button
                    class="bg-orange-600 hover:bg-zinc-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-2"
                >
                    <span class="px-2">{{ disputes }}</span>
                    <span class>Disputes</span>
                </button>
            </router-link>
        </div>
        <div v-else>
            <router-link :to="{ name: 'vendorordersdispute' }">
                <button
                    class="bg-blue-600 hover:bg-zinc-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-2"
                >
                    Disputes
                </button>
            </router-link>
        </div>
        <div v-if="user">
            <div v-if="feedback" class="q-mt-none">
                <router-link :to="{ name: 'vendorfeedback', params: { uuid: user.user_id } }">
                    <button
                        class="bg-orange-600 hover:bg-zinc-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-2"
                    >
                        <span class="px-2">{{ feedback }}</span>
                        <span class>Feedback</span>
                    </button>
                </router-link>
            </div>
            <div v-else>
                <router-link :to="{ name: 'vendorfeedback', params: { uuid: user.user_id } }">
                    <button
                        class="bg-blue-600 hover:bg-zinc-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-2"
                    >
                        Feedback
                    </button>
                </router-link>
            </div>
        </div>
        <div v-if="orders">
            <router-link :to="{ name: 'vendorordersnew' }">
                <button
                    class="bg-orange-600 hover:bg-zinc-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-2"
                >
                    <span class="px-2">{{ orders }}</span>
                    <span class>Orders</span>
                </button>
            </router-link>
        </div>
        <div v-else>
            <router-link :to="{ name: 'vendorordersnew' }">
                <button
                    class="bg-blue-600 hover:bg-zinc-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-2"
                >
                    Orders
                </button>
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import authHeader from '../../services/auth.header'

export default defineComponent({
    name: 'MainHeaderVendor',

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
                } else {
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
