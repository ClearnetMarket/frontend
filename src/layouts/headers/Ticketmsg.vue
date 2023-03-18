<template>
    <div v-if="loaded === true">
        <div v-if="newticket !== 0">
            <div class="bg-yellow-400 py-1 text-gray-800 font-bold">
                <div
                    class="container flex flex-col max-w-7xl mx-auto text-bold text-center justify-center align-center"
                >
                    You currently have a new message on a ticket
                </div>
                <div class="text-blue-700 hover:text-blue-600">
                    <router-link :to="{ name: 'supportticket' }"> View it here </router-link>
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
    name: 'Newticketmsg',

    data() {
        return {
            loaded: false,
            user: null,
            newticket: 0,
        }
    },
    created() {
        this.userstatus()
        this.checkfornewticket()
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
        checkfornewticket() {
            axios({
                method: 'get',
                url: '/customer-service/newticket',
                withCredentials: true,
                headers: authHeader(),
            })
                .then((response) => {
                    if (response.data.success) {
                        this.newticket = response.data.count
                    }
                })
                .catch(() => {
                    this.newticket = 0
                })
        },
    },
})
</script>
