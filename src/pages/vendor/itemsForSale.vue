
<template>
  <MainHeaderTop />
  <MainHeaderMid />
  <MainHeaderBottom />

  <div v-if="user">
    <MainHeaderVendor v-show="user.user_admin === 1" />
  </div>

  <div class="wrapper">

    <div class="container max-w-4xl mx-auto px-2  pb-72 text-white">
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

      <div class="grid grid-cols-1 rounded-md ">
        <div class="text-[24px] text-center">Items for Sale</div>

        <div class="flex justify-center mt-5 md:mt-0 md:justify-end">
          <button v-on:click="createanitem()"
            class="bg-primary hover:bg-zinc-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-2">
            Create Item
          </button>
        </div>

        <div class="mt-5 grid grid-cols-12 gap-4 ">

          <div v-for="(item, index)  in items" :key="index" class="col-span-12">
            <div class="bg-neutral rounded-md ">
              <div class="grid grid-cols-12 grid-row-5 text-white ">
                <div class="col-span-12 p-2">
                  <div class="w-full font-bold">Item uuid</div>
                  <div class="w-full">{{ item.uuid }}</div>
                </div>

              </div>
              <div class="grid grid-cols-12 rounded-md p-2">

                <div class="col-span-12 md:col-span-3 pb-5">
                  <div class="flex justify-center">
                    <div @click="$router.replace({ name: 'MarketItem', params: { id: item.uuid } })"
                      style="cursor: pointer" class="">
                      <div v-if="item.image_one_url_250">
                        <img alt="" class="object-fill" :src="item.image_one_url_250" />
                      </div>
                      <div v-else>
                        <img alt="" src="../../assets/noimage.jpg " />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-span-12 md:col-span-6 px-3">
                  <div class="grid grid-cols-12 grid-row-5 text-white ">
                    <div class="col-span-12 text-[18px] px-1 ">
                      <router-link :to="{ name: 'MarketItem', params: { id: item.uuid } }">
                        <div class="text-center  text-blue-600 hover:text-blue-400 hover:underline">
                          {{ item.item_title }}
                        </div>
                      </router-link>
                    </div>
                    <div class="flex gap-4 col-span-12 text-[14px] p-1">
                      <div class="font-bold">
                        Status:
                      </div>
                      <div v-if="item.online === 0" class="text-red-500">
                        <div class="">
                          offline
                        </div>
                      </div>
                      <div v-else class="text-green-500">
                        <div class="">
                          online
                        </div>
                      </div>
                    </div>
                    <div class="col-span-12 text-[14px] p-1 flex gap-4">
                      <div class="font-bold">Item Price:</div>
                      <div class="">{{ item.price }}{{ returncurrencysymbol(item.currency) }}</div>
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
                  </div>
                </div>

                <div class="col-span-12 md:col-span-3 px-3">

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
          <div class="col-span-12" v-if="recordsLength > 9">
            <pagination @paginate="getPage" :records="recordsLength" v-model="page" :per-page="perPage"
              :options="options"> </pagination>
            <div class="flex justify-center"> {{ recordsLength }} items Found</div>
          </div>
          <div class="col-span-12 flex justify-center" v-else>{{ recordsLength }} items</div>
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
import PaginationComp from '../../components/MyPagination.vue'


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
    this.getvendoritemscount();
    this.getPage(this.page)


  },
  data () {
    return {
      user: null,
      loaded_user: false,
      items: [],
      newitemid: null,
      accept: ref(false),

      page: 1,
      perPage: 3,
      recordsLength: 0,
      options: {
        edgeNavigation: false,
        format: false,
        template: PaginationComp
      }

    };
  },

  methods: {
    gotoitem (uuid: any) {
      this.$router.push({ name: "edititem", params: { id: uuid } });
    },
    userstatus () {
      axios({
        method: "get",
        url: "/auth/whoami",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {

        if ((response.data.login == true)) {
          this.user = response.data.user
          if (response.data.user.user_admin == 0) {
            this.$router.push({ name: "home" });
          }
          this.loaded_user = true;
        }
      });
    },
    getPage: function (page: any) {
      // we simulate an api call that fetch the records from a backend
      this.items = [];
      const startIndex = this.perPage * (page - 1) + 1;
      const endIndex = startIndex + this.perPage - 1;
     
        // gets the vendor items
      this.getvendoritems(page)

    
    },

    // gets the vendor items
    getvendoritemscount () {
      axios({
        method: "get",
        url: "/vendorcreate/itemsforsale/count",
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        this.recordsLength = response.data.count;


      });
    },
    // gets the vendor items
    getvendoritems (page: any) {
      axios({
        method: "get",
        url: "/vendorcreate/itemsforsale/" + page,
        withCredentials: true,
        headers: authHeader(),
      }).then((response) => {
        this.items = response.data;
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
          if (response.data.success) {
            this.newitemid = response.data.item_id;
            this.$router.push({
              name: "edititem",
              params: { id: this.newitemid },
            });
          }
        })
        .catch(() => {

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
          if (response.data.success) {
            this.getPage(this.page);
            notify({
              title: "Message Center",
              text: "Item has been cloned",
              type: "success",
            });
          }
        })
        .catch(() => {

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
        if (response.data.success) {
          this.getPage(this.page);
          notify({
            title: "Message Center",
            text: "Item has been deleted",
            type: "error",
          });
        }
      })
        .catch(() => {
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
        if (response.data.success) {

          this.getPage(this.page);
          if (response.data.success) {
            notify({
              title: "Item:  " + itemid,
              text: "Item is online",
              type: "success",
            });
          } else {
            notify({
              title: "Item:  " + itemid,
              text: response.data,
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
        if (response.data.success) {
          this.getPage(this.page);
          notify({
            title: "Item:  " + itemid,
            text: "Item is offline",
            type: "error",
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
