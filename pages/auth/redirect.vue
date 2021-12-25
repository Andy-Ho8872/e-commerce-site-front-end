<template>
<!-- 第三方登入跳轉頁 -->
    <v-container>
        <div>執行第三方登入中...</div>
        <LoadingCircle />
    </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            token: this.$route.query.token ? this.$route.query.token : null
        }
    },
    methods: {
        ...mapActions({
            fetchRequiredData: 'auth/fetchRequiredData'
        })
    },
    async mounted() {
        if(this.token) {
            await localStorage.setItem('Token', `Bearer ${this.token}`)
            this.fetchRequiredData()
            this.$router.push({ name: 'index' })
        }
        this.$router.push({ name: 'index' })
    }
}
</script>

<style>

</style>