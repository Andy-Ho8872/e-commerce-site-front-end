<template>
    <SlideGroup>
        <!-- slider items here -->
        <v-card
            v-for="item in items"
            :key="item.id"
            elevation="8"
            :max-width="cardWidth"
            class="slide_items mx-4 my-6"
            nuxt
            :to="{ name: 'products-id', params: { id: item.id } }"
        >
            <v-img
                :src="item.imgUrl"
                :alt="item.title"
                :lazy-src="item.imgUrl"
                :max-height="cardHeight"
            >
                <v-card-subtitle v-if="item.discount_rate != 1" class="discount_label yellow pa-1 caption">
                    <span class="red--text font-italic font-weight-medium">{{ item.discount_rate * 10 }} 折</span>
                </v-card-subtitle>
            </v-img>
            <v-card-subtitle class="title_background white--text text-center">{{ item.title }}</v-card-subtitle>
        </v-card>
    </SlideGroup>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    props: {
        cardWidth: {
            type: Number,
            default: 340,
        },
        cardHeight: {
            type: Number,
            default: 340,
        },
    },
    computed: {
        ...mapGetters({
            items: 'carousel/getCarouselItem',
        }),
    },
    methods: {
        ...mapActions({
            fetchCarouselItem: 'carousel/fetchCarouselItem',
        }),
    },
    created() {
        //* 避免重複發送相同的 request
        if (!this.items.length) {
            //* 撈取 slider 資料
            this.fetchCarouselItem()
        }
    },
}
</script>

<style lang="scss" scoped>
// items css
.discount_label {
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
}
.title_background {
    background: rgba(0, 0, 0, 0.7);
}
@media (max-width: 768px) {
    .slide_items {
        width: 200px;
        height: 254px;
    }
    .title_background {
        position: absolute;
        bottom: 0;
        width: 100%;
    }
}
</style>