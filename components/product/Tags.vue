<template>
    <!-- 產品標籤 -->
    <v-chip-group>
        <v-chip color="primary" v-for="tag in product.tags" :key="tag.id">
            <!-- 判斷標籤的名稱是否相符 -->
            <!-- 圖案 -->
            <v-icon size="medium">
                {{ productTags.find(t => t.title == tag.title).icon }}
            </v-icon>
            <!-- 名稱 -->
            <span>{{ tag.title }}</span>
        </v-chip>
    </v-chip-group>
</template>

<script>
export default {
    // passed from components/Product.vue Or pages/search/title.vue
    props: {
        product: Object,
    },
    data() {
        return {
            // 產品標籤
            productTags: [
                {
                    title: '3C產品',
                    icon: 'fa-mobile-alt fa-fw',
                },
                {
                    title: '服裝',
                    icon: 'fa-tshirt fa-fw',
                },
                {
                    title: '背包',
                    icon: 'fa-shopping-bag fa-fw',
                },
                {
                    title: '折扣',
                    icon: 'fa-dollar-sign fa-fw',
                },
            ],
        }
    },
}
</script>
