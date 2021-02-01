<template>
    <v-container>
        {{ this.$route.params.title }}
        <h3>{{ result }}</h3>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            result: 'search/getResult'
        })
    },
}
</script>

<style lang="scss">

</style>