
<template>
    <MainHeaderTop />
    <MainHeaderMid />
    <MainHeaderBottom />

    <div v-if="user">
        <MainHeaderVendor v-show="user.user_admin === 1" />
    </div>
<div class="wrapper">
    <!-- Top Stuff-->
    <div class="container selection:max-w-7xl mx-auto  px-10 bg-gray-300 text-white">
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
        <div class="grid grid-cols-1 rounded-md  max-w-3xl mx-auto bg-neutral">
            <div class="flex justify-center bg-neutral">
                <div v-if="visibledelete1">
                    <div class="block bg-cover bg-center">
                        <div class="flex flex-col">
                            <div class="font-bold text-center">Profile Image</div>
                            <div v-if="user.profileimage_url_250">
                                <img  class="w-48 h-48" :src="user.profileimage_url_250" />
                            </div>
                            <div v-else>
                                <div class="h-48 w-48 block bg-cover bg-center"
                                    v-bind:style="{ 'background-image': `url(${previewImage1})` }"
                                    @click="selectImage1">
                                </div>
                            </div>
                            <div v-if="user.profile_image">
                                <div class="flex justify-center">
                                    <button class="bg-red-600 mt-5 hover:bg-zinc-400 text-white font-bold py-2 px-4
                                         rounded focus:outline-none focus:shadow-outline" type="submit"
                                        @click="deleteitemimage1(user.profile_image)">
                                        Delete Image
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="visibleform1">
                    <form class="rounded-md px-8 pt-6 pb-8 mb-4 w-full" enctype="multipart/form-data" method="POST"
                        @submit.prevent="CreateItemImages">
                        <div class="font-bold text-center">Image One</div>
                        <div class="h-44 block bg-cover bg-center"
                            v-bind:style="{ 'background-image': `url(${previewImage1})` }" @click="selectImage1"></div>
                        <input class="" ref="fileInput1" type="file" @input="pickFile1" accept=".jpg,.jpeg,.png" />
                        <input type="hidden" ref="clicktoshow1" />
                    </form>
                </div>

            </div>
            <form class="rounded-md px-2 pt-2 pb-2 mb-4 w-full" enctype="multipart/form-data"
                @submit.prevent="onSubmit">
                <div class="text-[20px] mt-5 mb-5 font-bold ">User Info</div>
           
                    <label class="block text-white text-sm font-bold mb-2">Bio</label>
                    <div class="flex ">
                        <div class="flex-1">
                            <div class="flex-1">
                                <textarea v-model="ProfileForm.bio" id="item_description" class="shadow appearance-none border rounded w-full py-2 px-3
                                        text-white leading-tight focus:outline-none focus:shadow-outline">
                                </textarea>
                            </div>
                        </div>
                    </div>
             
                <div class="flex justify-center mt-20">
                    <button
                        class="bg-primary hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>

        <!-- END Top Stuff-->
        <div class="grid sm:grid-cols-1 md:grid-cols-3 gap-5 my-3"></div>
    </div>
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



export default defineComponent({
    name: "editprofile",
    components: {
        MainHeaderTop,
        MainHeaderMid,
        MainHeaderBottom,
        MainHeaderVendor,
        MainFooter,
    },

    data () {
        return {
            previewimageone: null,
            previewImage1: null,
            visibledelete1: false,
            visibleform1: false,
            image_1_in_db: false,
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
                bio: { minLength: minLength(6) },
            },
        };
    },


    mounted () {
        this.userstatus();
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
                  if ((response.data.login == true)) {
                        this.user = response.data.user;

                        if (this.user.profile_image === null) {
                            this.visibledelete1 = false;
                            this.visibleform1 = true;
                        }
                        else {
                            this.visibledelete1 = true;
                            this.visibleform1 = false;
                        }
                        this.getcurrentbio();
                    }
                })
                .catch(() => { this.user = null });
        },
        getcurrentbio () {
            axios({
                method: "get",
                url: "/auth/userbio",
                withCredentials: true,
                headers: authHeader(),
            }).then((response) => {
                if ((response.data.success)) {
                    this.ProfileForm.bio = response.data.bio;

                }

            });
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

        adduserprofile (payLoad: { bio: string; }) {
            axios({
                method: "put",
                url: "/auth/change-profile",
                data: payLoad,
                withCredentials: true,
                headers: authHeader(),
            })
                .then((response) => {
                    if ((response.data.success)) {
                        this.$router.push({ name: "userprofile", params: { uuid: this.user.user_id }, });
                    }
                });
        },

        pickFile1 () {
            let input = this.$refs.fileInput1 as HTMLInputElement;
            let file = input.files;

            if (file && file[0]) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    this.previewImage1 = e.target.result;
                };
                reader.readAsDataURL(file[0]);
                this.$emit("input", file[0]);
                let clicker = this.$refs.clicktoshow1 as HTMLInputElement;
                clicker.click();

                this.CreateItemImages()
            }
        },
        CreateItemImages () {

            let formData = new FormData();

            if (this.$refs.fileInput1 !== null) {
                const fileInput1 = this.$refs.fileInput1 as HTMLInputElement
                if (fileInput1?.files && fileInput1.files[0]) {
                    formData.append('image_main', fileInput1.files[0])
                    this.visibledelete1 = true;
                    this.visibleform1 = false;
                }
            }
            let path = "/auth/create-profile-image/" + this.user.user_id;

            axios({
                method: "POST",
                url: path,
                data: formData,
                withCredentials: true,
                headers: authHeader(),
            })
                .then((response) => {

                    if (response.data.status == "success") {
                        // if any images uploaded success
                        notify({
                            title: "Upload",
                            text: "Success",
                            type: "success",
                        });
                        this.getimage1();
                        this.getimageurl1();
                    }
                })
                .catch((error) => {
                    if (error.response) { }
                });
        },

        selectImage1 () {
            let clickit1 = this.$refs.fileInput1 as HTMLInputElement;
            clickit1.click();
        },
        deleteitemimage1 (imagename: any) {
            let path = "/auth/delete-profile/" + this.user.user_id + "/" + imagename;
            axios({
                method: "delete",
                url: path,
                withCredentials: true,
                headers: authHeader(),
            })
                .then((response) => {

                    if (response.data.success) {
                        // if any images uploaded success
                        notify({
                            title: "Image Deletion",
                            text: "Success",
                            type: "success",
                        });
                        this.visibledelete1 = false;
                        this.user.profileimage = null;
                        this.user.profileimage_url_250 = null;
                        this.visibleform1 = true;
                        this.previewImage1 = null;
                    }
                })
                .catch((error) => {
                    if (error.response) { }
                }).finally()
                ;
        },
        getimage1 () {
            let path = "/auth/query/profileimage/server/" + this.user.user_id;
            axios({
                method: "get",
                url: path,
                withCredentials: true,
                headers: authHeader(),
            })
                .then((response) => {

                    if (response.data.success) {
                        // if any images uploaded success
                        this.user.profileimage = null;
                        this.user.profileimage_url_250 = null;
                        this.user.profileimage = response.data.status;
                    }
                })
                .catch((error) => {
                    if (error.response) { }
                }).finally()
                ;
        },
        getimageurl1 () {
            let path = "/auth/query/profileimage/url/" + this.user.user_id;
            axios({
                method: "get",
                url: path,
                withCredentials: true,
                headers: authHeader(),
            })
                .then((response) => {

                    if (response.data.success) {
                        // if any images uploaded success
                        this.user.image_one_url_250 = response.data.status;
                    }
                })
                .catch((error) => {
                    if (error.response) { }
                }).finally()
                ;
        },
    },
});
</script>


