<template>

     <div class="col-span-12 btn-group flex justify-center">

            <ul v-show="props.showPagination" :class="props.theme.list">


                <button class="btn" @click="props.setPrevPage">
                    <a v-bind="{...props.aProps,...props.prevProps}">{{props.texts.prevPage}}</a>
                </button>

                <button v-for="page in props.pages" :key="page" class="btn"
                    v-on="props.pageEvents(page)">
                    <a v-bind="props.aProps" :class="props.theme.link">{{page}}</a>
                </button>

                <button class="btn" @click="props.setNextPage">
                    <a v-bind="{...props.aProps, ...props.nextProps}">{{props.texts.nextPage}}</a>
                </button>

            </ul>
        </div>
      <div class="col-span-12 flex justify-center">
  
      </div>

</template>

<script lang="ts">
    export default {
        name: 'MyPagination',
        props: ['props']
    }
</script>