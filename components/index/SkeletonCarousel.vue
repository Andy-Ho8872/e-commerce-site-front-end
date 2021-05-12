<template>
  <!-- 骨架屏 -->
    <v-sheet tile elevation="4" :height="cardHeight" class="bg d-flex justify-center align-center">
        <div>
            <div class="bouncing d-flex justify-space-around text-center">
                <span class="dots"></span>
                <span class="dots"></span>
                <span class="dots"></span>
                <span class="star">
                    <v-icon x-large class="yellow--text">fa-star fw</v-icon>
                    <!-- 備用 -->
                    <!-- <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="#FFFF37">
                        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
                    </svg> -->
                </span>
            </div>
            <div class="text">LOADING</div>
        </div>
    </v-sheet>
</template>

<script>
export default {
    //? passed from index.vue
    props: {
        'cardHeight': {
            type: Number,
            require: true
        }
    }
}
</script>

<style lang="scss" scoped>
//? 變數 Start
    $size: 1.5rem;
    $bouncing-duration: 1s;
    $glowing: 0 0 16px;
    $glowing-duration: 2s;
//? 變數 End
    .bg {
        background-image: linear-gradient(to right, #434343 0%, black 100%);
        font-family: 'Poppins', sans-serif;
        font-size: 3rem;
        letter-spacing: 2rem;
    }
    .bouncing {
        padding: 1rem 0;
    }
    .dots {
        border-radius: 50%;
        background-image: linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%);
        height: $size;
        width: $size;
        animation: bouncing $bouncing-duration ease-in-out infinite;
        //* 動畫延遲撥放
        &:nth-child(1) {
            animation-delay: $bouncing-duration / 4;
        }
        &:nth-child(2) {
            animation-delay: $bouncing-duration / 3;
        }
        &:nth-child(3) {
            animation-delay: $bouncing-duration / 2;
        }
    }
    //* 螢光效果 Start
    .star {
        color: yellow;
        text-shadow: $glowing;
        stroke-dasharray: 1px;
        animation: bouncing $bouncing-duration ease-in-out infinite;
        animation-delay: $bouncing-duration / 1;
    }
    .text {
        color: #FFF;
        text-shadow: $glowing;
        animation: glowing $glowing-duration ease-in infinite
    }
    //* 螢光效果 End
    //* 動畫 Start
    @keyframes bouncing {
        0% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-48px);      
        }
        100% {
            transform: translateY(0);   
        }
    }
    @keyframes glowing {
        0% {
            filter: brightness(0.3);
        }
        50% {
            filter: none;
        }
        100% {
            filter: brightness(0.3);
        }
    }
    //* 動畫 End

    //? RWD
    @media (max-width: 768px) {
        .bg {
            letter-spacing: 0.75rem;
        }
    }
</style>
