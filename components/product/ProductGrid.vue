<template>
<v-sheet elevation="6" rounded="lg" class="px-4 py-8 px-md-6">
    <v-row>
        <v-col v-for="item in data" :key="item.id" :cols="cols" :lg="lg" :md="md" :sm="sm">
            <SkeletonCard :cardWidth="200" v-if="loading"/>
            <ProductCard :product="item" :cardWidth="200" :elevation="4" v-if="!loading"/>
        </v-col>
    </v-row>
</v-sheet>
</template>

<script>
export default {
    props: {
        data: {
            type: Array | Object,
            require: true,
        },
        loading: {
            type: Boolean,
            default: false
        },
        cols: {
            type: String | Number,
            default: 6
        },
        lg: {
            type: String | Number,
            default: 2
        },
        md: {
            type: String | Number,
            default: 3
        },
        sm: {
            type: String | Number,
            default: 4
        }, 
    }
}
</script>

<style>

</style>