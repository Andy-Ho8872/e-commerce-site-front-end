<template>
<v-sheet elevation="6" rounded="lg" class="px-4 py-8 px-md-6">
    <v-row>
        <v-col v-for="item in data" :key="item.id" cols="6" lg="2" md="3" sm="4">
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
        }
    }
}
</script>

<style>

</style>