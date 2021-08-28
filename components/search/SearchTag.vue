<template>
    <v-sheet :elevation="elevation">
        <v-row>
            <v-chip-group column v-if="tags.length">
                <v-chip
                    class="product_tag_title"
                    v-for="tag in tags"
                    :key="tag.id"
                    color="primary"
                    nuxt
                    :to="{ name: 'search-title-pagination-pageNumber', params: { title: tag.title, pageNumber: 1} }"
                >
                    {{ tag.title }}
                </v-chip>
            </v-chip-group>
            <!-- loader -->
            <template v-else>
                <v-skeleton-loader type="chip" v-for="(i, index) in 4" :key="index" class="mx-1 my-auto"></v-skeleton-loader>
            </template>
        </v-row>
    </v-sheet>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    props: {
        elevation: {
            type: [String, Number],
            default: 2
        }
    },
    methods: {
        ...mapActions({
            fetchAllProductTags: 'product/fetchAllProductTags' //? 商品的標籤
        })
    },
    computed: {
        ...mapGetters({
            tags: 'product/getAllProductTags'
        })
    },
    async mounted() { 
        await this.fetchAllProductTags() 
    },
}
</script>

<style lang="scss" scoped>

</style>
