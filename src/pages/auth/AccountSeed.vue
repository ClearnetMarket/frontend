<template>
    <HeaderPlain />
    <div class="wrapperplain">
        <div class="container max-w-3xl b mx-auto text-white">
            <div class="mt-5 mb-5">
                <nav class="rounded-md w-full">
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

            <div class="flex justify-center mx-auto bg-red-200">
                <div class="max-w-3xl bg-neutral rounded-md">
                    <div class="text-center">
                        In order to unlock your account, change password, or recover your account in the future you will
                        need this account key. We dont do emails or other methods to recover your account.

                        <div class="text-[24px] mb-5">You should write these words down.</div>
                    </div>
                    <div class="md:flex md:justify-center text-center">
                        <div
                            class="inline-block bg-primary rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 text-[17px]"
                        >
                            {{ seedform.word1 }}
                        </div>
                        <span v-if="v$.seedform.word1.$error" class="text-red-600 text-center">
                            {{ v$.seedform.word1.$errors[0].$message }}
                        </span>
                        <div
                            class="inline-block bg-primary rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 text-[17px]"
                        >
                            {{ seedform.word2 }}
                        </div>
                        <span v-if="v$.seedform.word2.$error" class="text-red-600 text-center">
                            {{ v$.seedform.word2.$errors[0].$message }}
                        </span>
                        <div
                            class="inline-block bg-primary rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 text-[17px]"
                        >
                            {{ seedform.word3 }}
                        </div>
                        <span v-if="v$.seedform.word3.$error" class="text-red-600 text-center">
                            {{ v$.seedform.word3.$errors[0].$message }}
                        </span>
                        <div
                            class="inline-block bg-primary rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 text-[17px]"
                        >
                            {{ seedform.word4 }}
                        </div>
                        <span v-if="v$.seedform.word4.$error" class="text-red-600 text-center">
                            {{ v$.seedform.word4.$errors[0].$message }}
                        </span>
                        <div
                            class="inline-block bg-primary rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 text-[17px]"
                        >
                            {{ seedform.word5 }}
                        </div>
                        <span v-if="v$.seedform.word5.$error" class="text-red-600 text-center">
                            {{ v$.seedform.word5.$errors[0].$message }}
                        </span>
                        <div
                            class="inline-block bg-primary rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 text-[17px]"
                        >
                            {{ seedform.word6 }}
                        </div>
                        <span v-if="v$.seedform.word6.$error" class="text-red-600 text-center">
                            {{ v$.seedform.word6.$errors[0].$message }}
                        </span>
                    </div>
                    <div class="flex justify-center my-10 gap-5 px-5">
                        <router-link :to="{ name: 'accountseedconfirm' }">
                            <button
                                class="bg-primary hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-blue-300 focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Confirm Account
                            </button>
                        </router-link>
                        <div class="pt-3">OR</div>
                        <router-link :to="{ name: 'home' }">
                            <button
                                class="bg-primary hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-blue-300 focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Proceed to Freeport
                            </button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import { notify } from '@kyvg/vue3-notification'
import authHeader from '../../services/auth.header'
import HeaderPlain from '../../layouts/headers/HeaderPlain.vue'
import { minLength, required } from '@vuelidate/validators'
import useValidate from '@vuelidate/core'

export default defineComponent({
    name: 'Accountseed',
    components: {
        HeaderPlain,
    },

    data() {
        return {
            v$: useValidate(),

            user: null,
               seedform: {
                 word1: null,
                 word2: null,
                 word3: null,
                 word4: null,
                 word5: null,
                 word6: null,
               }
        }
    },

    mounted() {
        this.userstatus()
        this.userstatusconfirmed()
        this.sendwordrequest()
    },
    validations() {
        return {
            seedform: {
                word1: { required, minLength: minLength(2) },
                word2: { required, minLength: minLength(2) },
                word3: { required, minLength: minLength(2) },
                word4: { required, minLength: minLength(2) },
                word5: { required, minLength: minLength(2) },
                word6: { required, minLength: minLength(2) },
            },
        }
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
                    }
                })
                .catch(() => {})
        },

        userstatusconfirmed() {
            axios({
                method: 'get',
                url: '/auth/amiconfirmed',
                withCredentials: true,
                headers: authHeader(),
            }).then((response) => {
                if (response.data.success) {
                    if (response.data.confirmed == true) {
                        this.$router.push({ name: 'home' })
                    }
                }
            })
        },
        sendwordrequest() {
            axios({
                method: 'get',
                url: '/auth/account-seed',
                withCredentials: true,
                headers: authHeader(),
            })
                .then((response) => {
                    if (response.data.success) {
                        this.seedform.word1 = response.data.word1
                        this.seedform.word2 = response.data.word2
                        this.seedform.word3 = response.data.word3
                        this.seedform.word4 = response.data.word4
                        this.seedform.word5 = response.data.word5
                        this.seedform.word6 = response.data.word6
                    }
                })
                .catch(() => {
                    notify({
                        title: 'Authorization',
                        text: 'Invalid Credentials.',
                        type: 'error',
                    })
                })
        },
    },
})
</script>

<style scoped></style>
