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
    computed: {
        ...mapGetters({
            searchQuery: 'search/getSearchText'
        })
    }
}
</script>