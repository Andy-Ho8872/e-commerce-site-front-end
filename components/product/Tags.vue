<template>
    <!-- 產品標籤 -->
    <v-chip-group>
        <v-chip label color="primary" small v-for="tag in product.tags" :key="tag.id">
            <!-- 名稱 -->
            <span>{{ tag.title }}</span>
        </v-chip>
    </v-chip-group>
</template>

<script>
export default {
    //? passed from components/Product.vue Or pages/search/title.vue
    props: {
        size : {
            type: String,
        },
        product: {
            type: Object,
            require: true
        },
    },
}
</script>
