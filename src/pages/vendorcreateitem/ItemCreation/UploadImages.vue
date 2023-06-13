<template>
  
  <div v-if="marketitem">
    <div class="text-[18px] mt-5 mb-5">Images</div>
    <div v-if="got_items_for_sale">
    <div class="rounded-md border border-1 ">
      <div class="grid sm:grid-cols-1 md:grid-cols-2  gap-5 ">
        <div class="flex justify-center">
          <div v-if="visibledelete1">
            <div class="block bg-cover bg-center">
              <div class="flex flex-col">
                <div class="font-bold text-center">Image One</div>
                <div v-if="marketitem.image_one_url_250">
                  <img alt="" class="w-48 h-48" :src="marketitem.image_one_url_250" />
                </div>
                <div v-else>
                  <div class="h-48 w-48 block bg-cover bg-center" v-bind:style="{ 'background-image': `url(${previewImage1})` }"
                    @click="selectImage1"></div>
                </div>
                <div v-if="marketitem.image_one_server">
                  <button
                    class="bg-red-600 mt-5 hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit" @click="deleteitemimage1(marketitem.image_one_server)">
                    Delete Image
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div v-if="visibleform1">
            <form class="rounded-md px-8 pt-6 pb-8 mb-4 w-full" enctype="multipart/form-data" method="POST"
              @submit.prevent="CreateItemImages">
              <div class="font-bold text-center">Image One</div>
              <div class="h-44 block bg-cover bg-center" v-bind:style="{ 'background-image': `url(${previewImage1})` }"
                @click="selectImage1"></div>
              <input class="" ref="fileInput1" type="file" @input="pickFile1" accept=".jpg,.jpeg,.png" />
              <input type="hidden" ref="clicktoshow1" />
            </form>
          </div>
        </div>
        <div class="flex justify-center">
          <div v-if="visibledelete2">
            <div class="block bg-cover bg-center">
              <div class="flex flex-col">
                <div class="font-bold text-center">Image Two</div>
                <div v-if="marketitem.image_two_url_250">
                  <img alt="" class="w-48 h-48" :src="marketitem.image_two_url_250" /></div>
                <div v-else>
                <div class="h-48 w-48 block bg-cover bg-center" v-bind:style="{ 'background-image': `url(${previewImage2})` }"
                    @click="selectImage2"></div>
                </div>
                <div v-if="marketitem.image_two_server">
                  <button
                    class="bg-red-600 mt-5 hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit" @click="deleteitemimage2(marketitem.image_two_server)">
                    Delete Image
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div v-if="visibleform2">
            <form class="rounded-md px-8 pt-6 pb-8 mb-4 w-full" enctype="multipart/form-data" method="POST"
              @submit.prevent="CreateItemImages">
              <div class="font-bold text-center">Image Two</div>
              <div class="h-44 block bg-cover bg-center" v-bind:style="{ 'background-image': `url(${previewImage2})` }"
                @click="selectImage2"></div>
              <input class="" ref="fileInput2" type="file" @input="pickFile2" accept=".jpg,.jpeg,.png" />
              <input type="hidden" ref="clicktoshow2" />
            </form>
          </div>
        </div>
        <div class="flex justify-center">
          <div v-if="visibledelete3">
            <div class="block bg-cover bg-center">
              <div class="flex flex-col">
                <div class="font-bold text-center">Image Three</div>
                <div v-if="marketitem.image_three_url_250">
                  <img alt="" class="w-48 h-48" :src="marketitem.image_three_url_250" />
                </div>
                <div v-else>
                  <div class="h-48 w-48 block bg-cover bg-center" v-bind:style="{ 'background-image': `url(${previewImage3})` }"
                    @click="selectImage3"></div>
                </div>
                <div v-if="marketitem.image_three_server">
                  <button
                    class="bg-red-600 mt-5 hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit" @click="deleteitemimage3(marketitem.image_three_server)">
                    Delete Image 
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div v-if="visibleform3">
            <form class="rounded-md px-8 pt-6 pb-8 mb-4 w-full" enctype="multipart/form-data" method="POST"
              @submit.prevent="CreateItemImages">
              <div class="font-bold text-center">Image Three</div>
              <div class="h-44 block bg-cover bg-center" v-bind:style="{ 'background-image': `url(${previewImage3})` }"
                @click="selectImage3"></div>
              <input class="" ref="fileInput3" type="file" @input="pickFile3" accept=".jpg,.jpeg,.png" />
              <input type="hidden" ref="clicktoshow3" />
            </form>
          </div>
        </div>
        <div class="flex justify-center">
          <div v-if="visibledelete4">
            <div class="block bg-cover bg-center">
              <div class="flex flex-col">
                <div class="font-bold text-center">Image Four</div>
                <div v-if="marketitem.image_four_url_250">
                  <img alt="" class="w-48 h-48" :src="marketitem.image_four_url_250" />
                </div>
                <div v-else>
                  <div class="h-48 w-48 block bg-cover bg-center" v-bind:style="{ 'background-image': `url(${previewImage4})` }"
                    @click="selectImage4"></div>
                </div>
                <div v-if="marketitem.image_four_server">
                  <button
                    class="bg-red-600 mt-5 hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit" @click="deleteitemimage4(marketitem.image_four_server)">
                    Delete Image
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div v-if="visibleform4">
            <form class="rounded-md px-8 pt-6 pb-8 mb-4 w-full" enctype="multipart/form-data" method="POST"
              @submit.prevent="CreateItemImages">
              <div class="font-bold text-center">Image Four</div>
              <div class="h-44 block bg-cover bg-center" v-bind:style="{ 'background-image': `url(${previewImage4})` }"
                @click="selectImage4"></div>
              <input class="" ref="fileInput4" type="file" @input="pickFile4" accept=".jpg,.jpeg,.png" />
              <input type="hidden" ref="clicktoshow4" />
            </form>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import authHeader from "../../../services/auth.header";
