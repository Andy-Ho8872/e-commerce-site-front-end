<template>
    <v-container>
        <h1>測試</h1>
        <h1>{{ this.$route.params.pageNumber }}</h1>
    </v-container>
</template>

<script>
export default {
    layout: 'paginate'
}
</script>

<style>

</style>