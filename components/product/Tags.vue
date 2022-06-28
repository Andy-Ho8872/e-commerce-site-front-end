<template>
    <!-- 產品標籤 -->
    <v-chip-group class="pb-1">
        <v-chip label color="primary" small v-for="tag in tags" :key="tag.id">
            <!-- 名稱 -->
            <span>{{ tag.title }}</span>
        </v-chip>
    </v-chip-group>
</template>

<script>
export default {
    //? passed from components/Product.vue Or pages/search/title.vue
    props: {
        product: {
            type: Object,
            require: true
        },
        sliced: {
            type: Boolean,
            default: false
        },
        slicedLength: {
            type: String | Number,
            default: 2
        }
    },
    computed: {
        //* 最多顯示兩個標籤
        tags() {
            if(this.sliced) return this.product.tags.slice(0, this.slicedLength)
            return this.product.tags
        }
    }
}
</script>