import { notify } from "@kyvg/vue3-notification";



export default defineComponent({
  name: "UploadImages",
  props: {
    item_id: String,

  },
  created () {
    this.getItemForSale();
  },


  data () {
    return {
      got_items_for_sale: false,
      previewimageone: null,
      previewImage1: null,
      previewImage2: null,
      previewImage3: null,
      previewImage4: null,
      marketitem: null,
      file: null,
      input: null,
      visibledelete1: false,
      visibleform1: false,
      visibledelete2: false,
      visibleform2: false,
      visibledelete3: false,
      visibleform3: false,
      visibledelete4: false,
      visibleform4: false,
      image_1_in_db: false,
      image_2_in_db: false,
      image_3_in_db: false,
      image_4_in_db: false,
    };
  },

  methods: {

    // Get the item thats being modified
    getItemForSale () {

      let path = "/item/" + this.item_id;
      axios({
        method: "get",
        url: path,
        withCredentials: true,
      })
        .then((response) => {
            this.marketitem = response.data;
            this.image_1_in_db = this.marketitem.image_one_server == null;

            if (this.image_1_in_db == false) {
              this.visibledelete1 = true;
              this.visibleform1 = false;
            }
            else {
              this.visibledelete1 = false;
              this.visibleform1 = true;
            }

            this.image_2_in_db = this.marketitem.image_two_server == null;

            if (this.image_2_in_db == false) {
              this.visibledelete2 = true;
              this.visibleform2 = false;
            }
            else {
              this.visibledelete2 = false;
              this.visibleform2 = true;
            }

            this.image_3_in_db = this.marketitem.image_three_server == null;
            if (this.image_3_in_db == false) {
              this.visibledelete3 = true;
              this.visibleform3 = false;
            }
            else {
              this.visibledelete3 = false;
              this.visibleform3 = true;
            }

            this.image_4_in_db = this.marketitem.image_four_server == null;
            if (this.image_4_in_db == false) {
              this.visibledelete4 = true;
              this.visibleform4 = false;
            }
            else {
              this.visibledelete4 = false;
              this.visibleform4 = true;
          }
        })
         this.got_items_for_sale = true
        
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
      if (this.$refs.fileInput2 !== null) {
        const fileInput2 = this.$refs.fileInput2 as HTMLInputElement
        if (fileInput2?.files && fileInput2.files[0]) {
          formData.append('image_two', fileInput2.files[0])
          this.visibledelete2 = true;
          this.visibleform2 = false;
        }
      }
      if (this.$refs.fileInput3 !== null) {
        const fileInput3 = this.$refs.fileInput3 as HTMLInputElement
        if (fileInput3?.files && fileInput3.files[0]) {
          formData.append('image_three', fileInput3.files[0])
          this.visibledelete3 = true;
          this.visibleform3 = false;
        }

      }
      if (this.$refs.fileInput4 !== null) {
        const fileInput4 = this.$refs.fileInput4 as HTMLInputElement
        if (fileInput4?.files && fileInput4.files[0]) {
          formData.append('image_four', fileInput4.files[0])
          this.visibledelete4 = true;
          this.visibleform4 = false;
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
          if (response.data.status) {
            // if any images uploaded success
            notify({
              title: "Upload",
              text: "Success",
              type: "success",
            });
            this.getimage1();
            this.getimageurl1();
            this.getimage2();
            this.getimageurl2();
            this.getimage3();
            this.getimageurl3();
            this.getimage4();
            this.getimageurl4();
          }
        })
        .catch((error) => {
          if (error.response) {

          }
        });
    },

    selectImage1 () {
      let clickit1 = this.$refs.fileInput1 as HTMLInputElement;
      clickit1.click();
    },
    selectImage2 () {
      let clickit2 = this.$refs.fileInput2 as HTMLInputElement;
      clickit2.click();
    },
    selectImage3 () {
      let clickit3 = this.$refs.fileInput3 as HTMLInputElement;
      clickit3.click();
    },
    selectImage4 () {
      let clickit4 = this.$refs.fileInput4 as HTMLInputElement;
      clickit4.click();
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
    pickFile2 () {
      let input = this.$refs.fileInput2 as HTMLInputElement;
      let file = input.files;

      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage2 = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
        let clicker = this.$refs.clicktoshow2 as HTMLInputElement;
        clicker.click();
  
       
        this.CreateItemImages()
       
      }
    },
    pickFile3 () {
      let input = this.$refs.fileInput3 as HTMLInputElement;
      let file = input.files;

      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
     
          this.previewImage3 = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
        let clicker = this.$refs.clicktoshow3 as HTMLInputElement;
        clicker.click();
    
        this.CreateItemImages()
      }
    },
    pickFile4 () {
      let input = this.$refs.fileInput4 as HTMLInputElement;
      let file = input.files;

      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage4 = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
        let clicker = this.$refs.clicktoshow4 as HTMLInputElement;
        clicker.click();
        this.CreateItemImages()

      }
    },

    deleteitemimage1 (imagename: any) {
      let path = "/vendorcreateitem/delete-image/" + this.item_id + "/" + imagename;
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
            this.marketitem.image_one_server = null;
            this.marketitem.image_one_url_250 = null;
            this.marketitem.image_one_url_500 = null;
            this.visibleform1 = true;
            this.previewImage1 = null;
          }
        })
        .catch((error) => {
          if (error.response) {}
        }).finally()
        ;
    },


    deleteitemimage2 (imagename: any) {
      let path = "/vendorcreateitem/delete-image/" + this.item_id + "/" + imagename;
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
            this.visibledelete2 = false;
            this.marketitem.image_two_server = null;
            this.marketitem.image_two_url_250 = null;
            this.marketitem.image_two_url_500 = null;
            this.visibleform2 = true;
            this.previewImage2 = null;

          }
        })
        .catch((error) => {
          if (error.response) {}
        }).finally()
        ;
    },

    deleteitemimage3 (imagename: any) {
      let path = "/vendorcreateitem/delete-image/" + this.item_id + "/" + imagename;
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
            this.visibledelete3 = false;
            this.marketitem.image_three_server = null;
            this.marketitem.image_three_url_250 = null;
            this.marketitem.image_three_url_500 = null;
            this.visibleform3 = true;
            this.previewImage3 = null;
        
          }
        })
        .catch((error) => {
          if (error.response) {


          }
        }).finally()
        ;
    },

    deleteitemimage4 (imagename: any) {
      let path = "/vendorcreateitem/delete-image/" + this.item_id + "/" + imagename;
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
            this.visibledelete4 = false;
            this.marketitem.image_four_server = null;
            this.marketitem.image_four_url_250 = null;
            this.marketitem.image_four_url_500 = null;
            this.visibleform4 = true;
            this.previewImage4 = null;

          }
        })
        .catch((error) => {
          if (error.response) {}
        }).finally()
        ;
    },
    getimage1 () {
      let path = "/vendorcreateitem/query/image/main/" + this.item_id;
      axios({
        method: "get",
        url: path,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {

          if (response.data.success) {
            // if any images uploaded success
            this.marketitem.image_one_server = null;
            this.marketitem.image_one_server = response.data.status;
          }
        })
        .catch((error) => {
          if (error.response) { }
        }).finally()
        ;
    },
    getimage2 () {
      let path = "/vendorcreateitem/query/image/two/" + this.item_id;
      axios({
        method: "get",
        url: path,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {

          if (response.data.success) {
            // if any images uploaded success
            this.marketitem.image_two_server = null;
            this.marketitem.image_two_server = response.data.status;
          }
        })
        .catch((error) => {
          if (error.response) { }
        }).finally();
    },
    getimage3 () {
      let path = "/vendorcreateitem/query/image/three/" + this.item_id;
      axios({
        method: "get",
        url: path,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {

          if (response.data.success) {
            // if any images uploaded success
            this.marketitem.image_three_server = null;
            this.marketitem.image_three_server = response.data.status;
          }
        })
        .catch((error) => {
          if (error.response) { }
        }).finally();
    },
    getimage4 () {
      let path = "/vendorcreateitem/query/image/four/" + this.item_id;
      axios({
        method: "get",
        url: path,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if (response.data.success) {
            // if any images uploaded success
            this.marketitem.image_four_server = null;
            this.marketitem.image_four_server = response.data.status;
          }
        })
        .catch((error) => {
          if (error.response) { }
        }).finally();
    },



    getimageurl1 () {
      let path = "/vendorcreateitem/query/image/main/url/" + this.item_id;
      axios({
        method: "get",
        url: path,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {

          if (response.data.success) {
            // if any images uploaded success
            this.marketitem.image_one_url_250 = null;
            this.marketitem.image_one_url_250 = response.data.status;
           
          }
        })
        .catch((error) => {
          if (error.response) { }
        }).finally()
        ;
    },
    getimageurl2 () {
      let path = "/vendorcreateitem/query/image/two/url/" + this.item_id;
      axios({
        method: "get",
        url: path,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {

          if (response.data.success) {
            // if any images uploaded success
            this.marketitem.image_two_url_250 = null;
            this.marketitem.image_two_url_250 = response.data.status;
          }
        })
        .catch((error) => {
          if (error.response) { }
        }).finally();
    },
    getimageurl3 () {
      let path = "/vendorcreateitem/query/image/three/url/" + this.item_id;
      axios({
        method: "get",
        url: path,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {

          if (response.data.success) {
            // if any images uploaded success
            this.marketitem.image_three_url_250 = null;
            this.marketitem.image_three_url_250 = response.data.status;
          }
        })
        .catch((error) => {
          if (error.response) { }
        }).finally();
    },
    getimageurl4 () {
      let path = "/vendorcreateitem/query/image/four/url/" + this.item_id;
      axios({
        method: "get",
        url: path,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if (response.data.success) {
            // if any images uploaded success
            this.marketitem.image_four_url_250 = null;
            this.marketitem.image_four_url_250 = response.data.status;
          }
        })
        .catch((error) => {
          if (error.response) { }
        }).finally();
    },
  },

});
</script>
<style scoped>

</style>

