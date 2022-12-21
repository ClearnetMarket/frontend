
<template>
  <div class="">
    <MainHeaderTop />
    <MainHeaderMid />
    <MainHeaderBottom />

    <div v-if="user">
      <MainHeaderVendor v-show="user.user_admin === 1" />
    </div>
a
    <div class="container max-w-7xl mx-auto px-10 wrapper">
      <div class="mt-5">
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

      <div class="grid grid-cols-1 rounded-md">
        <div class="text-[24px] text-center">Items for Sale</div>
        <div class="">
          <router-link :to="{ name: 'vendoraddress' }">
            <div class="text-blue-600 hover:text-blue-400 hover:underline">
              My Address
            </div>
          </router-link>
        </div>
        <div class="flex justify-end">
          <button
            v-on:click="createanitem()"
            class="py-2 px-4 shadow-md no-underline rounded-full text-white font-sans text-sm
             hover:text-white bg-green-600 hover:bg-zinc-400 focus:outline-none active:shadow-none mr-2"
          >
            Create Item
          </button>
        </div>
        <div class="mt-10 grid grid-cols-12 pb-20">
          <div v-for="item in items" class="col-span-12 bg-white">
            <div
              class="grid grid-cols-12 shadow-md border-2 border-gray-200 rounded-md p-5"
            >
              <div class="col-span-2">
                <img
                 :alt="item.image_one_server" class="w-48 h-48 overflow-hidden" :src="item.image_one_url"
                 
                />
              </div>
              <div class="col-span-8">
                <div class="grid grid-cols-12 grid-row-5">
                  <div class="col-span-12 text-center text-[18px] px-1">
                    <router-link
                      :to="{ name: 'MarketItem', params: { id: item.uuid } }"
                    >
                      <div
                        class="text-blue-600 hover:text-blue-400 hover:underline"
                      >
                        {{ item.item_title }}
                      </div>
                    </router-link>
                  </div>
                  <div class="flex col-span-12 text-[14px] p-1">
                    Online Status:
                    <div v-if="item.online === 0" class="text-red-500">
                      offline
                    </div>
                    <div v-else class="text-green-500">online</div>
                  </div>
                  <div class="col-span-12 text-[14px] p-1">
                    Total Sold: {{ item.total_sold }}
                  </div>
                  <div class="col-span-12 text-[14px] p-1">
                    Total Views: {{ item.view_count }}
                  </div>
                  <div class="col-span-12 text-[14px] p-1">
                    Item Quantity: {{ item.item_count }}
                  </div>
                </div>
              </div>
              <div class="col-span-2">
                <div class="mb-2">
                  <div  v-if="item.online === 0">
                    <button
                      @click.prevent="putonline(item.uuid)"
                      class="py-2 px-4 shadow-md no-underline rounded-full text-white font-sans text-sm hover:text-white bg-gray-700 hover:bg-zinc-400 focus:outline-none active:shadow-none mr-2"
                    >
                      Turn On
                    </button>
                  </div>
                  <div v-else>
                    <button
                      @click.prevent="putoffline(item.uuid)"
                      class="py-2 px-4 shadow-md no-underline rounded-full text-white font-sans text-sm hover:text-white bg-gray-700 hover:bg-zinc-400 focus:outline-none active:shadow-none mr-2"
                    >
                      Turn Off
                    </button>
                  </div>
                </div>

                <div class="mb-2">
                  <button
                    v-on:click="gotoitem(item.uuid)"
                    class="py-2 px-4 shadow-md no-underline rounded-full text-white font-sans text-sm hover:text-white bg-gray-700 hover:bg-zinc-400 focus:outline-none active:shadow-none mr-2"
                  >
                    Edit
                  </button>
                </div>
                <div class="mb-2">
                  <button
                    @click.prevent="cloneitem(item.uuid)"
                    class="py-2 px-4 shadow-md no-underline rounded-full text-white font-sans text-sm hover:text-white bg-gray-700 hover:bg-zinc-400 focus:outline-none active:shadow-none mr-2"
                  >
                    Clone
                  </button>
                </div>

                <div class="mb-2">
                  <button
                    @click.prevent="deleteitem(item.uuid)"
                    class="py-2 px-4 shadow-md no-underline rounded-full text-white font-sans text-sm hover:text-white bg-red-600 hover:bg-zinc-400 focus:outline-none active:shadow-none mr-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <MainFooter />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { ref } from "vue";
