<template>
    <v-sheet elevation="6" :color="background">
        <v-slide-group class="slider_wrapper" show-arrows="desktop">
            <!-- icons -->
            <template v-slot:next>
                <v-icon large class="slider_icon next_icon">fa-chevron-circle-right</v-icon>
            </template>
            <template v-slot:prev>
                <v-icon large class="slider_icon prev_icon">fa-chevron-circle-left</v-icon>
            </template>
            <!-- items -->
            <v-slide-item v-for="item in data" :key="item.id">
                <v-card
                    elevation="8"
                    :max-width="cardWidth"
                    class="slide_items mx-4 my-6"
                    nuxt
                    :to="{ name: 'products-id', params: { id: item.id } }"
                >
                    <v-img :src="item.imgUrl" :alt="item.title" :lazy-src="item.imgUrl" :max-height="cardHeight">
                        <!-- 商品折數 -->
                        <v-card-subtitle v-if="item.discount_rate != 1" class="discount_label yellow pa-1 caption">
                            <span class="red--text font-italic font-weight-medium">{{ item.discount_rate * 10 }} 折</span>
                        </v-card-subtitle>
                    </v-img>
                    <v-card-subtitle class="title_background white--text text-center">{{ item.title }}</v-card-subtitle>
                </v-card>
            </v-slide-item>
        </v-slide-group>
    </v-sheet>
</template>

<script>

export default {
    props: {
        data: {
            type: Array,
            require: true
        },
        background: {
            type: String,
            default: "white"
        },
        cardWidth: {
            type: Number,
            default: 340,
        },
        cardHeight: {
            type: Number,
            default: 340,
        },
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
