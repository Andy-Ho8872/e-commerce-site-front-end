
export const state = () => ({
    // 計數器從 0 開始
    counter: 0,
    // 圖片移動量  預設為 355px (v-card 寬度)
    slideValue: 355,
    // 最大滑動次數 (會依照使用者當前螢幕寬度來取值)
    maxSlide: null,
})

export const mutations = {
    // 增加 Counter 計數 (每次增加最少為 1)
    CHANGE_COUNTER (state, value) {
        state.counter = state.counter + value
        console.log(state.counter); 
    },
    SLIDE_CAROUSEL (state) {
    //先取得使用者當前螢幕的寬度
        const clientWidth = document.body.offsetWidth
        // 滑動區域
        const slide = document.querySelector('.switch_photo')
        // i Phone 5/SE 寬度 (320px)
        if (clientWidth === 320) {
            state.slideValue = clientWidth - 20 // 300 px
            state.maxSlide = 9
        }
        // i Phone 6, 7, 8, X 寬度 (375px)
        else if (clientWidth === 375) {
            state.slideValue = clientWidth - 20 // 355 px
            state.maxSlide = 9
        } 
        // i Phone 6/7/8, plus 寬度(414px)
        else if (clientWidth === 414) {
            state.slideValue = clientWidth - 20 // 394 px
            state.maxSlide = 9
        }
        // i pad 寬度 (768px) 一次顯示 2 張圖片
        else if (clientWidth === 768) {
            state.slideValue = clientWidth - 20 // 748 px
            state.maxSlide = 4
        }
        // i pad pro 寬度 (1024px) 一次顯示 2 張圖片
        else if (clientWidth === 1024) {
            state.slideValue = clientWidth - 148 // 876 px
            state.maxSlide = 4
        }
        // 桌電瀏覽原始寬度 (355 px (v-card 寬度) )
        else {
            state.slideValue = state.slideValue
            state.maxSlide = 5
        }
        // 圖片轉場、位移
        slide.style.transition = "transform 0.4s ease-in-out"
        slide.style.transform = `translateX( ${ -(state.counter) * state.slideValue }px )`
        // 若圖片已達最左邊
        if (state.counter < 0) {
            // 將移動量重設為 0 (即不動)
            slide.style.transform = `translateX(0)`
            state.counter = 0
        }
        // 若圖片已達最右邊
        if (state.counter > state.maxSlide - 1) {
            // state.counter = state.maxSlide
            state.maxSlide = state.maxSlide
            slide.style.transform = `translateX( ${ -(state.maxSlide) * state.slideValue }px )`
            state.counter = 0
        }
    }
}

export const actions = {
    setCarousel (state) {
        state.commit('SLIDE_CAROUSEL')
    }
}

// 待改動
export const getters = {
    getCurrentCounter () {
        state.counter
    },
    getCurrentMaxSlide () {
        state.maxSlide
    }
}