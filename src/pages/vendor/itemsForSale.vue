
<template>

    <MainHeaderTop />
    <MainHeaderMid />
    <MainHeaderBottom />

    <div v-if="user">
      <MainHeaderVendor v-show="user.user_admin === 1" />
    </div>
  
    <div class="container max-w-4xl mx-auto px-10 wrapper pb-72 bg-gray-100">
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

        </div>
        <div class="flex justify-end">
          <button v-on:click="createanitem()"
            class="bg-blue-600 hover:bg-zinc-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-2">
            Create Item
          </button>
        </div>

        <div class="mt-10 grid grid-cols-12 pb-20 gap-4">

          <div v-for="item in items" class="col-span-12  p-5">
            <div class="bg-white rounded-md ">
            <div class="grid grid-cols-12 grid-row-5 ">
             
              <div class="col-span-9 p-2">
                <div class="w-full font-bold">Item uuid</div>
                <div class="w-full">{{item.uuid}}</div>
              </div>
             
            </div>
            <div class="grid grid-cols-12 rounded-md p-2">
            
              <div class="col-span-2">
                  <div @click="$router.replace({ name: 'MarketItem', params: { id: item.uuid } })" style="cursor: pointer" class="">
                <img alt="../../assets/noimage.jpg" class=" " :src="item.image_one_url_250" />
              </div>
            </div>
              <div class="col-span-8 px-3">
              
                <div class="grid grid-cols-12 grid-row-5">
                  <div class="col-span-12 text-center text-[18px] px-1">
                    <router-link :to="{ name: 'MarketItem', params: { id: item.uuid } }">
                      <div class="text-blue-600 hover:text-blue-400 hover:underline">
                        {{ item.item_title }}
                      </div>
                    </router-link>
                  </div>
               
                  <div class="flex gap-4 col-span-12 text-[14px] p-1">
                    <div class="font-bold">
                    Online Status:
                    </div>
                    <div v-if="item.online === 0" 
                      class="text-red-500">
                        <div class="">
                      offline
                      </div>
                    </div>
                    <div v-else 
                    class="text-green-500">
                    <div class="">
                      
                    online
                    </div>
                  </div>
                  </div>
                  <div class="col-span-12 text-[14px] p-1 flex gap-4">
                    <div class="font-bold">Total Sold:</div>
                    <div class="">{{ item.total_sold }}</div>
                    
                  </div>
                  <div class="col-span-12 text-[14px] p-1 flex gap-4">
                    <div class="font-bold">Total Views:</div>
                    <div class="">{{ item.view_count }}</div> 
                  </div>
                  <div class="col-span-12 text-[14px] p-1 flex gap-4">
                    <div class="font-bold">Item Quantity:</div> 
                    <div class="">{{ item.item_count }}</div>
                    
                  </div>
                  <div class="col-span-12 text-[14px] p-1 flex gap-4">
                    <div class="font-bold">Item Price:</div>
                    <div class="">{{ item.price }}{{ returncurrencysymbol(item.currency) }}</div>
                  </div>
            
              </div>
              </div>

              <div class="col-span-2 px-3">

                <div class="mb-2">
                  <div v-if="item.online === 0">
                    <button @click.prevent="putonline(item.uuid)"
                      class="bg-zinc-600 hover:bg-zinc-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-2 w-full">
                      Turn On
                    </button>
                  </div>
                  <div v-else>
                    <button @click.prevent="putoffline(item.uuid)"
                      class="bg-zinc-600 hover:bg-zinc-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-2 w-full">
                      Turn Off
                    </button>
                  </div>
                </div>

                <div class="mb-2">
                  <button v-on:click="gotoitem(item.uuid)"
                    class="bg-zinc-600 hover:bg-zinc-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-2 w-full">
                    Edit
                  </button>
                </div>
                <div class="mb-2">
                  <button @click.prevent="cloneitem(item.uuid)"
                 class="bg-zinc-600 hover:bg-zinc-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-2 w-full">
                    Clone
                  </button>
                </div>

                <div class="mb-2">
                  <button @click.prevent="deleteitem(item.uuid)"
                     class="bg-red-600 hover:bg-zinc-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-2 w-full">
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

  mounted () {
    this.userstatus();
    this.getvendoritems();
  },
  data () {
    return {
      user: null,
      loaded_user:false,
      items: [],
      newitemid: null,
      accept: ref(false),
    };
  },

  methods: {
 
    gotoitem (itemid: any) {
      this.$router.push({ name: "edititem", params: { id: itemid } });
    },

    userstatus () {
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
          this.loaded_user = true;
        }
      });
    },
    // gets the vendor items
    getvendoritems () {
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
    createanitem () {
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
    cloneitem (itemid: any) {
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
    deleteitem (itemid: any) {
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
    putonline (itemid: any) {
      axios({
        method: "get",
        url: "/vendororders/online/" + itemid,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        if ((response.status = 200)) {

          this.getvendoritems();
          if (response.data.status == "success") {
            notify({
              title: "Item:  " + itemid,
              text: "Item is online",
              type: "success",
            });
          } else {
            notify({
              title: "Item:  " + itemid,
              text: response.data.status,
              type: "error",
            });
          }

        }
      });
    },
    // put item offline
    putoffline (itemid: any) {
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
    returncurrencysymbol (currencydigit: number) {
      if (currencydigit === 0) {
        return "$";
      } else if (currencydigit === 1) {
        return "₱";
      } else if (currencydigit === 2) {
        return "CHF";
      } else if (currencydigit === 3) {
        return "SAD";
      } else if (currencydigit === 4) {
        return "B/.";
      } else if (currencydigit === 5) {
        return "₽";
      } else if (currencydigit === 6) {
        return "kr";
      } else if (currencydigit === 7) {
        return "kr";
      } else if (currencydigit === 8) {
        return "kr";
      } else if (currencydigit === 9) {
        return "₪";
      } else if (currencydigit === 10) {
        return "kr";
      } else if (currencydigit === 11) {
        return "฿";
      } else if (currencydigit === 12) {
        return "R$";
      } else if (currencydigit === 13) {
        return "₹";
      } else if (currencydigit === 14) {
        return "R";
      } else if (currencydigit === 14) {
        return "$";
      } else if (currencydigit === 16) {
        return "¥";
      } else if (currencydigit === 17) {
        return "Ft";
      } else if (currencydigit === 18) {
        return "$";
      } else if (currencydigit === 19) {
        return "¥";
      } else if (currencydigit === 20) {
        return "$";
      } else if (currencydigit === 21) {
        return "zł";
      } else if (currencydigit === 22) {
        return "£";
      } else if (currencydigit === 23) {
        return "₺";
      } else if (currencydigit === 24) {
        return "₩";
      } else if (currencydigit === 25) {
        return "Rp";
      } else if (currencydigit === 26) {
        return "$";
      } else if (currencydigit === 27) {
        return "RM";
      } else if (currencydigit === 28) {
        return "лв";
      } else if (currencydigit === 29) {
        return "€";
      } else if (currencydigit === 31) {
        return "kn";
      } else if (currencydigit === 30) {
        return "Kč";
      }
    },
    returncurrency (currencydigit: number) {
      if (currencydigit === 0) {
        return "USD";
      } else if (currencydigit === 1) {
        return "PHP";
      } else if (currencydigit === 2) {
        return "CHF";
      } else if (currencydigit === 3) {
        return "SAD";
      } else if (currencydigit === 4) {
        return "SGD";
      } else if (currencydigit === 5) {
        return "RUB";
      } else if (currencydigit === 6) {
        return "DKK";
      } else if (currencydigit === 7) {
        return "RON";
      } else if (currencydigit === 8) {
        return "NOK";
      } else if (currencydigit === 9) {
        return "ILS";
      } else if (currencydigit === 10) {
        return "SEK";
      } else if (currencydigit === 11) {
        return "THB";
      } else if (currencydigit === 12) {
        return "BRL";
      } else if (currencydigit === 13) {
        return "INR";
      } else if (currencydigit === 14) {
        return "ZAR";
      } else if (currencydigit === 14) {
        return "HKD";
      } else if (currencydigit === 16) {
        return "JPY";
      } else if (currencydigit === 17) {
        return "HUF";
      } else if (currencydigit === 18) {
        return "MXN";
      } else if (currencydigit === 19) {
        return "CNY";
      } else if (currencydigit === 20) {
        return "AUD";
      } else if (currencydigit === 21) {
        return "PLN";
      } else if (currencydigit === 22) {
        return "GBP";
      } else if (currencydigit === 23) {
        return "TRY";
      } else if (currencydigit === 24) {
        return "KRW";
      } else if (currencydigit === 25) {
        return "IDR";
      } else if (currencydigit === 26) {
        return "NZD";
      } else if (currencydigit === 27) {
        return "MYR";
      } else if (currencydigit === 28) {
        return "BGN";
      } else if (currencydigit === 29) {
        return "EUR";
      } else if (currencydigit === 31) {
        return "HRK";
      } else if (currencydigit === 30) {
        return "CZK";
      }
    },

  },
});
</script>
