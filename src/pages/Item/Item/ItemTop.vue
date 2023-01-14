
<template>


  <div class="max-w-7xl mx-auto px-10 mb-10 border-b-2  border-zinc-400">

    <div class="grid sm:grid-cols-1 md:grid-cols-12 mt-5 gap-5 pb-10  ">
      <div class="col-span-5"><!-- start column one -->
          <div class="grid grid-cols-12 gap-4 px-1 ">
            <div class="col-span-12 text-center flex items-center justify-center">
              <img class="h-96" :src="image_one_500" alt=""/>
            </div>
            <div class="col-span-12  gap-3 w-full flex">
              <div class=" ">
                <img class="object-fit" :src="image_one_250" alt="" @click="switchImageOne" />
              </div>
              <div class=" ">
              <img  class="object-fit" :src="image_two_250" alt=""  @click="switchImageSecond"
              />
              </div>
              <div class=" ">
                <img class="object-fit" :src="image_three_250" alt="" @click="switchImageThird"
               />
              </div>
              <div class="">
                <img class="object-fit" :src="image_four_250" alt="" @click="switchImageFourth"
               />
              </div>
              </div>
          </div>
      </div><!-- end column one -->

      <div class="col-span-4 px-5 bg-white rounded-md"><!-- start column two -->
        <div class="text-[20px] mb-1 font-bold">{{ title }}</div>
        <div class="border border-gray-400 mb-5"></div>
        <div class="flex gap-4">
          <div class="text-[16px] font-weight-bold text-gray-700">
            Conditon:
          </div>
          <div class="text-[16px] text-gray-700">
            {{ condition }}
          </div>
        </div>
        <div class="flex gap-4">
          <div class="text-[16px] font-weight-bold text-gray-700">
            Quantity:
          </div>
          <div class="text-[16px] text-gray-700">
            {{ itemcount }}
          </div>
        </div>
        <div class="flex gap-4">
          <div class="text-[16px] font-weight-bold text-gray-700">
            Category:
          </div>
          <div class="text-[16px] text-gray-700">
            {{ category_name }}
          </div>
        </div>
        <div class="flex pt-4 mb-1 justify-between">
          <div v-if="digitalcurrencyone === true">
            <span class="text-sm font-semibold text-orange-500 mr-2 mb-2">Bitcoin</span>
          </div>
          <div v-if="digitalcurrencythree === true">
            <span class="text-sm font-semibold text-orange-700 mr-2 mb-2">
              Monero</span>
          </div>
          <div v-if="digitalcurrencytwo === true">
            <span class="text-sm font-semibold text-green-600 mr-2 mb-2">Bitcoin Cash</span>
          </div>
        </div>
        <div class="text-[24px] font-bold text-gray-700 text-center">
          {{ price }} {{ returncurrencysymbol(currency) }}
        </div>

        <div class="mb-2 text-[14px]">
          <div v-if="digitalcurrencyone === true">
            <div class="flex font-bold text-[19px]">
              <div class="text-orange-500 pr-5">BTC:</div>
              <div class="font-weight-bold text-gray-700">
                {{ pricebtc }}
              </div>
            </div>
          </div>
          <div v-if="digitalcurrencytwo === true">
            <div class="flex font-bold text-[19px]">
              <div class="text-green-600 pr-5">BCH:</div>
              <div class="] font-weight-bold text-gray-700">
                {{ pricebch }}
              </div>
            </div>
          </div>
          <div v-if="digitalcurrencythree === true">
            <div class="flex font-bold text-[19px]">
              <div class="text-orange-700 pr-5">XMR:</div>
              <div class="font-weight-bold text-gray-700">
                {{ pricexmr }}
              </div>
            </div>
          </div>
        </div>
        <div class="mb-2 text-[14px] text-gray-700">
          <div class="grid grid-cols-12 gap-4">
            <div class="col-span-3">Located:</div>
            <div class="col-span-9">
              {{ exactcity }} {{ exactstateorprovence }} {{ exactzipcode }}
              {{ origin_country_name }}
            </div>
          </div>

          <div v-if="(freeshipping === true)">
            <div class="grid grid-cols-12 gap-4">
              <div class="font-[12px] col-span-3">Shipping:</div>

              <div class="flex col-span-9">
                Free Shipping Estimated {{ freeshippingdays }} days after
                purchase
              </div>
            </div>
          </div>
        </div>
      </div><!-- end column two -->



      <div class="col-span-3 px-5 bg-white rounded-md"><!-- start column three -->
        <div class="flex justify-center mb-5 mt-5">
          <div v-if="user">
            <div v-if="vendoruuid != user.user_id">
              <button
                class="bg-yellow-500 hover:bg-zinc-400 hover:text-white rounded-lg text-black font-semibold py-2 px-10 focus:outline-none focus:shadow-outline content-center justify-center"
                type="submit" @click="addtocart()">
                Add to Cart
              </button>
            </div>
            <div v-else>
              <div class="font-bold text-blie">
                This is your item
              </div>
            </div>
          </div>
          <div v-else>
            <button
              class="bg-yellow-500 hover:bg-zinc-400 hover:text-white rounded-lg text-black font-semibold py-2 px-10 focus:outline-none focus:shadow-outline content-center justify-center"
              type="submit">
              Add to Cart
            </button>
          </div>
        </div>
        <div class="text-center mb-2 text-yellow-600 font-bold" v-if="freeshipping === true">
          Free Shipping
        </div>
        <div class="flex flex-col">
          <div class="px-2 mb-5 text-gray-700 font-semibold">
            <div class="border rounded-lg px-2">
              <div class="px-5 text-[16px] text-center">
                Moderator Supported
              </div>
              <ul class="text-[11px] mb-5">
                <li>-All Items are backed by moderator support.</li>
                <li>-Dispute's prevent against fraud.</li>
              </ul>
              <div class="px-5 text-[16px] text-center">Escrow Transaction</div>
            </div>
          </div>
          <div class="flex flex-col">
            <div class="px-2 mb-10 text-gray-700 font-semibold">
              <div class="border rounded-lg px-2">
                <div class="text-[16px]">
                  <div class="mb-5 text-[18px] text-center">Vendor Stats</div>
                  <div class="text-[12px] flex">
                    <div v-if="vendoruuid">
                      <div class="flex">
                        <div class="">Sold by:</div>
                        <router-link :to="{
                          name: 'userprofile',
                          params: { uuid: vendoruuid },
                        }">
                          <div class="text-blue-500 hover:text-blue-300 hover:underline pl-3">
                            {{ vendorname }} ({{ vendortotalsales }})
                          </div>
                        </router-link>
                      </div>
                    </div>
                  </div>
                  <div v-if="vendortotalsales > 0">
                    <div class="text-[14px] flex">
                      ({{ vendorrating }}/10 Feedback rating
                      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star"
                        class="w-4 text-yellow-500 mr-1" role="img" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512">
                        <path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 
                            103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5
                            105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z">
                        </path>
                      </svg>)
                    </div>
                  </div>
                  <div v-else>
                    <div class="text-[12px]">Newbie Seller</div>
                  </div>

                  <div v-if="vendoruuid">
                    <div class="mb-5 mt-5 text-[14px] text-blue-500 hover:text-blue-300 hover:underline pl-3 text-center">
                      <router-link v-if="user" :to="{
                        name: 'MsgCreateItem',
                        params: { uuid: vendoruuid, itemuuid: uuid },
                      }">
                        Contact Seller
                      </router-link>
                    </div>
                  </div>
                  <div v-if="vendoruuid">
                    <div class="text-[14px] text-blue-500 hover:text-blue-300 hover:underline pl-3 text-center">
                      <router-link :to="{
                        name: 'userprofile',
                        params: { uuid: vendoruuid },
                      }">
                        View Vendor Store
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div><!-- end column three -->



    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { notify } from "@kyvg/vue3-notification";