import { notify } from "@kyvg/vue3-notification";
import authHeader from "../../services/auth.header";
import MainHeaderTop from "../../layouts/headers/MainHeaderTop.vue";
import MainHeaderMid from "../../layouts/headers/MainHeaderMid.vue";
import MainHeaderBottom from "../../layouts/headers/MainHeaderBottom.vue";
import MainHeaderVendor from "../../layouts/headers/MainHeaderVendor.vue";
import MainFooter from "../../layouts/footers/FooterMain.vue";


/**
 *
 @typedef {Object} item.total_sold
 @typedef {Object} item.view_count
 @typedef {Object} t.category
 @typedef {Object} t.confirmations
 @typedef {Object} t.fee
 @typedef {Object} t.commentxmr
 @typedef {Object} t.txid
 @typedef {Object} user.user_admin
 @typedef {Object} user_admin

 *
 */

export default defineComponent({
  name: "forsale",
  components: {
    MainHeaderTop,
    MainHeaderMid,
    MainHeaderBottom,
    MainHeaderVendor,
    MainFooter,
  },

  mounted() {
    this.userstatus();
    this.getvendoritems();
  },
  data() {
    return {
      user: null,
      items: [],
      newitemid: null,
      accept: ref(false),
    };
  },

  methods: {
    gotoitem(itemid: any) {
      this.$router.push({ name: "edititem", params: { id: itemid } });
    },

     userstatus() {
       axios({
        method: "get",
        url: "/auth/whoami",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if (response.status == 200) {
          this.user = response.data.user
          if (response.data.user.user_admin == 0) {
            this.$router.push({ name: "home" });
          }
        }
      });
    },
    // gets the vendor items
     getvendoritems() {
       axios({
        method: "get",
        url: "/vendorcreate/itemsforsale",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if ((response.status = 200)) {
          this.items = response.data;
        }
      });
    },
    // creates an item
     createanitem() {
       axios({
        method: "post",
        url: "/vendorcreateitem/create-item",
        withCredentials: true,
        headers: authHeader(),
      })
     .then((response) => {
        if ((response.status = 200)) {
          this.newitemid = response.data.item_id;
          this.$router.push({
            name: "edititem",
            params: { id: this.newitemid },
          });
        }
      })
     .catch((error) => {
              
            notify({
              title: "Freeport Error",
              text: "Error posting information.",
              type: "error",
            });
          });
    },
    // clones an item
     cloneitem(itemid: any) {
       axios({
        method: "get",
        url: "/vendorcreate/clone-item/" + itemid,
        withCredentials: true,
        headers: authHeader(),
      })
     .then((response) => {
        if ((response.status = 200)) {
          this.getvendoritems();
          notify({
            title: "Message Center",
            text: "Item has been cloned",
            type: "success",
          });
        }
      })
     .catch((error) => {
      
        notify({
          title: "Freeport Error",
          text: "Error posting information.",
          type: "error",
        });
  });
    },
    // deletes an item
     deleteitem(itemid: any) {
       axios({
        method: "delete",
        url: "/vendorcreate/delete-item/" + itemid,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if ((response.status = 200)) {
          this.getvendoritems();
          notify({
            title: "Message Center",
            text: "Item has been deleted",
            type: "error",
          });
        }
      })
     .catch((error) => {
     
    notify({
      title: "Freeport Error",
      text: "Error posting information.",
      type: "error",
    });
  });
    },
    // put item online
     putonline(itemid: any) {
       axios({
        method: "get",
        url: "/vendororders/online/" + itemid,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if ((response.status = 200)) {
         
          this.getvendoritems();
          if(response.data.status == "success"){
              notify({
                title: "Item Online",
                text: "Item is online",
                type: "success",
              });
          }else{
            notify({
              title: "Item Online",
              text: response.data.status,
              type: "error",
            });
          }
         
        } 
      });
    },
    // put item offline
     putoffline(itemid: any) {
       axios({
        method: "get",
        url: "/vendororders/offline/" + itemid,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if ((response.status = 200)) {
          this.getvendoritems();
          notify({
            title: "Message Center",
            text: "Item is offline",
            type: "success",
          });
        }
      });
    },
  },
});
</script>
