<template>
    <v-card max-width="300" height="200" class="Products justify-center align-center flex-wrap my-10">
        <v-col>
            <v-card-subtitle class="text-center">{{ title }}</v-card-subtitle>
            <v-img :src="imgURL" max-width="100" max-height="100" class="mx-auto"></v-img>
        </v-col>
    </v-card>
</template>


<script>
export default {
    props: ['title', 'imgURL'] // passed from index.vue
}
</script>


<style scoped>
    @media (max-width: 768px) {
        .Products {
            margin: 0 auto;
        }
    }
</style>