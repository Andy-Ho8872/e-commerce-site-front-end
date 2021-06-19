<template>
    <v-sheet elevation="6" rounded="lg" :color="background">
        <v-slide-group class="slider_wrapper" show-arrows="desktop">
            <!-- icons -->
            <template v-slot:next>
                <v-icon large class="slider_icon next_icon">fa-chevron-circle-right</v-icon>
            </template>
            <template v-slot:prev>
                <v-icon large class="slider_icon prev_icon">fa-chevron-circle-left</v-icon>
            </template>
            <!-- items -->
            <v-slide-item v-for="item in items" :key="item.id">
                <v-card
                    elevation="8"
                    :max-width="cardWidth"
                    :min-width="cardHeight"
                    class="mx-4 my-6"
                    nuxt
                    :to="{ name: 'products-id', params: { id: item.id } }"
                >
                    <v-img :src="item.imgUrl"></v-img>
                    <v-card-subtitle class="title_background white--text text-center">{{ item.title }}</v-card-subtitle
                    >
                </v-card>
            </v-slide-item>
        </v-slide-group>
    </v-sheet>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    props: {
        background: {
            type: String,
        },
        cardWidth: {
            type: Number,
            require: true,
        },
        cardHeight: {
            type: Number,
            require: true,
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
    //* 避免重複發送相同的 request
    created() {
        if (!this.items.length) {
            this.fetchCarouselItem()
        }
    },
}
</script>

<style lang="scss" scoped>
$icon-offset: -0.5em;

.slider_icon {
    position: absolute;
    &.prev_icon {
        left: $icon-offset;
    }
    &.next_icon {
        right: $icon-offset;
    }
    &:hover {
        transform: scale(1.5);
        color: orange;
    }
}
.title_background {
    background: rgba(0, 0, 0, 0.7);
}
</style>