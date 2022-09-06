<template>
  <div v-if="marketitem">

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

              <form
                  class="rounded-md px-8 pt-6 pb-8 mb-4 w-full"
                  enctype="multipart/form-data"
                  method="POST"
                  @submit.prevent="CreateItemImages"
              >
              <div
                  class="h-44 block bg-cover bg-center"
                  v-bind:style="{ 'background-image': `url(${previewImage1})` }"
                  @click="selectImage1"
              ></div>
              <input class="" ref="fileInput1" type="file" @input="pickFile1"  accept=".jpg,.jpeg,.png"/>
                <input type="hidden" ref="clicktoshow" />
                <button
                    class="bg-green-600 mt-5 hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                  Upload
                </button>
              </form>


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
              <form
                  class="rounded-md px-8 pt-6 pb-8 mb-4 w-full"
                  enctype="multipart/form-data"
                  method="POST"
                  @submit.prevent="CreateItemImages"
              >
              <div
                  class="h-44 block bg-cover bg-center"
                  v-bind:style="{ 'background-image': `url(${previewImage2})` }"
                  @click="selectImage2"
              ></div>
              <input class="" ref="fileInput2" type="file" @input="pickFile2"  accept=".jpg,.jpeg,.png"/>
                <button
                    class="bg-green-600 mt-5 hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                  Upload
                </button>
              </form>
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
              <form
                  class="rounded-md px-8 pt-6 pb-8 mb-4 w-full"
                  enctype="multipart/form-data"
                  method="POST"
                  @submit.prevent="CreateItemImages"
              >
              <div
                  class="h-44 block bg-cover bg-center"
                  v-bind:style="{ 'background-image': `url(${previewImage3})` }"
                  @click="selectImage3"
              ></div>
              <input class="" ref="fileInput3" type="file" @input="pickFile3"  accept=".jpg,.jpeg,.png"/>
                <button
                    class="bg-green-600 mt-5 hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                  Upload
                </button>
              </form>
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
              <form
                  class="rounded-md px-8 pt-6 pb-8 mb-4 w-full"
                  enctype="multipart/form-data"
                  method="POST"
                  @submit.prevent="CreateItemImages"
              >
              <div
                  class="h-44 block bg-cover bg-center"
                  v-bind:style="{ 'background-image': `url(${previewImage4})` }"
                  @click="selectImage4"
              ></div>
              <input class="" ref="fileInput4" type="file" @input="pickFile4"  accept=".jpg,.jpeg,.png"/>
                <button
                    class="bg-green-600 mt-5 hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                  Upload
                </button>
              </form>
            </div>
          </div>
        </div>
        <div class="flex justify-center pb-10">

        </div>
      </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import authHeader from "../../../services/auth.header";
import {notify} from "@kyvg/vue3-notification";

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
    item_id: String ,

  },
  created() {

    this.getItemForSale();
  },

  data() {
    return {
      previewimageone: null,
      previewImage1: null,
      previewImage2: null,
      previewImage3: null,
      previewImage4: null,
      marketitem: null,
      file: null,
      input: null
    };
  },

  methods: {

    // Get the item thats being modified
    getItemForSale() {

      let path = "/item/" + this.item_id;
      axios({
        method: "get",
        url: path,
        withCredentials: true,
      })
          .then((response) => {
            if (response.status === 200) {
              this.marketitem = response.data;
            }
          })
    },
    CreateItemImages() {

      let formData = new FormData();

      if (this.$refs.fileInput1 !== null){
        const fileInput1 = this.$refs.fileInput1 as HTMLInputElement
        if (fileInput1?.files && fileInput1.files[0]){
          formData.append('image_main', fileInput1.files[0])
        }
      }
      if (this.$refs.fileInput2 !== null){
        const fileInput2 = this.$refs.fileInput2 as HTMLInputElement
        if (fileInput2?.files && fileInput2.files[0]){
          formData.append('image_two', fileInput2.files[0])
        }
      }
      if (this.$refs.fileInput3 !== null){
        const fileInput3 = this.$refs.fileInput3 as HTMLInputElement
        if (fileInput3?.files && fileInput3.files[0]){
          formData.append('image_three', fileInput3.files[0])
        }
      }
      if (this.$refs.fileInput4 !== null){
        const fileInput4 = this.$refs.fileInput4 as HTMLInputElement
        if (fileInput4?.files && fileInput4.files[0]){
          formData.append('image_four', fileInput4.files[0])

        }
      }

      let path = "/vendorcreateitem/create-item-images/" + this.item_id;
      axios({
        method: "POST",
        url: path,
        data: formData,
        withCredentials: true,
        headers: authHeader(),
      })
          .then((response) => {
            console.log(response.data)

            if (response.data.status == "success") {
              // if any images uploaded success
              notify({
                title: "Upload",
                text: "Success",
                type: "success",
              });
            }
          })
          .catch((error) => {
            if (error.response) {
              if (error.response.status === 401) {

              } else if (error.response.status === 403) {
              }
            }
          });
    },

    selectImage1() {
      let clickit1 =  this.$refs.fileInput1 as HTMLInputElement;
      clickit1.click();
    },
    selectImage2() {
      let clickit2 =  this.$refs.fileInput2 as HTMLInputElement;
      clickit2.click();
    },
    selectImage3() {
      let clickit3 =  this.$refs.fileInput3 as HTMLInputElement;
      clickit3.click();
    },
    selectImage4() {
      let clickit4 =  this.$refs.fileInput4 as HTMLInputElement;
      clickit4.click();
    },
    pickFile1() {
      let input = this.$refs.fileInput1 as HTMLInputElement;
      let file = input.files;

      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage1 = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
        let clicker = this.$refs.clicktoshow as HTMLInputElement;
        clicker.click();
      }
    },
    pickFile2() {
      let input = this.$refs.fileInput2 as HTMLInputElement;
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
      const input = this.$refs.fileInput3 as HTMLInputElement;

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
      const input = this.$refs.fileInput4 as HTMLInputElement;
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

    deleteitemimage(imagename: any) {
      let path =
          "/vendorcreateitem/delete-image/" + this.item_id + "/" + imagename;
      axios({
        method: "delete",
        url: path,
        withCredentials: true,
        headers: authHeader(),
      })
          .then((response) => {
            console.log(response.data)

            if (response.data.status == "success") {
              // if any images uploaded success
              notify({
                title: "Image Deletion",
                text: "Success",
                type: "success",
              });
            }
          })
          .catch((error) => {
            if (error.response) {
            console.log(error.response.data.error)

            }
          });
    },
  },

});
</script>
