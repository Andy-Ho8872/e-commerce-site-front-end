<template>
    <v-carousel show-arrows hide-delimiters height="425">
        <!-- 一個 corousel 包含5個物品 -->
        <v-carousel-item>
            <div class="content" v-for="item in items" :key="item.id">
                <img :src="item.imgUrl" height="355">
                <v-card-subtitle class="title_background text-center">{{ item.title }}</v-card-subtitle>
            </div>
        </v-carousel-item>
    </v-carousel>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            items: 'carousel/getCarouselItem',
        }),
    },
    methods: {
        ...mapActions({
            fetchCarouselItem: 'carousel/fetchCarouselItem'
        })
    },
    //* 避免重複發送相同的 request
    created() {
        if(!this.items.length) {
            this.fetchCarouselItem()
        }
    },
}
</script>

<style lang="scss" scoped>
.title_background {
    background: rgba(0, 0, 0, 0.7);
}
</style>>