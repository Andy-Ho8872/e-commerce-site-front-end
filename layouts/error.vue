<template>
    <v-app dark class="text-center">
        <v-sheet
            color="blue-grey darken-4"
            class="background d-flex justify-start align-center flex-column"
        >
        <!-- page not found -->
        <div v-if="error.statusCode === 404" class="d-flex justify-start align-center flex-column">
            <v-img
                :src="require('~/static/error/404.svg')"
                class="responsive_img"
                max-width="600"
                max-height="400"
            ></v-img>
            <h1 class="background_title white--text font-italic">{{ pageNotFound }}</h1>
        </div>
        <!-- other error -->
        <div v-else class="d-flex justify-start align-center flex-column">
            <v-img
                :src="require('~/static/error/BugFixing.svg')"
                class="responsive_img"
                max-width="600"
                max-height="400"
            ></v-img>
            <h1 class="background_title white--text font-italic">{{ otherError }}</h1>
        </div>
        <!-- 導覽按鈕 -->
        <div class="btn_container text-center">
            <v-btn x-large color="warning" rounded nuxt :to="{ name: 'index' }">回到首頁</v-btn>
        </div>
        </v-sheet>
    </v-app>
</template>

<script>
export default {
    layout: 'empty',
    props: {
        error: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            pageNotFound: '404 Not Found',
            otherError: 'An error occurred',
        }
    },
    head() {
        const title =
            this.error.statusCode === 404 ? this.pageNotFound : this.otherError
        return {
            title,
        }
    },
}
</script>

<style scoped>
.background {
    height: 100%;
}
.background_title {
    font-family: 'Poppins', sans-serif;
    font-size: 6rem;
    transform: translateY(-40%);
    letter-spacing: 8px;
}
.responsive_img {
    width: 100%;
}
.btn_container {
    width: 120px;
}
@media (max-width: 768px) {
    .background_title {
        font-size: 3rem;
    }
}
@media (max-width: 414px) {
    .background_title {
        font-size: 1.75rem;
    }
}
</style>