import { useRoute } from "vue-router";
import authHeader from "../../../services/auth.header";


export default defineComponent({
  name: "ItemTop",
  props: [

  ],

  data () {
    return {
      loaded_site: false,
      uuid: null,
      user: null,
      item_id: null,
      shopping_cart_count: "",
      vendor_reviews_total: "",
      exact_city: "",
      exact_stateorprovence: "",
      exact_zipcode: "",
      item: null,
      shoppingcartcount: 0,
      loaded_feedback: false,
      title: "",
      condition: "",
      price: "",
      currency: 0,
      pricebtc: "",
      pricebch: "",
      pricexmr: "",
      digitalcurrencyone: false,
      digitalcurrencytwo: false,
      digitalcurrencythree: false,
      itemcount: "",
      freeshipping: false,
      freeshippingdays: 0,
      totalsold: 0,
      origin_country_name: "",
      vendorname: "",
      vendoruuid: "",
      vendortotalsales: 0,
      vendorrating: "",
      category_name: "",
      international: false,
      current_main_image: null,
      image_one_250: null,
      image_two_250: null,
      image_three_250: null,
      image_four_250: null,
      image_one_500: null,
      image_two_500: null,
      image_three_500: null,
      image_four_500: null,
      exactcity: "",
      exactstateorprovence: "",
      exactzipcode: "",

    };
  },
  created () {
    this.userstatus();
    this.getitem();
  },

  mounted () {
    const item_id_route = useRoute();
    this.item_id = item_id_route.params.id;
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
            this.user.confirmed = response.data.user.confirmed
            this.$store.dispatch("user", response.data.user);
          }
        })
        .catch(() => { this.user = null });
    },
    getitem () {
      let item_id_route = useRoute();
      this.item_id = item_id_route.params.id;
      axios({
        method: "get",
        url: "/item/" + this.item_id,
        withCredentials: true,
      })
        .then((response) => {
          if ((response.status = 200)) {
            this.uuid = response.data.uuid;
            this.item = response.data;
            this.title = response.data.item_title;
            this.category_name = response.data.category_name_0;
            this.itemcount = response.data.item_count;
            this.totalsold = response.data.total_sold;
            this.condition = response.data.item_condition;
            this.vendorname = response.data.vendor_display_name;

            this.digitalcurrencyone = response.data.digital_currency_1;
            this.digitalcurrencytwo = response.data.digital_currency_2;
            this.digitalcurrencythree = response.data.digital_currency_3;

            this.origin_country_name = response.data.origin_country_name;
            this.international = response.data.international;
  
            this.image_one_250 = response.data.image_one_url_250;
            this.image_two_250 = response.data.image_two_url_250;
            this.image_three_250 = response.data.image_three_url_250;
            this.image_four_250 = response.data.image_four_url_250;

            this.current_main_image = response.data.image_one_url_500
            this.image_one_500 = response.data.image_one_url_500;
            this.image_two_500 = response.data.image_two_url_500;
            this.image_three_500 = response.data.image_three_url_500;
            this.image_four_500 = response.data.image_four_url_500;

            this.getpricebch();
            this.getpricebtc();
            this.getpricexmr();
            this.getitemprice();
            this.getvendorinfo();
            this.getitemcondition();
            this.seeifuserhasdefaultaddress();
          }
        })
        .catch((error) => {

          this.$router.push({ name: "home" });
          notify({
            title: "Error",
            text: "Item has been deleted or doesnt exist",
            type: "error",
          });
        });
    },
    getitemcondition () {
      if (this.item.item_condition === 1) {
        this.condition = "New";
      } else if (this.item.item_condition === 2) {
        this.condition = "Manufacturer Refurbished";
      } else if (this.item.item_condition === 3) {
        this.condition = "Seller Refurbished";
      } else if (this.item.item_condition === 4) {
        this.condition = "Used";
      } else if (this.item.item_condition === 5) {
        this.condition = "For parts";
      } else if (this.item.item_condition === 6) {
        this.condition = "Not Specified";
      }
    },
    seeifuserhasdefaultaddress () {
      axios({
        method: "get",
        url: "/vendor/get/defaultaddress/" + this.item.vendor_uuid,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
          if ((response.status = 200)) {
            this.exactcity = response.data.city;
            this.exactstateorprovence = response.data.stateorprovence;
            this.exactzipcode = response.data.zipcode;
          }
        })
        .catch((error) => {

        });
    },
    getvendorinfo () {
      axios({
        method: "get",
        url: "/vendor/vendor-info/" + this.item.vendor_uuid,
        withCredentials: true,
      })
        .then((response) => {
          if ((response.status = 200)) {
            this.vendoruuid = response.data.vendoruuid;
            this.vendorrating = response.data.vendorrating;
            this.vendortotalsales = response.data.vendortotalsales;
            this.loaded_feedback = true;
          }
        })
        .catch((error) => {

        });
    },
    getitemprice () {
      this.price = this.item.price;
      this.currency = this.item.currency;
    },
    getpricebtc () {
      axios({
        method: "get",
        url: "/price/btcprice/" + this.item.currency + "/" + this.item.price,
        withCredentials: true,
      })
        .then((response) => {
          if ((response.status = 200)) {
            this.pricebtc = response.data.coin;
          }
        })
        .catch((error) => {

        });
    },
    getpricebch () {
      axios({
        method: "get",
        url: "/price/bchprice/" + this.item.currency + "/" + this.item.price,
        withCredentials: true,
      })
        .then((response) => {
          if ((response.status = 200)) {
            this.pricebch = response.data.coin;
          }
        })
        .catch((error) => {

        });
    },
    getpricexmr () {
      axios({
        method: "get",
        url: "/price/xmrprice/" + this.item.currency + "/" + this.item.price,
        withCredentials: true,
      })
        .then((response) => {
          if ((response.status = 200)) {
            this.pricexmr = response.data.coin;
          }
        })
        .catch((error) => {

        });
    },
    switchImageOne () {
      this.image_one_500 = this.current_main_image;
    },  
    switchImageSecond (){
   
      this.image_one_500 = this.image_two_500;
    


    },  

    switchImageThird () {

      this.image_one_500 = this.image_three_500;
     



    },  

    switchImageFourth () {
     
      this.image_one_500 = this.image_four_500;
   


    },      


    // Add item to cart
    addtocart () {
      axios({
        method: "post",
        url: "/checkout/add/" + this.item_id,
        withCredentials: true,
        headers: authHeader(),
      })
        .then((response) => {
         
          if ((response.status = 200)) {
            notify({
              title: "Shoppinng cart message",
              text: "Successfully added item to cart",
              type: "success",
            });
            this.get_shopping_cart_count();
          }
        })
        .catch((error) => {
          if (error.response) {
            notify({
              title: "Shopping Cart Error",
              text: "Error.  Could not add item to cart.",
              type: "error",
            });
          }
        });
    },

    // Get How many items in shopping cart
    get_shopping_cart_count () {
      axios({
        method: "get",
        url: "/info/user-cart-count",
        headers: authHeader(),
      })
        .then((response) => {
   
          this.shopping_cart_count = response.data.status;
          this.$emit("UpdateCart", this.shopping_cart_count);
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
<style>

</style>
