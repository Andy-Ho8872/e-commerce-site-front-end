<template>
<v-container>
    <div>歡迎您 {{ user.email }}</div>
</v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            user: 'user/getUserInfo'
        })
    },
    methods: {
        ...mapActions({
            fetchUserInfo: 'user/fetchUserInfo'
        })
    },
    mounted() {
        this.fetchUserInfo()
    }
}
</script>

<style lang="less" scoped>

</style>