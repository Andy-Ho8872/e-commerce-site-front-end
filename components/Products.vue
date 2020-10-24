<template>
    <v-card max-width="300" class="Products d-flex justify-center align-center flex-wrap my-12">
        <v-col>
            <v-card-subtitle class="text-center">{{ title }}</v-card-subtitle>
            <v-img :src="url" max-width="100" max-height="100" class="mx-auto"></v-img>
        </v-col>
    </v-card>
</template>

<script>
export default {
    props: ['title', 'url']
}
</script>

<style scoped>
    @media (max-width: 768px) {
        .Products {
            margin: 0 auto;
        }
    }
</style>