<template>
    <div>
        <h2 class="ma-auto">
            找不到關於
            <span class="blue--text lighten-5">
                "{{ searchQuery }}"
            </span>
            的搜尋結果
        </h2>
        <v-img :src="require('~/static/search/SearchNotFound.svg')"
            class="mx-auto mb-4"
            :max-width="width" 
            :max-height="height"
        >
        </v-img>
    </div>
</template>

<script>
export default {
    props: {
        width: {
            type: [String, Number],
            default: 300
        },
        height: {
            type: [String, Number],
            default: 300
        },
        searchQuery: {
            type: String,
            default: '找不到相關的結果'
        }
    },
}
</script>