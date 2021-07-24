<template>
    <v-sheet elevation="6" class="mx-auto">
        <div class="slide_group">
            <!-- prev-icon -->
            <div class="slide_group__prev" ref="slide_icon__prev">
                <v-icon large class="slide_icons" @click="clickToSlide(-1)">{{ prevIcon }}</v-icon>
            </div>
            <div class="slide_group_items__wrapper" ref="slide_wrapper">
                <div class="slide_group_items__content" ref="slide_content" @touchstart="touchStart" @touchmove.prevent="touchMove" @touchend="touchEnd">
                    <!-- slider items here -->
                    <div class="slide_group_items__items" ref="slide_items">
                        <slot></slot>
                    </div>
                </div>
            </div>
            <!-- next-icon -->
            <div class="slide_group__next" ref="slide_icon__next">
                <v-icon large class="slide_icons" @click="clickToSlide(1)">{{ nextIcon }}</v-icon>
            </div>
        </div>
    </v-sheet>
</template>

<script>

export default {
    data() {
        return {
            isMobileDevice: false, // 瀏覽裝置判定
            isOverFlowing: false, // 元件寬度是否會溢出
            maxSlideRange: 0, // 最大滑動距離
            currentSlideRange: 0, // 當前滑動距離
            // desktop
            counter: 0, // 當前計數
            slideRange: 0, // 單次滑動距離
            // mobile
            isDragging: false,
            startX: 0, // 開始觸碰的位置
            moveX: 0, // 滑動中的位置
            hasMoved: 0 // 已經滑動的距離
        }
    },
    props: {
        background: {
            type: String,
            default: 'white',
        },
        prevIcon: {
            type: String,
            default: 'fa-chevron-circle-left'
        },
        nextIcon: {
            type: String,
            default: 'fa-chevron-circle-right'
        },
    },
    methods: {
        startSliding() {
            this.$refs.slide_content.style.transform = `translateX(-${this.currentSlideRange}px)`
        },
        //* 設置滑動參數 *
        setSliderData() {
            this.slideRange = this.$refs.slide_wrapper.clientWidth //* 單次滑動距離
            this.currentSlideRange = this.counter * (this.slideRange / 2) //* 當前滑動距離
        },
        //* 左邊界判定
        reachedLeftBoundary() {
            this.$refs.slide_content.style.transform = 'translateX(0px)' // 滑動量重設為 0
        },
        //* 右邊界判定
        reachedRightBoundary() {
            this.$refs.slide_content.style.transform = `translateX(-${this.maxSlideRange}px)` // 滑動量為最大
        },
        //* 設置左右邊界 *
        setBoundary() {
            const inner = this.$refs.slide_content.getBoundingClientRect()
            const outer = this.$refs.slide_wrapper.getBoundingClientRect()
            this.maxSlideRange = inner.width - outer.width //* 最大滑動距離
        },
        //* 邊界偵測 */
        detectBoundary() {
            //? (左)
            if(this.counter <= 0) {
                this.counter = 0
                this.disablePrevIcon()
                this.reachedLeftBoundary()
            }
            //? (中)
            else if(this.counter > 0 && this.currentSlideRange < this.maxSlideRange) {
                this.enablePrevIcon()
                this.enableNextIcon()
            }
            //? (右)
                //? 是否超過最大滑動距離?
            else if(this.currentSlideRange > this.maxSlideRange) {
                this.counter = this.currentSlideRange / (this.slideRange / 2) - 1 //* 將 counter 重設為最大滑動量的點擊次數
                this.reachedRightBoundary()
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
        hideIcons() {
            this.$refs.slide_icon__prev.classList.add('icon__hidden')
            this.$refs.slide_icon__next.classList.add('icon__hidden')
        },
        showIcons() {
            this.$refs.slide_icon__prev.classList.remove('icon__hidden')
            this.$refs.slide_icon__next.classList.remove('icon__hidden')
        },
        //* 電腦版滑動
        clickToSlide(value) {
            this.counter += value // 計算點擊次數
            this.setBoundary() 
            this.setSliderData() 
            this.startSliding() 
            this.detectBoundary()
        },
        //* 手機版滑動
        touchStart(e) {
            this.startX = e.touches[0].clientX
            this.isDragging = true
            this.setBoundary()
        },
        touchMove(e) {
            this.moveX = e.touches[0].clientX
            this.currentSlideRange = this.hasMoved + (this.startX - this.moveX)
            this.startSliding()
        },
        touchEnd() { 
            const moveDirection = this.startX - this.moveX
            this.isDragging = false
            //* 更新已經滑動的距離 (取絕對值)
            if(moveDirection > 0) {
                this.hasMoved += Math.abs(moveDirection) //? 往右滑(正數)
            } else {
                this.hasMoved -= Math.abs(moveDirection) //? 往左滑(負數)
            } 
            //* 若已經抵達最左邊
            if(this.hasMoved < 0) {
                this.hasMoved = 0
                this.reachedLeftBoundary()
            }
            //* 若已經抵達最右邊
            if(this.hasMoved > this.maxSlideRange) {
                this.hasMoved = this.maxSlideRange
                this.reachedRightBoundary()
            } 
        },
        //* 判斷 slider 內容是否有溢出
        checkContentOverflowing() {
            const outer = this.$refs.slide_wrapper.clientWidth // slider 容器
            const itemWidth = this.$refs.slide_items.clientWidth
            itemWidth < outer ? this.isOverFlowing = false : this.isOverFlowing = true
            //* 沒溢出的話則不顯示 icon
            this.isOverFlowing ? this.showIcons() : this.hideIcons()
        },
        //* 判斷螢幕寬度是否為行動裝置
        checkDeviceSize() {
            window.innerWidth <= 768 ? this.isMobileDevice = true : this.isMobileDevice = false
            //* 手機版 icon 預設為隱藏
            this.isMobileDevice ? this.hideIcons() : null
        }  
    },
    async mounted() {
        this.checkContentOverflowing()  
        await this.checkDeviceSize()
        if(!this.isMobileDevice) {
            // 預設載入時使 prev icon 失效
            this.disablePrevIcon()
        }
    }
}
</script>

<style lang="scss" scoped>
.slide_group {
    display: flex;
}
.slide_group_items__items {
    display: flex;
}
// icon area
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
    pointer-events: none;
}
.icon__hidden {
    display: none;
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
</style>
