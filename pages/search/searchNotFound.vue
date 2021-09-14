<template>
    <v-container>
        <div class="text-center">
            <SearchNotFound :searchQuery="searchQuery"/>
        </div>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    head() {
        if(this.searchQuery) {
            return {
                title: `找不到關於-${this.searchQuery}-的結果`,
                meta: [
                    {
                        hid: 'description',
                        name: 'description',
                        content: '很抱歉，查無相關結果'
                    }
                ]
            }
        }
    },
    computed: {
        ...mapGetters({
            searchQuery: 'search/getSearchText'
        })
    }
}
</script>