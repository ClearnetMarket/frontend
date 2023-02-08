<template>

    <div class="flex flex-nowrap flex-col p-5 mb-10 mt-10 ">

        <div class="mt-5 mx-10  md:flex md:mb-5 gap-5">
            <div v-for="item in allitems" :key="item.id">
                <generic_item v-bind:item="item" />
            </div>
        </div>
    </div>



</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import generic_item from "../item/generic_item.vue";
/**
 *
@typedef {Object} item.id
@typedef {Object} item.uuid
@typedef {Object} item.image_one_url
@typedef {Object} item.image_one_server
@typedef {Object} item.item_title
@typedef {Object} item.currency
@typedef {Object} item.price
@typedef {Object} item.origin_country_name
@typedef {Object} item.digitalcurrencyone
@typedef {Object} item.digitalcurrencytwo
@typedef {Object} item.digitalcurrencythree
 *
 */

export default defineComponent({
    name: "AllItems",
    components: {
        generic_item,
    },
    data () {
        return {
            allitems: [],
            loadedbtcprice: false,
        };
    },

    mounted () {
        this.getallitems();
    },
    computed: {},

    methods: {

        getallitems() {
            axios({
                method: "get",
                url: ("/itemquery/query/all"),
                withCredentials: true,
            })
                .then((response) => {
                    if ((response.status = 200)) {
                        this.allitems = response.data;
                     
                    }
                })
                .catch((error) => {
                });
        },

    },
});
</script>
<style>
.break {
    flex-basis: 100%;
    height: 0;
}
</style>