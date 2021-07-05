<template>
    <v-sheet :elevation="elevation" rounded="lg">
        <v-row>
            <v-chip-group column v-if="tags.length">
                <v-chip
                    v-for="tag in tags"
                    :key="tag.id"
                    color="primary"
                    nuxt
                    :to="{ name: 'search-title', params: { title: tag.title } }"
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
            type: [String, Number]
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
