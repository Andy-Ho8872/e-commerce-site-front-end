<template>
    <v-container>
        <v-tabs>
            <v-tab nuxt :to="{ name: 'index' }">
                <v-icon>fa-home fa-fw</v-icon>
                <span>首頁</span>
            </v-tab>
            <v-tab nuxt :to="{ name: 'user-notification' }">
                <v-icon>fa-bell fa-fw</v-icon>
                <span>通知</span>
            </v-tab>
            <v-tab nuxt :to="{ name: 'user-order' }">
                <v-icon>fa-list-alt fa-fw</v-icon>
                <span>訂單</span>
            </v-tab>
            <v-tab nuxt :to="{ name: 'user-account' }">
                <v-icon>fa-user fa-fw</v-icon>
                <span>會員</span>
            </v-tab>
        </v-tabs>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            tab: null
        }
    }
}
</script>

<style>

</style>