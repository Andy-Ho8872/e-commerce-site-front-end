<template>
    <v-app dark class="text-center">  
        <div class="full_screen d-flex justify-start align-center flex-column">
            <!-- background img -->
            <v-img :src="require('~/static/error/Background.svg')" class="full_screen">
                <!-- 404 not found -->
                <div v-if="error.statusCode === 404">
                    <v-img :src="require('~/static/error/404.svg')" class="full_screen mx-auto" max-width="600" max-height="400"></v-img>
                    <h1 class="error_message white--text font-italic text-center">{{ pageNotFound }}</h1>
                </div>
                <!-- other error -->
                <div v-else>
                    <v-img :src="require('~/static/error/BugFixing.svg')" class="full_screen mx-auto" max-width="600" max-height="400"></v-img>
                    <h1 class="error_message white--text font-italic text-center">{{ otherError }}</h1>
                </div>
                <!-- action button -->
                <div class="btn_container text-center mx-auto">
                    <v-btn x-large color="warning" rounded nuxt :to="{ name: 'index' }">回到首頁</v-btn>
                </div>
            </v-img>
        </div>
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
.full_screen {
    width: 100vw;
    height: 100vh;
}
.error_message {
    font-family: 'Poppins', sans-serif;
    font-size: 6rem;
    transform: translateY(-40%);
    letter-spacing: 8px;
}
.btn_container {
    width: 120px;
}
@media (max-width: 768px) {
    .error_message {
        font-size: 3rem;
    }
}
@media (max-width: 414px) {
    .error_message {
        font-size: 1.75rem;
        transform: translateY(-2.5em);
    }
}
</style>
