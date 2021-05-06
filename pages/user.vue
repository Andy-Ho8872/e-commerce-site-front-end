<template>
    <v-container>
        <!-- loading -->
        <LoadingCircle v-if="!user"/>
        <div v-else>
            <UserTabs />
            <nuxt-child />
        </div>
    </v-container>
</template>

<script>
import userMixin from '~/mixins/userMixin'

export default {
    mixins: [userMixin]
}
</script>

<style lang="scss"scoped>
@media (max-width: 768px) {
    .btn_container {
        text-align: center;
    }
}
</style>