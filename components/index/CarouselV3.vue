<template>
    <v-sheet class="mx-auto">
        <div class="slide_group">
            <!-- prev-icon -->
            <div class="slide_group__prev" ref="slide_icon__prev">
                <v-icon large class="slide_icons" @click="slide(-1)">fa-chevron-circle-left</v-icon>
            </div>
            <div class="slide_group_items__wrapper" ref="slide_wrapper">
                <div class="slide_group_items__content" ref="slide_content">
                <!-- items here -->
                    <v-card
                        v-for="item in items" :key="item.id"
                        elevation="8"
                        :max-width="cardWidth"
                        class="carousel_item_container mx-4 my-6"
                        nuxt
                        :to="{ name: 'products-id', params: { id: item.id } }"
                    >
                        <v-img
                            :src="item.imgUrl"
                            :alt="item.title"
                            :lazy-src="item.imgUrl"
                            :max-height="cardHeight"
                        >
                            <!-- 商品折數 -->
                            <v-card-subtitle
                                v-if="item.discount_rate != 1"
                                class="discount_label yellow pa-1 caption"
                            >
                                <span
                                    class="red--text font-italic font-weight-medium"
                                    >{{ item.discount_rate * 10 }} 折</span
                                >
                            </v-card-subtitle>
                        </v-img>
                        <v-card-subtitle
                            class="title_background white--text text-center"
                            >{{ item.title }}</v-card-subtitle
                        >
                    </v-card>
                </div>
            </div>
            <!-- next-icon -->
            <div class="slide_group__next" ref="slide_icon__next">
                <v-icon large class="slide_icons" @click="slide(1)">fa-chevron-circle-right</v-icon>
            </div>
        </div>
    </v-sheet>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            counter: 0, // 當前計數
            slideRange: 0, // 單次滑動距離
            currentSlideRange: 0, // 當前滑動距離
            maxSlideRange: 0, // 最大滑動距離
        }
    },
    props: {
        background: {
            type: String,
            default: 'white',
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
    computed: {
        ...mapGetters({
            items: 'carousel/getCarouselItem',
        }),
    },
    methods: {
        ...mapActions({
            fetchCarouselItem: 'carousel/fetchCarouselItem',
        }),
        setSliderData() {
            const inner = this.$refs.slide_content.getBoundingClientRect()
            const outer = this.$refs.slide_wrapper.getBoundingClientRect()
            this.slideRange = this.$refs.slide_wrapper.clientWidth //* 單次滑動距離
            this.currentSlideRange = this.counter * (this.slideRange / 2) //* 當前滑動距離
            this.maxSlideRange = inner.width - outer.width //* 最大滑動距離
        },
        checkSliderBoundary() {
            //* 邊界判定(左)
            if(this.counter <= 0) {
                // 使 icon 失效
                this.disablePrevIcon()
                // 計數重設為 0
                this.counter = 0
                // 滑動量重設為 0
                this.$refs.slide_content.style.transform = `translateX(0px)`
            }
            //* 邊界判定(中)
            else if(this.counter > 0 && this.currentSlideRange < this.maxSlideRange) {
                this.enablePrevIcon()
                this.enableNextIcon()
            }
            //* 邊界判定(右)
                //? 是否超過最大滑動距離?
            else if(this.currentSlideRange > this.maxSlideRange) {
                //* */ 將 counter 重設為最大滑動量的點擊次數
                this.counter = this.currentSlideRange / (this.slideRange / 2) - 1
                // 滑動距離為最大
                this.$refs.slide_content.style.transform = `translateX(-${this.maxSlideRange}px)`
                // 使 icon 失效
                this.disableNextIcon()
            }
        },
        //* icon 操作
        disableNextIcon() {
            this.$refs.slide_icon__next.classList.add('icon__disabled')
        },
        disablePrevIcon() {
            this.$refs.slide_icon__prev.classList.add('icon__disabled')
        },
        enableNextIcon() {
            this.$refs.slide_icon__next.classList.remove('icon__disabled')
        },
        enablePrevIcon() {
            this.$refs.slide_icon__prev.classList.remove('icon__disabled')
        },
        //* 點擊以滑動 
        slide(value) {
            this.counter += value
            // 變數賦值
            this.setSliderData()
            // 開始滑動
            this.$refs.slide_content.style.transform = `translateX(-${this.currentSlideRange}px)`
            // 邊界判定
            this.checkSliderBoundary()
        }  
    },
    //* 避免重複發送相同的 request
    created() {
        if (!this.items.length) {
            this.fetchCarouselItem()
        }
    },
    mounted() {
        this.disablePrevIcon()
    }
}
</script>

<style lang="scss" scoped>
.slide_group {
    display: flex;
}
// icon zone
.slide_group__prev,
.slide_group__next {
    cursor: pointer;
    display: flex;
    flex: 0 1 52px;
    align-items: center;
    justify-content: center;
    min-width: 52px;
}
.icon__disabled {
    display: none;
    pointer-events: none;
}
// icons
.slide_icons {
    &:hover {
        transform: scale(1.5);
        color: orange;
    }
}
.slide_group_items__wrapper {
    display: flex;
    flex: 1 1 auto;
    contain: content;
    overflow: hidden;
}
.slide_group_items__content {
    display: flex;
    flex: 1 0 auto;
    position: relative;
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    white-space: nowrap;
}

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
    .carousel_item_container {
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
