<template>
    <div class="BG_wrapper">
        <!-- 背景圖片 -->
        <v-img :src="require(`../static/BG/${this.transition}.jpg`)" max-height="500">
            <div class="BG_text_upper">
                <h1>本網站之所有資料僅為測試用。</h1>
            </div>
            <div class="BG_text_lower">
                <h1>將不對外公開</h1>
            </div>
        </v-img>
    </div>
</template>`

<script>
export default {
    data () {
        return {
            transition: 1,
            interval: ''
        }
    },
    methods: {
        
    },
    mounted () {
        //自動切換 BG
        this.interval = setInterval(() => {
            this.transition++
            if (this.transition > 4) {
                this.transition = 1
            }
        },5000)
    },
    // 在使用者點及其他頁面後，終止 interval 在背景的執行(為了減少效能損耗)
    beforeDestroy () {
        clearInterval(this.interval)
    }
}
</script>

<style lang="scss" scoped>
    .BG_wrapper {
        position: relative;
        // animation: fade-in linear infinite;
        // animation-delay: 1s;
        // animation-duration: 5s;
    }
    .BG_text_upper {
        position: absolute;
        z-index: 1000;
        top: 10%;
        right: 5%;
        color: white;
    }
    .BG_text_lower {
        position: absolute;
        z-index: 1000;
        bottom: 10%;
        left: 5%;
        color: white;    
    }
    // Animations 
    @keyframes fade-in {
        0% { opacity: 0.75;
            background-size: 100%;
        }
        100% { opacity: 1; 
            background-size: 105%;
        }
    }
    // Media queries
    @media (max-width: 768px) {
        h1 {
            font-size: 1em;
        }
    }
</style>>

