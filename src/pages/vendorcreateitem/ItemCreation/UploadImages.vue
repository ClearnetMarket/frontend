
<template>
  <form
    class="rounded-md px-8 pt-6 pb-8 mb-4 w-full"
    enctype="multipart/form-data"
    method="POST"
    @submit.prevent="CreateItemImages"
  >
    <div class="text-[18px] mt-5 mb-5">Images</div>

    <div class="rounded-md border border-1">
      <div class="grid sm:grid-cols-1 md:grid-cols-2 pb-20 gap-5 p-3">
        <div class="flex justify-center">
          <div v-if="marketitem.image_one_server">
            <div class="block bg-cover bg-center">
              <div class="flex flex-col">
                <div class="font-bold text-center">Main Image</div>
                <img alt="" class="w-48 h-48" src="https://picsum.photos/50/50" />
                <button
                  class="bg-red-600 mt-5 hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  @click="deleteitemimage(marketitem.image_one_server)"
                >
                  Delete Image
                </button>
              </div>
            </div>
          </div>
          <div v-else>
            <div
              class="h-44 block bg-cover bg-center"
              v-bind:style="{ 'background-image': `url(${previewImage1})` }"
              @click="selectImage1"
            ></div>
            <input class="" ref="fileInput1" type="file" @input="pickFile1" />
          </div>
        </div>

        <div class="flex justify-center">
          <div v-if="marketitem.image_two_server">
            <div class="block bg-cover bg-center">
              <div class="flex flex-col">
                <div class="font-bold text-center">Image Two</div>
                <img alt="" class="w-48 h-48" src="https://picsum.photos/50/50" />
                <button
                  class="bg-red-600 mt-5 hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  @click="deleteitemimage(marketitem.image_two_server)"
                >
                  Delete Image
                </button>
              </div>
            </div>
          </div>
          <div v-else>
            <div
              class="h-44 block bg-cover bg-center"
              v-bind:style="{ 'background-image': `url(${previewImage2})` }"
              @click="selectImage2"
            ></div>
            <input class="" ref="fileInput2" type="file" @input="pickFile2" />
          </div>
        </div>

        <div class="flex justify-center">
          <div v-if="marketitem.image_three_server">
            <div class="block bg-cover bg-center">
              <div class="flex flex-col">
                <div class="font-bold text-center">Image Three</div>
                <img alt="" class="w-48 h-48" src="https://picsum.photos/50/50" />
              </div>
              <div class="flex flex-col">
                <button
                  class="bg-red-600 mt-5 hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  @click="deleteitemimage(marketitem.image_three_server)"
                >
                  Delete Image
                </button>
              </div>
            </div>
          </div>
          <div v-else>
            <div
              class="h-44 block bg-cover bg-center"
              v-bind:style="{ 'background-image': `url(${previewImage3})` }"
              @click="selectImage3"
            ></div>
            <input class="" ref="fileInput3" type="file" @input="pickFile3" />
          </div>
        </div>

        <div class="flex justify-center">
          <div v-if="marketitem.image_four_server">
            <div class="block bg-cover bg-center">
              <div class="flex flex-col">
                <div class="font-bold text-center">Image Four</div>
                <img alt="" class="w-48 h-48" src="https://picsum.photos/50/50" />
              </div>
              <div class="flex flex-col">
                <button
                  class="bg-red-600 mt-5 hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  @click="deleteitemimage(marketitem.image_four_server)"
                >
                  Delete Image
                </button>
              </div>
            </div>
          </div>
          <div v-else>
            <div
              class="h-44 block bg-cover bg-center"
              v-bind:style="{ 'background-image': `url(${previewImage4})` }"
              @click="selectImage4"
            ></div>
            <input class="" ref="fileInput4" type="file" @input="pickFile4" />
          </div>
        </div>
      </div>
      <div class="flex justify-center pb-10">
        <input type="hidden" ref="clicktoshow" />
        <button
          class="bg-green-600 mt-5 hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Upload Images
        </button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

import authHeader from "../../../services/auth.header";
import { mapGetters } from "vuex";

/**
 *
 @typedef {Object} marketitem.image_one_server
 @typedef {Object} marketitem.image_two_server
 @typedef {Object} marketitem.image_three_server
 @typedef {Object} marketitem.image_four_server
 *
 */

export default defineComponent({
  name: "UploadImages",
  props: {
    item_id: Number,
    image_main: String,
    image_two: String,
    image_three: String,
    image_four: String,
  },
  mounted() {
    this.userstatus();
  },
  data() {
    return {
      previewimageone: null,
      previewImage1: null,
      previewImage2: null,
      previewImage3: null,
      previewImage4: null,
      marketitem: [],
    };
  },
  computed: {
    ...mapGetters(["user"]),
    showImage() {
      this.$refs.clicktoshow.click();
    },
  },
  methods: {
    //user Auth
     userstatus() {

      return axios({
        method: "get",
        url: "/auth/whoami",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if ((response.status = 200)) {
          this.getItemForSale();
        }
      });
    },
    // Get the item thats being modified
     getItemForSale() {
      const path = "/item/" + this.item_id;
      return axios({
        method: "get",
        url: path,
        withCredentials: true,
      })
        .then((response) => {
          if (response.status === 200) {
            this.marketitem = response.data;

          }
        })
        .catch(() => {});
    },

     CreateItemImages() {
      let formData = new FormData();
      if (this.$refs.fileInput1 !== null){
        formData.append("image_main", this.$refs.fileInput1.files[0]);
      }
      if (this.$refs.fileInput2 !== null){
        formData.append("image_two", this.$refs.fileInput2.files[0]);
      }
      if (this.$refs.fileInput3 !== null){
        formData.append("image_three", this.$refs.fileInput3.files[0]);
      }
      if (this.$refs.fileInput4 !== null){
        formData.append("image_four", this.$refs.fileInput4.files[0]);
      }
    
      let path = "/vendorcreateitem/create-item-images/" + this.item_id;
      return axios({
        method: "POST",
        url: path,
        data: formData,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if (response.data.status == "success") {
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 401) {
              this.$store.commit("loginFailure");
            } else if (error.response.status === 403) {
            }
          }
        });
    },

    selectImage1() {
      this.$refs.fileInput1.click();
    },
    selectImage2() {
      this.$refs.fileInput2.click();
    },
    selectImage3() {
      this.$refs.fileInput3.click();
    },
    selectImage4() {
      this.$refs.fileInput4.click();
    },
    pickFile1() {
      let input = this.$refs.fileInput1;
      let file = input.files;

      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage1 = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);

        this.$refs.clicktoshow.click();
      }
    },
    pickFile2() {
      let input = this.$refs.fileInput2;
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage2 = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
      }
    },
    pickFile3() {
      let input = this.$refs.fileInput3;
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage3 = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
      }
    },
    pickFile4() {
      let input = this.$refs.fileInput4;
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage4 = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
      }
    },

     deleteitemimage(imagename) {
      let path =
        "/vendorcreateitem/delete-image/" + this.item_id + "/" + imagename;
      return axios({
        method: "delete",
        url: path,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if ((response.status = 200)) {
        } else {
        }
      });
    },
   /* onUploaded(info) {
      let files = info.files;
      files.forEach((item) => {});
    },*/
   /* onFailed(info) {
      let err = JSON.parse(info.xhr.response);
   
      let files = info.files;
      files.forEach((item) => {});
    },*/
   /*onRejected(rejectedEntries)
    {
    },*/
  },
});
</script>
