
<template>
    <MainHeaderTop />
    <MainHeaderMid />
    <MainHeaderBottom />

    <div v-if="user">
        <MainHeaderVendor v-show="user.user_admin === 1" />
    </div>

    <!-- Top Stuff-->
    <div class="container h-screen max-w-7xl mx-auto mb-40 px-10 bg-gray-100">
        <!-- Container-->
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
                    <li>
                        <router-link :to="{ name: 'account' }">
                            <a class="text-blue-600 hover:text-blue-700">Account</a>
                        </router-link>
                    </li>
                    <li>
                        <span class="text-gray-500 mx-2">/</span>
                    </li>
                </ol>
            </nav>
        </div>

        <form class="bg-white  rounded-md px-8 pt-6 pb-8 mb-4 w-full mx-auto max-w-2xl" @submit.prevent="onSubmit">
            <div class="grid grid-cols-12 gap-4">
                <div class="col-span-12 mb-4 text-center text-[28px] text-zinc-600">
                    Profile Bio
                </div>
                <label class="col-span-12 text-gray-700 text-sm font-bold mb-2" for="">Country</label>
                <input class="" v-model="ProfileForm.bio">
              
                <div class="col-span-4 col-start-5 mt-5 mb-5">
                    <button
                        class="bg-yellow-500 rounded-md font-semibold hover:bg-yellow-600 py-3 text-sm text-black uppercase w-full">
                        Set Default Address
                    </button>
                </div>
            </div>
        </form>
        <!-- END Top Stuff-->
        <div class="grid sm:grid-cols-1 md:grid-cols-3 gap-5 my-3"></div>
    </div>

    <!-- END container-->
    <MainFooter />
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
import { notify } from "@kyvg/vue3-notification";
import useValidate from "@vuelidate/core";
import { minLength } from "@vuelidate/validators";
import MainHeaderTop from "../../../layouts/headers/MainHeaderTop.vue";
import MainHeaderMid from "../../../layouts/headers/MainHeaderMid.vue";
import MainHeaderBottom from "../../../layouts/headers/MainHeaderBottom.vue";
import MainHeaderVendor from "../../../layouts/headers/MainHeaderVendor.vue";
import MainFooter from "../../../layouts/footers/FooterMain.vue";
import authHeader from "../../../services/auth.header";

/**
 *
 @typedef {Object} user.user_admin

 *
 */

export default defineComponent({
    name: "defaultaddress",
    components: {
        MainHeaderTop,
        MainHeaderMid,
        MainHeaderBottom,
        MainHeaderVendor,
        MainFooter,
    },

    data () {
        return {
            countryList: [],
            user: null,
            v$: useValidate(),
            ProfileForm: {

                bio: "",
             
            },
        };
    },
    validations () {
        return {
            ProfileForm: {
                bio: {  minLength: minLength(6) },

            },
        };
    },


    mounted () {

        this.getcurrentprofile();
    },

    methods: {
        userstatus () {
            axios({
                method: "get",
                url: "/auth/whoami",
                withCredentials: true,
                headers: authHeader(),
            })
                .then((response) => {
                    if ((response.status = 200)) {
                        this.user = response.data.user
                    }
                })
                .catch(() => { this.user = null });
        },
        getuserinfo () {
            axios({
                method: "get",
                url: "/info/user-info/" + this.user.uuid,
                withCredentials: true,
                headers: authHeader(),
            }).then((response) => {
                if ((response.status = 200)) {
                    this.user = response.data;

                   

                }
            })
        },
        onSubmit () {
            const payLoad = {
                bio: this.ProfileForm.bio,
            };
            if (this.v$.$invalid) {
                notify({
                    title: "Freeport",
                    text: "Form Failure",
                    type: "error",
                });
            } else {
                notify({
                    title: "Freeport",
                    text: "Form success",
                    type: "success",
                });
                this.adduserprofile(payLoad);
            }
        },
        adduserprofile (payLoad: {
            bio: string;
        }) {
            axios({
                method: "put",
                url: "/auth/change-profile",
                data: payLoad,
                withCredentials: true,
                headers: authHeader(),
            })
                .then((response) => {
                    if ((response.status = 200)) {
                        notify({
                            title: "Freeport",
                            text: "Success",
                            type: "success",
                        });
                       
                    }
                });
        },
        getcurrentprofile () {
            axios({
                method: "get",
                url: "/info/getdefaultaddress",
                withCredentials: true,
                headers: authHeader(),
            }).then((response) => {
                if ((response.status = 200)) {
                    this.ProfileForm.bio = response.data.bio;
                  
                }
            });
        },


      
    },
});
</script>


